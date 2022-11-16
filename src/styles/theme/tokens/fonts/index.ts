import { Luckiest_Guy } from "@next/font/google"
import localFont from "@next/font/local"

export const luckiestGuy = Luckiest_Guy({
  subsets: ["latin"],
  weight: "400",
})
export const metropolis = localFont({
  src: [
    { path: "./metropolis/metropolis.thin.otf", weight: "100" },
    { path: "./metropolis/metropolis.extra-light.otf", weight: "200" },
    { path: "./metropolis/metropolis.light.otf", weight: "300" },
    { path: "./metropolis/metropolis.regular.otf", weight: "400" },
    { path: "./metropolis/metropolis.medium.otf", weight: "500" },
    { path: "./metropolis/metropolis.semi-bold.otf", weight: "600" },
    { path: "./metropolis/metropolis.bold.otf", weight: "700" },
    { path: "./metropolis/metropolis.extra-bold.otf", weight: "800" },
    { path: "./metropolis/metropolis.black.otf", weight: "900" },
  ],
})

export const luckiestGuyVar = "--luckiest-guy-font"
export const metropolisVar = " --metropolis-font"

const systemSans =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI','Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans','Helvetica Neue', sans-serif"
// const systemMono =
//   "Menlo, Monaco, 'Lucida Console', 'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono','Courier New', monospace"

export const fonts = {
  primary: `var(${metropolisVar}), ${systemSans}`,
  secondary: `var(${luckiestGuyVar}), cursive`,
}
