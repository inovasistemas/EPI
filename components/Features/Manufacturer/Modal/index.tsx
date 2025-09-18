import { useEffect, useRef, useState } from 'react'
import { FloppyDiskIcon } from '@/components/Display/Icons/FloppyDisk'
import { FormInput } from '@/components/Inputs/Text/FormInput'
import { toast } from 'sonner'
import { ToastError } from '@/components/Template/Toast/Error'
import { ToastSuccess } from '@/components/Template/Toast/Success'
import { TrashIcon } from '@/components/Display/Icons/Trash'
import {
  createManufacturer,
  getManufacturer,
  updateManufacturer,
} from '@/services/Manufacturer'

export function ManufacturerModal({
  manufacturer,
  type,
  modalAction,
  reload,
  confirmationModal,
}: ManufacturerModalProps) {
  const fetchedManufacturer = useRef(false)
  const [loading, setLoading] = useState(true)
  const [manufacturerData, setManufacturerData] = useState({
    id: manufacturer,
    name: '',
  })
  const handleManufacturerDataChange = (
    name: string,
    value: string | boolean
  ) => {
    setManufacturerData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const getTitle = () => {
    if (type === 'createManufacturer') {
      return 'Adicionar novo fabricante'
    } else if (type === 'editManufacturer') {
      return 'Editar dados do fabricante'
    }
  }

  const getSubtitle = () => {
    if (type === 'createManufacturer') {
      return 'Adicione um novo fabricante para organizar os equipamentos da empresa.'
    } else if (type === 'editManufacturer') {
      return 'Edite este fabricante para organizar os equipamentos da empresa.'
    }
  }

  const fetchPermissionGroups = async () => {
    if (manufacturer && manufacturer !== '') {
      const response = await getManufacturer({ id: manufacturer })

      if (response && response.status === 200) {
        const data = response.data

        if (type === 'createManufacturer') {
          setManufacturerData(prev => ({
            ...prev,
          }))
        } else {
          console.log(data)
          setManufacturerData(prev => ({
            ...prev,
            name: data.name,
          }))
        }
      }
    }

    setLoading(false)
  }

  const handleUpdate = async () => {
    if (manufacturer && manufacturer !== '' && type !== 'createManufacturer') {
      const response = await updateManufacturer({
        id: manufacturer,
        name: manufacturerData.name,
      })

      if (response && response.status === 200) {
        toast.custom(() => (
          <ToastSuccess text='Fabricante atualizado com sucesso' />
        ))
        modalAction()
        reload()
      } else {
        toast.custom(() => (
          <ToastError text='Não foi possível atualizar o fabricante' />
        ))
      }
    } else {
      if (type && type !== '') {
        if (type === 'createManufacturer') {
          const response = await createManufacturer({
            name: manufacturerData.name,
          })

          if (response && response.status === 201) {
            toast.custom(() => (
              <ToastSuccess text='Fabricante criado com sucesso' />
            ))
            modalAction()
            reload()
          } else {
            toast.custom(() => (
              <ToastError text='Não foi possível criar o fabricante. Verifique os campos obrigatórios e tente novamente' />
            ))
          }
        }
      }
    }
  }

  useEffect(() => {
    if (fetchedManufacturer.current) return
    fetchedManufacturer.current = true

    if (manufacturer !== '') {
      fetchPermissionGroups()
    } else {
      setLoading(false)
    }
  }, [manufacturer])

  return (
    <div className='flex flex-col justify-center items-center gap-6 w-full h-full'>
      {!loading && (
        <>
          <div className='flex flex-col items-center gap-3 w-full'>
            <h2 className='font-medium text-xl leading-none'>{getTitle()}</h2>
            <div className='flex flex-col'>
              <span className='opacity-60 text-[--textSecondary] text-sm text-center'>
                {getSubtitle()}
              </span>
            </div>
          </div>

          <div className='gap-3 w-full'>
            <FormInput
              name='name'
              label='Nome'
              required={false}
              type='text'
              value={manufacturerData.name.toLocaleLowerCase()}
              position='right'
              onChange={e =>
                handleManufacturerDataChange('name', e.target.value)
              }
              textTransform='capitalize'
            />
          </div>

          <div className='flex flex-row justify-end w-full'>
            <div className='flex flex-row gap-3'>
              {manufacturer &&
                manufacturer !== '' &&
                type === 'editManufacturer' && (
                  <button
                    onClick={confirmationModal}
                    type='button'
                    className='group group z-[55] relative flex justify-center items-center gap-3 bg-transparent hover:bg-[--errorLoader] px-4 pr-5 rounded-xl h-10 text-white active:scale-95 transition-all duration-300 cursor-pointer select-none'
                  >
                    <TrashIcon
                      size='size-4'
                      stroke='stroke-[--textSecondary] group-hover:stroke-white'
                      strokeWidth={2.5}
                    />

                    <span className='font-medium text-[--textSecondary] group-hover:text-white text-sm transition-all duration-300'>
                      Excluir
                    </span>
                  </button>
                )}
              <button
                onClick={handleUpdate}
                type='button'
                className='group relative flex flex-row justify-center items-center gap-3 bg-[--primaryColor] hover:bg-[--secondaryColor] disabled:bg-[--buttonPrimary] px-4 pr-5 rounded-xl h-10 font-medium text-white disabled:text-zinc-500 text-base active:scale-95 transition-all duration-300 select-none'
              >
                <FloppyDiskIcon
                  size='size-4'
                  stroke='stroke-white group-data-[disabled=true]:stroke-zinc-500 group-data-[active=true]:stroke-[--primaryColor]'
                  strokeWidth={2.5}
                />
                <span className='font-medium text-sm'>Salvar</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
