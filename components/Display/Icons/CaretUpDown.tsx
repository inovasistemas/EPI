import classNames from 'classnames'

type CaretUpDownIconProps = {
  size: string
  stroke: string
  strokeWidth?: number
}

export function CaretUpDownIcon({
  size,
  stroke,
  strokeWidth = 2,
}: CaretUpDownIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      className={classNames(size, 'fill-none transition-all duration-300')}
    >
      <title>CaretUpDownIcon</title>
      <path
        d='M18 14s-4.419 5-6 5c-1.581 0-6-5-6-5M18 10s-4.419-5-6-5c-1.581 0-6 5-6 5'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
