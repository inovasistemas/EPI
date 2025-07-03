import classnames from 'classnames'

type LockIconProps = {
  fill: string
  height: string
  width: string
}

export function LockIcon({ fill, height, width }: LockIconProps) {
  return (
    <svg
      className={classnames(height, width, fill, 'transition-all duration-300')}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M17 7.5a4 4 0 014 4v7a4 4 0 01-4 4H7a4 4 0 01-4-4v-7a4 4 0 014-4v-1a5 5 0 0110 0v1zm-10 2a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2v-7a2 2 0 00-2-2H7zm8-2v-1a3 3 0 10-6 0v1h6z' />
    </svg>
  )
}
