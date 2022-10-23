import { z } from "zod"
import { TRPCError } from "@trpc/server"

import { t, protectedProcedure } from "src/server/trpc"
import {
  addProductTolist,
  findAll,
  findAllShared,
  findById,
  removeProductFromList,
  updateProductStatus,
  doesListBelongToUser,
  createList,
  createListSchema,
  addRemoveProductInputSchema,
  updateProductStatusSchema,
  shareList,
  archiveList,
  deleteList,
} from "src/server/routers/list/list.helpers"

export const listRouter = t.router({
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
    .input(
      z.object({
        userId: z.string(),
        listId: z.string(),
      })
    )
    .use(async ({ next, input, ctx }) => {
      const yes = await doesListBelongToUser(ctx.user.id, input.listId)
      if (yes) return next()

      throw new TRPCError({ code: "UNAUTHORIZED" })
    })
    .mutation(async function ({ input: { userId, listId } }) {
      return shareList(userId, listId)
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
