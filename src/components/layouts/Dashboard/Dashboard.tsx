import React from "react"

import styles from "./Dashboard.scss"

interface Props {
  graphs: React.ReactChild
  program: React.ReactChild
}

export const Dashboard: React.FC<Props> = ({ graphs, program }) => (
  <div className={styles.outerContainer}>
    <div className={styles.innerContainer}>
      <h1>Charts Yo</h1>
      <div className={styles.graphs}>{graphs}</div>
      <div className={styles.program}>{program}</div>
    </div>
  </div>
)
