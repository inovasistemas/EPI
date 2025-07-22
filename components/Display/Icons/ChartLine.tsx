import classNames from 'classnames'

type ChartLineIconProps = {
  size: string
  stroke: string
}

export function ChartLineIcon({ size, stroke }: ChartLineIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      className={classNames(size, 'fill-none transition-all duration-300')}
    >
      <title>ChartIcon</title>
      <path
        d='M21 21H10c-3.3 0-4.95 0-5.975-1.025C3 18.95 3 17.3 3 14V3'
        stroke='#000'
        strokeWidth={2}
        strokeLinecap='round'
      />
      <path
        d='M5 20c.44-3.156 2.676-11.236 5.428-11.236 1.902 0 2.395 3.871 4.258 3.871C17.893 12.635 17.428 4 21 4'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
