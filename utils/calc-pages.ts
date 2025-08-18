export function calcPages(
  totalItems: number,
  itemsPerPage: number = 50
): number {
  return Math.ceil(totalItems / itemsPerPage)
}
