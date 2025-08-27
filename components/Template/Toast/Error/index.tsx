import { AlertIcon } from '@/components/Display/Icons/Alert'

type ToastErrorType = {
  text: string
}

export function ToastError({ text }: ToastErrorType) {
  return (
    <div className='flex items-center gap-2 bg-[--backgroundPrimary] shadow-lg p-4 border border-[--outlinePrimary] rounded-2xl'>
      <AlertIcon size='size-5' stroke='stroke-[--errorLoader]' />
      <div>
        <div className='text-[--textSecondary] text-sm select-none'>{text}</div>
      </div>
    </div>
  )
}
