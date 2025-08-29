import { EditIcon } from '@/components/Display/Icons/Edit'
import { Tag } from '@/components/Display/Tag'
import { NavAction } from '@/components/Inputs/Button/NavAction'
import { ActionGroupAdd } from '@/components/Surfaces/ActionGroupAdd'
import { GroupLabel } from '@/components/Utils/Label/GroupLabel'
import {
  useClearQueryParams,
  useQueryParams,
} from '@/components/Utils/UseQueryParams'
import {
  deletePermissionGroup,
  getPermissionGroups,
} from '@/services/PermissionGroups'
import { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { ToastError } from '../Toast/Error'
import { Modal } from '@/components/Display/Modal'
import { PermissionGroup } from '../PermissionGroup'
import cn from 'classnames'

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
  const [selectedPermissionGroup, setSelectedPermissionGroup] = useState('')
  const [permissionGroupModalProps, setPermissionGroupModalProps] = useState('')
  const actions: { key: PermissionActionKey; label: string }[] = [
    { key: 'insert', label: 'Criar' },
    { key: 'update', label: 'Editar' },
    { key: 'delete', label: 'Excluir' },
    { key: 'view', label: 'Visualizar' },
  ]
  const [permissionGroups, setPermissionGroups] = useState<
    PermissionGroupsType[] | null
  >(null)
  const fetchedPermissionGroups = useRef(false)

  const handleClick = (id: string) => {
    setSelectedPermissionGroup(id)
    setPermissionGroupModalProps(id)
    handleCloseModal()
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

  const [modalStatus, setModalStatus] = useState(false)
  const [modalConfirmationStatus, setModalConfirmationStatus] = useState(false)

  const handleCloseModal = () => {
    setModalStatus(prev => !prev)
  }

  const handleCloseModalConfirmation = () => {
    setModalConfirmationStatus(prev => !prev)
  }

  const handleDeletePermissionGroup = async () => {
    const response = await deletePermissionGroup(selectedPermissionGroup || '')

    if (response && response.status === 204) {
      fetchPermissionGroups()
      handleCloseModalConfirmation()
      handleCloseModal()
    } else {
      toast.custom(() => (
        <ToastError text='Erro ao excluir o grupo de permissões' />
      ))
    }
  }

  return (
    <>
      <Modal
        title='Filtros'
        size='small'
        isModalOpen={modalStatus}
        handleClickOverlay={handleCloseModal}
        overflow={true}
      >
        <PermissionGroup
          permissionGroupId={permissionGroupModalProps}
          confirmationModal={handleCloseModalConfirmation}
          reloadAction={fetchPermissionGroups}
          modalStatus={handleCloseModal}
        />
      </Modal>
      <Modal
        title=''
        size='extra-small'
        isModalOpen={modalConfirmationStatus}
        handleClickOverlay={handleCloseModalConfirmation}
        showClose={false}
      >
        <div className='flex flex-col gap-2'>
          <span className='font-medium text-xl text-center'>
            Tem certeza que deseja excluir o grupo de permissão?
          </span>
          <span className='px-6 text-base text-center'>
            Esta ação é irreversível e todos os dados associados serão
            permanentemente apagados.
          </span>

          <div className='flex flex-row justify-center gap-3 pt-6'>
            <button
              type='button'
              onClick={handleDeletePermissionGroup}
              className={cn(
                'group group z-[55] relative flex justify-center items-center gap-3 bg-[--errorLoader] px-8 rounded-xl h-10 text-white active:scale-95 transition-all duration-300 cursor-pointer select-none'
              )}
            >
              <span className='font-medium text-white text-sm transition-all duration-300'>
                Confirmar
              </span>
            </button>

            <button
              type='button'
              onClick={handleCloseModalConfirmation}
              className={cn(
                'group z-[55] relative flex justify-center items-center gap-3 bg-[--buttonPrimary] hover:bg-[--buttonSecondary] px-8 rounded-xl h-10 text-white active:scale-95 transition-all duration-300 cursor-pointer select-none'
              )}
            >
              <span className='font-medium text-[--textSecondary] text-sm'>
                Cancelar
              </span>
            </button>
          </div>
        </div>
      </Modal>
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
                    action={() => handleClick(permissionGroup.uuid)}
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

        <ActionGroupAdd onClick={handleClick} />
      </div>
    </>
  )
}
