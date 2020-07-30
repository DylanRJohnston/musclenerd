import { flow } from "fp-ts/lib/function"
import React from "react"

import { Movement } from "../../../domain/movement"
import { asNumber } from "../../../domain/onChange"
import { set, StatePair } from "../../../lib/useStatePair"

import styles from "./Program.scss"

interface Props {
  movement: Movement
  reps: StatePair<number>
  sets: StatePair<number>
}

export const ExerciseCard: React.FC<Props> = ({ movement, reps, sets }) => (
  <div className={styles.row}>
    <div className={styles.name}>{movement.name}</div>
    <div className={styles.volume}>
      <span className={styles.span}>
        Reps:{" "}
        <input
          className={styles.input}
          type="number"
          value={reps.state}
          min={1}
          max={99}
          onChange={flow(asNumber, set, reps.update)}
        />
      </span>
      <span className={styles.span}>
        Sets:{" "}
        <input
          className={styles.input}
          type="number"
          value={sets.state}
          min={1}
          max={99}
          onChange={flow(asNumber, set, sets.update)}
        />
      </span>
    </div>
  </div>
)
