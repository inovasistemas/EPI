'use client'
import { CaretLeft } from '@phosphor-icons/react'
import classNames from 'classnames'
import Link from 'next/link'

type GoBackButtonProps = {
  href: string
}

export function GoBackButton({ href }: GoBackButtonProps) {
  return (
    <Link
      href={href}
      type='button'
      className={classNames(
        'active:scale-95 group flex relative justify-center items-center hover:bg-[--backgroundSecondary] bg-[--backgroundPrimary] rounded-lg w-8 h-8 text-zinc-200 transition z-[200]'
      )}
    >
      <CaretLeft size={18} weight='bold' className='text-[--textSecondary]' />
    </Link>
  )
}
