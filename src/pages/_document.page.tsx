import React from "react"
import NextDocument, { Head, Html, Main, NextScript } from "next/document"

import { getCssText } from "src/stitches.config"

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="fr">
        <Head>
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
