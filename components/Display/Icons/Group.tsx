import classNames from 'classnames'

type GroupIconProps = {
  size: string
  stroke: string
  strokeWidth?: number
}

export function GroupIcon({ size, stroke, strokeWidth = 2 }: GroupIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      className={classNames(size, 'fill-none transition-all duration-300')}
    >
      <path
        d='M14.5 7.5a5 5 0 10-10 0 5 5 0 0010 0zM2.5 19.5a7 7 0 0110-6.326M21.5 17v-2.5c-2 0-3.5-1-3.5-1s-1.5 1-3.5 1V17c0 3.5 3.5 4.5 3.5 4.5s3.5-1 3.5-4.5z'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
