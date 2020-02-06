import React from "react"
import { Draggable, Droppable } from "react-beautiful-dnd"

import { Exercise } from "./Exercise"
import styles from "./Program.scss"

export interface Workout {
  id: string
  name: string
  exercises: Exercise[]
}

export interface Props {
  workout: Workout
  index: number
}

export const Workout = ({ workout, index }: Props): JSX.Element => (
  <Draggable draggableId={workout.id} index={index}>
    {({ innerRef: workoutDragRef, draggableProps, dragHandleProps }) => (
      <Droppable droppableId={workout.id} type="row" direction="vertical">
        {({ innerRef: exerciseDropRef, droppableProps, placeholder }) => (
          <div
            ref={ref => (workoutDragRef(ref), exerciseDropRef(ref))}
            className={styles.column}
            {...draggableProps}
            {...dragHandleProps}
            {...droppableProps}
          >
            <div className={styles.title}>{workout.name}</div>
            {workout.exercises.map((exercise, index) => (
              <Exercise key={exercise.id} exercise={exercise} index={index} />
            ))}
            {placeholder}
          </div>
        )}
      </Droppable>
    )}
  </Draggable>
)
