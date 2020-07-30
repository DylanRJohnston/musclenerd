import React from "react"
import { Droppable, Draggable } from "react-beautiful-dnd"

import { Cell } from "./Cell"
import styles from "./Table.scss"

interface Props {
  index: number
  header?: JSX.Element
  contents: JSX.Element[]
}

export const Column: React.FC<Props> = ({ index, header, contents }) => (
  <Draggable index={index} draggableId={String(index)}>
    {({ innerRef: dragInnerRef, dragHandleProps, draggableProps }) => (
      <Droppable droppableId={String(index)} type="cell" direction="vertical">
        {({ droppableProps, innerRef: dropInnerRef, placeholder }) => (
          <div
            className={styles.column}
            ref={ref => (dragInnerRef(ref), dropInnerRef(ref))}
            {...draggableProps}
            {...dragHandleProps}
            {...droppableProps}
          >
            {header}
            <div className={styles.cells}>
              {contents.map((cellContents, cellIndex) => (
                <Cell key={cellIndex} index={cellIndex} contents={cellContents} />
              ))}
            </div>
            {placeholder}
          </div>
        )}
      </Droppable>
    )}
  </Draggable>
)
