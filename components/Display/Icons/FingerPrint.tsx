import classNames from 'classnames'

type FingerPrintIconProps = {
  size: string
  stroke: string
  strokeWidth?: number
}

export function FingerPrintIcon({
  size,
  stroke,
  strokeWidth = 2,
}: FingerPrintIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      className={classNames(size, 'fill-none transition-all duration-300')}
    >
      <path
        d='M18 12a6 6 0 10-12 0c0 3.314 1 5.5 3 8'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M15 21c-5.5-3.5-6-7.343-6-9a3 3 0 116 0 3 3 0 106 0 9 9 0 10-17.777 2M12 12c.5 5 5.5 7 5.5 7'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
