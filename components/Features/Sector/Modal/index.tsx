import { useEffect, useRef, useState } from 'react'
import { FloppyDiskIcon } from '@/components/Display/Icons/FloppyDisk'
import { FormInput } from '@/components/Inputs/Text/FormInput'
import {
  createSector,
  createSubsector,
  getSector,
  updateSector,
} from '@/services/Sector'
import { toast } from 'sonner'
import { ToastError } from '@/components/Template/Toast/Error'
import { ToastSuccess } from '@/components/Template/Toast/Success'
import { TrashIcon } from '@/components/Display/Icons/Trash'
import { PermissionDeniedScreen } from '../../PermissionDenied'

export function SectorModal({
  sector,
  type,
  modalAction,
  reload,
  confirmationModal,
}: SectorModalProps) {
  const fetchedSector = useRef(false)
  const [loading, setLoading] = useState(false)
  const [hasPermission, setHasPermission] = useState(true)
  const [sectorData, setSectorData] = useState({
    id: sector,
    parentName: '',
    name: '',
    inherit: false,
  })
  const [isOn, setIsOn] = useState(sectorData.inherit)

  const handleSectorDataChange = (name: string, value: string | boolean) => {
    setSectorData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const getTitle = () => {
    if (sector === '') {
      return 'Adicionar novo setor'
    } else if (type === 'editSector') {
      return 'Editar dados do setor'
    } else if (type === 'editSubsector') {
      return 'Editar dados do subsetor'
    }

    if (!sectorData.parentName) {
      return 'Carregando nome do setor...'
    }

    return (
      <>
        <span>Adicionar subsetor à </span>
        <span className='font-medium text-[--primaryColor] capitalize'>
          {sectorData.parentName.toLocaleLowerCase()}
        </span>
      </>
    )
  }

  const getSubtitle = () => {
    if (type === 'createSector') {
      return 'Adicione um novo setor para organizar as áreas principais da empresa.'
    }
    if (type === 'createSubsector') {
      return 'Adicione um novo subsetor para organizar os principais setores da empresa.'
    } else if (type === 'editSector') {
      return 'Edite este setor para organizar as áreas principais da empresa.'
    } else if (type === 'editSubsector') {
      return 'Edite este subsetor para organizar os principais setores da empresa.'
    }

    if (!sectorData.parentName) {
      return ''
    }
  }

  const fetchPermissionGroups = async () => {
    if (sector && sector !== '') {
      const response = await getSector(sector)

      if (response) {
        if (response.status === 200) {
          const data = response.data.data

          if (type === 'createSubsector') {
            setSectorData(prev => ({
              ...prev,
              parentName: data.name.toLocaleLowerCase(),
            }))
            setIsOn(data.inherit)
          } else {
            setSectorData(prev => ({
              ...prev,
              parentName: data.parentName
                ? data.parentName.toLocaleLowerCase()
                : '',
              name: data.name,
              inherit: data.inherit,
            }))
            setIsOn(data.inherit)
          }
        } else if (response.status === 403) {
          setHasPermission(false)
        } else {
          toast.custom(() => (
            <ToastError text='Não foi possível buscar o setor' />
          ))
        }
      } else {
        toast.custom(() => (
          <ToastError text='Não foi possível buscar o setor' />
        ))
      }
    }

    setLoading(false)
  }

  const handleUpdate = async () => {
    if (
      sector &&
      sector !== '' &&
      type !== 'createSector' &&
      type !== 'createSubsector'
    ) {
      const response = await updateSector(sector, sectorData.name, isOn)

      if (response) {
        if (response.status === 200) {
          toast.custom(() => <ToastSuccess text='Setor atualizado com sucesso' />)
          modalAction()
          reload()
        } else if (response.status === 403) {
          toast.custom(() => (
            <ToastError text='Você não possui permissão para esta ação' />
          ))
        } else {
          toast.custom(() => (
            <ToastError text='Não foi possível atualizar setor' />
          ))
        }
      } else {
        toast.custom(() => (
          <ToastError text='Não foi possível atualizar setor' />
        ))
      }
    } else {
      if (type && type !== '') {
        if (type === 'createSector') {
          const response = await createSector(sectorData.name)

          if (response) {
            if (response.status === 201) {
              toast.custom(() => <ToastSuccess text='Setor criado com sucesso' />)
              modalAction()
              reload()
            } else if (response.status === 403) {
              toast.custom(() => (
                <ToastError text='Você não possui permissão para esta ação' />
              ))
            } else {
              toast.custom(() => (
                <ToastError text='Não foi possível criar setor. Verifique os campos obrigatórios e tente novamente' />
              ))
            }
          } else {
            toast.custom(() => (
              <ToastError text='Não foi possível criar setor. Verifique os campos obrigatórios e tente novamente' />
            ))
          }
        }

        if (type === 'createSubsector') {
          if (sector && sector !== '') {
            const response = await createSubsector(
              sector,
              sectorData.name,
              isOn
            )

            if (response) {
              if (response.status === 201) {
                toast.custom(() => (
                  <ToastSuccess text='Subsetor criado com sucesso' />
                ))
                modalAction()
                reload()
              } else if (response.status === 403) {
                toast.custom(() => (
                  <ToastError text='Você não possui permissão para esta ação' />
                ))
              } else {
                toast.custom(() => (
                  <ToastError text='Não foi possível criar o subsetor. Verifique os campos obrigatórios e tente novamente' />
                ))
              }
            } else {
              toast.custom(() => (
                <ToastError text='Não foi possível criar o subsetor. Verifique os campos obrigatórios e tente novamente' />
              ))
            }
          }
        }
      }
    }
  }

  useEffect(() => {
    if (fetchedSector.current) return
    fetchedSector.current = true

    if (sector !== '') fetchPermissionGroups()
  }, [sector])

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
              value={sectorData.name.toLocaleLowerCase()}
              position='right'
              onChange={e => handleSectorDataChange('name', e.target.value)}
              textTransform='capitalize'
            />

            {sector !== '' && type !== 'editSector' && (
              <div className='col-span-full pt-6'>
                <div className='flex flex-row justify-between items-center gap-1 bg-[--backgroundSecondary] p-3 rounded-2xl w-full'>
                  <div className='flex flex-col gap-1 p-3'>
                    <span className='font-medium text-sm'>
                      Compartilhar equipamentos do setor principal
                    </span>
                    <span className='opacity-60 text-[--textSecondary] text-sm'>
                      Este subsetor terá acesso aos mesmos equipamentos do setor
                      principal.
                    </span>
                  </div>

                  <div className='flex justify-end items-center min-w-16'>
                    <button
                      type='button'
                      onClick={() => {
                        handleSectorDataChange('inherit', !isOn)
                        setIsOn(!isOn)
                      }}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setIsOn(!isOn)
                        }
                      }}
                      aria-pressed={isOn}
                      className={`w-10 h-6 flex items-center bg-[--buttonPrimary] rounded-full p-1 cursor-pointer transition-colors ${
                        isOn ? '!bg-primary' : ''
                      }`}
                      tabIndex={0}
                    >
                      <div
                        className={`bg-[--backgroundPrimary] w-5 h-5 rounded-full shadow-md transform transition-transform ${
                          isOn ? 'translate-x-[13px]' : '-translate-x-[1px]'
                        }`}
                      ></div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className='flex flex-row justify-end w-full'>
            <div className='flex flex-row gap-3'>
              {sector &&
                sector !== '' &&
                (type === 'editSector' || type === 'editSubsector') && (
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

      {!hasPermission && (
        <div className='mt-16'>
          <PermissionDeniedScreen />
        </div>
      )}
    </div>
  )
}
