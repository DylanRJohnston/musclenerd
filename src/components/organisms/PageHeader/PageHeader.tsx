import React from "react"

import { Header, Props as HeaderProps } from "../../molecules/Header"

type Props = HeaderProps

export const PageHeader: React.FC<Props> = ({ title, subtitle }) => (
  <Header title={title} subtitle={subtitle} />
)
