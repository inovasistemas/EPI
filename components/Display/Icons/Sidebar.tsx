import classNames from 'classnames'

type SidebarIconProps = {
  size: string
  stroke: string
}

export function SidebarIcon({ size, stroke }: SidebarIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      className={classNames(size, 'fill-none transition-all duration-300')}
    >
      <title>SidebarIcon</title>
      <path
        d='M2 12c0-3.69 0-5.534.814-6.841a4.822 4.822 0 011.105-1.243C5.08 3 6.72 3 10 3h4c3.28 0 4.919 0 6.081.916.43.338.804.759 1.105 1.243C22 6.466 22 8.31 22 12c0 3.69 0 5.534-.814 6.841a4.823 4.823 0 01-1.105 1.243C18.92 21 17.28 21 14 21h-4c-3.28 0-4.919 0-6.081-.916a4.822 4.822 0 01-1.105-1.243C2 17.534 2 15.69 2 12z'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={2}
      />
      <path
        d='M9.5 3v18'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={2}
        strokeLinejoin='round'
      />
      <path
        d='M5 7h1m-1 3h1'
        stroke='#000'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
