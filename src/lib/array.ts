import { unsafeDeleteAt, unsafeInsertAt, unsafeUpdateAt } from "fp-ts/lib/Array"
import { pipe } from "fp-ts/lib/pipeable"

export const deleteAt = <A>(i: number) => (as: A[]) => unsafeDeleteAt(i, as)
export const insertAt = <A>(i: number, a: A) => (as: A[]) => unsafeInsertAt(i, a, as)
export const modifyAt = <A>(i: number, f: (a: A) => A) => (as: A[]) =>
  unsafeUpdateAt(i, f(as[i]), as)

export const move = (source: number, destination: number) => <A>(as: A[]): A[] =>
  pipe(as, deleteAt(source), insertAt(destination, as[source]))

export { map } from "fp-ts/lib/Array"
