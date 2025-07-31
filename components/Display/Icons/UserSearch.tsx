import classNames from 'classnames'

type UserSearchIconProps = {
  size: string
  stroke: string
  strokeWidth?: number
}

export function UserSearchIcon({
  size,
  stroke,
  strokeWidth = 2,
}: UserSearchIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      className={classNames(size, 'fill-none transition-all duration-300')}
    >
      <title>UserSearchIcon</title>
      <path
        d='M15 7.5a5 5 0 10-10 0 5 5 0 0010 0zM21 21.5L19.5 20m.5-2.5a3 3 0 10-6 0 3 3 0 006 0zM3 19.5a7 7 0 0110-6.326'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
