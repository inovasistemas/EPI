import classNames from 'classnames'

type AddRemoveIconProps = {
  size: string
  stroke: string
  strokeWidth?: number
}

export function AddRemoveIcon({ size, stroke, strokeWidth = 2 }: AddRemoveIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={128}
      height={128}
      viewBox="0 0 24 24"
      className={classNames(size, 'fill-none transition-all duration-300')}
    >
      <path
        d="M12 7.5v6.364m3.5-3.182h-7m7 5.818h-7"
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109C18.717 21.5 16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391C2.5 18.717 2.5 16.479 2.5 12z"
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </svg>
  )
}
