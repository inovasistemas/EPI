export function calcDaysRemaining(target: Date): number {
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const targetDate = new Date(target);
	targetDate.setHours(0, 0, 0, 0);

	const diffInMs = targetDate.getTime() - today.getTime();

	const msInOneDay = 1000 * 60 * 60 * 24;

	return diffInMs / msInOneDay;
}
