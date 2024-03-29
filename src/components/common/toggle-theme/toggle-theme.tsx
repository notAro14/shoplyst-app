import { FC } from "react"
import { MoonIcon, SunIcon } from "src/components/common/icons"
import type { CSS } from "@stitches/react"

import IconButton from "src/components/common/icon-button"
import useThemeSwitcher from "src/hooks/use-theme-switcher"
import { useIsBrowser } from "src/hooks/use-is-browser"

const ToggleTheme: FC<{ css?: CSS }> = ({ css }) => {
  const { switchTheme, resolvedTheme } = useThemeSwitcher()
  const isBrowser = useIsBrowser()
  if (isBrowser === false) return null

  return (
    <IconButton variant="ghost" rounded onClick={switchTheme} css={css}>
      {resolvedTheme === "light" && <SunIcon />}
      {resolvedTheme === "dark" && <MoonIcon />}
    </IconButton>
  )
}

export default ToggleTheme
