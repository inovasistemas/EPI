import classNames from 'classnames'

type CloseIconProps = {
  size: string
  stroke: string
  strokeWidth?: number
}

export function CloseIcon({ size, stroke, strokeWidth = 2 }: CloseIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      className={classNames(size, 'fill-none transition-all duration-300')}
    >
      <title>CloseIcon</title>
      <path
        d='M18 6L6 18m12 0L6 6'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
