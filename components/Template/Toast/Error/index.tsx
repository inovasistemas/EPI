import { AlertIcon } from '@/components/Display/Icons/Alert'

type ToastErrorType = {
  text: string
}

export function ToastError({ text }: ToastErrorType) {
  return (
    <div className='flex items-center gap-2 bg-[--backgroundPrimary] shadow-lg p-3 border border-[--outlinePrimary] rounded-2xl'>
      <AlertIcon size='min-w-[1rem] size-4' stroke='stroke-[--alertTextError]' />
      <div>
        <div className='text-[--alertTextError] text-sm select-none'>{text}</div>
      </div>
    </div>
  )
}
