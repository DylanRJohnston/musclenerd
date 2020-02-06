import { chain, map, reduce, array } from "fp-ts/lib/Array"
import { Monoid } from "fp-ts/lib/Monoid"
import { fromFoldable, collect } from "fp-ts/lib/Record"
import { semigroupSum as add } from "fp-ts/lib/Semigroup"
import { pipe } from "fp-ts/lib/pipeable"
import React from "react"
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Text,
  Label,
  BarChart,
  Bar,
} from "recharts"

import { Program } from "../Program"
import { Exercise } from "../Program/Exercise"

import styles from "./Graphs.scss"

interface Props {
  program: Program
}

interface PerDayVolume {
  name: string
  chest: number
  bicep: number
}

const perDayVolume = (program: Program): PerDayVolume[] =>
  program.map(it => ({
    name: it.name,
    chest: it.exercises.filter(it => it.muscle === "chest").reduce((acc, x) => acc + x.sets, 0),
    bicep: it.exercises.filter(it => it.muscle === "bicep").reduce((acc, x) => acc + x.sets, 0),
  }))

interface PerMuscleVolume {
  muscle: string
  volume: number
}

const tuple = <T extends unknown[]>(...args: T): T => args

const perMuscleVolume = (program: Program): PerMuscleVolume[] =>
  pipe(
    program,
    chain(it => it.exercises),
    map(it => tuple(it.muscle, it.sets)),
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

const toRepRange = ({ reps, sets }: Exercise): RepRange =>
  reps < 6
    ? { low: sets, medium: 0, high: 0 }
    : reps < 13
    ? { low: 0, medium: sets, high: 0 }
    : { low: 0, medium: 0, high: sets }

const foobar = (program: Program): RepRange[] =>
  pipe(
    program,
    chain(it => it.exercises),
    map(it => tuple(it.name, toRepRange(it))),
    fromFoldable(repRange, array),
    collect((muscle, repRange) => ({ muscle, ...repRange })),
  )

export const Graphs: React.FC<Props> = ({ program }) => (
  <div className={styles.container}>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={perDayVolume(program)}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis name="#Sets" />
        <Tooltip />
        <Legend />
        <Bar dataKey="chest" fill="#3576B6" color="#3576B6" />
        <Bar dataKey="bicep" fill="#F37F00" color="#F37F00" />
      </BarChart>
    </ResponsiveContainer>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={perMuscleVolume(program)}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="muscle" />
        <YAxis name="#Sets" />
        <Tooltip />
        <Legend />
        <Bar dataKey="volume" fill="#3576B6" />
      </BarChart>
    </ResponsiveContainer>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={foobar(program)}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="muscle" />
        <YAxis name="#Sets" />
        <Tooltip />
        <Legend />
        <Bar dataKey="low" fill="#3576B6" />
        <Bar dataKey="medium" fill="#2FA221" />
        <Bar dataKey="high" fill="#F37F00" />
      </BarChart>
    </ResponsiveContainer>
  </div>
)
