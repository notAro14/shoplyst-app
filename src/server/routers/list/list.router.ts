import { z } from "zod"
import { TRPCError } from "@trpc/server"

import { protectedProcedure, t } from "src/server/trpc"
import {
  addProductTolist,
  addRemoveProductInputSchema,
  archiveList,
  createList,
  createListSchema,
  deleteList,
  doesListBelongToUser,
  findAll,
  findAllShared,
  findById,
  findSharedById,
  removeProductFromList,
  shareList,
  updateProductStatus,
  updateProductStatusSchema,
  updateList,
  UpdateInputSchema,
} from "src/server/routers/list/list.helpers"

export default t.router({
  all: protectedProcedure
    .input(
      z.object({
        isArchived: z.boolean(),
      })
    )
    .query(async function ({ ctx, input }) {
      return findAll(ctx.user.id, input.isArchived)
    }),
  allShared: protectedProcedure.query(async function ({ ctx }) {
    return findAllShared(ctx.user.id)
  }),
  findShared: protectedProcedure
    .input(z.string())
    .query(async function ({ ctx, input }) {
      return findSharedById(ctx.user.id, input)
    }),
  archive: protectedProcedure
    .input(z.string())
    .use(async ({ next, input, ctx }) => {
      const yes = await doesListBelongToUser(ctx.user.id, input)
      if (yes) return next()

      throw new TRPCError({ code: "UNAUTHORIZED" })
    })
    .mutation(async function ({ input }) {
      return archiveList(input)
    }),
  find: protectedProcedure
    .input(z.string())
    .query(async function ({ input: id, ctx }) {
      const list = await findById(ctx.user.id, id)
      if (!list) throw new TRPCError({ code: "NOT_FOUND" })
      return list
    }),
  share: protectedProcedure
    .input(z.object({ userIds: z.array(z.string()), listId: z.string() }))
    .use(async ({ next, input, ctx }) => {
      const yes = await doesListBelongToUser(ctx.user.id, input.listId)
      if (yes) return next()

      throw new TRPCError({ code: "UNAUTHORIZED" })
    })
    .mutation(async function ({ input: { userIds, listId } }) {
      return shareList(userIds, listId)
    }),
  delete: protectedProcedure
    .input(z.string())
    .use(async ({ next, input, ctx }) => {
      const yes = await doesListBelongToUser(ctx.user.id, input)
      if (yes) return next()

      throw new TRPCError({ code: "UNAUTHORIZED" })
    })
    .mutation(async function ({ input }) {
      return deleteList(input)
    }),
  create: protectedProcedure
    .input(createListSchema)
    .mutation(async function ({ input, ctx }) {
      return createList(ctx.user.id, input)
    }),
  update: protectedProcedure
    .input(UpdateInputSchema)
    .use(async ({ next, input, ctx }) => {
      const yes = await doesListBelongToUser(ctx.user.id, input.id)
      if (yes) return next()

      throw new TRPCError({ code: "UNAUTHORIZED" })
    })
    .mutation(async function ({ input }) {
      const meta = await updateList(input)
      if (meta.ok) return meta.data
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: meta.error.message,
      })
    }),
  addProduct: protectedProcedure
    .input(addRemoveProductInputSchema)
    .use(async ({ next, input, ctx }) => {
      const yes = await doesListBelongToUser(ctx.user.id, input.listId)
      if (yes) return next()

      throw new TRPCError({ code: "UNAUTHORIZED" })
    })
    .mutation(async function ({ input }) {
      return addProductTolist(input.listId, input.productId)
    }),
  removeProduct: protectedProcedure
    .input(addRemoveProductInputSchema)
    .use(async ({ next, input, ctx }) => {
      const yes = await doesListBelongToUser(ctx.user.id, input.listId)
      if (yes) return next()

      throw new TRPCError({ code: "UNAUTHORIZED" })
    })
    .mutation(async function ({ input }) {
      return removeProductFromList(input.listId, input.productId)
    }),
  updateProductStatus: t.procedure
    .input(updateProductStatusSchema)
    .mutation(async function ({ input: { listId, productId, status } }) {
      return updateProductStatus(listId, productId, status)
    }),
})
