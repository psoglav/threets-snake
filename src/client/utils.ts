export function moveBy(value: number, step: number, min: number, max: number): number {
  let result = value + step

  if (result >= max) {
    return result - max
  } else if (result < min) {
    return max + result
  }

  return result
}
