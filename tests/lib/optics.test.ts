import { expect } from "chai"
import { pipe } from "fp-ts/lib/pipeable"

import { modify, fromProp, fromIndex, compose, Lens } from "../../src/lib/optics"

type Foo = ReturnType<typeof newFoo>
const newFoo = () => ({
  foo: "foo",
  bar: {
    baz: "baz",
    alpha: {
      beta: "beta",
      gamma: "gamma",
    },
  },
})

describe("Optics", () => {
  describe("fromProp", () => {
    it("Correctly modifies the desired property", () => {
      const result = pipe(
        newFoo(),
        modify(fromProp("foo"), it => it + it),
      )

      expect(result).to.deep.equal({
        foo: "foofoo",
        bar: {
          baz: "baz",
          alpha: {
            beta: "beta",
            gamma: "gamma",
          },
        },
      })
    })
  })

  describe("fromIndex", () => {
    it("Correctly modifies the desired index", () => {
      expect(
        pipe(
          [1, 2, 3, 4, 5],
          modify(fromIndex(3), it => it + 1),
        ),
      ).to.deep.equal([1, 2, 3, 5, 5])
    })
  })

  describe("composeLens", () => {
    it("Correctly composes two lenses", () => {
      const lens: Lens<Foo, string> = compose(fromProp("bar"), fromProp("baz"))

      expect(
        pipe(
          newFoo(),
          modify(lens, it => it + it),
        ),
      ).to.deep.equal({
        foo: "foo",
        bar: {
          baz: "bazbaz",
          alpha: {
            beta: "beta",
            gamma: "gamma",
          },
        },
      })
    })

    it("Correctly composes three lenses", () => {
      const lens: Lens<Foo, string> = compose(fromProp("bar"), fromProp("alpha"), fromProp("gamma"))

      expect(
        pipe(
          newFoo(),
          modify(lens, it => it + it),
        ),
      ).to.deep.equal({
        foo: "foo",
        bar: {
          baz: "baz",
          alpha: {
            beta: "beta",
            gamma: "gammagamma",
          },
        },
      })
    })
  })
})
