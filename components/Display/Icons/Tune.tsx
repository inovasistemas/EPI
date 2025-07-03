import classnames from 'classnames'

type TuneIconProps = {
  fill: string
  height: string
  width: string
  stroke: string
}

export function TuneIcon({ fill, height, width, stroke }: TuneIconProps) {
  return (
    <svg
      className={classnames(fill, height, width, 'transition-all duration-150')}
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M11 4H1m10 0a3 3 0 116 0 3 3 0 11-6 0zm6 10H9m0 0a3 3 0 11-6 0m6 0a3 3 0 10-6 0m0 0H1'
        className={classnames(stroke)}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
