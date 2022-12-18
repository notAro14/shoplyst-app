import { z } from "zod"
import { protectedProcedure, t } from "src/server/trpc"
import { prisma as db } from "src/utils/db/prisma-client"

export default t.router({
  getAll: protectedProcedure
    .input(
      z.object({
        listId: z.string(),
      })
    )
    .query(async function ({ ctx, input }) {
      const usersHavingAccessToList = await db.listOnUser.findMany({
        where: {
          listId: input?.listId,
        },
        select: {
          userId: true,
        },
      })
      const users = await db.user.findMany({
        select: {
          id: true,
          name: true,
        },
        orderBy: {
          name: "asc",
        },
        where: {
          id: {
            not: ctx.user.id,
          },
        },
      })
      return users.filter(
        (x) =>
          usersHavingAccessToList.map((y) => y.userId).includes(x.id) === false
      )
    }),
})
