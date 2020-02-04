import React from "react"

interface Props {
  text: string
}

export const Title: React.FC<Props> = ({ text }) => <h1>{text}</h1>
