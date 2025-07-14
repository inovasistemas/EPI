'use client'
import cn from 'classnames'
import Link from 'next/link'

type CreateButtonProps = {
  icon?: React.ReactElement
  label: string
  href: string
}

export function CreateButton({ label, icon, href }: CreateButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        {
          '!pr-4': icon,
        },
        [
          'border-box group box-border flex items-center gap-2 bg-[--primaryColor] hover:bg-[--secondaryColor] px-4 py-1.5 border border-[--outlinePrimary] rounded-lg font-medium transition-all duration-300',
        ]
      )}
    >
      {icon && <div className=''>{icon}</div>}
      <span className='group pb-0.5 overflow-hidden text-white transition-all duration-300'>
        <span className='opacity-100 font-medium text-sm transition-all duration-300'>
          {label}
        </span>
      </span>
    </Link>
  )
}
