import classNames from 'classnames'

type ViewOffIconProps = {
  size: string
  stroke: string
  strokeWidth?: number
}

export function ViewOffIcon({
  size,
  stroke,
  strokeWidth = 2,
}: ViewOffIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      className={classNames(size, 'fill-none transition-all duration-300')}
    >
      <title>ViewOffIcon</title>
      <path
        d='M22 8s-4 6-10 6S2 8 2 8'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
      />
      <path
        d='M15 13.5l1.5 2.5M20 11l2 2M2 13l2-2M9 13.5L7.5 16'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
