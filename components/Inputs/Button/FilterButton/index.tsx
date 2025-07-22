'use client'
import cn from 'classnames'
import type React from 'react'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { CarretDownIcon } from '@/components/Display/Icons/CarretDown'

type FilterButtonProps = {
  name: string
  label?: string
  icon?: React.ReactElement
  action?: () => void
}

export function FilterButton({ name, label, icon, action }: FilterButtonProps) {
  return (
    <button
      type='button'
      onClick={action}
      className='group relative flex items-center gap-3 hover:bg-zinc-200 px-3 rounded-xl w-auto min-w-10 h-10 transition-all duration-300 select-none'
    >
      {icon && icon}

      <span className='font-medium text-sm whitespace-nowrap cursor-pointer select-none'>
        {label}
      </span>
    </button>
  )
}
