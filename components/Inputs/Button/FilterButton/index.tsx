'use client'
import { CarretDownIcon } from '@/components/Display/Icons/CarretDown'
import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import cn from 'classnames'

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
      className='group relative flex items-center gap-3 hover:bg-zinc-200 px-3 rounded-md w-auto min-w-10 h-10 transition-all duration-150 select-none'
    >
      {icon && icon}

      <span className='font-medium text-sm whitespace-nowrap cursor-pointer select-none'>
        {label}
      </span>
    </button>
  )
}
