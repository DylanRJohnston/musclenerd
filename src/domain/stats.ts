import { array, chain as flatMap, map } from "fp-ts/lib/Array"
import { Monoid } from "fp-ts/lib/Monoid"
import { collect, fromFoldable } from "fp-ts/lib/Record"
import { semigroupSum as add } from "fp-ts/lib/Semigroup"
import { pipe } from "fp-ts/lib/pipeable"

import { Exercise } from "./exercise"
import { Program } from "./program"
import { Workout } from "./workout"

interface PerDayVolume {
  name: string
  chest: number
  bicep: number
}

export const perDayVolume = (program: Program): PerDayVolume[] =>
  program.map(it => ({
    name: it.name,
    chest: it.exercises.filter(it => it.movement.muscles.chest).reduce((acc, x) => acc + x.sets, 0),
    bicep: it.exercises
      .filter(it => it.movement.muscles.biceps)
      .reduce((acc, x) => acc + x.sets, 0),
  }))

interface PerMuscleVolume {
  muscle: string
  volume: number
}

const tuple = <T extends unknown[]>(...args: T): T => args

const toMuscleVolume = (it: Exercise): [string, number] => [
  Object.keys(it.movement.muscles)[0],
  it.sets,
]

const getExercises = (it: Workout): Exercise[] => it.exercises

export const perMuscleVolume = (program: Program): PerMuscleVolume[] =>
  pipe(
    program,
    flatMap(getExercises),
    map(toMuscleVolume),
    fromFoldable(add, array),
    collect((muscle, volume) => ({ muscle, volume })),
  )

interface RepRange {
  muscle?: string
  low: number
  medium: number
  high: number
}

const repRange: Monoid<RepRange> = {
  concat: (a, b) => ({ low: a.low + b.low, medium: a.medium + b.medium, high: a.high + b.high }),
  empty: { low: 0, medium: 0, high: 0 },
}

const toRepRange = ({ reps, sets }: Exercise): RepRange => {
  switch (true) {
    case reps > 12:
      return { low: 0, medium: 0, high: sets }
    case reps > 5:
      return { low: 0, medium: sets, high: 0 }
    default:
      return { low: sets, medium: 0, high: 0 }
  }
}

export const perRepRangeVolume = (program: Program): RepRange[] =>
  pipe(
    program,
    flatMap(getExercises),
    map(it => tuple(Object.keys(it.movement.muscles)[0], toRepRange(it))),
    fromFoldable(repRange, array),
    collect((muscle, repRange) => ({ muscle, ...repRange })),
  )
