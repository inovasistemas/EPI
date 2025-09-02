export function normalizeDescription(description: string) {
  if (!description || typeof description !== 'string') return ''

  const cleaned = description.trim().replace(/\s+/g, ' ')
  const sentences = cleaned.split(/(\. ?)/)

  let result = ''
  for (let i = 0; i < sentences.length; i++) {
    const part = sentences[i]
    if (part && !part.match(/^\. ?$/)) {
      const trimmed = part.trim()
      if (trimmed.length > 0) {
        result += trimmed.charAt(0).toUpperCase() + trimmed.slice(1)
      }
    } else {
      result += part
    }
  }

  result = result.replace(/\s+\./g, '.')

  return result.trim()
}
