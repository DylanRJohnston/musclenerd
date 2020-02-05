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
  reps: 5,
  sets: 5,
})

const newBicepCurl = (): Exercise => ({
  id: uuid(),
  muscle: "bicep",
  name: "Bicep Curl",
  reps: 15,
  sets: 4,
})

const newChestDay = (num?: number): Workout => ({
  id: uuid(),
  name: `Chest Day ${num || ""}`,
  exercises: [...new Array(Math.floor(Math.random() * 5) + 2)].map(() =>
    Math.floor(Math.random() * 2) ? newBench() : newBicepCurl(),
  ),
})

const initialProgram: Program = [...new Array(4)].map((_, i) => newChestDay(i + 1))

export const App: React.FC = () => {
  const [program, updateProgram] = useState<Program>(initialProgram)

  return (
    <Dashboard
      graphs={<Graphs program={program} />}
      program={<Program program={program} updateProgram={updateProgram} />}
    />
  )
}
