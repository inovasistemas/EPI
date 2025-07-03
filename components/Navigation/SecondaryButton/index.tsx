'use client'
import Link from 'next/link'
import cn from 'classnames'

type SecondaryButtonProps = {
  icon?: React.ReactElement
  label: string
  href: string
  action?: () => void
}

export function SecondaryButton({
  label,
  icon,
  href,
  action,
}: SecondaryButtonProps) {
  return (
    <button
      type='button'
      onClick={action}
      className='group relative flex items-center gap-3 hover:bg-zinc-200 px-3 rounded-md w-auto min-w-10 h-8 transition-all duration-300'
    >
      {icon && (
        <span className='flex justify-center items-center w-full h-full'>
          {icon}
        </span>
      )}

      <span className='font-medium text-sm whitespace-nowrap'>{label}</span>
    </button>
  )
}
