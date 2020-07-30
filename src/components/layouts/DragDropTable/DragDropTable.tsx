import React from "react"
import { Droppable } from "react-beautiful-dnd"

import { Column } from "./Column"
import styles from "./Table.scss"

interface Props {
  headers: JSX.Element[]
  tableContents: JSX.Element[][]
}

export const DragDropTable = ({ headers, tableContents }: Props): JSX.Element => (
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
)
