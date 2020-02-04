import React from "react"

import { PageHeader } from "../../organisms/PageHeader"

import styles from "./LandingPage.scss"

interface Props {
  text: string
}

export const LandingPage: React.FC<Props> = ({ text }) => (
  <div className={styles.container}>
    <PageHeader title={text} />
  </div>
)
