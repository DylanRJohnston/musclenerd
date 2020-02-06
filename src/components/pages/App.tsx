import React, { useState } from "react"
import uuid from "uuid"

import { Dashboard } from "../layouts/Dashboard"
import { Graphs } from "../organisms/Graphs"
import { Program } from "../organisms/Program"
import { Exercise } from "../organisms/Program/Exercise"
import { Workout } from "../organisms/Program/Workout"

const newBench = (): Exercise => ({
  id: uuid(),
  muscle: "chest",
  name: "Bench Press",
  reps: Math.floor(Math.random() * 2) ? 5 : 10,
  sets: 5,
})

const newBicepCurl = (): Exercise => ({
  id: uuid(),
  muscle: "bicep",
  name: "Bicep Curl",
  reps: Math.floor(Math.random() * 2) ? 8 : 15,
  sets: 4,
})

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"]

const newChestDay = (num = 0): Workout => ({
  id: uuid(),
  name: days[num],
  exercises: [...new Array(Math.floor(Math.random() * 5) + 2)].map(() =>
    Math.floor(Math.random() * 2) ? newBench() : newBicepCurl(),
  ),
})

const initialProgram: Program = [...new Array(5)].map((_, i) => newChestDay(i))

export const App: React.FC = () => {
  const [program, updateProgram] = useState<Program>(initialProgram)

  return (
    <Dashboard
      graphs={<Graphs program={program} />}
      program={<Program program={program} updateProgram={updateProgram} />}
    />
  )
}
