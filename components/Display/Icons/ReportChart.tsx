import classNames from 'classnames'

type ReportChartIconProps = {
  size: string
  stroke: string
  strokeWidth?: number
}

export function ReportChartIcon({
  size,
  stroke,
  strokeWidth = 2,
}: ReportChartIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      className={classNames(size, 'fill-none transition-all duration-300')}
    >
      <title>ReportChartIcon</title>
      <path
        d='M21 21H10c-3.3 0-4.95 0-5.975-1.025C3 18.95 3 17.3 3 14V3M7 4h1M7 7h4'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
      />
      <path
        d='M5 20c1.07-1.947 2.523-6.981 5.306-6.981 1.924 0 2.422 2.453 4.308 2.453C17.857 15.472 17.387 10 21 10'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
