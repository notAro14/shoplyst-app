const systemSans =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI','Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans','Helvetica Neue', sans-serif"
const systemMono =
  "Menlo, Monaco, 'Lucida Console', 'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono','Courier New', monospace"
const METROPOLIS = '"Metropolis"'
const FUN = `"Luckiest Guy", ${systemSans}`

export const fonts = {
  metropolis: METROPOLIS,
  "fira-code": '"Fira Code"',
  "system-sans": systemSans,
  "system-mono": systemMono,
  sans: `${METROPOLIS}, ${systemSans}`,
  mono: systemMono,
  fun: `"Luckiest Guy", ${systemSans}`,

  primary: METROPOLIS,
  secondary: FUN,
}
