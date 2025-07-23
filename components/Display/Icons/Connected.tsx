import classNames from 'classnames'

type ConnectedIconProps = {
  size: string
  stroke: string
  strokeWidth?: number
}

export function ConnectedIcon({
  size,
  stroke,
  strokeWidth = 2,
}: ConnectedIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      className={classNames(size, 'fill-none transition-all duration-300')}
    >
      <title>ConnectedIcon</title>
      <path
        d='M9 4.5c-3.496 1.201-6 4.442-6 8.251 0 1.207.251 2.357.706 3.402M15 4.5c3.496 1.201 6 4.442 6 8.251 0 1.023-.18 2.004-.512 2.916M16.5 20.33A9.157 9.157 0 0112 21.5a9.157 9.157 0 01-4.5-1.17M15 5a3 3 0 11-6 0 3 3 0 016 0z'
        stroke='#000'
        strokeWidth={2}
      />
      <circle
        cx={5}
        cy={19}
        r={3}
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
      />
      <circle
        cx={19}
        cy={19}
        r={3}
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
}
