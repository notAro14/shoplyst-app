import { useSession, signIn } from "next-auth/react"
import NextLink from "next/link"

import { StyledHeader, StyledNav } from "./header.styles"
import Flex from "src/components/common/flex"
import Button from "src/components/common/button"
import { LazyLoader } from "src/components/common/loader"
import * as Avatar from "src/components/common/avatar"
import Link from "src/components/common/link"
import Text from "src/components/common/text/text"
import { theme } from "src/styles/theme/stitches.config"

const Auth = () => {
  const { data: session, status } = useSession()
  switch (status) {
    case "loading":
      return <LazyLoader show />

    case "unauthenticated":
      return (
        <Button size="small" colorScheme="accent" onClick={() => signIn()}>
          Sign In
        </Button>
      )
    case "authenticated":
      return (
        <Flex align="center" gap="xs">
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
          {/*<Button
            size="small"
            colorScheme="danger"
            variant="outlined"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign out
          </Button>*/}
        </Flex>
      )
  }
}

const Header = () => {
  return (
    <StyledHeader>
      <StyledNav>
        <Flex align="baseline" direction="column">
          <NextLink href="/" passHref>
            <Link
              css={{
                fontFamily: theme.fonts.metropolis,
                fontWeight: theme.fontWeights["extra-light"],
                letterSpacing: 10,
                color: theme.colors.solid,
                fontSize: theme.fontSizes.lg,
              }}
              variant="navlink"
            >
              Shoply
            </Link>
          </NextLink>
          <Text as="small" color="functional-low" paragraph fontSize="xs">
            Do your shopping with style
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
