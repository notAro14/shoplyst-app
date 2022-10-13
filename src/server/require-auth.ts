import type { GetServerSideProps, GetServerSidePropsContext } from "next"
import { unstable_getServerSession } from "next-auth"

import { authOptions } from "src/pages/api/auth/[...nextauth].page"

export const requireAuth =
  (func: GetServerSideProps) => async (ctx: GetServerSidePropsContext) => {
    const session = await unstable_getServerSession(
      ctx.req,
      ctx.res,
      authOptions
    )

    if (!session) {
      return {
        redirect: {
          destination: "/auth/signin",
          permanent: false,
        },
      }
    }

    return await func(ctx)
  }
