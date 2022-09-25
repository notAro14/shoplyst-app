import { Product } from "@prisma/client"

import api from "src/api"

export const URLS = {
  fetchProducts: "/api/product",
}

export async function fetchProducts() {
  const response = await api.get<Product[]>(URLS.fetchProducts)
  return response.data
}
