import { render } from "@testing-library/react"
import { Provider } from "react-redux"

import Index from "src/pages/index.page"
import { store } from "src/store"

test("Index page renders without throwing", () => {
  expect(() => {
    render(
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }).not.toThrow()
})
