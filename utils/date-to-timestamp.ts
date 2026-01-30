export function dateToTimestamp(date: string): string {
	if (date.length === 0) return ''
	
	const isoString = date.replace(' ', 'T')
	const timestamp = new Date(isoString)
	const day = String(timestamp.getDate()).padStart(2, '0')
	const month = String(timestamp.getMonth() + 1).padStart(2, '0')
	const year = timestamp.getFullYear()
	return `${year}-${month}-${day} 00:00:00`
}

export function simpleDateToTimestamp(date: string): string {
	if (date === null || date === undefined || date.length === 0) return ''
	
	const parts = date.split('/')
	const day = String(parts[0]).padStart(2, '0')
	const month = String(parts[1]).padStart(2, '0')
	const year = parts[2]
	return `${year}-${month}-${day} 00:00:00`
}
