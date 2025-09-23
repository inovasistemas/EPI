import classNames from 'classnames'

type CalendarIconProps = {
  size: string
  stroke: string
  strokeWidth?: number
}

export function CalendarIcon({
  size,
  stroke,
  strokeWidth = 2,
}: CalendarIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      className={classNames(size, 'fill-none transition-all duration-300')}
    >
      <path
        d='M16 2v4M8 2v4M13 4h-2C7.229 4 5.343 4 4.172 5.172 3 6.343 3 8.229 3 12v2c0 3.771 0 5.657 1.172 6.828C5.343 22 7.229 22 11 22h2c3.771 0 5.657 0 6.828-1.172C21 19.657 21 17.771 21 14v-2c0-3.771 0-5.657-1.172-6.828C18.657 4 16.771 4 13 4zM3 10h18M11.995 14h.01m-.01 4h.01m3.986-4H16m-8 0h.009M8 18h.009'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
