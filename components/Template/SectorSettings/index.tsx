import { AddIcon } from '@/components/Display/Icons/Add'
import { ArrowMoveDownIcon } from '@/components/Display/Icons/ArrowMoveDown'
import { EditIcon } from '@/components/Display/Icons/Edit'
import { SubIcon } from '@/components/Display/Icons/Sub'
import { NavAction } from '@/components/Inputs/Button/NavAction'
import { Subsector } from '@/components/Inputs/Button/Subsector'
import { ActionGroupAdd } from '@/components/Surfaces/ActionGroupAdd'
import { GroupLabel } from '@/components/Utils/Label/GroupLabel'

type SectorSettingsProps = {
  actionModal: () => void
}

export function SectorSettings({ actionModal }: SectorSettingsProps) {
  return (
    <div className='relative flex flex-col w-full h-full'>
      <div className='flex flex-col px-6 divide-y divide-[--border] h-full overflow-y-auto'>
        <div className='py-6 select-none'>
          <h2 className='font-medium text-xl leading-none'>
            Setores e substores
          </h2>
          <span className='opacity-60 text-[--textSecondary] text-sm'>
            Monte a estrutura da sua empresa com setores e subsetores
            personalizados.
          </span>
        </div>

        <li className='items-start gap-6 grid grid-cols-1 py-6 select-none'>
          <div className='flex flex-col'>
            <div className='flex flex-row justify-between gap-2 itens-center'>
              <span className='font-medium'>Manutenção Máquinas</span>
              <div className='flex flex-row items-center gap-2'>
                <button
                  onClick={actionModal}
                  type='button'
                  className='group z-[200] relative flex justify-center items-center gap-2 bg-[--backgroundSecondary] hover:bg-[--buttonHover] px-3 pr-4 rounded-xl h-8 text-zinc-200 active:scale-95 transition'
                >
                  <SubIcon
                    size='size-4'
                    stroke='stroke-[--textSecondary] group-data-[active=true]:stroke-[--primaryColor]'
                    strokeWidth={2}
                  />
                  <span className='font-medium text-[--textSecondary] text-xs'>
                    Adicionar Subsetor
                  </span>
                </button>
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

            <div className='pt-6'>
              <div className='block relative col-span-full mb-4 -ml-1'>
                <GroupLabel
                  isVisible={true}
                  label='Subsetores'
                  showFixed={false}
                />
              </div>
            </div>

            <div className='flex flex-wrap gap-2 pt-3'>
              <Subsector label='Manutenção Máquinas 1' onClick={actionModal} />
              <Subsector label='Manutenção Máquinas 2' onClick={actionModal} />
              <Subsector label='Manutenção Máquinas 3' onClick={actionModal} />
              <Subsector label='Manutenção Máquinas 4' onClick={actionModal} />
            </div>
          </div>
        </li>

        <li className='items-start gap-6 grid grid-cols-1 py-6 select-none'>
          <div className='flex flex-col'>
            <div className='flex flex-row justify-between gap-2 itens-center'>
              <span className='font-medium'>Operação Máquinas</span>
              <div className='flex flex-row items-center gap-2'>
                <button
                  onClick={actionModal}
                  type='button'
                  className='group z-[200] relative flex justify-center items-center gap-2 bg-[--backgroundSecondary] hover:bg-[--buttonHover] px-3 pr-4 rounded-xl h-8 text-zinc-200 active:scale-95 transition'
                >
                  <SubIcon
                    size='size-4'
                    stroke='stroke-[--textSecondary] group-data-[active=true]:stroke-[--primaryColor]'
                    strokeWidth={2}
                  />
                  <span className='font-medium text-[--textSecondary] text-xs'>
                    Adicionar Subsetor
                  </span>
                </button>
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

            <div className='pt-6'>
              <div className='block relative col-span-full mb-4 -ml-1'>
                <GroupLabel
                  isVisible={true}
                  label='Subsetores'
                  showFixed={false}
                />
              </div>
            </div>

            <div className='flex flex-wrap gap-2 pt-3'>
              <Subsector label='Operação Máquinas 1' onClick={actionModal} />
              <Subsector label='Operação Máquinas 2' onClick={actionModal} />
            </div>
          </div>
        </li>
        <li className='items-start gap-6 grid grid-cols-1 py-6 select-none'>
          <div className='flex flex-col'>
            <div className='flex flex-row justify-between gap-2 itens-center'>
              <span className='font-medium'>Logística Interna</span>
              <div className='flex flex-row items-center gap-2'>
                <button
                  onClick={actionModal}
                  type='button'
                  className='group z-[200] relative flex justify-center items-center gap-2 bg-[--backgroundSecondary] hover:bg-[--buttonHover] px-3 pr-4 rounded-xl h-8 text-zinc-200 active:scale-95 transition'
                >
                  <SubIcon
                    size='size-4'
                    stroke='stroke-[--textSecondary] group-data-[active=true]:stroke-[--primaryColor]'
                    strokeWidth={2}
                  />
                  <span className='font-medium text-[--textSecondary] text-xs'>
                    Adicionar Subsetor
                  </span>
                </button>
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
      </div>

      <ActionGroupAdd addLabel='Adicionar' onClick={actionModal} />
    </div>
  )
}
