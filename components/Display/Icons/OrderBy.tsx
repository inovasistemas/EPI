import classnames from 'classnames'

type OrderByIconProps = {
  fill: string
  height: string
  width: string
  stroke: string
}

export function OrderByIcon({ fill, height, width, stroke }: OrderByIconProps) {
  return (
    <svg
      className={classnames(fill, height, width, 'transition-all duration-300')}
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4 1v16m0 0l-3-3m3 3l3-3m5-7l.5-1.5m0 0l1.192-3.902a.844.844 0 011.616 0L16.5 5.5m-4 0h4m0 0L17 7m-5 4h5l-5 6h5'
        className={classnames(stroke)}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
