import classNames from 'classnames'

type HomeIconProps = {
  size: string
  stroke: string
}

export function HomeIcon({ size, stroke }: HomeIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      className={classNames(size, 'fill-none transition-all duration-300')}
    >
      <title>HomeIcon</title>
      <path
        d='M3 11.99v2.51c0 3.3 0 4.95 1.025 5.975C5.05 21.5 6.7 21.5 10 21.5h4c3.3 0 4.95 0 5.975-1.025C21 19.45 21 17.8 21 14.5v-2.51c0-1.682 0-2.522-.356-3.25-.356-.728-1.02-1.244-2.346-2.276l-2-1.555C14.233 3.303 13.2 2.5 12 2.5c-1.2 0-2.233.803-4.298 2.409l-2 1.555C4.375 7.496 3.712 8.012 3.356 8.74 3 9.468 3 10.308 3 11.99zM16 17H8'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
