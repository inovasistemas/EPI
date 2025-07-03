import { AddIcon } from '@/components/Display/Icons/Add'
import { FilterIcon } from '@/components/Display/Icons/Filter'
import { FunnelIcon } from '@/components/Display/Icons/Funnel'
import { CreateButton } from '@/components/Navigation/CreateButton'
import classNames from 'classnames'
import { FC } from 'react'

const Operator: FC = async () => {
  return (
    <div className='flex flex-col gap-6 bg-[--backgroundSecondary] sm:pr-3 pb-8 sm:pb-3 w-full lg:h-[calc(100vh-50px)] overflow-auto'>
      <div className='flex flex-col items-start gap-6 bg-[--backgroundPrimary] sm:rounded-xl w-full h-full'>
        <div className='flex justify-end items-center gap-3 p-3 w-full'>
          {/* <h2 className='font-semibold text-2xl leading-none'>Operadores</h2> */}
          {/* <CreateButton
            label='Novo Operador'
            icon={
              <AddIcon
                fill='fill-white group-hover:fill-white'
                height='w-3'
                width='h-3'
                stroke='stroke-white'
              />
            }
            href='/clientes/novo'
          /> */}

          <button
            type='button'
            className={classNames(
              'flex gap-3 group relative justify-center items-center bg-[--buttonPrimary] hover:bg-[--buttonSecondary] rounded-lg h-10 text-[--textSecondary] transition-all duration-300 px-4 pr-5'
            )}
          >
            <FunnelIcon
              height='w-4'
              width='h-4'
              fill='fill-[--textSecondary]'
            />
            <span className='font-medium text-sm'>Filtros</span>
          </button>
        </div>

        <div className='w-full'>
          <ul className='w-full'>
            <li className='flex flex-col gap-3 bg-transparent hover:bg-[--buttonPrimary] p-3 px-6 w-full transition-all duration-300 cursor-pointer'>
              us_93d8a0d66ad2494f
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Operator
