import { Article } from "@prisma/client"

import api from "src/api"

export const URLS = {
  fetchArticles: "/api/articles",
}

export async function fetchArticles() {
  const response = await api.get<Article[]>(URLS.fetchArticles)
  return response.data
}
