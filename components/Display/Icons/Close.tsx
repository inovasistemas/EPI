import classnames from 'classnames'

type CloseIconProps = {
  fill: string
  height: string
  width: string
  stroke: string
  strokeSize: number
}

export function CloseIcon({
  fill,
  height,
  width,
  stroke,
  strokeSize,
}: CloseIconProps) {
  return (
    <svg
      className={classnames(height, width, 'transition-all duration-150')}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M5 5l14 14m0-14L5 19'
        className={classnames(stroke, 'transition-all duration-150')}
        strokeWidth={strokeSize}
        strokeLinecap='round'
      />
    </svg>
  )
}
