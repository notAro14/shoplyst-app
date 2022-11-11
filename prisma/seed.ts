import { PrismaClient } from "@prisma/client"
import { categoriesAndProducts } from "./fixtures"

const prisma = new PrismaClient()
async function seed() {
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  const promises = categoriesAndProducts.map(async (d) =>
    prisma.category.create({ data: d })
  )
  return Promise.all(promises)
}

seed()
  .then(async function (createdData) {
    await prisma.$disconnect()
    // eslint-disable-next-line no-console
    console.log("Newly created data : ", createdData)
  })
  .catch(async function (e) {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
