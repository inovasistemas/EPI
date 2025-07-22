import classNames from 'classnames'

type UsersIconProps = {
  size: string
  stroke: string
}

export function UsersIcon({ size, stroke }: UsersIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      className={classNames(size, 'fill-none transition-all duration-300')}
    >
      <title>UsersIcon</title>

      <path
        d='M8.5 18c1.813-1.954 5.167-2.046 7 0m-1.56-6c0 1.105-.871 2-1.947 2-1.075 0-1.947-.895-1.947-2s.872-2 1.947-2c1.076 0 1.948.895 1.948 2z'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={2}
        strokeLinecap='round'
      />
      <path
        d='M9.5 4.002c-2.644.01-4.059.102-4.975.97C3.5 5.943 3.5 7.506 3.5 10.632v4.737c0 3.126 0 4.69 1.025 5.66 1.025.972 2.675.972 5.975.972h3c3.3 0 4.95 0 5.975-.971 1.025-.972 1.025-2.535 1.025-5.66v-4.738c0-3.126 0-4.689-1.025-5.66-.916-.868-2.33-.96-4.975-.97'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9.772 3.632c.096-.415.144-.623.236-.792a1.64 1.64 0 011.083-.793C11.294 2 11.53 2 12 2c.47 0 .706 0 .909.047a1.64 1.64 0 011.083.793c.092.17.14.377.236.792l.083.36c.17.735.255 1.103.127 1.386a1.03 1.03 0 01-.407.451C13.75 6 13.332 6 12.498 6h-.996c-.834 0-1.252 0-1.533-.17a1.03 1.03 0 01-.407-.452c-.128-.283-.043-.65.127-1.386l.083-.36z'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={2}
      />
    </svg>
  )
}
