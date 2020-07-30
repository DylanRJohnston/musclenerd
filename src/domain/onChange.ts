import { ChangeEvent } from "react"

export const asNumber = (event: ChangeEvent<HTMLInputElement>): number => event.target.valueAsNumber
