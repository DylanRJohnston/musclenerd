export const spy = <A extends unknown[], B>(f: (...a: A) => B) => (...a: A): B => {
  console.log(`Calling ${f.name} with ${a}`)
  const result = f(...a)
  console.log(`${f.name} returned ${result}`)
  return result
}
