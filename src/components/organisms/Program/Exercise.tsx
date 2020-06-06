import React from "react"

import { movements, Movements } from "../../../domain/movement"

import styles from "./Program.scss"

interface Props {
  movement: Movements
  reps: number
  sets: number
}

export const ExerciseCard: React.FC<Props> = ({ movement, reps, sets }) => (
  <div className={styles.row}>
    <div className={styles.name}>{movements[movement].name}</div>
    <div className={styles.volume}>
      <span className={styles.span}>Reps: {reps}</span>
      <span className={styles.span}>Sets: {sets}</span>
    </div>
  </div>
)
