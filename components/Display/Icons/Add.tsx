import classNames from 'classnames'

type AddIconProps = {
  size: string
  fill: string
}

export function AddIcon({ size, fill }: AddIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      className={classNames(size, 'fill-none transition-all duration-300')}
    >
      <title>AddIcon</title>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12 2.75c.69 0 1.25.56 1.25 1.25v6.75H20a1.25 1.25 0 110 2.5h-6.75V20a1.25 1.25 0 11-2.5 0v-6.75H4a1.25 1.25 0 110-2.5h6.75V4c0-.69.56-1.25 1.25-1.25z'
        className={classNames(fill, 'transition-all duration-300')}
      />
    </svg>
  )
}
