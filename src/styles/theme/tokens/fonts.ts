const systemSans =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI','Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans','Helvetica Neue', sans-serif"
const systemMono =
  "Menlo, Monaco, 'Lucida Console', 'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono','Courier New', monospace"
const metropolis = '"Metropolis"'

export const fonts = {
  metropolis,
  "fira-code": '"Fira Code"',
  "system-sans": systemSans,
  "system-mono": systemMono,
  sans: `${metropolis}, ${systemSans}`,
  mono: systemMono,
}
