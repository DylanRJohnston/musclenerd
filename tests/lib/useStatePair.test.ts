import { expect } from "chai"
import { pipe } from "fp-ts/lib/pipeable"
import sinon from "sinon"

import { fromProp } from "../../src/lib/optics"
import { StatePair, focus } from "../../src/lib/useStatePair"

const useStatePair = <A>(initial: A): StatePair<A> & { promise: Promise<A> } => {
  let resolve: (a: A) => void

  const promise = new Promise<A>(res => {
    resolve = res
  })

  return {
    state: initial,
    update: reducer => void resolve(reducer(initial)),
    promise,
  }
}

describe("useStatePair", () => {
  describe("Focus", () => {
    it("Correctly focuses the state", () => {
      const statePair = useStatePair({ foo: "foo" })

      const focusedStatePair = pipe(statePair, focus(fromProp("foo")))

      expect(focusedStatePair.state)
    })

    it("Correctly focuses the update", async () => {
      const statePair = useStatePair({ foo: "foo" })

      const focusedStatePair = pipe(statePair, focus(fromProp("foo")))

      focusedStatePair.update(it => it + it)

      expect(await statePair.promise).to.deep.equal({ foo: "foofoo" })
    })
  })
})
