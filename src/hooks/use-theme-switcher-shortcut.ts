import { useHotkeys } from "@mantine/hooks"

import useThemeSwitcher from "src/hooks/use-theme-switcher"

export const useThemeSwitcherShortcut = (keys?: string) => {
  const { switchTheme } = useThemeSwitcher()
  useHotkeys([[keys ?? "mod+J", switchTheme]])
}
