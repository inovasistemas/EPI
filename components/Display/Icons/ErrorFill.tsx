import classNames from 'classnames'

type ErrorFillIconProps = {
  size: string
  fill: string
}

export function ErrorFillIcon({ size, fill }: ErrorFillIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      data-src='https://cdn.hugeicons.com/icons/alert-circle-solid-standard.svg?v=2.0'
      color='#000'
      className={classNames(size, 'fill-none transition-all duration-300')}
    >
      <title>ErrorFillIcon</title>
      <path
        d='M12 1.25c5.937 0 10.75 4.813 10.75 10.75S17.937 22.75 12 22.75 1.25 17.937 1.25 12 6.063 1.25 12 1.25zm0 13.738a1 1 0 00-1 1v.01a1 1 0 102 0v-.01a1 1 0 00-1-1zM12 7a1 1 0 00-1 1v4.5a1 1 0 102 0V8a1 1 0 00-1-1z'
        fill='#000'
        className={classNames(fill, 'transition-all duration-300')}
      />
    </svg>
  )
}
