import React from "react"
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd"

import styles from "./Table.scss"

interface Props {
  headers: React.ReactElement[]
  data: React.ReactElement[][]
  onDragEnd: (drag: DropResult) => void
}

export const Table = ({ headers, data: columns, onDragEnd }: Props): JSX.Element => (
  <DragDropContext onDragEnd={onDragEnd}>
    <div className={styles.container}>
      <div className={styles.background}>
        {headers.map((_, index) => (
          <div key={index} className={styles.column} />
        ))}
      </div>
      <Droppable droppableId="table" type="column" direction="horizontal">
        {columnDrop => (
          <div
            className={styles.foreground}
            ref={columnDrop.innerRef}
            {...columnDrop.droppableProps}
          >
            {columns.map((column, columnIndex) => (
              <Draggable key={columnIndex} index={columnIndex} draggableId={`${columnIndex}`}>
                {columnDrag => (
                  <Droppable droppableId={`${columnIndex}`} type="cell" direction="vertical">
                    {cellDrop => (
                      <div
                        className={styles.column}
                        ref={ref => (columnDrag.innerRef(ref), cellDrop.innerRef(ref))}
                        {...columnDrag.draggableProps}
                        {...columnDrag.dragHandleProps}
                        {...cellDrop.droppableProps}
                      >
                        {headers[columnIndex]}
                        {column.map((cell, cellIndex) => (
                          <Draggable
                            key={cellIndex}
                            index={cellIndex}
                            draggableId={`cell-${columnIndex}-${cellIndex}`}
                          >
                            {cellDrag => (
                              <div
                                className={styles.cell}
                                ref={cellDrag.innerRef}
                                {...cellDrag.draggableProps}
                                {...cellDrag.dragHandleProps}
                              >
                                {cell}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {cellDrop.placeholder}
                      </div>
                    )}
                  </Droppable>
                )}
              </Draggable>
            ))}
            {columnDrop.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  </DragDropContext>
)
