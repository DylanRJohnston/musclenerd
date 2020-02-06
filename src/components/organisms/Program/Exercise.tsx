import React from "react"
import { Draggable } from "react-beautiful-dnd"

import styles from "./Program.scss"

export interface Exercise {
  id: string
  name: string
  muscle: string
  reps: number
  sets: number
}

export interface Props {
  exercise: Exercise
  index: number
}

export const Exercise = ({ exercise: { id, name, reps, sets }, index }: Props): JSX.Element => {
  return (
    <Draggable key={id} draggableId={id} index={index}>
      {rowDraggable => (
        <div
          className={styles.row}
          ref={rowDraggable.innerRef}
          {...rowDraggable.draggableProps}
          {...rowDraggable.dragHandleProps}
        >
          <div className={styles.name}>{name}</div>
          <div className={styles.volume}>
            <span className={styles.span}>Reps: {reps}</span>
            <span className={styles.span}>Sets: {sets}</span>
          </div>
        </div>
      )}
    </Draggable>
  )
}
