export function convertNumberDB(value: string | number): number {
  if (typeof value === 'number') return value

  let convertedValue = String(value).replace(/\s*R\$\s?/, '')

  convertedValue = convertedValue.replace(/\./g, '')
  convertedValue = convertedValue.replace(',', '.')

  const numberValue = Number(convertedValue)
  if (isNaN(numberValue)) {
    throw new Error(`Invalid number to convert: ${value}`)
  }

  return numberValue
}
