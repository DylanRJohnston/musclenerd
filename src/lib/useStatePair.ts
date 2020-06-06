import { useState } from "react"

export type Reducer<A> = (a: A) => A

export interface StatePair<S> {
  state: S
  update: (reducer: Reducer<S>) => void
}

export const useStatePair = <A>(initial?: A): StatePair<A> => {
  const [state, update] = useState<A>(initial as A)

  return { state, update }
}
