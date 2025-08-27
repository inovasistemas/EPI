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
      <title>BellIcon</title>
      <path
        d='M15.5 18a3.5 3.5 0 11-7 0M19.231 18H4.77a1.769 1.769 0 01-1.25-3.02l.602-.603A3 3 0 005 12.256V9.5a7 7 0 0114 0v2.756a3 3 0 00.879 2.121l.603.603a1.77 1.77 0 01-1.25 3.02z'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
