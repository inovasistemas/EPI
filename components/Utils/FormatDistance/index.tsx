import { formatDistanceToNow, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

export function formatDistance(dateString: string) {
  const date =
    typeof dateString === 'string' ? parseISO(dateString) : dateString
  const distance = formatDistanceToNow(date, { locale: ptBR, addSuffix: false })

  let match
  if (distance.includes('hora')) {
    match = distance.match(/\d+/)
    return match ? match[0] + 'h' : distance
  }
  if (distance.includes('minuto')) {
    match = distance.match(/\d+/)
    return match ? match[0] + 'm' : distance
  }
  if (distance.includes('dia')) {
    match = distance.match(/\d+/)
    return match ? match[0] + 'd' : distance
  }
  if (distance.includes('segundo')) {
    match = distance.match(/\d+/)
    return match ? match[0] + 's' : distance
  }
  if (distance.includes('mês')) {
    match = distance.match(/\d+/)
    return match ? match[0] + 'mo' : distance
  }
  if (distance.includes('ano')) {
    match = distance.match(/\d+/)
    return match ? match[0] + 'a' : distance
  }
  return distance
}
