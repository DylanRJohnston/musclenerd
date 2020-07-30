import { groupBy } from "fp-ts/lib/NonEmptyArray"
import React from "react"
import { Draggable, Droppable } from "react-beautiful-dnd"

import { Movement, movements } from "../../../domain/movement"

import styles from "./ExerciseRow.scss"

export const maxMuscle = (movement: Movement): string => {
  let max = 0
  let maxName = ""

  for (const [name, strength = 0] of Object.entries(movement.muscles)) {
    if (strength < max) continue

    max = strength
    maxName = name
  }

  return maxName
}

const movementsByPrimaryMuscle = groupBy(maxMuscle)(Array.from(movements.values()))

export const ExerciseRow: React.FC = () => (
  <div className={styles.container}>
    {Object.entries(movementsByPrimaryMuscle).map(([grouping, movements]) => (
      <Droppable droppableId={`exerciseRow_${grouping}`} type="cell" isDropDisabled>
        {({ droppableProps, innerRef, placeholder }) => (
          <div className={styles.column} key={grouping} ref={innerRef} {...droppableProps}>
            <h2 className={styles.grouping}>{grouping}</h2>
            <div className={styles.cells}>
              {movements.map((movement, index) => (
                <Draggable index={index} draggableId={movement.name}>
                  {({ draggableProps, innerRef, dragHandleProps }) => (
                    <div
                      className={styles.cell}
                      key={movement.name}
                      ref={innerRef}
                      {...draggableProps}
                      {...dragHandleProps}
                    >
                      {movement.name}
                    </div>
                  )}
                </Draggable>
              ))}
              {placeholder}
            </div>
          </div>
        )}
      </Droppable>
    ))}
  </div>
)
