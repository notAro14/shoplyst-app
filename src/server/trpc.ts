import { initTRPC } from "@trpc/server"
import { TRPCError } from "@trpc/server"

import { Context } from "src/server/context"

export const t = initTRPC.context<Context>().create()

const authMiddleware = t.middleware(async ({ ctx, next }) => {
  if (typeof ctx.user === "undefined")
    throw new TRPCError({ code: "UNAUTHORIZED" })
  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  })
})

export const protectedProcedure = t.procedure.use(authMiddleware)
