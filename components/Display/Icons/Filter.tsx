import classNames from 'classnames'

type FilterIconProps = {
  size: string
  stroke: string
  strokeWidth?: number
}

export function FilterIcon({ size, stroke, strokeWidth = 2 }: FilterIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      className={classNames(size, 'fill-none transition-all duration-300')}
    >
      <title>FilterIcon</title>
      <path
        d='M3 7h3M3 17h6M18 17h3M15 7h6'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M6 7c0-.932 0-1.398.152-1.765a2 2 0 011.083-1.083C7.602 4 8.068 4 9 4c.932 0 1.398 0 1.765.152a2 2 0 011.083 1.083C12 5.602 12 6.068 12 7c0 .932 0 1.398-.152 1.765a2 2 0 01-1.083 1.083C10.398 10 9.932 10 9 10c-.932 0-1.398 0-1.765-.152a2 2 0 01-1.083-1.083C6 8.398 6 7.932 6 7zM12 17c0-.932 0-1.398.152-1.765a2 2 0 011.083-1.083C13.602 14 14.068 14 15 14c.932 0 1.398 0 1.765.152a2 2 0 011.083 1.083C18 15.602 18 16.068 18 17c0 .932 0 1.398-.152 1.765a2 2 0 01-1.083 1.083C16.398 20 15.932 20 15 20c-.932 0-1.398 0-1.765-.152a2 2 0 01-1.083-1.083C12 18.398 12 17.932 12 17z'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
}
