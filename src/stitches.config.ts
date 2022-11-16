import { createStitches } from "@stitches/react"

import {
  colors,
  fontSizes,
  fontWeights,
  fonts,
  radii,
  shadows,
  space,
} from "src/styles/theme/tokens"
import { media } from "src/styles/theme/breakpoints"
import {
  luckiestGuy,
  metropolis,
  luckiestGuyVar,
  metropolisVar,
} from "src/styles/theme/tokens/fonts"

export type Color = keyof typeof theme.colors

export const {
  styled,
  getCssText,
  theme,
  createTheme,
  keyframes,
  css,
  globalCss,
} = createStitches({
  theme: {
    colors,
    fonts,
    fontSizes,
    fontWeights,
    radii,
    space,
    shadows,
  },
  media,
  utils: {
    maxLine: (value: string | number) => ({
      lineClamp: typeof value === "number" ? String(value) : value,
      "-webkit-line-clamp": typeof value === "number" ? String(value) : value,
    }),
  },
})

export const fontsDeclaration = globalCss({
  ":root": {
    [luckiestGuyVar]: luckiestGuy.style.fontFamily,
    [metropolisVar]: metropolis.style.fontFamily,
  },
})
