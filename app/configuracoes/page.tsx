'use client'
import { type FC, useCallback, useState } from 'react'
import { Modal } from '@/components/Display/Modal'
import { FilterColaborator } from '@/components/Template/Filter/Colaborator'

type SettingsProps = {
  id: string
  name: string
  code: string
  document: string
  job_position: string
  createdAt: string
}

const Settings: FC = () => {
  const [modalStatus, setModalStatus] = useState(false)

  const handleCloseModal = useCallback(() => {
    setModalStatus(prev => !prev)
  }, [])

  return (
    <div className='flex flex-col gap-6 bg-[--backgroundSecondary] sm:pr-3 pb-8 sm:pb-3 w-full lg:h-[calc(100vh-50px)] overflow-auto'>
      {modalStatus && (
        <Modal
          title='Filtros'
          size='small'
          isModalOpen={modalStatus}
          handleClickOverlay={handleCloseModal}
        >
          <FilterColaborator actionClose={handleCloseModal} />
        </Modal>
      )}
      <div className='flex flex-col items-start gap-6 bg-[--backgroundPrimary] sm:rounded-xl w-full h-full'>
        <div className='flex justify-between items-center gap-3 p-6 pt-8 w-full'>
          <h2 className='font-medium text-2xl leading-none select-none'>
            Configurações
          </h2>
        </div>

        <div className='px-6 w-full'>
          <div className='bg-[--tableRow] rounded-xl w-full h-48'></div>
        </div>
      </div>
    </div>
  )
}

export default Settings
