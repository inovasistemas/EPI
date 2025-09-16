export function convertMoneyBRL(value: number): string {
  const convertedValue = String(value)

  if (convertedValue.includes(',')) {
    return convertedValue.replace(',', '.')
  }
  if (convertedValue.includes('.')) {
    return convertedValue.replace('.', ',')
  }
  return convertedValue
}
