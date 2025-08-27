import { EditIcon } from '@/components/Display/Icons/Edit'
import { Tag } from '@/components/Display/Tag'
import { NavAction } from '@/components/Inputs/Button/NavAction'
import { ActionGroupAdd } from '@/components/Surfaces/ActionGroupAdd'
import { GroupLabel } from '@/components/Utils/Label/GroupLabel'
import {
  useClearQueryParams,
  useQueryParams,
} from '@/components/Utils/UseQueryParams'
import { getPermissionGroups } from '@/services/PermissionGroups'
import { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { ToastError } from '../Toast/Error'

type PermissionGroupSettingsProps = {
  actionModal: () => void
}

type PermissionGroupsAccessType = {
  screen: string
  description: string
  show: boolean
  insert: boolean
  update: boolean
  delete: boolean
  password: boolean
  created_at: string
  updated_at?: string
}

type PermissionGroupsType = {
  uuid: string
  name: string
  active_users: number
  created_at: string
  updated_at?: string
  access: [PermissionGroupsAccessType]
}

type PermissionActionKey = 'insert' | 'update' | 'delete' | 'view'

export function PermissionGroupSettings({
  actionModal,
}: PermissionGroupSettingsProps) {
  const actions: { key: PermissionActionKey; label: string }[] = [
    { key: 'insert', label: 'Criar' },
    { key: 'update', label: 'Editar' },
    { key: 'delete', label: 'Excluir' },
    { key: 'view', label: 'Visualizar' },
  ]
  const setClearQueryParam = useClearQueryParams()
  const setQueryParam = useQueryParams()
  const [permissionGroups, setPermissionGroups] = useState<
    PermissionGroupsType[] | null
  >(null)
  const fetchedPermissionGroups = useRef(false)
  const handleClick = (id: string, type?: string) => {
    setClearQueryParam()

    if (type) {
      setQueryParam({
        type: type,
        permissionGroup: id,
      })
    } else {
      setQueryParam({
        permissionGroup: id,
      })
    }

    actionModal()
  }

  const fetchPermissionGroups = async () => {
    const response = await getPermissionGroups()

    if (response && response.status === 200) {
      setPermissionGroups(response.data.data)
    } else {
      toast.custom(() => (
        <ToastError text='Erro ao buscar os grupos de permissões' />
      ))
    }
  }

  useEffect(() => {
    if (fetchedPermissionGroups.current) return
    fetchedPermissionGroups.current = true
    fetchPermissionGroups()
  }, [])

  return (
    <div className='relative flex flex-col w-full h-full'>
      <div className='flex flex-col px-6 divide-y divide-[--border] h-full overflow-y-auto'>
        <div className='py-6 select-none'>
          <h2 className='font-medium text-xl leading-none'>
            Grupo de permissões
          </h2>
          <span className='opacity-60 text-[--textSecondary] text-sm'>
            Gerencie permissões por grupos e controle o acesso com facilidade.
          </span>
        </div>

        {permissionGroups?.map((permissionGroup, i) => (
          <div
            key={permissionGroup.uuid}
            className='items-start gap-6 grid grid-cols-1 py-6 select-none'
          >
            <div className='flex flex-col'>
              <div className='flex flex-row justify-between gap-2 itens-center'>
                <span className='font-medium capitalize'>
                  {permissionGroup.name.toLocaleLowerCase()}
                </span>

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
                    handleClick(permissionGroup.uuid, 'editPermissionGroup')
                  }
                />
              </div>
              <div>
                <div className='block relative col-span-full -mt-1 mb-4 -ml-1'>
                  <GroupLabel
                    isVisible={true}
                    label={`${permissionGroup.active_users} usuário nesse grupo`}
                    showFixed={false}
                  />
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-3 w-full'>
              <div className='block relative col-span-full mb-4 -ml-1'>
                <GroupLabel
                  isVisible={true}
                  label='Permissões'
                  showFixed={false}
                />
              </div>
              <div className='flex flex-wrap gap-2'>
                {permissionGroup.access.map((access, j) =>
                  actions.map((action, i) => {
                    if (action.key === 'insert' && access.insert) {
                      return (
                        <Tag
                          key={`${j}-${action.key}`}
                          label={`${action.label} ${access.description.toLocaleLowerCase()}`}
                        />
                      )
                    }
                    if (action.key === 'update' && access.update) {
                      return (
                        <Tag
                          key={`${j}-${action.key}`}
                          label={`${action.label} ${access.description.toLocaleLowerCase()}`}
                        />
                      )
                    }
                    if (action.key === 'delete' && access.delete) {
                      return (
                        <Tag
                          key={`${j}-${action.key}`}
                          label={`${action.label} ${access.description.toLocaleLowerCase()}`}
                        />
                      )
                    }
                    if (action.key === 'view' && access.show) {
                      return (
                        <Tag
                          key={`${j}-${action.key}`}
                          label={`${action.label} ${access.description.toLocaleLowerCase()}`}
                        />
                      )
                    }
                    return null
                  })
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <ActionGroupAdd onClick={actionModal} />
    </div>
  )
}
