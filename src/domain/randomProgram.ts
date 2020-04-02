import { Exercise } from "./exercise"
import { Program } from "./program"
import { Workout } from "./workout"

export const newBench = (): Exercise => ({
  movement: "benchPress",
  reps: Math.floor(Math.random() * 2) ? 5 : 10,
  sets: 5,
})

export const newBicepCurl = (): Exercise => ({
  movement: "preacherCurl",
  reps: Math.floor(Math.random() * 2) ? 8 : 15,
  sets: 4,
})

export const days = ["Mon", "Tue", "Wed", "Thu", "Fri"]

export const newWorkout = (num = 0): Workout => ({
  name: days[num],
  exercises: [...new Array(Math.floor(Math.random() * 5) + 2)].map(() =>
    Math.floor(Math.random() * 2) ? newBench() : newBicepCurl(),
  ),
})

export const randomProgram = (): Program => [...new Array(5)].map((_, i) => newWorkout(i))
