import classnames from 'classnames'

type LogOutIconProps = {
  fill: string
  height: string
  width: string
  stroke: string
}

export function LogOutIcon({ fill, height, width, stroke }: LogOutIconProps) {
  return (
    <svg
      className={classnames(fill, height, width, 'transition-all duration-150')}
      viewBox='0 0 18 18'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M4 2a2 2 0 00-2 2v10a2 2 0 002 2h4.25a1 1 0 110 2H4a4 4 0 01-4-4V4a4 4 0 014-4h4.25a1 1 0 110 2H4zm7.793 1.793a1 1 0 011.414 0l4.5 4.5a1 1 0 010 1.414l-4.5 4.5a1 1 0 01-1.414-1.414L14.586 10H5.75a1 1 0 110-2h8.836l-2.793-2.793a1 1 0 010-1.414z'
        className={classnames(fill)}
      />
    </svg>
  )
}
