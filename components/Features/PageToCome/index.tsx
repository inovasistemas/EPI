import { LockIcon } from '@/components/Display/Icons/Lock'

export function PageToCome(date: string) {
	return (
		<div className="flex justify-center items-center w-full h-full">
			<div className="flex items-center gap-3 mb-20">
				<LockIcon size="min-w-[1.5rem] size-5" stroke="stroke-[--textSecondary]" />
				<div>
					<div className="text-[--textSecondary] text-base select-none">Rotina (Em Breve)
					</div>
				</div>
			</div>
		</div>
	)
}