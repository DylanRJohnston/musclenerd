import React from "react"
import { Draggable, Droppable, DraggableProvided } from "react-beautiful-dnd"

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
    {({ innerRef: workoutDragRef, draggableProps, dragHandleProps }: DraggableProvided) => (
      <Droppable droppableId={workout.id} type="row" direction="vertical">
        {({ innerRef: exerciseDropRef, droppableProps, placeholder }) => (
          <div
            ref={ref => (workoutDragRef(ref), exerciseDropRef(ref))}
            className={styles.column}
            {...draggableProps}
            {...dragHandleProps}
            {...droppableProps}
          >
            <h2>{workout.name}</h2>
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
