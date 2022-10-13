import * as trpc from "@trpc/server"
import * as trpcNext from "@trpc/server/adapters/next"
import { Session, unstable_getServerSession } from "next-auth"

import { authOptions } from "src/pages/api/auth/[...nextauth].page"

interface MySession extends Session {
  user?: Session[`user`] & {
    id: string
  }
}

export async function createContext(ctx: trpcNext.CreateNextContextOptions) {
  const { req, res } = ctx
  const session = (await unstable_getServerSession(
    req,
    res,
    authOptions
  )) as MySession
  return {
    req,
    res,
    user: session.user,
  }
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>
