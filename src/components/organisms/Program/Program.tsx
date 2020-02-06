import { flow } from "fp-ts/lib/function"
import produce from "immer"
import React, { useCallback } from "react"
import { DragDropContext, Droppable, DropResult, DroppableProvided } from "react-beautiful-dnd"
import uuid from "uuid"

import styles from "./Program.scss"
import { Workout } from "./Workout"

export type Program = Workout[]

const moveColumn = (result: DropResult): ((state: Program) => Program) =>
  produce((state: Program) => {
    if (!result.destination) return

    const [column] = state.splice(result.source.index, 1)
    state.splice(result.destination?.index, 0, column)
  })

const moveRow = (result: DropResult): ((state: Program) => Program) =>
  produce((state: Program) => {
    if (!result.destination) return

    const [item] =
      state
        .find(it => it.id === result.source.droppableId)
        ?.exercises.splice(result.source.index, 1) ?? []

    state
      .find(it => it.id === result.destination?.droppableId)
      ?.exercises.splice(result.destination?.index ?? 0, 0, item)
  })

const stateReducer = (result: DropResult): ((state: Program) => Program) =>
  result.type === "column" ? moveColumn(result) : moveRow(result)

interface Props {
  program: Program
  updateProgram: (reducer: (old: Program) => Program) => void
}

export const Program: React.FC<Props> = ({ program, updateProgram }) => {
  const onDragEnd = useCallback(flow(stateReducer, updateProgram), [updateProgram])

  return (
    <div className={styles.container}>
      <h1>Program</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="sessions" type="column" direction="horizontal">
          {({ innerRef, droppableProps, placeholder }: DroppableProvided) => (
            <div className={styles.fuck}>
              <div className={styles.background}>
                {program.map((_, key) => (
                  <div key={key} className={styles.backgroundColumn} />
                ))}
              </div>
              <div ref={innerRef} {...droppableProps} className={styles.innerContainer}>
                {program.map((workout, index) => (
                  <Workout key={workout.id} workout={workout} index={index} />
                ))}
                {placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
