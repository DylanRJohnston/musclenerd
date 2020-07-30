import { flow } from "fp-ts/lib/function"
import { pipe } from "fp-ts/lib/pipeable"
import React from "react"

import { Program } from "../../../domain/program"
import { fromProp } from "../../../lib/optics"
import { spy } from "../../../lib/spy"
import { focus, map, StatePair } from "../../../lib/useStatePair"
import { DragDropTable } from "../../layouts/DragDropTable"
import { ExerciseCard } from "../Program/ExerciseCard"
import styles from "../Program/Program.scss"

export type Props = StatePair<Program>

const toHeaders = (program: Program): JSX.Element[] =>
  program.map(workout => <div className={styles.title}>{workout.name}</div>)

const toTableContents: (pair: StatePair<Program>) => JSX.Element[][] = map(
  flow(
    focus(fromProp("exercises")),
    map(pair => (
      <ExerciseCard
        movement={pair.state.movement}
        reps={pipe(pair, focus(fromProp("reps")))}
        sets={pipe(pair, focus(fromProp("sets")))}
      />
    )),
  ),
)

// const toTableContents: (pair: StatePair<Program>) => JSX.Element[][] =

export const ProgramTable: React.FC<Props> = ({ state: program, update }) => (
  <DragDropTable
    headers={toHeaders(program)}
    tableContents={toTableContents({ state: program, update: spy(update) })}
  />
)
