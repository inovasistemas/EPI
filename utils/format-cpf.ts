export function formatCPF(input: string | number): string | null {
  const digits = String(input).replace(/\D/g, '')

  if (digits.length !== 11) {
    return null
  }

  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`
}
