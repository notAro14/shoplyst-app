import { TRPCError } from "@trpc/server"
import { z } from "zod"

import { protectedProcedure, t } from "src/server/trpc"
import {
  createProduct,
  CreateInputSchema,
  UpdateInputSchema,
  removeProduct,
  updateProduct,
  listProducts,
} from "./product.service"

const list = protectedProcedure.query(async function () {
  const meta = await listProducts()
  if (meta.ok) return meta.data

  throw new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: meta.error?.message ?? "Unknown error",
  })
})

const create = protectedProcedure
  .input(CreateInputSchema)
  .mutation(async function ({ input }) {
    const meta = await createProduct(input)
    if (meta.ok) return meta.data

    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: meta.error.message,
    })
  })

const update = protectedProcedure
  .input(UpdateInputSchema)
  .mutation(async function ({ input }) {
    const meta = await updateProduct(input)
    if (meta.ok) return meta.data

    throw new TRPCError({
      code: "BAD_REQUEST",
      message: meta.error.message,
    })
  })

const remove = protectedProcedure
  .input(z.number())
  .mutation(async function ({ input }) {
    const meta = await removeProduct({ id: input })
    if (meta.ok) return meta.data

    throw new TRPCError({
      code: "BAD_REQUEST",
      message: meta.error.message,
    })
  })

export default t.router({
  create,
  update,
  remove,
  list,
})
