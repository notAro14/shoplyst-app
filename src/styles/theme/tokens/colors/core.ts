import {
  slate,
  slateDark,
  whiteA,
  blackA,
  red,
  redDark,
  blue,
  blueDark,
  amber,
  amberDark,
} from "@radix-ui/colors"

type SEMANTIC =
  | "brand"
  | "gray"
  | "accent"
  | "danger"
  | "warning"
  | "black"
  | "white"
  | "accent"

const renameColors = (colors: Record<string, string>, key: SEMANTIC) =>
  Object.keys(colors).reduce((acc, k, idx) => {
    acc[`${key}${idx + 1}`] = colors[k]
    return acc
  }, {} as Record<string, string>)

const brandColor = renameColors(blue, "brand")
const brandDarkColor = renameColors(blueDark, "brand")
const grayColor = renameColors(slate, "gray")
const grayDarkColor = renameColors(slateDark, "gray")
const whiteColor = renameColors(whiteA, "white")
const blackColor = renameColors(blackA, "black")
const redColor = renameColors(red, "danger")
const redDarkColor = renameColors(redDark, "danger")
const yellowColor = renameColors(amber, "warning")
const yellowDarkColor = renameColors(amberDark, "warning")
const accentColor = renameColors(blue, "accent")
const accentDarkColor = renameColors(blueDark, "accent")

export const coreColors = {
  brand: brandColor,
  brandDark: brandDarkColor,
  gray: grayColor,
  grayDark: grayDarkColor,
  black: blackColor,
  white: whiteColor,
  danger: redColor,
  dangerDark: redDarkColor,
  warning: yellowColor,
  warningDark: yellowDarkColor,
  accent: accentColor,
  accentDark: accentDarkColor,
}
