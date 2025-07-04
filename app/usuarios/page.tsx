'use client'
import { AddIcon } from '@/components/Display/Icons/Add'
import { CarretUpDown } from '@/components/Display/Icons/CaretUpDown'
import { FilterIcon } from '@/components/Display/Icons/Filter'
import { FunnelIcon } from '@/components/Display/Icons/Funnel'
import { SmallSelect } from '@/components/Inputs/Select/SmallSelect'
import { FormInput } from '@/components/Inputs/Text/FormInput'
import { CreateButton } from '@/components/Navigation/CreateButton'
import { MenuCard } from '@/components/Navigation/MenuCard'
import { FilterUser } from '@/components/Template/Filter/User'
import { PaginationSummary } from '@/components/Utils/PaginationSummary'
import classNames from 'classnames'
import { FC, useCallback, useState } from 'react'

const Operator: FC = () => {
  const exibition = [
    { value: '100', label: '100' },
    { value: '200', label: '200' },
    { value: '500', label: '500' },
    { value: '1000', label: '1000' },
    { value: '5000', label: '5000' },
  ]

  enum MenuCards {
    Filter,
    Default,
  }
  const [isCardOpen, setCardOpen] = useState(MenuCards.Default)

  const handleClickOverlay = useCallback(() => {
    setCardOpen(MenuCards.Default)
  }, [])

  const handleFilterClick = useCallback(() => {
    setCardOpen(
      isCardOpen === MenuCards.Filter ? MenuCards.Default : MenuCards.Filter
    )
  }, [isCardOpen])

  return (
    <div className='flex flex-col gap-6 bg-[--backgroundSecondary] sm:pr-3 pb-8 sm:pb-3 w-full lg:h-[calc(100vh-50px)] overflow-auto'>
      <div className='flex flex-col items-start gap-6 bg-[--backgroundPrimary] sm:rounded-xl w-full h-full'>
        <div className='flex justify-between items-center gap-3 p-6 w-full'>
          <h2 className='font-medium text-2xl leading-none select-none'>
            Usuários
          </h2>

          <div className='flex flex-row gap-3'>
            <FilterUser
              onClick={handleFilterClick}
              action={handleClickOverlay}
              title={'Filtrar'}
              type={'button'}
              isOpen={isCardOpen}
            />

            <button
              type='button'
              className={classNames(
                'select-none active:scale-95 z-[55] cursor-pointer flex gap-3 group relative justify-center items-center bg-primary hover:bg-primaryDarker rounded-lg h-10 text-white transition-all duration-300 px-4 pr-5'
              )}
            >
              <AddIcon
                height='w-3'
                width='h-3'
                fill='fill-white'
                stroke='stroke-white'
              />
              <span className='font-medium text-sm'>Adicionar</span>
            </button>
          </div>
        </div>

        <div className='w-full'>
          <ul className='flex flex-col gap-2 px-3'>
            <li className='gap-3 grid grid-cols-12 px-6 font-medium text-[--textSecondary] text-sm'>
              <div className='col-span-3 py-3'>
                <button
                  type='button'
                  className='flex items-center gap-2 hover:opacity-60 truncate transition-all duration-300'
                >
                  <span>Nome</span>
                  <CarretUpDown
                    fill='fill-[--textSecondary]'
                    height='h-4'
                    width='w-4'
                  />
                </button>
              </div>
              <div className='col-span-2 py-3'>
                <button
                  type='button'
                  className='flex items-center gap-2 hover:opacity-60 truncate transition-all duration-300'
                >
                  <span>Código</span>
                  <CarretUpDown
                    fill='fill-[--textSecondary]'
                    height='h-4'
                    width='w-4'
                  />
                </button>
              </div>
              <div className='col-span-3 py-3'>
                <button
                  type='button'
                  className='flex items-center gap-2 hover:opacity-60 truncate transition-all duration-300'
                >
                  <span>Usuário</span>
                  <CarretUpDown
                    fill='fill-[--textSecondary]'
                    height='h-4'
                    width='w-4'
                  />
                </button>
              </div>
              <div className='col-span-2 py-3'>
                <button
                  type='button'
                  className='flex items-center gap-2 hover:opacity-60 truncate transition-all duration-300'
                >
                  <span>Permissões</span>
                  <CarretUpDown
                    fill='fill-[--textSecondary]'
                    height='h-4'
                    width='w-4'
                  />
                </button>
              </div>
              <div className='flex justify-end col-span-2 py-3'>
                <button
                  type='button'
                  className='flex items-center gap-2 hover:opacity-60 truncate transition-all duration-300'
                >
                  <span>Criado em</span>
                  <CarretUpDown
                    fill='fill-[--textSecondary]'
                    height='h-4'
                    width='w-4'
                  />
                </button>
              </div>
            </li>
            {[...Array(3)].map((_, i) => (
              <li className='gap-3 grid grid-cols-12 bg-[#3D3F42]/50 px-3 rounded-xl font-normal text-[--textSecondary] text-sm capitalize transition-all duration-300'>
                <div className='flex items-center gap-3 col-span-3 py-4 font-medium'>
                  <input
                    type='checkbox'
                    name='user[]'
                    className='rounded focus:ring-2 focus:ring-primaryDarker focus:ring-offset-0 text-primaryDarker'
                  />
                  <span>inova teste</span>
                </div>
                <div className='col-span-2 py-4 font-medium'>
                  op_93d8a0d66ad2494f
                </div>
                <div className='col-span-3 py-4 lowercase'>
                  teste@inovasistemas
                </div>
                <div className='col-span-2 py-4'>admin</div>
                <div className='col-span-2 py-4 pr-1 text-right lowercase'>
                  10/06/2025
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* <div className='w-full'>
          <ul className='w-full'>
            <li className='flex flex-col gap-3 bg-transparent hover:bg-[--buttonPrimary] p-3 px-6 w-full transition-all duration-300 cursor-pointer'>
              us_93d8a0d66ad2494f
            </li>
          </ul>
        </div> */}

        {/* <div className='flex justify-end items-center px-6 w-full'>
          <div className='flex flex-row justify-between items-center gap-6'>
            <PaginationSummary from={1} to={3} total={246} />
            <div className='min-w-36'>
              <SmallSelect label='/ página' name='status' options={exibition} />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default Operator
