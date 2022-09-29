import { t } from "../trpc"
import { categoryRouter } from "./category.router"

export const appRouter = t.router({
  category: categoryRouter,
})

export type AppRouter = typeof appRouter
