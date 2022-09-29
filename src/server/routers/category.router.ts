import { t } from "../trpc"
import { prisma } from "src/utils/db/prisma-client"

export const categoryRouter = t.router({
  list: t.procedure.query(async function () {
    const articles = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        products: {
          orderBy: {
            name: "asc",
          },
        },
      },
    })
    return articles
  }),
})
