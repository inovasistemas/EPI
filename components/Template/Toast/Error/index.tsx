import { AlertIcon } from '@/components/Display/Icons/Alert'

type ToastErrorType = {
  text: string
}

export function ToastError({ text }: ToastErrorType) {
  return (
    <div className='flex items-center gap-2 bg-[--errorLoader] shadow-lg p-3 border border-[--outlinePrimary] rounded-2xl'>
      <AlertIcon size='min-w-[1.5rem] size-5' stroke='stroke-white' />
      <div>
        <div className='text-white text-sm select-none'>{text}</div>
      </div>
    </div>
  )
}
