import classnames from 'classnames'

type TrashIconProps = {
  stroke: string
  height: string
  width: string
}

export function TrashIcon({ stroke, height, width }: TrashIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      className={classnames(
        height,
        width,
        'fill-none transition-all duration-300'
      )}
    >
      <title>Trash Icon</title>
      <path
        d='M5 6.5l.807 11.706A3 3 0 008.8 21h6.4a3 3 0 002.993-2.794L19 6.5M3.5 6h17M8.07 5.746a4.001 4.001 0 017.86 0'
        className={classnames(stroke, 'transition-all duration-300')}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
