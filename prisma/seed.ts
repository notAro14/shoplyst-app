import { PrismaClient, Prisma } from "@prisma/client"

const prisma = new PrismaClient()
const data: Prisma.CategoryCreateInput[] = [
  {
    name: "Pâtes, Riz & Céréales",
    products: {
      create: [{ name: "Riz" }, { name: "Pâtes" }],
    },
  },
  {
    name: "Fruits",
    products: {
      create: [{ name: "Banane" }, { name: "Pêche" }, { name: "Pomme" }],
    },
  },
  {
    name: "Hygiène",
    products: {
      create: [{ name: "Papier toilette" }, { name: "Dentifrice" }],
    },
  },
]

async function main() {
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  data.forEach(async (d) => {
    await prisma.category.create({ data: d })
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
