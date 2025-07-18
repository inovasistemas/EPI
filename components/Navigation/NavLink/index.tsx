'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavLinkProps = {
  name?: string
  icon: React.ReactElement
  href: string
}

export function NavLink({ name, icon, href }: NavLinkProps) {
  const pathName = usePathname()

  return (
    <Link
      href={href}
      data-active={pathName.includes(href)}
      className='group flex items-center gap-1 data-[active=true]:bg-[--backgroundPrimary] hover:bg-[--backgroundPrimary] mt-1.5 py-1 data-[active=false]:py-2 data-[active=true]:py-2 rounded-lg font-normal active:scale-95 transition-all duration-300 data-[active=true]'
    >
      <div className='group flex justify-center min-w-[32px] !max-w-[32px]'>
        {icon}
      </div>
      <span className='hidden sm:flex w-full font-medium text-[--textSecondary] group-data-[active=true]:text-[--primaryColor] text-sm transition-all select-none'>
        {name}
      </span>
    </Link>
  )
}
