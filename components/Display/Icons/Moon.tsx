import classNames from 'classnames'

type MoonIconProps = {
  size: string
  stroke: string
  strokeWidth?: number
}

export function MoonIcon({ size, stroke, strokeWidth = 2 }: MoonIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      className={classNames(size, 'fill-none transition-all duration-300')}
    >
      <path
        d='M21.5 14.078A8.557 8.557 0 019.922 2.5C5.668 3.497 2.5 7.315 2.5 11.873a9.627 9.627 0 009.627 9.627c4.558 0 8.376-3.168 9.373-7.422z'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
