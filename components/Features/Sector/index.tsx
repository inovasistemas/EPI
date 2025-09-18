import { EditIcon } from '@/components/Display/Icons/Edit'
import { SubIcon } from '@/components/Display/Icons/Sub'
import { Modal } from '@/components/Display/Modal'
import { NavAction } from '@/components/Inputs/Button/NavAction'
import { Subsector } from '@/components/Inputs/Button/Subsector'
import { ActionGroupAdd } from '@/components/Surfaces/ActionGroupAdd'
import { ToastError } from '@/components/Template/Toast/Error'
import { GroupLabel } from '@/components/Utils/Label/GroupLabel'
import { deleteSector, getSectors } from '@/services/Sector'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { SectorModal } from './Modal'
import { Dialog } from '@/components/Dialog'
import { ToastSuccess } from '@/components/Template/Toast/Success'

export function Sector() {
  const [modalConfirmationStatus, setModalConfirmationStatus] = useState(false)
  const [modalStatus, setModalStatus] = useState(false)
  const [modalProps, setModalProps] = useState({
    sector: '',
    type: '',
  })
  const fetchedSectors = useRef(false)
  const [sectorsData, setSectorsData] = useState<SectorType[] | null>()
  const [selectedSector, setSelectedSector] = useState('')

  const handleClick = (id?: string, type?: string) => {
    if (!id && !type) {
      setSelectedSector('')
      setModalProps({ sector: '', type: 'createSector' })
    } else if (id && type) {
      setSelectedSector(id)
      setModalProps({ sector: id, type: type })
    }

    handleModalStatus()
  }

  const handleModalStatus = () => {
    setModalStatus(prev => !prev)
  }

  const fetchSectors = async () => {
    const response = await getSectors()

    if (response && response.status === 200) {
      setSectorsData(response.data.data)
    } else {
      toast.custom(() => <ToastError text='Não foi possível buscar setores' />)
    }
  }

  const handleCloseModalConfirmation = () => {
    setModalConfirmationStatus(prev => !prev)
  }

  const handleDeleteSector = async () => {
    const response = await deleteSector(selectedSector || '')

    if (response && response.status === 204) {
      toast.custom(() => <ToastSuccess text='Exclusão realizada com sucesso' />)
      fetchSectors()
      handleCloseModalConfirmation()
      handleModalStatus()
    } else {
      toast.custom(() => <ToastError text='Não foi possível excluir o setor' />)
    }
  }

  useEffect(() => {
    if (fetchedSectors.current) return
    fetchedSectors.current = true
    fetchSectors()
  }, [])

  return (
    <>
      <Modal
        title=''
        size='small'
        isModalOpen={modalStatus}
        handleClickOverlay={handleModalStatus}
        showClose={false}
        overflow={true}
      >
        <SectorModal
          sector={modalProps.sector}
          type={modalProps.type}
          modalAction={handleModalStatus}
          reload={fetchSectors}
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
          title={'Tem certeza que deseja excluir o setor?'}
          description='Esta ação é irreversível e todos os dados associados serão permanentemente apagados.'
          handleDelete={handleDeleteSector}
          handleCancel={handleCloseModalConfirmation}
        />
      </Modal>
      <div className='relative flex flex-col w-full h-full'>
        <div className='flex flex-col px-6 divide-y divide-[--border] h-full overflow-y-auto'>
          <div className='py-6 select-none'>
            <h2 className='font-medium text-xl leading-none'>
              Setores e substores
            </h2>
            <span className='opacity-60 text-[--textSecondary] text-sm'>
              Monte a estrutura da sua empresa com setores e subsetores
              personalizados.
            </span>
          </div>

          {sectorsData?.map((sector, i) => (
            <div
              key={sector.uuid}
              className='items-start gap-6 grid grid-cols-1 py-6 select-none'
            >
              <div className='flex flex-col'>
                <div className='flex flex-row justify-between gap-2 itens-center'>
                  <span className='font-medium capitalize'>
                    {sector.name.toLocaleLowerCase()}
                  </span>
                  <div className='flex flex-row items-center gap-2'>
                    <button
                      onClick={() =>
                        handleClick(sector.uuid, 'createSubsector')
                      }
                      type='button'
                      className='group z-[200] relative flex justify-center items-center gap-2 bg-[--backgroundSecondary] hover:bg-[--buttonHover] px-3 pr-4 rounded-xl h-8 text-zinc-200 active:scale-95 transition'
                    >
                      <SubIcon
                        size='size-4'
                        stroke='stroke-[--textSecondary] group-data-[active=true]:stroke-[--primaryColor]'
                        strokeWidth={2}
                      />
                      <span className='font-medium text-[--textSecondary] text-xs'>
                        Adicionar Subsetor
                      </span>
                    </button>
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
                      action={() => handleClick(sector.uuid, 'editSector')}
                    />
                  </div>
                </div>

                <div>
                  <div className='block relative col-span-full -mt-1 mb-4 -ml-1'>
                    <GroupLabel
                      isVisible={true}
                      label={`${sector.active_collaborators} colaborador${sector.active_collaborators > 1 || sector.active_collaborators === 0 ? 'es' : ''} nesse setor`}
                      showFixed={false}
                    />
                  </div>
                </div>

                {sector.subsectors.length > 0 && (
                  <div className='pt-6'>
                    <div className='block relative col-span-full mb-4 -ml-1'>
                      <GroupLabel
                        isVisible={true}
                        label='Subsetores'
                        showFixed={false}
                      />
                    </div>
                  </div>
                )}

                <div className='flex flex-wrap gap-2 pt-3'>
                  {sector.subsectors.map((subsector, j) => (
                    <Subsector
                      key={subsector.uuid}
                      id={subsector.uuid}
                      label={subsector.name.toLocaleLowerCase()}
                      onClick={() =>
                        handleClick(subsector.uuid, 'editSubsector')
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <ActionGroupAdd addLabel='Adicionar' onClick={handleClick} />
      </div>
    </>
  )
}
