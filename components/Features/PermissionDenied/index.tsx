import { LockIcon } from '@/components/Display/Icons/Lock'
import classNames from 'classnames'

type PermissionDeniedScreenProps = {
	margin?: boolean
}

export function PermissionDeniedScreen({margin = true}: PermissionDeniedScreenProps) {
	return (
		<div className="flex justify-center items-center w-full h-full">
			<div className={classNames({'mb-20': margin}, ["flex items-center gap-3"])}>
				<LockIcon size="min-w-[1.5rem] size-5" stroke="stroke-[--textSecondary]" />
				<div>
					<div className="text-[--textSecondary] text-base select-none">Você não possui permissão para acessar
						esta tela
					</div>
				</div>
			</div>
		</div>
	)
}