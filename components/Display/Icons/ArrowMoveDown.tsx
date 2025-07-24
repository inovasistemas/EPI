import classNames from 'classnames'

type ArrowMoveDownIconProps = {
  size: string
  stroke: string
  strokeWidth?: number
}

export function ArrowMoveDownIcon({
  size,
  stroke,
  strokeWidth = 2,
}: ArrowMoveDownIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      className={classNames(size, 'fill-none transition-all duration-300')}
    >
      <title>ArrowMoveDownIcon</title>
      <path
        d='M4 3v2.077c0 2 0 3.001.145 3.838.8 4.609 4.762 8.223 9.812 8.952C14.875 18 16.807 18 19 18'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M17 21c.607-.59 3-2.16 3-3 0-.84-2.393-2.41-3-3'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
