import classNames from 'classnames'

type BellIconProps = {
  size: string
  stroke: string
}

export function BellIcon({ size, stroke }: BellIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      className={classNames(size, 'fill-none transition-all duration-300')}
    >
      <path
        d='M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109C18.717 21.5 16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391C2.5 18.717 2.5 16.479 2.5 12z'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <title>BellIcon</title>
      <path
        d='M21.5 13.5h-4.926c-.842 0-1.503.704-1.875 1.447-.403.808-1.21 1.553-2.699 1.553-1.489 0-2.296-.745-2.7-1.553-.37-.743-1.032-1.447-1.874-1.447H2.5'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={2}
        strokeLinejoin='round'
      />
    </svg>
  )
}
