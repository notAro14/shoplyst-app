import { z } from "zod"
import { TRPCError } from "@trpc/server"

import { t, protectedProcedure } from "src/server/trpc"
import {
  addProductTolist,
  findAll,
  findById,
  removeProductFromList,
  updateProductStatus,
  doesListBelongToUser,
  createList,
  createListSchema,
  addRemoveProductInputSchema,
} from "src/server/routers/list/list.helpers"

export const listRouter = t.router({
  all: protectedProcedure.query(async function ({ ctx }) {
    return findAll(ctx.user.id)
  }),
  find: protectedProcedure
    .input(z.string())
    .query(async function ({ input: id, ctx }) {
      const list = await findById(ctx.user.id, id)
      if (!list) throw new TRPCError({ code: "NOT_FOUND" })
      return list
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
    .input(
      z.object({
        status: z.enum(["PURCHASED", "READY"]),
        listId: z.string(),
        productId: z.number(),
      })
    )
    .mutation(async function ({ input: { listId, productId, status } }) {
      return updateProductStatus(listId, productId, status)
    }),
})
