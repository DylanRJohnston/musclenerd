import { map } from "fp-ts/lib/Array"
import { flow } from "fp-ts/lib/function"
import { produce } from "immer"
import React, { useCallback } from "react"
import { DropResult } from "react-beautiful-dnd"

import { Program } from "../../../domain/program"
import { Table } from "../../layouts/ColumnDragDrop/Table"

import { Exercise } from "./Exercise"
import styles from "./Program.scss"

type Reducer<A> = (a: A) => A

const moveColumn = (result: DropResult): Reducer<Program> =>
  produce((state: Program) => {
    if (!result.destination) return

    const [column] = state.splice(result.source.index, 1)
    state.splice(result.destination?.index, 0, column)
  })

const moveCell = (result: DropResult): Reducer<Program> =>
  produce((state: Program) => {
    if (!result.destination) return

    const [item] =
      state[parseInt(result.source.droppableId, 10)].exercises.splice(result.source.index, 1) ?? []

    state[parseInt(result.destination.droppableId, 10)].exercises.splice(
      result.destination.index ?? 0,
      0,
      item,
    )
  })

const stateReducer = (result: DropResult): Reducer<Program> =>
  result.type === "column" ? moveColumn(result) : moveCell(result)

interface Props {
  program: Program
  updateProgram: (reducer: (program: Program) => Program) => void
}

const toTableContents: (program: Program) => JSX.Element[][] = flow(
  map(workout => workout.exercises),
  map(map(exercise => <Exercise {...exercise} />)),
)

const toHeaders: (program: Program) => JSX.Element[] = map(workout => (
  <div className={styles.title}>{workout.name}</div>
))

export const ProgramBuilder: React.FC<Props> = ({ program, updateProgram }) => {
  const onDragEnd = useCallback(flow(stateReducer, updateProgram), [updateProgram])

  return (
    <div className={styles.container}>
      <h1>Program</h1>
      <Table
        headers={toHeaders(program)}
        tableContents={toTableContents(program)}
        onDragEnd={onDragEnd}
      />
    </div>
  )
}
