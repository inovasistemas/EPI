import classNames from 'classnames'

type AddIconProps = {
  size: string
  stroke: string
  strokeWidth?: number
}

export function AddIcon({ size, stroke, strokeWidth = 2 }: AddIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      className={classNames(size, 'fill-none transition-all duration-300')}
    >
      <title>AddIcon</title>
      <path
        d='M12.001 5v14.002M19.002 12.002H5'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
