import classNames from 'classnames'

type EditIconProps = {
  size: string
  stroke: string
  strokeWidth?: number
}

export function EditIcon({ size, stroke, strokeWidth = 2 }: EditIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      className={classNames(size, 'fill-none transition-all duration-300')}
    >
      <title>EditIcon</title>
      <path
        d='M3.782 16.31L3 21l4.69-.782a3.961 3.961 0 002.151-1.106L20.42 8.532a1.981 1.981 0 000-2.8L18.269 3.58a1.981 1.981 0 00-2.802 0L4.888 14.16a3.962 3.962 0 00-1.106 2.15zM14 6l4 4'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
