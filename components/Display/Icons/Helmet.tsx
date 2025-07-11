import classnames from 'classnames'

type HelmetIconProps = {
  fill: string
  height: string
  width: string
}

export function HelmetIcon({ fill, height, width }: HelmetIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      className={classnames(
        height,
        width,
        'fill-none transition-all duration-300'
      )}
    >
      <title>Helmet Icon</title>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M3 12.5a9 9 0 015-8.064V14H3v-1.5zM3 16h18H3zm13-2h5v-1.5a9 9 0 00-5-8.064V14z'
        fill='currentColor'
      />
      <rect
        x={2}
        y={16}
        width={20}
        height={4}
        rx={1.5}
        className={classnames(fill, 'transition-all duration-300')}
      />
      <path
        d='M10 4a1 1 0 011-1h2a1 1 0 011 1v10h-4V4z'
        className={classnames(fill, 'transition-all duration-300')}
      />
    </svg>
  )
}
