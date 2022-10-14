import type { Prisma } from "@prisma/client"
import { z } from "zod"

import { prisma as db } from "src/utils/db/prisma-client"

// SCHEMAS

export const createListSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  products: z
    .array(
      z.object({
        id: z.number(),
      })
    )
    .nullable(),
})

export const addRemoveProductInputSchema = z.object({
  listId: z.string(),
  productId: z.number(),
})

// FUNCTIONS

export async function findAll(ownerId: string) {
  return db.list.findMany({
    where: {
      ownerId,
    },
    select: {
      name: true,
      id: true,

      products: {
        orderBy: {
          product: {
            name: "asc",
          },
        },
        select: {
          status: true,
          product: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  })
}
export async function findById(ownerId: string, id: string) {
  return db.list.findFirst({
    where: {
      id,
      ownerId,
    },
    select: {
      name: true,
      id: true,
      description: true,
      ownerId: true,

      products: {
        orderBy: {
          product: {
            name: "asc",
          },
        },
        select: {
          status: true,
          product: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  })
}
export async function addProductTolist(listId: string, productId: number) {
  return db.productsOnLists.create({
    data: {
      listId,
      productId,
    },
    select: {
      product: true,
      list: true,
    },
  })
}
export async function removeProductFromList(listId: string, productId: number) {
  return db.productsOnLists.delete({
    where: {
      productId_listId: {
        listId,
        productId,
      },
    },
    select: {
      product: true,
      list: true,
    },
  })
}
export async function updateProductStatus(
  listId: string,
  productId: number,
  status: Prisma.ProductsOnListsCreateInput["status"]
) {
  return db.productsOnLists.update({
    where: {
      productId_listId: {
        listId,
        productId,
      },
    },
    data: {
      status,
    },
    select: {
      product: true,
      list: true,
    },
  })
}
export async function doesListBelongToUser(userId: string, listId: string) {
  const list = await db.list.findFirst({
    where: {
      ownerId: userId,
      id: listId,
    },
  })
  return list !== null
}
export async function createList(
  userId: string,
  { name, description, products }: z.infer<typeof createListSchema>
) {
  return db.list.create({
    data: {
      name,
      description,
      owner: {
        connect: {
          id: userId,
        },
      },
      products: {
        create: products?.map((p) => ({
          productId: p.id,
        })),
      },
    },
  })
}
