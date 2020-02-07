import React from "react"

import { Exercise } from "../../../domain/exercise"
import { movements } from "../../../domain/movement"

import styles from "./Program.scss"

export interface Props {
  data: Exercise
}

export const ExerciseCard: React.FC<Props> = ({ data: { reps, sets, movement } }) => (
  <div className={styles.row}>
    <div className={styles.name}>{movements[movement].name}</div>
    <div className={styles.volume}>
      <span className={styles.span}>Reps: {reps}</span>
      <span className={styles.span}>Sets: {sets}</span>
    </div>
  </div>
)
