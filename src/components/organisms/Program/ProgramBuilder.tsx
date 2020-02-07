import { flow } from "fp-ts/lib/function"
import { produce } from "immer"
import React, { useCallback } from "react"
import { DropResult } from "react-beautiful-dnd"

import { movements } from "../../../domain/movement"
import { Program } from "../../../domain/program"
import { Table } from "../../layouts/ColumnDragDrop/Table"

import styles from "./Program.scss"

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
      state[parseInt(result.source.droppableId, 10)].exercises.splice(result.source.index, 1) ?? []

    state[parseInt(result.destination.droppableId, 10)].exercises.splice(
      result.destination?.index ?? 0,
      0,
      item,
    )
  })

const stateReducer = (result: DropResult): ((state: Program) => Program) =>
  result.type === "column" ? moveColumn(result) : moveRow(result)

interface Props {
  program: Program
  updateProgram: (reducer: (old: Program) => Program) => void
}

export const ProgramBuilder: React.FC<Props> = ({ program, updateProgram }) => {
  const onDragEnd = useCallback(flow(stateReducer, updateProgram), [updateProgram])

  return (
    <div className={styles.container}>
      <h1>Program</h1>
      <Table
        headers={program.map(it => (
          <div className={styles.title}>{it.name}</div>
        ))}
        data={program.map(it =>
          it.exercises.map(({ movement, reps, sets }) => (
            <div className={styles.row}>
              <div className={styles.name}>{movements[movement].name}</div>
              <div className={styles.volume}>
                <span className={styles.span}>Reps: {reps}</span>
                <span className={styles.span}>Sets: {sets}</span>
              </div>
            </div>
          )),
        )}
        onDragEnd={onDragEnd}
      />
    </div>
  )
}
