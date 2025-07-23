import { EditIcon } from '@/components/Display/Icons/Edit'
import { NavAction } from '@/components/Inputs/Button/NavAction'
import { ActionGroupAdd } from '@/components/Surfaces/ActionGroupAdd'
import { GroupLabel } from '@/components/Utils/Label/GroupLabel'

export function SecuritySettings() {
  return (
    <div className='relative flex flex-col gap-3 w-full h-full'>
      <div className='px-3 h-full'>
        <ul className='px-3 divide-y divide-[--border]'>
          <li className='items-start gap-6 grid grid-cols-1 py-6 select-none'>
            <div className='flex flex-col'>
              <div className='flex flex-row justify-between gap-2 itens-center'>
                <span className='font-medium'>Manutenção Industrial</span>
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
                    label='1 colaborador nesse setor'
                    showFixed={false}
                  />
                </div>
              </div>
            </div>
          </li>
          <li className='items-start gap-6 grid grid-cols-1 py-6 select-none'>
            <div className='flex flex-col'>
              <div className='flex flex-row justify-between gap-2 itens-center'>
                <span className='font-medium'>Operação Máquinas</span>
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
                    label='1 colaborador nesse setor'
                    showFixed={false}
                  />
                </div>
              </div>
            </div>
          </li>
          <li className='items-start gap-6 grid grid-cols-1 py-6 select-none'>
            <div className='flex flex-col'>
              <div className='flex flex-row justify-between gap-2 itens-center'>
                <span className='font-medium'>Logística Interna</span>
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
                    label='3 colaboradores nesse setor'
                    showFixed={false}
                  />
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <ActionGroupAdd />
    </div>
  )
}
