import classnames from 'classnames'

type ArrowLeftRightIconProps = {
  fill: string
  height: string
  width: string
  stroke: string
}

export function ArrowLeftRightIcon({
  fill,
  height,
  width,
  stroke,
}: ArrowLeftRightIconProps) {
  return (
    <svg
      className={classnames(height, width, 'transition-all duration-300')}
      viewBox='0 0 18 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M5 1L1 5l4 4m8 2l4 4-4 4M2 5h15M1 15h15'
        className={classnames(stroke, 'transition-all duration-300')}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
