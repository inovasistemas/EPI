export function capitalize(word: string) {
  return word.toLocaleLowerCase().replace(/\b\w/g, char => char.toUpperCase())
}
