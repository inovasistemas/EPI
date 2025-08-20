import classNames from 'classnames'

type AlertIconProps = {
  size: string
  stroke: string
  strokeWidth?: number
}

export function AlertIcon({ size, stroke, strokeWidth = 2 }: AlertIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      className={classNames(size, 'fill-none transition-all duration-300')}
    >
      <title>AlertIcon</title>
      <path
        d='M13.925 21h-3.85c-4.63 0-6.945 0-7.799-1.506-.853-1.506.331-3.503 2.7-7.495L6.9 8.752C9.176 4.918 10.313 3 12 3c1.687 0 2.824 1.918 5.1 5.753l1.924 3.245c2.369 3.993 3.553 5.99 2.7 7.496C20.87 21 18.555 21 13.924 21zM12 17v-4.5M12 8.998v-.01'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
