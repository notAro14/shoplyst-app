import { t } from "../trpc"
import { prisma } from "src/utils/db/prisma-client"

export const categoryRouter = t.router({
  all: t.procedure.query(async function () {
    const categories = await prisma.category.findMany({
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
    return categories
  }),
})
