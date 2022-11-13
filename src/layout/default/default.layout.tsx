import { FC, Fragment, ReactNode } from "react"
import Footer from "src/components/footer"
import { GlobalLazyLoader } from "src/components/common/loader"
import Header from "src/components/header"
import Spacer from "src/components/common/spacer"
import * as styles from "./styles"

interface Props {
  children: ReactNode
}
export const MainLayout: FC<Props> = ({ children }) => {
  return (
    <Fragment>
      <GlobalLazyLoader />
      <section className={styles.section}>
        <Header />
        <Spacer size="sm" />
        <main className={styles.main}>{children}</main>
        <Footer />
      </section>
    </Fragment>
  )
}

export default MainLayout
