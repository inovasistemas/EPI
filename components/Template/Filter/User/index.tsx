'use client'
import { Funnel } from '@phosphor-icons/react'
import classNames from 'classnames'
import { FunnelIcon } from '@/components/Display/Icons/Funnel'
import { MenuCard } from '@/components/Navigation/MenuCard'
import { MenuSettings } from '../../MenuSettings'

enum MenuCards {
  Filter,
  Default,
}

type FilterUserProps = {
  onClick: () => void
  action: () => void
  title: string
  type: 'button' | 'submit' | 'reset'
  isOpen: MenuCards
}

export function FilterUser({
  title,
  type,
  onClick,
  action,
  isOpen,
}: FilterUserProps) {
  return (
    <div className='relative flex items-center'>
      <button
        onClick={onClick}
        type={type}
        className={classNames(
          'select-none active:scale-95 z-[55] cursor-pointer flex gap-3 group relative justify-center items-center bg-[--buttonPrimary] hover:bg-[--buttonSecondary] rounded-lg h-10 text-[--textSecondary] transition-all duration-300 px-4 pr-5'
        )}
      >
        <Funnel size={18} weight='bold' className='text-[--textSecondary]' />
        <span className='font-medium text-sm'>{title}</span>
      </button>

      <MenuCard
        handleClickOverlay={action}
        isMenuOpen={isOpen === MenuCards.Filter}
        margin='mt-[45%]'
        width='min-w-72'
        zIndex='z-[201]'
      >
        <MenuSettings />
      </MenuCard>
    </div>
  )
}
