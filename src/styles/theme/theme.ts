import { createTheme } from "src/stitches.config"
import { darkColors, lightColors } from "src/styles/theme/tokens/colors"

const lightTheme = createTheme("light", {
  colors: { ...lightColors, bg: "var(--colors-white1)" },
})

const darkTheme = createTheme("dark", {
  colors: {
    ...darkColors,
    "border-gray": "var(--colors-brand3)",
  },
})

export const THEMES = {
  light: lightTheme.className,
  dark: darkTheme.className,
}
