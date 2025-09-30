import classNames from 'classnames'

type SearchIconProps = {
  size: string
  stroke: string
  strokeWidth?: number
}

export function SearchIcon({ size, stroke, strokeWidth = 2 }: SearchIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      className={classNames(size, 'fill-none transition-all duration-300')}
    >
      <path
        d='M17 17l4 4M19 11a8 8 0 10-16 0 8 8 0 0016 0z'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
