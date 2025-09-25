import { AlertIcon } from '@/components/Display/Icons/Alert'
import { CheckIcon } from '@/components/Display/Icons/Check'

type ToastSuccessType = {
  text: string
}

export function ToastSuccess({ text }: ToastSuccessType) {
  return (
    <div className='flex items-center gap-2 bg-[#008635] shadow-lg p-3 border border-[--outlinePrimary] rounded-2xl'>
      <CheckIcon size='size-5' stroke='stroke-white' />
      <div>
        <div className='text-white text-sm select-none'>{text}</div>
      </div>
    </div>
  )
}
