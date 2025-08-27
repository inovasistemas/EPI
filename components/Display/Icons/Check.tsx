import classNames from 'classnames'

type CheckIconProps = {
  size: string
  stroke: string
  strokeWidth?: number
}

export function CheckIcon({ size, stroke, strokeWidth = 2 }: CheckIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      className={classNames(size, 'fill-none transition-all duration-300')}
    >
      <title>CheckIcon</title>
      <path
        d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10 10-4.477 10-10z'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
      />
      <path
        d='M8 12.5l2.5 2.5L16 9'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
