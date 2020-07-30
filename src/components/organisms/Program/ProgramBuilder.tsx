import { flow } from "fp-ts/lib/function"
import React, { useCallback } from "react"
import { DragDropContext } from "react-beautiful-dnd"

import { stateReducer, toDropEvent } from "../../../domain/dropEvent"
import { Program } from "../../../domain/program"
import { StatePair } from "../../../lib/useStatePair"
import { ExerciseRow } from "../ExerciseRow/ExerciseRow"
import { ProgramTable } from "../ProgramTable/ProgramTable"

import styles from "./Program.scss"

type Props = StatePair<Program>

export const ProgramBuilder: React.FC<Props> = ({ state: program, update }) => {
  const onDragEnd = useCallback(flow(toDropEvent, stateReducer, update), [update])

  return (
    <div className={styles.container}>
      <DragDropContext onDragEnd={onDragEnd}>
        <h1>Program</h1>
        <ProgramTable state={program} update={update} />
        <h1>Exercises</h1>
        <ExerciseRow />
      </DragDropContext>
    </div>
  )
}
