import React from "react"
import NextDocument, { Head, Html, Main, NextScript } from "next/document"

import { getCssText } from "src/stitches.config"

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="fr">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#0091ff" />
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
