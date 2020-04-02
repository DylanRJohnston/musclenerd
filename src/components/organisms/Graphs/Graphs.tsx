import React from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Program } from "../../../domain/program"
import { perDayVolume, perMuscleVolume, perRepRangeVolume } from "../../../domain/stats"

import styles from "./Graphs.scss"

interface Props {
  program: Program
}

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
      <BarChart data={perRepRangeVolume(program)}>
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
