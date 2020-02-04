import React from "react"

import { Subtitle } from "../../atoms/Subtitle/Subtitle"
import { Title } from "../../atoms/Title"

export interface Props {
  title: string
  subtitle?: string
}

export const Header: React.FC<Props> = ({ title, subtitle }) => (
  <div>
    <Title text={title} />
    {subtitle && <Subtitle text={subtitle} />}
  </div>
)
