import { AlertIcon } from '@/components/Display/Icons/Alert'
import { CheckIcon } from '@/components/Display/Icons/Check'

type ToastSuccessType = {
  text: string
}

export function ToastSuccess({ text }: ToastSuccessType) {
  return (
    <div className='flex items-center gap-2 bg-[--backgroundPrimary] shadow-lg p-3 border border-[--outlinePrimary] rounded-2xl'>
      <CheckIcon size='min-w-[1rem] size-4' stroke='stroke-[--alertText]' />
      <div>
        <div className='text-[--alertText] text-sm select-none'>{text}</div>
      </div>
    </div>
  )
}
