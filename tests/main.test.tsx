import React from "react"
import renderer from "react-test-renderer"

import { App } from "../src/components/pages/App"

describe("Main loads without error", () => {
  it("loads without error", () => {
    renderer.create(<App />)
  })
})
