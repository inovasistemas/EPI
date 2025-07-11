import classnames from 'classnames'

type UserIconProps = {
  fill: string
  height: string
  width: string
}

export function UserIcon({ fill, height, width }: UserIconProps) {
  return (
    <svg
      className={classnames(fill, height, width, 'transition-all duration-300')}
      viewBox='0 0 16 19'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>User Icon</title>
      <path
        d='M8 0a4.5 4.5 0 100 9 4.5 4.5 0 000-9zM8 10c-3.358 0-6.037 1.766-7.447 4.389-.63 1.17-.392 2.385.305 3.252C1.531 18.48 2.624 19 3.795 19h8.41c1.171 0 2.264-.521 2.937-1.359.698-.867.935-2.082.306-3.252C14.037 11.766 11.357 10 8 10z'
        className={classnames(fill)}
      />
    </svg>
  )
}
