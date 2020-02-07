import React, { useState } from "react"
import uuid from "uuid"

import { ExerciseInstance } from "../../domain/exercise"
import { ProgramInstance } from "../../domain/program"
import { WorkoutInstance } from "../../domain/workout"
import { Dashboard } from "../layouts/Dashboard"
import { Graphs } from "../organisms/Graphs"
import { ProgramBuilder } from "../organisms/Program"

const newBench = (): ExerciseInstance => ({
  id: uuid(),
  movement: "benchPress",
  reps: Math.floor(Math.random() * 2) ? 5 : 10,
  sets: 5,
})

const newBicepCurl = (): ExerciseInstance => ({
  id: uuid(),
  movement: "preacherCurl",
  reps: Math.floor(Math.random() * 2) ? 8 : 15,
  sets: 4,
})

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"]

const newWorkout = (num = 0): WorkoutInstance => ({
  id: uuid(),
  name: days[num],
  exercises: [...new Array(Math.floor(Math.random() * 5) + 2)].map(() =>
    Math.floor(Math.random() * 2) ? newBench() : newBicepCurl(),
  ),
})

const initialProgram: ProgramInstance = [...new Array(5)].map((_, i) => newWorkout(i))

export const App: React.FC = () => {
  const [program, updateProgram] = useState<ProgramInstance>(initialProgram)

  return (
    <Dashboard
      graphs={<Graphs program={program} />}
      program={<ProgramBuilder program={program} updateProgram={updateProgram} />}
    />
  )
}
