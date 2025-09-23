'use client'
import { type FC, useState } from 'react'
import { GoBackButton } from '@/components/Navigation/GoBackButton'
import { ActionGroup } from '@/components/Surfaces/ActionGroup'
import { SecondaryButton } from '@/components/Buttons/SecondaryButton'
import { CalendarIcon } from '@/components/Display/Icons/Calendar'
import { PrimaryLink } from '@/components/Links/PrimaryLink'
import { AddIcon } from '@/components/Display/Icons/Add'
import { FormInput } from '@/components/Inputs/Text/FormInput'
import { MaskedInput } from '@/components/Inputs/Masked'
import { SearchSelect } from '@/components/Inputs/Select/SearchSelect'
import { DateInput } from '@/components/Inputs/Date'
import dayjs from 'dayjs'

const CreateOperator: FC = () => {
  const dateStart = dayjs()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    permissionGroup: '',
  })

  return (
    <div className='flex flex-col gap-6 bg-[--backgroundSecondary] sm:pr-3 pb-8 sm:pb-3 w-full lg:h-[calc(100vh-50px)] overflow-auto'>
      <div className='relative flex flex-col items-start bg-[--backgroundPrimary] sm:rounded-xl w-full h-full'>
        <div className='flex justify-between items-center gap-3 p-6 w-full'>
          <div className='flex flex-row items-center gap-3'>
            <GoBackButton href='/agenda' />

            <h2 className='font-medium text-xl leading-none select-none'>
              Adicionar cronograma
            </h2>
          </div>

          <div className='flex flex-row gap-3'>
            <SecondaryButton
              label='Nova Composição'
              onClick={function (): void {
                throw new Error('Function not implemented.')
              }}
              icon={
                <AddIcon
                  size='size-4'
                  stroke='stroke-white group-data-[active=true]:stroke-[--primaryColor]'
                  strokeWidth={2.5}
                />
              }
            />

            <PrimaryLink
              label='Adicionar Equipamento'
              icon={
                <AddIcon
                  size='size-4'
                  stroke='stroke-white group-data-[active=true]:stroke-[--primaryColor]'
                  strokeWidth={2.5}
                />
              }
              href='/equipamentos/novo'
            />
          </div>
        </div>

        <form className='flex flex-col gap-x-4 gap-y-10 w-full h-full overflow-y-auto'>
          <div className='gap-4 grid grid-cols-4 px-6 h-full'>
            <div className='col-span-2'>
              <div className='flex flex-col gap-4 bg-[--backgroundSecondary] p-4 rounded-2xl'>
                <div className='pb-1'>
                  <span className='text-[--textSecondary]'>
                    Escolha se o cronograma será aplicado a um colaborador, a um
                    setor ou simultaneamente aos dois.
                  </span>
                </div>
                <SearchSelect
                  value=''
                  name='collaborator'
                  options={[
                    { value: 'un', label: 'Unidade' },
                    { value: 'cx', label: 'Caixa' },
                    { value: 'pct', label: 'Pacote' },
                  ]}
                  placeholder='Colaborador'
                  required={false}
                  onChange={() => null}
                  background='bg-[--backgroundPrimary]'
                />

                <SearchSelect
                  value=''
                  name='sector'
                  options={[
                    { value: 'un', label: 'Unidade' },
                    { value: 'cx', label: 'Caixa' },
                    { value: 'pct', label: 'Pacote' },
                  ]}
                  placeholder='Setor'
                  required={false}
                  onChange={() => null}
                  background='bg-[--backgroundPrimary]'
                />
              </div>
            </div>

            <div className='col-span-2'>
              <div className='flex flex-col gap-4 bg-[--backgroundSecondary] p-4 rounded-2xl'>
                <div className='pb-1'>
                  <span className='text-[--textSecondary]'>
                    Esta data define o início das entregas recorrentes pelo
                    ciclo selecionado.
                  </span>
                </div>

                <DateInput
                  start={dateStart}
                  calendarType='day'
                  label='Primeira entrega'
                  background='bg-[--backgroundPrimary]'
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className='font-medium text-xl leading-none select-none'>
              Equipamentos
            </h2>
          </div>

          <ActionGroup onClick={() => null} showDelete={false} />
        </form>
      </div>
    </div>
  )
}

export default CreateOperator
