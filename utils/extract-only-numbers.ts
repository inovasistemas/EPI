export function extractOnlyNumbers(text: string): string {
	return (text.match(/\d+/g) || []).join('')
}