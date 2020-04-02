import React from "react"
import { Draggable } from "react-beautiful-dnd"

import { useId } from "../../../lib/useId"

import styles from "./Table.scss"

interface Props {
  index: number
  contents: JSX.Element
}

export const Cell: React.FC<Props> = ({ index, contents }) => (
  <Draggable index={index} draggableId={useId()}>
    {({ innerRef, draggableProps, dragHandleProps }) => (
      <div className={styles.cell} ref={innerRef} {...draggableProps} {...dragHandleProps}>
        {contents}
      </div>
    )}
  </Draggable>
)
