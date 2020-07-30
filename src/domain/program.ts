import { pipe } from "fp-ts/lib/pipeable"
import { get, mod } from "shades"

import * as array from "../lib/array"
import { Reducer } from "../lib/optics"

import { Exercise } from "./exercise"
import { Workout } from "./workout"

export type Program = Workout[]

export interface Move<A> {
  source: A
  destination: A
}

export interface Coordinate {
  column: number
  row: number
}

export const moveWorkout = ({ source, destination }: Move<number>) => (program: Program) =>
  pipe(program, array.deleteAt(source), array.insertAt(destination, program[source]))

export const moveExercise = ({ source, destination }: Move<Coordinate>) => (
  program: Program,
): Program => {
  const exercise = get(source.column, "exercises", source.row)(program)

  return pipe(
    program,
    mod(source.column, "exercises")(array.deleteAt(source.row)),
    mod(destination.column, "exercises")(array.insertAt(destination.row, exercise)),
  )
}

export const insertExercise = (exercise: Exercise, destination: Coordinate): Reducer<Program> =>
  mod(destination.column, "exercises")(array.insertAt(destination.row, exercise))

export const deleteExercise = (destination: Coordinate): Reducer<Program> =>
  mod(destination.column, "exercises")(array.deleteAt(destination.row))
