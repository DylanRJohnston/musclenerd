import { Exercise } from "./exercise"

export type Exercises = Exercise[]
export interface Workout {
  name: string
  exercises: Exercises
}
