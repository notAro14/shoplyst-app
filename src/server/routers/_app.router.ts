import { t } from "../trpc"
import category from "src/server/routers/category.router"
import list from "src/server/routers/list"
import product from "src/server/routers/product"
import user from "src/server/routers/user"

const appRouter = t.router({
  category,
  list,
  product,
  user,
})

export default appRouter
export type AppRouter = typeof appRouter
