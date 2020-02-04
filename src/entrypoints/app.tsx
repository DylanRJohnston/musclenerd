import React from "react"
import dom from "react-dom"

import { App } from "../components/pages/App"

const root = document.createElement("div")
root.setAttribute("id", "root")
document.body.appendChild(root)

dom.render(<App />, root)
