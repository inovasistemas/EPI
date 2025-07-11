import classnames from 'classnames'

type UsersIconProps = {
  fill: string
  height: string
  width: string
  stroke: string
}

export function UsersIcon({ fill, height, width, stroke }: UsersIconProps) {
  return (
    <svg
      className={classnames(fill, height, width, 'transition-all duration-300')}
      viewBox='0 0 24 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>Users Icon</title>
      <path
        d='M15.275 10.147c2.729-.663 5.806.916 6.871 4.739.311 1.117-.63 2.114-1.79 2.114H17m-6.5-13a3 3 0 11-6 0 3 3 0 016 0zm9 0a3 3 0 11-6 0 3 3 0 016 0zm-8.146 13H3.647c-1.16 0-2.102-1-1.79-2.118 1.816-6.51 9.472-6.51 11.288 0C13.457 16 12.515 17 11.355 17z'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
        className={classnames(stroke, 'transition-all duration-300')}
      />
    </svg>
  )
}
