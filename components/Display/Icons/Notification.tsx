import classnames from 'classnames'

type NotificationIconProps = {
  fill: string
  height: string
  width: string
}

export function NotificationIcon({
  fill,
  height,
  width,
}: NotificationIconProps) {
  return (
    <svg
      className={classnames(fill, height, width, 'transition-all duration-300')}
      viewBox='0 0 22 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M3.268 2.015A4 4 0 016.741 0h8.518a4 4 0 013.473 2.015l2.741 4.797A4 4 0 0122 8.797V12a4 4 0 01-4 4H4a4 4 0 01-4-4V8.797a4 4 0 01.527-1.985l2.741-4.797zM20 9h-4.25a1.5 1.5 0 00-1.2.6 3.5 3.5 0 01-2.8 1.4h-1.5a3.5 3.5 0 01-2.8-1.4 1.5 1.5 0 00-1.2-.6H2v3a2 2 0 002 2h14a2 2 0 002-2V9z'
        className={classnames(fill)}
      />
    </svg>
  )
}
