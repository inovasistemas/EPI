import classnames from 'classnames'

type SearchIconProps = {
  fill: string
  height: string
  width: string
}

export function SearchIcon({ fill, height, width }: SearchIconProps) {
  return (
    <svg
      className={classnames(fill, height, width, 'transition-all duration-150')}
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M17 17l-3.95-3.95M15 8A7 7 0 111 8a7 7 0 0114 0z'
        stroke='#000'
        strokeWidth={2}
        strokeLinecap='round'
      />
    </svg>
  )
}
