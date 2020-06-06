import { deleteAt, map } from "fp-ts/lib/Array"
import { reader } from "fp-ts/lib/Reader"
import { flow, identity } from "fp-ts/lib/function"
import { pipe } from "fp-ts/lib/pipeable"
import React, { useCallback } from "react"
import { DropResult } from "react-beautiful-dnd"
import { mod } from "shades"

import { Exercise } from "../../../domain/exercise"
import { Program } from "../../../domain/program"
import * as array from "../../../lib/array"
import { Table } from "../../layouts/ColumnDragDrop/Table"

import { ExerciseCard } from "./Exercise"
import styles from "./Program.scss"

type Reducer<A> = (a: A) => A

const moveColumn = ({ destination, source }: DropResult): Reducer<Program> =>
  destination ? array.move(source.index, destination.index) : identity

interface Arguments {
  sourceColumn: number
  destinationColumn: number
  sourceRow: number
  destinationRow: number
}

const moveCell_ = ({
  sourceColumn,
  destinationColumn,
  sourceRow,
  destinationRow,
}: Arguments): Reducer<Program> => program =>
  pipe(
    program,
    mod(sourceColumn, "exercises")<Exercise[]>(array.deleteAt(sourceRow)),
    mod(
      destinationColumn,
      "exercises",
    )<Exercise[]>(array.insertAt(destinationRow, program[sourceColumn].exercises[sourceRow])),
  )

const liftIntoDropResult = <A,>(reducer: (arg: Arguments) => Reducer<A>) => ({
  source,
  destination,
}: DropResult): Reducer<A> =>
  destination
    ? reducer({
        sourceColumn: parseInt(source.droppableId, 10),
        destinationColumn: parseInt(destination.droppableId, 10),
        sourceRow: source.index,
        destinationRow: destination.index,
      })
    : identity

const moveCell = liftIntoDropResult(moveCell_)

const stateReducer = (result: DropResult): Reducer<Program> =>
  result.type === "column" ? moveColumn(result) : moveCell(result)

interface StatePair<S> {
  state: S
  update: (reducer: Reducer<S>) => void
}

type Props = StatePair<Program>

const toTableContents: (program: Program) => JSX.Element[][] = flow(
  map(workout => workout.exercises),
  map(map(exercise => <ExerciseCard {...exercise} />)),
)

const toHeaders: (program: Program) => JSX.Element[] = map(workout => (
  <div className={styles.title}>{workout.name}</div>
))

export const ProgramBuilder: React.FC<Props> = ({ state: program, update: updateProgram }) => {
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
