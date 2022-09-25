import type { FC } from "react"

import styles from "./google-btn.module.scss"

const GoogleButton: FC<{ onClick(): void }> = ({ onClick }) => {
  return (
    <button className={styles.root} onClick={onClick}>
      Se connecter avec Google
    </button>
  )
}

export default GoogleButton
