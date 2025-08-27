import { AlertIcon } from '@/components/Display/Icons/Alert'
import { CheckIcon } from '@/components/Display/Icons/Check'

type ToastSuccessType = {
  text: string
}

export function ToastSuccess({ text }: ToastSuccessType) {
  return (
    <div className='flex items-center gap-2 bg-[--backgroundPrimary] shadow-lg p-4 border border-[--outlinePrimary] rounded-2xl'>
      <CheckIcon size='size-5' stroke='stroke-[--chartGreen]' />
      <div>
        <div className='text-[--textSecondary] text-sm select-none'>{text}</div>
      </div>
    </div>
  )
}
