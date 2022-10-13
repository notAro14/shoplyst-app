//import { Context } from "../context"
import { t } from "../trpc"
import { categoryRouter } from "./category.router"
import { listRouter } from "./list.router"

export const appRouter = t.router({
  category: categoryRouter,
  list: listRouter,
})

export type AppRouter = typeof appRouter
