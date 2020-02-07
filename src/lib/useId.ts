import { useState } from "react"
import uuid = require("uuid")

export const useId = (): string => useState(uuid())[0]
