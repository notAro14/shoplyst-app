import { t } from "../trpc"
import category from "src/server/routers/category.router"
import list from "src/server/routers/list"
import product from "src/server/routers/product"

const appRouter = t.router({
  category,
  list,
  product,
})

export default appRouter
export type AppRouter = typeof appRouter
