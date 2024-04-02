function dotProduct(a: number[], b: number[]) {
  return a.map((value, index) => value * b[index]).reduce((a, b) => a + b, 0)
}