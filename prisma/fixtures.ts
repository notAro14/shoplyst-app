import { Prisma } from "@prisma/client"

export const categoriesAndProducts: Prisma.CategoryCreateInput[] = [
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
