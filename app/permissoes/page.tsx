'use client'
import { AddIcon } from '@/components/Display/Icons/Add'
import { FilterUser } from '@/components/Template/Filter/User'
import classNames from 'classnames'
import { FC, useCallback, useState } from 'react'

const Permission: FC = () => {
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
            Permissões
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

        {/* <div className='w-full'>
          <ul className='px-3 divide-y divide-zinc-700'>
            <li className='grid grid-cols-12 px-3 py-3 font-medium text-[--textSecondary] text-sm'>
              <div className='col-span-2'>Código</div>
              <div className='col-span-4'>Nome</div>
              <div className='col-span-3'>Usuário</div>
              <div className='col-span-2'>Permissão</div>
              <div className='col-span-1'></div>
            </li>
            <li className='grid grid-cols-12 px-3 py-3 !border-t-0 font-normal text-[--textSecondary] text-sm capitalize'>
              <div className='col-span-2 lowercase'>op_93d8a0d66ad2494f</div>
              <div className='col-span-4'>teste</div>
              <div className='col-span-3'>admin</div>
              <div className='col-span-2'>admin</div>
              <div className='col-span-1'></div>
            </li>
            <li className='grid grid-cols-12 px-3 py-3 font-normal text-[--textSecondary] text-sm capitalize'>
              <div className='col-span-2 lowercase'>op_93d8a0d66ad2494f</div>
              <div className='col-span-4'>teste</div>
              <div className='col-span-3'>admin</div>
              <div className='col-span-2'>admin</div>
              <div className='col-span-1'></div>
            </li>
            <li className='grid grid-cols-12 px-3 py-3 font-normal text-[--textSecondary] text-sm capitalize'>
              <div className='col-span-2 lowercase'>op_93d8a0d66ad2494f</div>
              <div className='col-span-4'>teste</div>
              <div className='col-span-3'>admin</div>
              <div className='col-span-2'>admin</div>
              <div className='col-span-1'></div>
            </li>
            <li className='grid grid-cols-12 px-3 py-3 font-normal text-[--textSecondary] text-sm capitalize'>
              <div className='col-span-2 lowercase'>op_93d8a0d66ad2494f</div>
              <div className='col-span-4'>teste</div>
              <div className='col-span-3'>admin</div>
              <div className='col-span-2'>admin</div>
              <div className='col-span-1'></div>
            </li>
            <li className='grid grid-cols-12 px-3 py-3 font-normal text-[--textSecondary] text-sm capitalize'>
              <div className='col-span-2 lowercase'>op_93d8a0d66ad2494f</div>
              <div className='col-span-4'>teste</div>
              <div className='col-span-3'>admin</div>
              <div className='col-span-2'>admin</div>
              <div className='col-span-1'></div>
            </li>
            <li className='grid grid-cols-12 px-3 py-3 font-normal text-[--textSecondary] text-sm capitalize'>
              <div className='col-span-2 lowercase'>op_93d8a0d66ad2494f</div>
              <div className='col-span-4'>teste</div>
              <div className='col-span-3'>admin</div>
              <div className='col-span-2'>admin</div>
              <div className='col-span-1'></div>
            </li>
          </ul>
        </div> */}

        {/* <div className='w-full'>
          <ul className='w-full'>
            <li className='flex flex-col gap-3 bg-transparent hover:bg-[--buttonPrimary] p-3 px-6 w-full transition-all duration-300 cursor-pointer'>
              us_93d8a0d66ad2494f
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  )
}

export default Permission
