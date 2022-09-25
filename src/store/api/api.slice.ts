import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Articles"],
  baseQuery: fakeBaseQuery(),
  endpoints() {
    return {}
  },
})
