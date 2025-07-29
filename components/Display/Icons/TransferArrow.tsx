import classNames from 'classnames'

type TransferArrowIconProps = {
  size: string
  stroke: string
  strokeWidth?: number
}

export function TransferArrowIcon({
  size,
  stroke,
  strokeWidth = 2,
}: TransferArrowIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      className={classNames(size, 'fill-none transition-all duration-300')}
    >
      <title>TransferArrowIcon</title>
      <path
        d='M19 9H6.659c-1.006 0-1.51 0-1.634-.309-.125-.308.23-.672.941-1.398L8.211 5M5 15h12.341c1.006 0 1.51 0 1.634.309.125.308-.23.672-.941 1.398L15.789 19'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
