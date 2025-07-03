import Link from 'next/link'
import cn from 'classnames'

type SubNavLinkProps = {
  name: string
  icon?: React.ReactElement
  href: string
  date?: string
  read?: boolean
  variant?: 'default' | 'plain'
}

export function SubNavLink({
  name,
  icon,
  href,
  date,
  read,
  variant = 'default',
}: SubNavLinkProps) {
  const textClassName = cn('text-[--textSecondary] text-sm line-clamp-2', {
    'font-medium': variant === 'plain' && read === true,
  })

  return (
    <Link
      href={href}
      className='relative flex items-center gap-3 data-[active=true]:bg-[--backgroundPrimary] hover:bg-[--backgroundPrimary] px-3 py-2 rounded-md font-normal whitespace-normal transition-all duration-300'
    >
      {date && (
        <div className='top-0 right-0 absolute flex items-center gap-2 p-2 font-normal text-zinc-500 text-xs'>
          {date}
          {read && (
            <div
              className='bg-blue-500 rounded-full w-2 h-2'
              aria-hidden='true'
            ></div>
          )}
        </div>
      )}
      {icon && <span>{icon}</span>}
      <span className={textClassName}>{name}</span>
    </Link>
  )
}
