import { PrismaClient, Prisma } from "@prisma/client"

const prisma = new PrismaClient()
const articles: Prisma.ArticleCreateInput[] = [
  {
    name: "Riz",
  },
  {
    name: "Jambon de dinde",
  },
  {
    name: "Haricots verts",
  },
]

async function main() {
  const existingArticles = await prisma.article.findMany()
  if (existingArticles.length === 0)
    await prisma.article.createMany({
      data: articles,
    })
}

main()
  .then(async function () {
    await prisma.$disconnect()
  })
  .catch(async function (e) {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
