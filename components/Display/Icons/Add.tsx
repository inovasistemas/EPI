import classnames from 'classnames'

type AddIconProps = {
  fill: string
  height: string
  width: string
  stroke: string
}

export function AddIcon({ fill, height, width, stroke }: AddIconProps) {
  return (
    <svg
      className={classnames(height, width, 'transition-all duration-300')}
      viewBox='0 0 12 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M6 1v5m0 0v5m0-5H1m5 0h5'
        className={classnames(stroke)}
        strokeWidth={1.7}
        strokeLinecap='round'
      />
    </svg>
  )
}
