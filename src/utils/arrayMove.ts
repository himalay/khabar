export default function arrayMove<T>(array: readonly T[], fromIndex: number, toIndex: number) {
  const newArray = [...array]
  const startIndex = fromIndex < 0 ? newArray.length + fromIndex : fromIndex

  if (startIndex >= 0 && startIndex < newArray.length) {
    const endIndex = toIndex < 0 ? newArray.length + toIndex : toIndex

    const [item] = newArray.splice(fromIndex, 1)
    newArray.splice(endIndex, 0, item)
  }

  return newArray
}
