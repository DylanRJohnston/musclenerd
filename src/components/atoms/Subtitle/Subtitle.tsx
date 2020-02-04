import React from "react"

interface Props {
  text: string
}

export const Subtitle: React.FC<Props> = ({ text }) => <p>{text}</p>
