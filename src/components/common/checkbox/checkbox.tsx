import React, { FC } from "react"
import { Root, Indicator } from "@radix-ui/react-checkbox"

import { CheckIcon } from "src/components/common/icons"
import Flex from "src/components/common/flex"
import * as styles from "./styles"

const Checkbox: FC<{
  label: string
  name: string
  id?: string
  checked?: boolean
  onChange?: (checkedState: boolean) => void
  readOnly?: boolean
}> = ({ label, name, checked, onChange, id, readOnly = false }) => (
  <Flex align="center" gap="md">
    <Root
      className={styles.root({ readOnly })}
      name={name}
      checked={checked}
      onCheckedChange={onChange}
      id={id || name}
    >
      <Indicator className={styles.indicator}>
        <CheckIcon />
      </Indicator>
    </Root>
    <label className={styles.label({ readOnly })} htmlFor={id || name}>
      {label}
    </label>
  </Flex>
)

export default Checkbox
