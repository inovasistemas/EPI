export const convertToBoolean = (data: string) => {
  if (data === 'true') {
    return true
  }

  if (data === 'false') {
    return false
  }

  return null
}