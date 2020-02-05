// eslint-disable-next-line @typescript-eslint/no-empty-function
export const returnVoid = (): void => {}
export const returnNever = (): never => {
  throw new Error("Function was not supposed to be called")
}
