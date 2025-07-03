import classnames from 'classnames'

type SecurityIconProps = {
  fill: string
  height: string
  width: string
}

export function SecurityIcon({ fill, height, width }: SecurityIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={classnames(
        height,
        width,
        'fill-none transition-all duration-300'
      )}
      viewBox='0 0 24 24'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M10.7 2.39a4 4 0 012.6 0l5.675 1.95A3 3 0 0121 7.177v4.735c0 2.807-1.149 4.83-2.813 6.404-1.572 1.489-3.632 2.6-5.555 3.637l-.157.085a1 1 0 01-.95 0l-.157-.085c-1.923-1.037-3.983-2.148-5.556-3.637C4.15 16.741 3 14.72 3 11.912V7.177A3 3 0 015.025 4.34L10.7 2.39zM12 8a2.5 2.5 0 00-1 4.792V15a1 1 0 102 0v-2.208A2.5 2.5 0 0012 8z'
        className={classnames(fill, 'transition-all duration-300')}
      />
    </svg>
  )
}
