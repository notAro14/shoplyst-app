import { useIsFetching } from "@tanstack/react-query"

import Box from "src/components/common/box"
import { useLazyLoader, InlineLoader } from "src/components/common/loader"

export const GlobalLazyLoader = () => {
  const isFetching = useIsFetching()
  const show = useLazyLoader(isFetching > 0)
  return show ? (
    <Box
      css={{
        position: "fixed",
        bottom: 25,
        right: 25,
        zIndex: 1,
      }}
    >
      <InlineLoader />
    </Box>
  ) : null
}

export default GlobalLazyLoader
