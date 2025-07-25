import { EditIcon } from '@/components/Display/Icons/Edit'
import { Tag } from '@/components/Display/Tag'
import { NavAction } from '@/components/Inputs/Button/NavAction'
import { ActionGroupAdd } from '@/components/Surfaces/ActionGroupAdd'
import { GroupLabel } from '@/components/Utils/Label/GroupLabel'
import {
  useClearQueryParams,
  useQueryParams,
} from '@/components/Utils/UseQueryParams'

type PermissionGroupSettingsProps = {
  actionModal: () => void
}

export function PermissionGroupSettings({
  actionModal,
}: PermissionGroupSettingsProps) {
  const setClearQueryParam = useClearQueryParams()
  const setQueryParam = useQueryParams()
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

        <li className='items-start gap-6 grid grid-cols-1 py-6 select-none'>
          <div className='flex flex-col'>
            <div className='flex flex-row justify-between gap-2 itens-center'>
              <span className='font-medium'>Administrador</span>
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
                action={() => handleClick('1', 'editPermissionGroup')}
              />
            </div>
            <div>
              <div className='block relative col-span-full -mt-1 mb-4 -ml-1'>
                <GroupLabel
                  isVisible={true}
                  label='1 usuário nesse grupo'
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
              <Tag label='Visualizar Equipamento' />
              <Tag label='Criar Equipamento' />
              <Tag label='Excluir Equipamento' />
              <Tag label='Atualizar Equipamento' />
              <Tag label='Visualizar Colaborador' />
              <Tag label='Criar Colaborador' />
              <Tag label='Excluir Colaborador' />
              <Tag label='Atualizar Colaborador' />
              <Tag label='Visualizar Usuários' />
              <Tag label='Criar Usuários' />
              <Tag label='Excluir Usuários' />
              <Tag label='Atualizar Usuários' />
              <Tag label='Visualizar Relatório' />
              <Tag label='Criar Relatório' />
              <Tag label='Excluir Relatório' />
              <Tag label='Atualizar Relatório' />
            </div>
          </div>
        </li>
        <li className='items-start gap-6 grid grid-cols-1 py-6 select-none'>
          <div className='flex flex-col'>
            <div className='flex flex-row justify-between gap-2 itens-center'>
              <span className='font-medium'>Financeiro</span>
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
                action={() => handleClick('2', 'editPermissionGroup')}
              />
            </div>
            <div>
              <div className='block relative col-span-full -mt-1 mb-4 -ml-1'>
                <GroupLabel
                  isVisible={true}
                  label='1 usuário nesse grupo'
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
              <Tag label='Visualizar Equipamento' />
              <Tag label='Atualizar Equipamento' />
              <Tag label='Visualizar Colaborador' />
              <Tag label='Atualizar Colaborador' />
              <Tag label='Visualizar Relatório' />
              <Tag label='Criar Relatório' />
              <Tag label='Excluir Relatório' />
              <Tag label='Atualizar Relatório' />
            </div>
          </div>
        </li>
        <li className='items-start gap-6 grid grid-cols-1 py-6 select-none'>
          <div className='flex flex-col'>
            <div className='flex flex-row justify-between gap-2 itens-center'>
              <span className='font-medium'>Operador</span>
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
                action={() => handleClick('3', 'editPermissionGroup')}
              />
            </div>
            <div>
              <div className='block relative col-span-full -mt-1 mb-4 -ml-1'>
                <GroupLabel
                  isVisible={true}
                  label='3 usuários nesse grupo'
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
              <Tag label='Visualizar Equipamento' />
              <Tag label='Visualizar Colaborador' />
            </div>
          </div>
        </li>
      </div>

      <ActionGroupAdd onClick={actionModal} />
    </div>
  )
}
