import React, { useState } from "react"

import { randomProgram } from "../../domain/randomProgram"
import { Dashboard } from "../layouts/Dashboard"
import { Graphs } from "../organisms/Graphs"
import { ProgramBuilder } from "../organisms/Program"

export const App: React.FC = () => {
  const [program, updateProgram] = useState(randomProgram())

  return (
    <Dashboard
      graphs={<Graphs program={program} />}
      program={<ProgramBuilder program={program} updateProgram={updateProgram} />}
    />
  )
}
