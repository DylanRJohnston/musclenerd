import { range } from "fp-ts/lib/Array"
import { useState } from "react"

import { Lens, modify, fromIndex } from "./optics"

export type Reducer<A> = (a: A) => A

export interface StatePair<S> {
  state: S
  update: (reducer: Reducer<S>) => void
}

export const useStatePair = <A>(initial: A): StatePair<A> => {
  const [state, update] = useState<A>(initial)

  return { state, update }
}

export const focus = <S, A>(lens: Lens<S, A>) => (outer: StatePair<S>): StatePair<A> => ({
  state: lens.get(outer.state),
  update: reducer => outer.update(modify(lens, reducer)),
})

export const set = <A>(a: A) => (_: unknown): A => a

export const map = <A, B>(f: (pair: StatePair<A>) => B) => (pair: StatePair<A[]>): B[] =>
  range(0, pair.state.length - 1).map(index => f(focus(fromIndex<A>(index))(pair)))
