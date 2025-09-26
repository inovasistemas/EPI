import classNames from 'classnames'

type AlertIconProps = {
  size: string
  stroke: string
  strokeWidth?: number
}

export function AlertIcon({ size, stroke, strokeWidth = 2 }: AlertIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      className={classNames(size, 'fill-none transition-all duration-300')}
    >
      <circle
        cx={12}
        cy={12}
        r={10}
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 8v4.5M12 15.988v.01"
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
