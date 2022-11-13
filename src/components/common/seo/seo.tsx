import Head from "next/head"
import { FC } from "react"

interface Props {
  title: string
  description?: string
}

const SEO: FC<Props> = ({ title, description }) => {
  return (
    <Head>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
    </Head>
  )
}

export default SEO
