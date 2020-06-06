import React from "react"

import { randomProgram } from "../../domain/randomProgram"
import { useStatePair } from "../../lib/useStatePair"
import { Dashboard } from "../layouts/Dashboard"
import { Graphs } from "../organisms/Graphs"
import { ProgramBuilder } from "../organisms/Program"

export const App: React.FC = () => {
  const programState = useStatePair(randomProgram())

  return (
    <Dashboard
      graphs={<Graphs program={programState.state} />}
      program={<ProgramBuilder {...programState} />}
    />
  )
}
