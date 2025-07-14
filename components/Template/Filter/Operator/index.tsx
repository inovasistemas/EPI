'use client'
import { Funnel } from '@phosphor-icons/react'
import classNames from 'classnames'
import { MenuCard } from '@/components/Navigation/MenuCard'

enum MenuCards {
  Filter,
  Default,
}

type FilterOperatorProps = {
  onClick: () => void
  action: () => void
  title: string
  type: 'button' | 'submit' | 'reset'
  isOpen: MenuCards
}

export function FilterOperator({
  title,
  type,
  onClick,
  action,
  isOpen,
}: FilterOperatorProps) {
  return (
    <div className='relative flex items-center'>
      <button
        onClick={onClick}
        type={type}
        className={classNames(
          'select-none active:scale-95 z-[55] cursor-pointer flex gap-3 group relative justify-center items-center bg-[--buttonPrimary] hover:bg-[--buttonSecondary] rounded-lg h-10 text-[--textSecondary] transition-all duration-300 px-4 pr-5'
        )}
      >
        <Funnel size={16} weight='fill' className='text-[--textSecondary]' />
        <span className='font-medium text-sm'>{title}</span>
      </button>

      <MenuCard
        handleClickOverlay={action}
        isMenuOpen={isOpen === MenuCards.Filter}
        margin='mt-[45%]'
        width='min-w-72'
        zIndex='z-[201]'
      >
        <div className='p-8'>Filtro usuários</div>
      </MenuCard>
    </div>
  )
}
