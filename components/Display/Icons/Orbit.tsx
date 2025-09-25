import classNames from 'classnames'

type OrbitIconProps = {
  size: string
  stroke: string
  strokeWidth?: number
}

export function OrbitIcon({ size, stroke, strokeWidth = 2 }: OrbitIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      className={classNames(size, 'fill-none transition-all duration-300')}
    >
      <path
        d="M17 12a5 5 0 11-10 0 5 5 0 0110 0z"
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M18.646 4.528a2 2 0 102.708 2.944 2 2 0 00-2.708-2.944zm0 0A9.962 9.962 0 0012 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10c0-.338-.017-.671-.05-1"
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  )
}
