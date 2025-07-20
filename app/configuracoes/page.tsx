'use client'
import { Plus } from '@phosphor-icons/react'
import { type FC, useCallback, useState } from 'react'
import { Modal } from '@/components/Display/Modal'
import { FilterCollaborator } from '@/components/Template/Filter/Collaborator'

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
          <FilterCollaborator actionClose={handleCloseModal} />
        </Modal>
      )}
      <div className='flex flex-col items-start gap-6 bg-[--backgroundPrimary] sm:rounded-xl w-full h-full'>
        <div className='flex justify-between items-center gap-3 p-6 pt-8 w-full'>
          <h2 className='font-medium text-2xl leading-none select-none'>
            Configurações
          </h2>
        </div>

        <div className='flex flex-row justify-between px-6 w-full'>
          <div className='font-medium text-lg'>Grupo de permissões</div>
          <button
            type='button'
            className='group z-[55] relative flex justify-center items-center gap-3 bg-[--primaryColor] hover:bg-[--secondaryColor] px-4 pr-5 rounded-lg h-10 text-white active:scale-95 transition-all duration-300 cursor-pointer select-none'
          >
            <Plus size={16} weight='bold' className='text-white' />
            <span className='font-medium text-sm'>Adicionar</span>
          </button>
        </div>

        <div className='px-6 w-full'>
          <div className='bg-[--tableRow] rounded-xl w-full h-48'></div>
        </div>
      </div>
    </div>
  )
}

export default Settings
