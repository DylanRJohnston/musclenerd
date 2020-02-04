import React from "react"
import renderer from "react-test-renderer"

import { App } from "../src/components/pages/App"

test("Main loads without error", () => {
  const component = renderer.create(<App />)

  expect(component.toJSON()).toMatchSnapshot()
})
