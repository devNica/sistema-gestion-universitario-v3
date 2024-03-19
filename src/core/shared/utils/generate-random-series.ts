export const generateRandomSeries = (serialSize = 8, charCollection: string): string => {
  let result1 = ' '
  const charactersLength = charCollection.length
  for (let i = 0; i < serialSize; i++) {
    result1 += charCollection.charAt(Math.floor(Math.random() * charactersLength))
  }

  return result1.trim()
}
