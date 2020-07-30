import { identity } from "fp-ts/lib/function"
import { DraggableLocation, DropResult } from "react-beautiful-dnd"

import { Reducer } from "../lib/optics"

import { Exercise } from "./exercise"
import { movements } from "./movement"
import {
  Coordinate,
  deleteExercise,
  insertExercise,
  Move,
  moveExercise,
  moveWorkout,
  Program,
} from "./program"

export const toCoordinate = (location: DraggableLocation): Coordinate => ({
  column: parseInt(location.droppableId, 10),
  row: location.index,
})

export type DropEvent =
  | { type: "null" }
  | ({ type: "moveColumn" } & Move<number>)
  | ({ type: "moveCell" } & Move<Coordinate>)
  | { type: "insertCell"; exercise: Exercise; destination: Coordinate }
  | { type: "deleteCell"; source: Coordinate }

export const toDropEvent = (drop: DropResult): DropEvent => {
  if (!drop.destination) return { type: "null" }

  const movement = movements.get(drop.draggableId)

  if (drop.type === "column") {
    return {
      type: "moveColumn",
      source: drop.source.index,
      destination: drop.destination.index,
    }
  } else if (drop.source.droppableId.startsWith("exerciseRow") && movement) {
    return {
      type: "insertCell",
      exercise: { movement, reps: 5, sets: 10 },
      destination: toCoordinate(drop.destination),
    }
  } else {
    return {
      type: "moveCell",
      source: toCoordinate(drop.source),
      destination: toCoordinate(drop.destination),
    }
  }
}

export const stateReducer = (dropEvent: DropEvent): Reducer<Program> => {
  switch (dropEvent.type) {
    case "insertCell":
      return insertExercise(dropEvent.exercise, dropEvent.destination)
    case "moveCell":
      return moveExercise(dropEvent)
    case "moveColumn":
      return moveWorkout(dropEvent)
    case "deleteCell":
      return deleteExercise(dropEvent.source)
    case "null":
      return identity
  }
}
