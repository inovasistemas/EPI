'use client'
import Link from 'next/link'
import { ArrowsOutSimple, CaretDown } from '@phosphor-icons/react'
import { NavAction } from '@/components/Inputs/Button/NavAction'
import { MenuCard } from '@/components/Navigation/MenuCard'
import { useCallback, useState } from 'react'
import { SubNavLink } from '@/components/Navigation/SubNavLink'

export function PageTitle() {
  const [isCardOpen, setCardOpen] = useState(false)

  const handleClickOverlay = useCallback(() => {
    setCardOpen(false)
  }, [])

  const handleMenuClick = useCallback(() => {
    setCardOpen(!isCardOpen)
  }, [isCardOpen])

  return (
    <div className='flex flex-row justify-end items-center gap-3 px-6 w-full'>
      <div className='flex flex-row justify-center items-center gap-3'>
        <div className='relative'>
          <Link
            onClick={handleMenuClick}
            href=''
            className='group box-border flex items-center gap-2 bg-primary hover:bg-primaryDarker px-4 py-2 !pr-2.5 border border-[#D9D9D9] border-box rounded-md h-8 max-h-8 font-medium transition-all duration-300'
          >
            <span className='group pb-0.5 overflow-hidden text-white transition-all duration-300'>
              <span className='opacity-100 text-sm transition-all duration-300'>
                Criar
              </span>
            </span>
            <div>
              <CaretDown
                size={16}
                weight='bold'
                className={`text-white transition-all duration-200 ${isCardOpen ? '-rotate-180' : ''}`}
              />
            </div>
          </Link>
          <MenuCard
            handleClickOverlay={handleClickOverlay}
            isMenuOpen={isCardOpen}
            margin='mt-[45%]'
            width='min-w-32'
          >
            <ul className='flex flex-col gap-1 p-3 text-sm transition-all duration-300'>
              <li className='whitespace-nowrap'>
                <SubNavLink name='Produção' href='' />
                <SubNavLink name='Modelo' href='' />
              </li>
            </ul>
          </MenuCard>
        </div>

        <NavAction
          type='button'
          desktop={true}
          icon={
            <ArrowsOutSimple size={16} weight='bold' className='text-black' />
          }
          mobile={true}
          action={() => null}
        />
      </div>
    </div>
  )
}
