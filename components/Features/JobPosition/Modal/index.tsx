import { FloppyDiskIcon } from '@/components/Display/Icons/FloppyDisk'
import { TrashIcon } from '@/components/Display/Icons/Trash'
import { SearchSelect } from '@/components/Inputs/Select/SearchSelect'
import { FormInput } from '@/components/Inputs/Text/FormInput'
import { ToastError } from '@/components/Template/Toast/Error'
import { ToastSuccess } from '@/components/Template/Toast/Success'
import {
  createJobPosition,
  getJobPosition,
  updateJobPosition,
} from '@/services/JobPosition'
import { getSectors } from '@/services/Sector'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { PermissionDeniedScreen } from '../../PermissionDenied'

export function JobPositionModal({
  id,
  reload,
  modalAction,
  confirmationModal,
}: JobPositionModalProps) {
  const fetchedJobPosition = useRef(false)
  const fetchedSectors = useRef(false)
  const [loading, setLoading] = useState(false)
  const [hasPermission, setHasPermission] = useState(true)
  const [jobPositionData, setJobPositionData] = useState({
    uuid: '',
    name: '',
    sector: '',
    created_at: '',
    updated_at: '',
  })
  const [sectorsData, setSectorsData] = useState<SectorType[] | null>()

  const getTitle = () => {
    if (!id) {
      return 'Adicionar novo cargo'
    }

    return 'Editar cargo'
  }

  const getSubtitle = () => {
    if (!id) {
      return 'Registre um novo cargo na estrutura organizacional da empresa.'
    }

    return 'Revise e edite as especificações deste cargo na empresa.'
  }

  const handleJobPositionDataChange = (
    name: string,
    value: string | boolean
  ) => {
    setJobPositionData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const fetchJobPosition = async () => {
    if (id) {
      const response = await getJobPosition({id, loading: setLoading})

      if (response) {
        if (response.status === 200) {
          const data = response.data

          setJobPositionData(data)
        } else if (response.status === 403) {
          setHasPermission(false)
        } else {
          toast.custom(() => (
            <ToastError text='Não foi possível buscar o cargo' />
          ))
        }
      } else {
        toast.custom(() => (
          <ToastError text='Não foi possível buscar o cargo' />
        ))
      }
    }

    setLoading(false)
  }

  const fetchSectors = async () => {
    const response = await getSectors()

    if (response) {
      if (response.status === 200) {
        setSectorsData(response.data.data)
      } else if (response.status === 403) {
        toast.custom(() => (
          <ToastError text='Você não possui permissão para buscar os setores' />
        ))
      } else {
        toast.custom(() => (
          <ToastError text='Não foi possível buscar os setores' />
        ))
      }
    } else {
      toast.custom(() => (
        <ToastError text='Não foi possível buscar os setores' />
      ))
    }
  }

  const handleCreateJobPosition = async () => {
    const response = await createJobPosition({ payload: jobPositionData })

    if (response) {
      if (response.status === 201) {
        toast.custom(() => <ToastSuccess text='Cargo criado com sucesso' />)
        reload()
        modalAction()
      } else if (response.status === 403) {
        toast.custom(() => (
          <ToastError text='Você não possui permissão para esta ação' />
        ))
      } else {
        toast.custom(() => (
          <ToastError text='Não foi possível criar o cargo. Verifique os campos obrigatórios e tente novamente' />
        ))
      }
    } else {
      toast.custom(() => (
        <ToastError text='Não foi possível criar o cargo. Verifique os campos obrigatórios e tente novamente' />
      ))
    }
  }

  const handleUpdateJobPosition = async () => {
    if (id) {
      const response = await updateJobPosition({ id, payload: jobPositionData })

      if (response) {
        if (response.status === 200) {
          toast.custom(() => <ToastSuccess text='Cargo atualizado com sucesso' />)
          reload()
        } else if (response.status === 403) { 
          toast.custom(() => (
            <ToastError text='Você não possui permissão para esta ação' />
          ))
        } else {
          toast.custom(() => (
            <ToastError text='Não foi possível atualizar o cargo' />
          ))
        }
      } else {
        toast.custom(() => (
          <ToastError text='Não foi possível atualizar o cargo' />
        ))
      }
    }
  }

  useEffect(() => {
    if (fetchedSectors.current) return
    fetchedSectors.current = true
    fetchSectors()

    if (fetchedJobPosition.current) return
    fetchedJobPosition.current = true

    if (id) {
      fetchJobPosition()
    } else {
      setLoading(false)
    }
  }, [id])

  return (
    <div className='flex flex-col justify-center items-center gap-6 w-full h-full'>
      {hasPermission && !loading && (
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
              value={jobPositionData.name.toLocaleLowerCase()}
              position='right'
              onChange={e =>
                handleJobPositionDataChange('name', e.target.value)
              }
              textTransform='capitalize'
            />

            <div className='col-span-full pt-6'>
              <div className='flex flex-row items-center gap-1 bg-[--backgroundSecondary] p-3 rounded-2xl w-full'>
                <div className='flex flex-col gap-1 p-3 w-full'>
                  <div className='flex flex-row items-center gap-1'>
                    {/* <LinkIcon
                      size='size-4'
                      stroke='stroke-[--textSecondary] group-hover:stroke-white'
                      strokeWidth={2.5}
                    /> */}
                    <span className='font-medium text-sm'>
                      Vincule este cargo a um setor específico
                    </span>
                  </div>

                  <span className='opacity-60 text-[--textSecondary] text-sm'>
                    Este subsetor terá acesso aos mesmos equipamentos do setor
                    principal.
                  </span>

                  <div className='grid mt-1 rounded-xl w-full'>
                    <SearchSelect
                      value={jobPositionData.sector}
                      name='selectSector'
                      onChange={(value: string) =>
                        handleJobPositionDataChange('sector', value)
                      }
                      options={
                        sectorsData
                          ? sectorsData.flatMap(sector => [
                              { value: sector.uuid, label: sector.name },
                              ...(sector.subsectors?.map(sub => ({
                                value: sub.uuid,
                                label: sub.name,
                              })) ?? []),
                            ])
                          : []
                      }
                      placeholder=''
                      background='bg-[--buttonPrimary]'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-row justify-end w-full'>
            <div className='flex flex-row gap-3'>
              {id && (
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
                onClick={id ? handleUpdateJobPosition : handleCreateJobPosition}
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
      
      {!hasPermission && (
        <div className='mt-16'>
          <PermissionDeniedScreen />
        </div>
      )}
    </div>
  )
}
