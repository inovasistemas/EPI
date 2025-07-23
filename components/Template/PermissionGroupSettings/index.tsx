import { EditIcon } from '@/components/Display/Icons/Edit'
import { NavAction } from '@/components/Inputs/Button/NavAction'
import { ActionGroupAdd } from '@/components/Surfaces/ActionGroupAdd'
import { GroupLabel } from '@/components/Utils/Label/GroupLabel'

export function PermissionGroupSettings() {
  return (
    <div className='relative flex flex-col w-full h-full'>
      <div className='flex flex-col px-6 divide-y divide-[--border] h-full overflow-y-auto'>
        <div className='py-6 select-none'>
          <h2 className='font-medium text-xl'>Grupo de permissões</h2>
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
                action={() => null}
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
              <span className='bg-blue-600/10 px-2 py-1 rounded-md font-medium text-[--primaryColor] text-[10px] whitespace-nowrap'>
                Visualizar Equipamento
              </span>
              <span className='bg-blue-600/10 px-2 py-1 rounded-md font-medium text-[--primaryColor] text-[10px] whitespace-nowrap'>
                Criar Equipamento
              </span>
              <span className='bg-blue-600/10 px-2 py-1 rounded-md font-medium text-[--primaryColor] text-[10px] whitespace-nowrap'>
                Excluir Equipamento
              </span>
              <span className='bg-blue-600/10 px-2 py-1 rounded-md font-medium text-[--primaryColor] text-[10px] whitespace-nowrap'>
                Atualizar Equipamento
              </span>
              <span className='bg-blue-600/10 px-2 py-1 rounded-md font-medium text-[--primaryColor] text-[10px] whitespace-nowrap'>
                Visualizar Colaborador
              </span>
              <span className='bg-blue-600/10 px-2 py-1 rounded-md font-medium text-[--primaryColor] text-[10px] whitespace-nowrap'>
                Criar Colaborador
              </span>
              <span className='bg-blue-600/10 px-2 py-1 rounded-md font-medium text-[--primaryColor] text-[10px] whitespace-nowrap'>
                Excluir Colaborador
              </span>
              <span className='bg-blue-600/10 px-2 py-1 rounded-md font-medium text-[--primaryColor] text-[10px] whitespace-nowrap'>
                Atualizar Colaborador
              </span>
              <span className='bg-blue-600/10 px-2 py-1 rounded-md font-medium text-[--primaryColor] text-[10px] whitespace-nowrap'>
                Visualizar Usuários
              </span>
              <span className='bg-blue-600/10 px-2 py-1 rounded-md font-medium text-[--primaryColor] text-[10px] whitespace-nowrap'>
                Criar Usuários
              </span>
              <span className='bg-blue-600/10 px-2 py-1 rounded-md font-medium text-[--primaryColor] text-[10px] whitespace-nowrap'>
                Excluir Usuários
              </span>
              <span className='bg-blue-600/10 px-2 py-1 rounded-md font-medium text-[--primaryColor] text-[10px] whitespace-nowrap'>
                Atualizar Usuários
              </span>
              <span className='bg-blue-600/10 px-2 py-1 rounded-md font-medium text-[--primaryColor] text-[10px] whitespace-nowrap'>
                Visualizar Relatório
              </span>
              <span className='bg-blue-600/10 px-2 py-1 rounded-md font-medium text-[--primaryColor] text-[10px] whitespace-nowrap'>
                Criar Relatório
              </span>
              <span className='bg-blue-600/10 px-2 py-1 rounded-md font-medium text-[--primaryColor] text-[10px] whitespace-nowrap'>
                Excluir Relatório
              </span>
              <span className='bg-blue-600/10 px-2 py-1 rounded-md font-medium text-[--primaryColor] text-[10px] whitespace-nowrap'>
                Atualizar Relatório
              </span>
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
                action={() => null}
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
              <span className='bg-blue-600/10 px-2 py-1 rounded-md font-medium text-[--primaryColor] text-[10px] whitespace-nowrap'>
                Visualizar Equipamento
              </span>
              <span className='bg-blue-600/10 px-2 py-1 rounded-md font-medium text-[--primaryColor] text-[10px] whitespace-nowrap'>
                Atualizar Equipamento
              </span>
              <span className='bg-blue-600/10 px-2 py-1 rounded-md font-medium text-[--primaryColor] text-[10px] whitespace-nowrap'>
                Visualizar Colaborador
              </span>
              <span className='bg-blue-600/10 px-2 py-1 rounded-md font-medium text-[--primaryColor] text-[10px] whitespace-nowrap'>
                Atualizar Colaborador
              </span>
              <span className='bg-blue-600/10 px-2 py-1 rounded-md font-medium text-[--primaryColor] text-[10px] whitespace-nowrap'>
                Visualizar Relatório
              </span>
              <span className='bg-blue-600/10 px-2 py-1 rounded-md font-medium text-[--primaryColor] text-[10px] whitespace-nowrap'>
                Criar Relatório
              </span>
              <span className='bg-blue-600/10 px-2 py-1 rounded-md font-medium text-[--primaryColor] text-[10px] whitespace-nowrap'>
                Excluir Relatório
              </span>
              <span className='bg-blue-600/10 px-2 py-1 rounded-md font-medium text-[--primaryColor] text-[10px] whitespace-nowrap'>
                Atualizar Relatório
              </span>
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
                action={() => null}
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
              <span className='bg-blue-600/10 px-2 py-1 rounded-md font-medium text-[--primaryColor] text-[10px] whitespace-nowrap'>
                Visualizar Equipamento
              </span>
              <span className='bg-blue-600/10 px-2 py-1 rounded-md font-medium text-[--primaryColor] text-[10px] whitespace-nowrap'>
                Visualizar Colaborador
              </span>
            </div>
          </div>
        </li>
      </div>

      <ActionGroupAdd />
    </div>
  )
}
