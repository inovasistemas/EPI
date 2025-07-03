'use client'

import Link from 'next/link'

type GoBackButtonProps = {
  icon: React.ReactElement
  label: string
  href: string
}

export function GoBackButton({ label, icon, href }: GoBackButtonProps) {
  return (
    <Link
      href={href}
      className='group box-border flex items-center gap-1 bg-zinc-200 hover:bg-zinc-200 border border-[#D9D9D9] rounded-md min-w-8 h-8 font-medium transition-all duration-150'
    >
      <span className='ml-[7px]'>{icon}</span>
      <span className='group pb-0.5 w-0 group-hover:w-[5.5ch] overflow-hidden text-black transition-all duration-150'>
        <span className='opacity-0 group-hover:opacity-100 text-sm transition-all duration-150'>
          {label}
        </span>
      </span>
    </Link>
  )
}
