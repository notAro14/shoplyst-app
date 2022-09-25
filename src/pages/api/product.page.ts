import type { NextApiHandler } from "next"

import { prisma } from "src/utils/db/prisma-client"

const handler: NextApiHandler = async (_req, res) => {
  const articles = await prisma.product.findMany({
    orderBy: {
      name: "asc",
    },
  })
  return res.json(articles)
}

export default handler
