import { useEffect, useRef, useState } from 'react'
import { FloppyDiskIcon } from '@/components/Display/Icons/FloppyDisk'
import { FormInput } from '@/components/Inputs/Text/FormInput'
import { TrashIcon } from '@/components/Display/Icons/Trash'
import {
  createPermissionGroup,
  getPermissionGroup,
  getPermissionGroupTemplate,
  updatePermissionGroup,
} from '@/services/PermissionGroup'
import { ToastError } from '../Toast/Error'
import { toast } from 'sonner'
import { ToastSuccess } from '../Toast/Success'
import { PermissionDeniedScreen } from '@/components/Features/PermissionDenied'
import { ActionGroupAdd } from '@/components/Surfaces/ActionGroupAdd'

type Permissions = {
  id: string
  name: string
  checked: boolean
}

type PermissionScreens = {
  screen: string
  description: string
  created_at: string
  updated_at: string | null
  permissions: Permissions[]
}

type PermissionGroup = {
  uuid: string
  name: string
  created_at: string
  updated_at: string | null
  screens: PermissionScreens[]
}

type PermissionGroupProps = {
  confirmationModal: () => void
  permissionGroupId?: string
  reloadAction: () => void
  modalStatus: () => void
}

export function PermissionGroup({
  permissionGroupId,
  confirmationModal,
  reloadAction,
  modalStatus,
}: PermissionGroupProps) {
  const fetchedPermissionGroup = useRef(false)
  const [hasChecked, setHasChecked] = useState(false)
  const [hasPermission, setHasPermission] = useState(true)
  const [permissionGroups, setPermissionGroups] = useState<PermissionGroup>()

  const fetchPermissionGroup = async (id: string) => {
    const response = await getPermissionGroup(id)

    if (response) {
      if (response.status === 200) {
        setPermissionGroups(response.data.data)
      } else if (response.status === 403) {
        setHasPermission(false)
      } else {
        toast.custom(() => (
          <ToastError text='Não foi possível buscar os grupos de permissões' />
        ))
      }
    } else {
      toast.custom(() => (
        <ToastError text='Não foi possível buscar os grupos de permissões' />
      ))
    }
  }

  const fetchPermissionGroupTemplate = async () => {
    const response = await getPermissionGroupTemplate()

    if (response) {
      if (response.status === 200) {
        setPermissionGroups(response.data.data)
      } else if (response.status === 403) {
        toast.custom(() => (
          <ToastError text='Você não possui permissão para buscar os grupos de permissões' />
        ))
      } else {
        toast.custom(() => (
          <ToastError text='Não foi possível carregar os grupos de permissões' />
        ))
      }
    } else {
      toast.custom(() => (
        <ToastError text='Não foi possível carregar os grupos de permissões' />
      ))
    }
  }

  const handleUpdatePermissionGroup = async () => {
    if (permissionGroupId) {
      const response = await updatePermissionGroup({
        id: permissionGroupId || '',
        payload: permissionGroups,
      })

      if (response) {
        if (response.status === 200) {
          reloadAction()
          toast.custom(() => (
            <ToastSuccess text='Grupo de permissões atualizado com sucesso' />
          ))
        } else if (response.status === 403) {
          toast.custom(() => (
            <ToastError text='Você não possui permissão para esta ação' />
          ))
        } else {
          toast.custom(() => (
            <ToastError text='Não foi possível atualizar o grupo de permissões' />
          ))
        }
      } else {
        toast.custom(() => (
          <ToastError text='Não foi possível atualizar o grupo de permissões' />
        ))
      }
    } else {
      const response = await createPermissionGroup({
        payload: permissionGroups,
      })

      if (response) {
        if (response.status === 201) {
          reloadAction()
          toast.custom(() => (
            <ToastSuccess text='Grupo de permissões criado com sucesso' />
          ))
          modalStatus()
        } else if (response.status === 403) {
          toast.custom(() => (
            <ToastError text='Você não possui permissão para esta ação' />
          ))
        } else {
          toast.custom(() => (
            <ToastError text='Não foi possível criar o grupo de permissões. Verifique os campos obrigatórios e tente novamente' />
          ))
        }
      } else {
        toast.custom(() => (
          <ToastError text='Não foi possível criar o grupo de permissões. Verifique os campos obrigatórios e tente novamente' />
        ))
      }
    }
  }

  useEffect(() => {
    if (permissionGroupId) {
      if (fetchedPermissionGroup.current) return
      fetchedPermissionGroup.current = true
      fetchPermissionGroup(permissionGroupId)
    } else {
      if (fetchedPermissionGroup.current) return
      fetchedPermissionGroup.current = true
      fetchPermissionGroupTemplate()
    }
  }, [permissionGroupId])

  const handleGroupPermissionName = (name: string) => {
    setPermissionGroups(prev => {
      if (!prev) return undefined
      return {
        ...prev,
        name,
      }
    })
  }

  return (
    <div className='relative flex flex-col w-full h-full'>
      <div className='flex flex-col gap-3 px-6 h-full overflow-y-auto'>
      {hasPermission && (
        <>
          <div className='flex flex-col items-center gap-3 w-full'>
            <h2 className='font-medium text-xl leading-none'>
              {!permissionGroupId && 'Adicionar novo grupo de permissões'}
              {permissionGroupId && 'Editar grupo de permissões'}
            </h2>
            <div className='flex flex-col'>
              <span className='opacity-60 text-[--textSecondary] text-sm text-center'>
                Adicione um novo setor para organizar as áreas principais da
                empresa.
              </span>
            </div>
          </div>

          <div className='gap-3 w-full'>
            <FormInput
              name='name'
              label='Nome'
              required={false}
              type='text'
              value={permissionGroups?.name.toLocaleLowerCase()}
              position='right'
              onChange={e => handleGroupPermissionName(e.target.value)}
              textTransform='capitalize'
            />
          </div>

          <div className='flex flex-col gap-3 divide-y divide-[--border] w-full'>
            {permissionGroups?.screens.map(permissionGroup => (
              <div key={permissionGroup.screen} className='py-6 w-full'>
                <div className='grid grid-cols-2'>
                  <div className='flex justify-start items-start'>
                    <div className='flex items-center gap-2'>
                      <input
                        id={permissionGroup.screen}
                        type='checkbox'
                        name={`${permissionGroup.screen}[]`}
                        className='rounded focus:ring-2 focus:ring-primaryDarker focus:ring-offset-0 text-[--secondaryColor] checkboxSecondary'
                        checked={permissionGroup.permissions.every(p => p.checked)}
                        onChange={e => {
                          const newValue = e.target.checked
                          setPermissionGroups(prev => {
                            if (!prev) return prev
                            return {
                              ...prev,
                              screens: prev.screens.map(group =>
                                group.screen === permissionGroup.screen
                                  ? {
                                      ...group,
                                      permissions: group.permissions.map(p => ({
                                        ...p,
                                        checked: newValue,
                                      })),
                                    }
                                  : group
                              ),
                            }
                          })
                        }}
                      />
                      <label
                        htmlFor={permissionGroup.screen}
                        className='font-medium text-sm select-none'
                      >
                        {permissionGroup.description}
                      </label>
                    </div>
                  </div>
                  <ul className='items-start gap-1 grid grid-cols-2'>
                    {permissionGroup.permissions.map((permission, j) => (
                      <li key={permission.id}>
                        <div className='flex items-center gap-2 h-full'>
                          <input
                            id={permission.id}
                            type='checkbox'
                            name={`${permissionGroup.screen}[]`}
                            checked={permission.checked}
                            onChange={e => {
                              const newValue = e.target.checked
                              setPermissionGroups(prev => {
                                if (!prev) return prev
                                return {
                                  ...prev,
                                  screens: prev.screens.map(group =>
                                    group.screen === permissionGroup.screen
                                      ? {
                                          ...group,
                                          permissions: group.permissions.map(p =>
                                            p.id === permission.id
                                              ? { ...p, checked: newValue }
                                              : p
                                          ),
                                        }
                                      : group
                                  ),
                                }
                              })
                            }}
                            className='rounded focus:ring-2 focus:ring-primaryDarker focus:ring-offset-0 text-[--secondaryColor] checkboxSecondary'
                          />

                          <label
                            htmlFor={permission.id}
                            className='font-regular text-sm select-none'
                          >
                            {permission.name}
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {!hasPermission && (
        <div className='mt-10'>
          <PermissionDeniedScreen />
        </div>
      )}
      </div>

      <div className='bottom-0 z-[201] sticky inset-x-0 flex justify-end items-center gap-3 bg-[--backgroundPrimary] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-3 rounded-b-xl w-full text-sm transition-all duration-300'>
        <div className='flex justify-end items-center gap-3 w-full'>
          {permissionGroupId && (
            <button
              type='button'
              onClick={confirmationModal}
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
            onClick={handleUpdatePermissionGroup}
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
    </div>
  )
}
