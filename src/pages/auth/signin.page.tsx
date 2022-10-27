import { signIn } from "next-auth/react"
import { useRouter } from "next/router"

import GoogleButton from "src/components/common/google-btn"
import GithubButton from "src/components/common/github-btn"
import Flex from "src/components/common/flex"
import Heading from "src/components/common/heading"
import SEO from "src/components/common/seo"
import ToggleTheme from "src/components/common/toggle-theme"
import { styled, theme } from "src/stitches.config"
import type { NextPageWithLayout } from "src/types/next"

const SignIn: NextPageWithLayout = () => {
  const { callbackUrl } = useRouter().query as {
    callbackUrl?: string
  }

  return (
    <>
      <SEO title="Shoplyst | Se connecter" />
      <Flex direction="column" gap="2xl">
        <Heading
          variant="h1"
          vibrant
          css={{
            textAlign: "center",
          }}
        >
          Shoplyst
        </Heading>
        <ToggleTheme
          css={{
            position: "absolute",
            top: 15,
            right: 15,
          }}
        />
        <Flex direction="column" gap="xl">
          <GithubButton onClick={() => signIn("github", { callbackUrl })} />
          <GoogleButton onClick={() => signIn("google", { callbackUrl })} />
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
