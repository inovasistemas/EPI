'use client'
import { FingerPrintIcon } from '@/components/Display/Icons/FingerPrint'
import { Modal } from '@/components/Display/Modal'

type TakeoutModalProps = {
  title: string
  isModalOpen: boolean
  handleClickOverlay: () => void
}

export function TakeoutModal({
  title,
  isModalOpen,
  handleClickOverlay,
}: TakeoutModalProps) {
  return (
    <Modal
      title={title}
      isModalOpen={isModalOpen}
      handleClickOverlay={handleClickOverlay}
      showClose={false}
    >
      <div>
        <div className='relative flex justify-center items-center min-h-72'>
          <div className='absolute'>
            <FingerPrintIcon
              size='size-40'
              stroke='animate-stroke stroke-[--primaryColor] group-datta-[active=true]:stroke-[--primaryColor]'
              strokeWidth={1}
            />
          </div>
          <div className='absolute'>
            <FingerPrintIcon
              size='size-40'
              stroke='stroke-[--iconPrimaryColor] group-datta-[active=true]:stroke-[--primaryColor] opacity-10'
              strokeWidth={1}
            />
          </div>
        </div>
        <div className='flex justify-center items-center pb-6 w-full'>
          <span className='opacity-40 text-[--iconPrimaryColor] text-lg'>
            Aguarde a leitura da biometria...
          </span>
        </div>
      </div>
    </Modal>
  )
}
