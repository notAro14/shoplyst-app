import { z } from "zod"
import { Prisma, Product, Category } from "@prisma/client"

import { prisma as db } from "src/utils/db/prisma-client"

interface ShoppingListError {
  message: string
  type: "PRISMA_ERROR" | "UNKNOWN_ERROR"
}
type ServiceReturn<T> =
  | { ok: false; error: ShoppingListError }
  | { ok: true; data: T }

export function handleException(exception: unknown): ShoppingListError {
  const type = "PRISMA_ERROR"
  if (exception instanceof Prisma.PrismaClientKnownRequestError)
    switch (exception.code) {
      case "P2001":
        return { message: "Prisma error : record not found", type }
      default:
        return { message: "Prisma error : unhandled error code", type }
    }

  return {
    message: "Unknown error : could not create product",
    type: "UNKNOWN_ERROR",
  }
}

export const CreateInputSchema = z.object({
  name: z.string(),
  categoryId: z.number().optional(),
})
export const UpdateInputSchema = z.object({
  name: z.string(),
  categoryId: z.number().optional(),
  id: z.number(),
})
export async function createProduct({
  name,
  categoryId,
}: {
  name: string
  categoryId?: number
}): Promise<ServiceReturn<Product & { category: Category | null }>> {
  const data = categoryId ? { name, categoryId } : { name }
  try {
    const product = await db.product.create({
      data,
      include: {
        category: true,
      },
    })
    return { ok: true, data: product }
  } catch (exception) {
    return { ok: false, error: handleException(exception) }
  }
}
export async function updateProduct({
  id,
  name,
  categoryId,
}: {
  id: number
  name: string
  categoryId?: number
}): Promise<ServiceReturn<Product & { category: Category | null }>> {
  const data = categoryId ? { name, categoryId } : { name }
  try {
    const product = await db.product.update({
      where: {
        id,
      },
      data,
      include: {
        category: true,
      },
    })
    return { ok: true, data: product }
  } catch (exception) {
    return { ok: false, error: handleException(exception) }
  }
}
export async function removeProduct(payload: {
  id: number
}): Promise<ServiceReturn<Product>> {
  try {
    const product = await db.product.delete({ where: { id: payload.id } })
    return { ok: true, data: product }
  } catch (exception) {
    return { ok: false, error: handleException(exception) }
  }
}

export async function listProducts() {
  try {
    const products = await db.product.findMany({
      orderBy: { name: "asc" },
      include: {
        category: true,
      },
    })
    return { ok: true, data: products }
  } catch (exception) {
    return { ok: false, error: handleException(exception) }
  }
}
