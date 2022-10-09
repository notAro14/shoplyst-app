import { useSession, signIn, signOut } from "next-auth/react"
import NextLink from "next/link"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { DotFilledIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

import { useIsBrowser } from "src/hooks/use-is-browser"
import { StyledHeader, StyledNav } from "./header.styles"
import Flex from "src/components/common/flex"
import Button from "src/components/common/button"
import { LazyLoader } from "src/components/common/loader"
import * as Avatar from "src/components/common/avatar"
import Link from "src/components/common/link"
import Text from "src/components/common/text/text"
import { styled, theme, css } from "src/styles/theme/stitches.config"
import { useThemeSwitcherShortcut } from "src/hooks/use-theme-switcher-shortcut"

const itemStyles = {
  all: "unset",
  position: "relative",
  userSelect: "none",
  height: 25,
  display: "flex",
  alignItems: "center",
  fontWeight: theme.fontWeights["extra-light"],
  fontSize: theme.fontSizes.sm,
  color: theme.colors["text-functional"],
  paddingLeft: theme.space.md,

  "&[data-highlighted]": {
    backgroundColor: theme.colors.ui,
  },
  variants: {
    colorScheme: {
      danger: {
        color: theme.colors["text-danger-low"],
        "&[data-highlighted]": {
          backgroundColor: theme.colors["ui-danger"],
          color: theme.colors["text-danger-low"],
        },
      },
    },
  },
}

const StyledSeparator = styled(DropdownMenu.Separator, {
  height: 1,
  backgroundColor: theme.colors["border-gray"],
  marginTop: theme.space.xxs,
  marginBottom: theme.space.xxs,
})
const StyledLabel = styled(DropdownMenu.Label, {
  color: theme.colors["text-functional-low"],
  lineHeight: 1.25,
  paddingLeft: theme.space.md,
  fontSize: theme.fontSizes.sm,
  fontWeight: theme.fontWeights.thin,
  margin: `${theme.space.xxs} 0`,
})
const StyledRadioGroup = styled(DropdownMenu.DropdownMenuRadioGroup, {})
const StyledRadioItem = styled(DropdownMenu.DropdownMenuRadioItem, {
  ...itemStyles,
})
const StyledMenuItemIndicator = styled(DropdownMenu.ItemIndicator, {
  position: "absolute",
  left: 0,
  width: theme.space.md,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
})
const StyledContent = styled(DropdownMenu.Content, {
  padding: theme.space.xxs,
  backgroundColor: theme.colors["bg-alt"],
  borderRadius: theme.radii.sm,
  boxShadow: theme.shadows.medium,
  border: "1px solid",
  borderColor: theme.colors["border-gray"],
  fontFamily: theme.fonts.sans,
  minWidth: 110,
  "@sm": {
    minWidth: 150,
  },
})
const StyledItem = styled(DropdownMenu.Item, {
  ...itemStyles,
})

const Auth = () => {
  const { data: session, status } = useSession()
  const isBrowser = useIsBrowser()
  const { resolvedTheme, setTheme } = useTheme()
  if (isBrowser === false) return null

  switch (status) {
    case "loading":
      return <LazyLoader show />

    case "unauthenticated":
      return (
        <Button size="small" colorScheme="accent" onClick={() => signIn()}>
          Se connecter
        </Button>
      )
    case "authenticated":
      return (
        <Flex align="center" gap="xs">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Avatar.Root size="sm" rounded withInsetShadow>
                <Avatar.Image
                  src={session.user?.image as string | undefined}
                  alt={session.user?.name as string | undefined}
                />
                <Avatar.Fallback
                  css={{
                    textTransform: "uppercase",
                  }}
                  delayMs={500}
                >
                  {session.user?.name?.charAt(0)}
                </Avatar.Fallback>
              </Avatar.Root>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <StyledContent sideOffset={5}>
                <StyledRadioGroup
                  value={resolvedTheme}
                  onValueChange={setTheme}
                >
                  <StyledLabel
                    css={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: theme.space.xxs,
                    }}
                  >
                    <span>Apparence</span>
                    <span>-</span>
                    <kbd
                      className={css({
                        fontSize: theme.fontSizes.xs,
                        textTransform: "uppercase",
                        fontFamily: theme.fonts.mono,
                      }).toString()}
                    >
                      cmd+j
                    </kbd>
                  </StyledLabel>
                  <StyledRadioItem value="light">
                    <StyledMenuItemIndicator>
                      <DotFilledIcon />
                    </StyledMenuItemIndicator>
                    Clair
                  </StyledRadioItem>
                  <StyledRadioItem value="dark">
                    <StyledMenuItemIndicator>
                      <DotFilledIcon />
                    </StyledMenuItemIndicator>
                    Sombre
                  </StyledRadioItem>
                </StyledRadioGroup>
                <StyledSeparator />
                <StyledLabel>
                  {session.user?.name ?? session.user?.email}
                </StyledLabel>
                <StyledItem colorScheme="danger" onSelect={() => signOut()}>
                  Se déconnecter
                </StyledItem>
              </StyledContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </Flex>
      )
  }
}

const Header = () => {
  useThemeSwitcherShortcut()
  return (
    <StyledHeader>
      <StyledNav>
        <Flex align="baseline" direction="column">
          <NextLink href="/" passHref>
            <Link
              css={{
                letterSpacing: 7,
                color: theme.colors["solid-accent"],
                fontSize: theme.fontSizes.lg,
                fontWeight: theme.fontWeights.medium,
              }}
              variant="navlink"
            >
              Shoplyst
            </Link>
          </NextLink>
          <Text
            as="small"
            color="functional-low"
            paragraph
            fontSize="sm"
            css={{
              fontWeight: theme.fontWeights["extra-light"],
            }}
          >
            Fais tes courses avec style
          </Text>
        </Flex>
        <Flex align="center" gap="sm">
          <Auth />
        </Flex>
      </StyledNav>
    </StyledHeader>
  )
}

export default Header
