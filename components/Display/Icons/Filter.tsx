import classnames from 'classnames'

type FilterIconProps = {
  stroke: string
  height: string
  width: string
}

export function FilterIcon({ stroke, height, width }: FilterIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      className={classnames(
        height,
        width,
        'fill-none transition-all duration-300 hover:opacity-80'
      )}
    >
      <path
        d='M3 5h18M9 19h6M6 12h12'
        stroke='currentColor'
        strokeWidth={2}
        strokeLinecap='round'
        className={classnames(stroke, 'transition-all duration-300')}
      />
    </svg>
  )
}
