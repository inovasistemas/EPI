import classNames from 'classnames'

type CaretUpIconProps = {
  size: string
  stroke: string
  strokeWidth?: number
}

export function CaretUpIcon({
  size,
  stroke,
  strokeWidth = 2,
}: CaretUpIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      className={classNames(size, 'fill-none transition-all duration-300')}
    >
      <path
        d='M18 15s-4.42-6-6-6c-1.581 0-6 6-6 6'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
