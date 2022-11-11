import * as trpcNext from "@trpc/server/adapters/next"

import router from "src/server/routers/_app.router"
import { createContext } from "src/server/context"

// export API handler
export default trpcNext.createNextApiHandler({
  router,
  createContext,
})
