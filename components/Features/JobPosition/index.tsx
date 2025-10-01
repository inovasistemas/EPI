import { ActionGroupAdd } from '@/components/Surfaces/ActionGroupAdd'
import { ToastError } from '@/components/Template/Toast/Error'
import { toast } from 'sonner'
import { useEffect, useRef, useState } from 'react'
import { deleteJobPosition, getJobPositions } from '@/services/JobPosition'
import { NavAction } from '@/components/Inputs/Button/NavAction'
import { EditIcon } from '@/components/Display/Icons/Edit'
import { Modal } from '@/components/Display/Modal'
import { GroupLabel } from '@/components/Utils/Label/GroupLabel'
import { JobPositionModal } from './Modal'
import { Dialog } from '@/components/Dialog'
import { PermissionDeniedScreen } from '../PermissionDenied'
import { Skeleton } from '@/components/ui/skeleton'
import { AnimatePresence, motion } from 'framer-motion'

export function JobPosition() {
  const [modalConfirmationStatus, setModalConfirmationStatus] = useState(false)
  const [modalStatus, setModalStatus] = useState(false)
  const [hasPermission, setHasPermission] = useState(true)
  const [loading, setLoading] = useState(false)
  const [selectedJobPosition, setSelectedJobPosition] = useState('')
  const fetchedJobPositions = useRef(false)
  const [jobPositionsData, setJobPositionsData] = useState<
    JobPositions[] | null
  >()

  const handleModalStatus = () => {
    setModalStatus(prev => !prev)

    if (modalStatus) {
      setSelectedJobPosition('')
    }
  }

  const handleClick = (id: string) => {
    if (id) {
      setSelectedJobPosition(id)
    }

    handleModalStatus()
  }

  const handleCloseModalConfirmation = () => {
    setModalConfirmationStatus(prev => !prev)
  }

  const handleDeleteJobPosition = async () => {
    const response = await deleteJobPosition(selectedJobPosition || '')

    if (response) {
      if (response.status === 204) {
        fetchJobPositions()
        handleCloseModalConfirmation()
        handleModalStatus()
      } else if (response.status === 403) {
        toast.custom(() => (
          <ToastError text='Você não possui permissão para esta ação' />
        ))
      } else {
        toast.custom(() => <ToastError text='Não foi possível excluir o cargo' />)
      }
    } else {
      toast.custom(() => <ToastError text='Não foi possível excluir o cargo' />)
    }
  }

  const fetchJobPositions = async () => {
    const response = await getJobPositions({loading: setLoading})

    if (response) {
      if (response.status === 200) {
        setJobPositionsData(response.data.data)
      } else if (response.status === 403) {
        setHasPermission(false)
      } else {
        toast.custom(() => (
          <ToastError text='Não foi possível buscar os cargos' />
        ))
      }
    } else {
      toast.custom(() => (
        <ToastError text='Não foi possível buscar os cargos' />
      ))
    }
  }

  useEffect(() => {
    if (fetchedJobPositions.current) return
    fetchedJobPositions.current = true
    fetchJobPositions()
  }, [])
  return (
    <>
      <Modal
        title=''
        size='small'
        isModalOpen={modalStatus}
        handleClickOverlay={handleModalStatus}
        showClose={false}
        overflow={false}
      >
        <JobPositionModal
          id={selectedJobPosition}
          reload={fetchJobPositions}
          modalAction={handleModalStatus}
          confirmationModal={handleCloseModalConfirmation}
        />
      </Modal>
      <Modal
        title=''
        size='extra-small'
        isModalOpen={modalConfirmationStatus}
        handleClickOverlay={handleCloseModalConfirmation}
        showClose={false}
      >
        <Dialog
          title={'Tem certeza que deseja excluir o cargo?'}
          description='Esta ação é irreversível e todos os dados associados serão permanentemente apagados.'
          handleDelete={handleDeleteJobPosition}
          handleCancel={handleCloseModalConfirmation}
        />
      </Modal>
      <div className='relative flex flex-col w-full h-full'>
        <div className='flex flex-col px-6 divide-y divide-[--border] h-full overflow-y-auto'>
          <div className='py-6 select-none'>
            <h2 className='font-medium text-xl leading-none'>
              Cargos e Funções
            </h2>
            <span className='opacity-60 text-[--textSecondary] text-sm'>
              Defina funções e cargos personalizados para sua empresa.
            </span>
          </div>

          <AnimatePresence mode='wait'>
          {loading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className='flex flex-col gap-3 py-6 w-full'>
              <Skeleton className='rounded-xl w-full h-11' />
            </motion.div>
          )}

          {hasPermission && jobPositionsData?.map((jobPosition, i) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              key={jobPosition.uuid}
              className='items-start gap-6 grid grid-cols-1 py-6 select-none'
            >
              <div className='flex flex-col'>
                <div className='flex flex-row justify-between gap-2 itens-center'>
                  <span className='font-medium capitalize'>
                    {jobPosition.name.toLocaleLowerCase()}
                  </span>
                  <div className='flex flex-row items-center gap-2'>
                    <NavAction
                      type='button'
                      desktop={true}
                      icon={
                        <EditIcon
                          size='size-4'
                          stroke='stroke-[--iconPrimaryColor] group-data-[active=true]:stroke-[--primaryColor]'
                          strokeWidth={2.5}
                        />
                      }
                      mobile={true}
                      action={() => handleClick(jobPosition.uuid)}
                    />
                  </div>
                </div>
                <div>
                  <div className='block relative col-span-full -mt-1 mb-4 -ml-1'>
                    <GroupLabel
                      isVisible={true}
                      label={`${jobPosition.active_collaborators} colaborador${jobPosition.active_collaborators > 1 || jobPosition.active_collaborators === 0 ? 'es' : ''} nesse cargo`}
                      showFixed={false}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {!hasPermission && (
            <PermissionDeniedScreen margin={false} />
          )}
          </AnimatePresence>
        </div>

        <ActionGroupAdd addLabel='Adicionar' onClick={handleModalStatus} />
      </div>
    </>
  )
}
