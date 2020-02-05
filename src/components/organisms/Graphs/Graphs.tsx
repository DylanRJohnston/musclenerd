import React from "react"
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts"

import { Program } from "../Program"

interface Props {
  program: Program
}

interface Datum {
  name: string
  chest: number
  bicep: number
}

type Data = Datum[]

const toData = (program: Program): Data =>
  program.map(it => ({
    name: it.name,
    chest: it.exercises.filter(it => it.muscle === "chest").reduce((acc, x) => acc + x.sets, 0),
    bicep: it.exercises.filter(it => it.muscle === "bicep").reduce((acc, x) => acc + x.sets, 0),
  }))

export const Graphs: React.FC<Props> = ({ program }) => (
  <ResponsiveContainer width="100%" height={400}>
    <BarChart data={toData(program)}>
      <CartesianGrid />
      <XAxis dataKey="name" />
      <YAxis name="#Sets" />
      <Tooltip />
      <Legend />
      <Bar dataKey="chest" fill="#8884d8" />
      <Bar dataKey="bicep" fill="#82ca9d" />
    </BarChart>
  </ResponsiveContainer>
)
