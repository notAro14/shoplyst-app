import { z } from "zod"

import { t } from "src/server/trpc"
import { prisma } from "src/utils/db/prisma-client"

export const listRouter = t.router({
  all: t.procedure.query(async function () {
    // TODO: return  the lists belonging to current user
    const lists = await prisma.list.findMany({
      orderBy: {
        name: "asc",
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
    })
    return lists
  }),
  // TODO: return main list
  first: t.procedure.query(async function () {
    // TODO: return  a list belonging to current user
    const list = await prisma.list.findFirst({
      include: {
        products: {
          select: {
            status: true,
            product: true,
          },
          orderBy: {
            product: {
              name: "asc",
            },
          },
        },
      },
    })
    return list
  }),
  find: t.procedure.input(z.string()).query(async function ({ input: listId }) {
    // TODO: return a list belonging to current user
    const list = await prisma.list.findFirst({
      where: {
        id: listId,
      },
      include: {
        products: {
          select: {
            status: true,
            product: true,
          },
          orderBy: {
            product: {
              name: "asc",
            },
          },
        },
      },
    })
    return list
  }),
  create: t.procedure
    .input(
      z.object({
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
    )
    .mutation(async function ({ input }) {
      const list = await prisma.list.create({
        data: {
          name: input.name,
          description: input.description,
          owner: {
            connect: {
              // TODO: associate list to current user
              email: "ni.aro.aina@gmail.com",
            },
          },
          products: {
            create: input.products?.map((p) => ({
              productId: p.id,
            })),
          },
        },
      })
      return list
    }),
  addProduct: t.procedure
    .input(z.object({ listId: z.string(), productId: z.number() }))
    .mutation(async function ({ input: { listId, productId } }) {
      // TODO: check if list belongs to current user
      const productAndList = await prisma.productsOnLists.create({
        data: {
          listId,
          productId,
        },
        select: {
          product: true,
          list: true,
        },
      })
      return productAndList
    }),
  removeProduct: t.procedure
    .input(z.object({ listId: z.string(), productId: z.number() }))
    .mutation(async function ({ input: { listId, productId } }) {
      // TODO: check if list belongs to current user
      const productAndList = await prisma.productsOnLists.delete({
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
      return productAndList
    }),
  updateProductStatus: t.procedure
    .input(
      z.object({
        status: z.enum(["PURCHASED", "READY"]),
        listId: z.string(),
        productId: z.number(),
      })
    )
    .mutation(async function ({ input: { listId, productId, status } }) {
      const productAndList = await prisma.productsOnLists.update({
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
      return productAndList
    }),
})
