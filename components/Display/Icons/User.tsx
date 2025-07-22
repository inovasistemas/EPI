import classNames from 'classnames'

type UserIconProps = {
  size: string
  stroke: string
}

export function UserIcon({ size, stroke }: UserIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      className={classNames(size, 'fill-none transition-all duration-300')}
    >
      <title>UserIcon</title>
      <path
        d='M18 10.997c-.392-.8-1.452-1.975-3.63-1.925 0 0-1.727-.075-3.68-.075-1.952 0-2.866.045-4.43.075-1.001-.025-2.904.2-3.78 2.275-.576 1.75-.6 5.427-.25 7.277.075.95.576 2.276 2.128 2.976.95.5 2.478.3 3.63.4M5.984 8.196c-.05-2.375-.15-4.25 2.603-5.801.926-.375 2.303-.7 4.005.1 1.777 1.075 1.999 2.213 2.153 2.5.425 1.126.2 2.726.25 3.376'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={2}
        strokeLinecap='round'
      />
      <path
        d='M15.5 19.735a2.232 2.232 0 01-2.245 2.23c-1.236 0-2.255-.986-2.255-2.23a2.252 2.252 0 012.255-2.244c1.236 0 2.245 1 2.245 2.244z'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={2}
      />
      <path
        d='M15.225 17.79l1.99-1.942m4.785 0l-1.627-1.54c-.773-.739-1.423-.093-1.747.183l-1.41 1.357m0 0l1.61 1.546'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={2}
        strokeLinecap='round'
      />
    </svg>
  )
}
