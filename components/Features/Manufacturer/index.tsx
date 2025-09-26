import { EditIcon } from '@/components/Display/Icons/Edit'
import { Modal } from '@/components/Display/Modal'
import { NavAction } from '@/components/Inputs/Button/NavAction'
import { ActionGroupAdd } from '@/components/Surfaces/ActionGroupAdd'
import { ToastError } from '@/components/Template/Toast/Error'
import { GroupLabel } from '@/components/Utils/Label/GroupLabel'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { Dialog } from '@/components/Dialog'
import { deleteManufacturer, getManufacturers } from '@/services/Manufacturer'
import { ManufacturerModal } from './Modal'
import { PermissionDeniedScreen } from '../PermissionDenied'

export function Manufacturer() {
  const [hasPermission, setHasPermission] = useState(true)
  const [modalConfirmationStatus, setModalConfirmationStatus] = useState(false)
  const [modalStatus, setModalStatus] = useState(false)
  const [loading, setLoading] = useState(false)
  const [modalProps, setModalProps] = useState({
    manufacturer: '',
    type: '',
  })
  const fetchedManufacurers = useRef(false)
  const [ManufacturersData, setManufacturersData] = useState([
    {
      uuid: '',
      name: '',
      active_equipments: '',
      created_at: '',
      updated_at: '',
    },
  ])
  const [selectedManufacturer, setSelectedManufacturer] = useState('')

  const handleClick = (id?: string, type?: string) => {
    if (!id && !type) {
      setSelectedManufacturer('')
      setModalProps({ manufacturer: '', type: 'createManufacturer' })
    } else if (id && type) {
      setSelectedManufacturer(id)
      setModalProps({ manufacturer: id, type: type })
    }

    handleModalStatus()
  }

  const handleModalStatus = () => {
    setModalStatus(prev => !prev)
  }

  const fetchManufacturers = async () => {
    const response = await getManufacturers({loading: setLoading})

    if (response) {
      if (response.status === 200) {
        setManufacturersData(response.data.data)
      } else if (response.status === 401) {
        setHasPermission(false)
      } else {
        toast.custom(() => (
          <ToastError text='Não foi possível buscar os fabricantes' />
        ))
      }
    } else {
      toast.custom(() => (
        <ToastError text='Não foi possível buscar os fabricantes' />
      ))
    }
  }

  const handleCloseModalConfirmation = () => {
    setModalConfirmationStatus(prev => !prev)
  }

  const handleDeleteManufacturer = async () => {
    const response = await deleteManufacturer({
      id: selectedManufacturer || '',
    })

    if (response) {
      if (response.status === 204) {
        fetchManufacturers()
        handleCloseModalConfirmation()
        handleModalStatus()
      } else if (response.status === 401) {
        toast.custom(() => (
          <ToastError text='Você não possui permissão para excluir este fabricante' />
        )) 
      } else {
        toast.custom(() => (
          <ToastError text='Não foi possível excluir o fabricante' />
        ))
      }
    } else {
      toast.custom(() => (
        <ToastError text='Não foi possível excluir o fabricante' />
      ))
    }
  }

  useEffect(() => {
    if (fetchedManufacurers.current) return
    fetchedManufacurers.current = true
    fetchManufacturers()
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
        <ManufacturerModal
          manufacturer={modalProps.manufacturer}
          type={modalProps.type}
          modalAction={handleModalStatus}
          reload={fetchManufacturers}
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
          title={'Tem certeza que deseja excluir o fabricante?'}
          description='Esta ação é irreversível e todos os equipamentos associados serão permanentemente desassociados.'
          handleDelete={handleDeleteManufacturer}
          handleCancel={handleCloseModalConfirmation}
        />
      </Modal>
      <div className='relative flex flex-col w-full h-full'>
        <div className='flex flex-col px-6 divide-y divide-[--border] h-full min-h-80 overflow-y-auto'>
          <div className='py-6 select-none'>
            <h2 className='font-medium text-xl leading-none'>Fabricantes</h2>
            <span className='opacity-60 text-[--textSecondary] text-sm'>
              Cadastre e vincule aos equipamentos para facilitar o controle.
            </span>
          </div>

          {(hasPermission && !loading) && ManufacturersData?.map((manufacturer, i) => (
            <div
              key={manufacturer.uuid}
              className='items-start gap-6 grid grid-cols-1 py-6 select-none'
            >
              <div className='flex flex-col'>
                <div className='flex flex-row justify-between gap-2 itens-center'>
                  <span className='font-medium capitalize'>
                    {manufacturer.name.toLocaleLowerCase()}
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
                      action={() =>
                        handleClick(manufacturer.uuid, 'editManufacturer')
                      }
                    />
                  </div>
                </div>

                <div>
                  <div className='block relative col-span-full -mt-1 mb-4 -ml-1'>
                    <GroupLabel
                      isVisible={true}
                      label={`${manufacturer.active_equipments} equipamento${Number(manufacturer.active_equipments) !== 1 ? 's' : ''} vinculado${Number(manufacturer.active_equipments) !== 1 ? 's' : ''} a este fabricante`}
                      showFixed={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {!hasPermission && (
            <div className='flex items-center h-full min-h-80'>
              <PermissionDeniedScreen margin={false} />
            </div>
          )}
        </div>

        <ActionGroupAdd addLabel='Adicionar' onClick={handleClick} />
      </div>
    </>
  )
}
