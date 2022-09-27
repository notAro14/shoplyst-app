import { Category, Product } from "@prisma/client"

import api from "src/api"

export const URLS = {
  fetchCategoriesAndProducts: "/api/categories",
}

interface CategoryAndProduct extends Category {
  products: Product[]
}

export async function fetchCategoriesAndProducts() {
  const response = await api.get<CategoryAndProduct[]>(
    URLS.fetchCategoriesAndProducts
  )
  return response.data
}
