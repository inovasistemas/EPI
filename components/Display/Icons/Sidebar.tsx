import classnames from 'classnames'

type SidebarIconProps = {
  fill: string
  height: string
  width: string
}

export function SidebarIcon({ fill, height, width }: SidebarIconProps) {
  return (
    <svg
      className={classnames(fill, height, width, 'transition-all duration-150')}
      viewBox='0 0 18 18'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M6 2v14h8a2 2 0 002-2V4a2 2 0 00-2-2H6zM0 4a4 4 0 014-4h10a4 4 0 014 4v10a4 4 0 01-4 4H4a4 4 0 01-4-4V4z'
        className={classnames(fill, 'transition-all duration-150')}
      />
    </svg>
  )
}
