import { signIn } from "next-auth/react"
import { useRouter } from "next/router"

import Button from "src/components/common/button"
import Flex from "src/components/common/flex"
import Heading from "src/components/common/heading"
import SEO from "src/components/common/seo"
import ToggleTheme from "src/components/common/toggle-theme"
import { styled, theme } from "src/styles/theme/stitches.config"
import type { NextPageWithLayout } from "src/types/next"

const SignIn: NextPageWithLayout = () => {
  const { callbackUrl } = useRouter().query as {
    callbackUrl?: string
  }

  return (
    <>
      <SEO title="Sign In" />
      <Flex
        direction="column"
        gap="2xl"
        css={{
          borderRadius: theme.radii.lg,
          padding: theme.space.xl,
          border: "1px solid",
          borderColor: theme.colors["border-gray"],
          boxShadow: theme.shadows.low,
        }}
      >
        <Heading
          variant="h1"
          vibrant
          css={{
            textAlign: "center",
          }}
        >
          Shoply
        </Heading>
        <ToggleTheme
          css={{
            position: "absolute",
            top: 15,
            right: 15,
          }}
        />
        <Flex direction="column" gap="xl">
          <Button
            variant="outlined"
            colorScheme="accent"
            fullWidth
            onClick={() => signIn("github", { callbackUrl })}
          >
            Sign in with Github
          </Button>
        </Flex>
      </Flex>
    </>
  )
}

const Layout = styled("section", {
  display: "grid",
  placeItems: "center",
  minHeight: "100%",
  backgroundColor: theme.colors.bg,
})
SignIn.getLayout = (page) => <Layout>{page}</Layout>

export default SignIn
