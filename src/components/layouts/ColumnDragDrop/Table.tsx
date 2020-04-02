import React from "react"
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd"

import { Column } from "./Column"
import styles from "./Table.scss"

interface Props {
  headers: JSX.Element[]
  tableContents: JSX.Element[][]
  onDragEnd: (drag: DropResult) => void
}

export const Table = ({ headers, tableContents, onDragEnd }: Props): JSX.Element => (
  <DragDropContext onDragEnd={onDragEnd}>
    <div className={styles.container}>
      <div className={styles.background}>
        {tableContents.map((_, index) => (
          <div key={index} className={styles.column} />
        ))}
      </div>
      <Droppable droppableId="table" type="column" direction="horizontal">
        {({ innerRef, droppableProps, placeholder }) => (
          <div className={styles.foreground} ref={innerRef} {...droppableProps}>
            {tableContents.map((columnContents, columnIndex) => (
              <Column
                key={columnIndex}
                index={columnIndex}
                header={headers[columnIndex]}
                contents={columnContents}
              />
            ))}
            {placeholder}
          </div>
        )}
      </Droppable>
    </div>
  </DragDropContext>
)
