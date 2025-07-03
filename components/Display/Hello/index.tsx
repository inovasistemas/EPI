'use client'
import useUser from '@/lib/context/user'
import { NavAction } from '@/components/Inputs/Button/NavAction'
import {
  ArrowsClockwise,
  ArrowsDownUp,
  CaretUpDown,
  Swap,
} from '@phosphor-icons/react'

export function Hello() {
  const storeName = useUser(state => state.store_name)
  return (
    <div className='flex flex-col justify-center items-start'>
      <span className='font-semibold text-2xl capitalize'>
        {storeName.toLocaleLowerCase()}
      </span>
    </div>
  )
}
