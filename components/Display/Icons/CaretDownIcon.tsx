import classNames from 'classnames'

type CaretDownIconProps = {
  size: string
  stroke: string
  strokeWidth?: number
}

export function CaretDownIcon({
  size,
  stroke,
  strokeWidth = 2,
}: CaretDownIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      className={classNames(size, 'fill-none transition-all duration-300')}
    >
      <title>CaretDownIcon</title>
      <path
        d='M18 9s-4.419 6-6 6c-1.581 0-6-6-6-6'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
