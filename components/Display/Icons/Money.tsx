import classNames from 'classnames'

type MoneyIconProps = {
  size: string
  stroke: string
}

export function MoneyIcon({ size, stroke }: MoneyIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      className={classNames(size, 'fill-none transition-all duration-300')}
    >
      <path
        d='M13 2h-2C6.757 2 4.636 2 3.318 3.318 2 4.636 2 6.758 2 11c0 4.243 0 6.364 1.318 7.682C4.636 20 6.758 20 11 20h2c4.243 0 6.364 0 7.682-1.318C22 17.364 22 15.242 22 11c0-4.243 0-6.364-1.318-7.682C19.364 2 17.242 2 13 2z'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={2}
      />
      <path
        d='M17 15c1-.53 1-1.385 1-3.094v-1.812C18 8.385 18 7.53 17 7M18 22v-2M6 22v-2'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={2}
        strokeLinecap='round'
      />
      <path
        d='M9.5 13a2.01 2.01 0 002.02-2c0-1.105-.904-2-2.02-2m0 4a2.01 2.01 0 01-2.02-2c0-1.105.904-2 2.02-2m0 4v2m0-6V7m-1.75 5L6 13m7-4l-1.75 1m0 2L13 13M6 9l1.75 1'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
