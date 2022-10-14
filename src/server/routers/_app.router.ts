//import { Context } from "../context"
import { t } from "../trpc"
import { categoryRouter } from "src/server/routers/category.router"
import { listRouter } from "src/server/routers/list"

export const appRouter = t.router({
  category: categoryRouter,
  list: listRouter,
})

export type AppRouter = typeof appRouter
