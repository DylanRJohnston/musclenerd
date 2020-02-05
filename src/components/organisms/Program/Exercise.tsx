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
          <h3>{name}</h3>
          <span>Reps: {reps}</span>
          <span>Sets: {sets}</span>
        </div>
      )}
    </Draggable>
  )
}
