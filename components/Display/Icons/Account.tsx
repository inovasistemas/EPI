import classnames from 'classnames'

type AccountIconProps = {
  fill: string
  height: string
  width: string
}

export function AccountIcon({ fill, height, width }: AccountIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      className={classnames(
        height,
        width,
        'fill-none transition-all duration-150'
      )}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 13c-2.395 0-4.383 1.006-5.715 2.6A7.98 7.98 0 0012 20a7.98 7.98 0 005.715-2.4C16.383 16.005 14.395 15 12 15zm0-8.25a3.25 3.25 0 100 6.5 3.25 3.25 0 000-6.5z'
        className={classnames(fill, 'transition-all duration-150')}
      />
    </svg>
  )
}
