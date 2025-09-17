import classNames from 'classnames'

type WorkflowSquareIconProps = {
  size: string
  stroke: string
  strokeWidth?: number
}

export function WorkflowSquareIcon({
  size,
  stroke,
  strokeWidth = 2,
}: WorkflowSquareIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      className={classNames(size, 'fill-none transition-all duration-300')}
    >
      <path
        d='M12 8v4m0 0H9c-1.886 0-2.828 0-3.414.586C5 13.172 5 14.114 5 16m7-4h3c1.886 0 2.828 0 3.414.586C19 13.172 19 14.114 19 16'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M2 19c0-1.414 0-2.121.44-2.56C2.878 16 3.585 16 5 16c1.414 0 2.121 0 2.56.44C8 16.878 8 17.585 8 19c0 1.414 0 2.121-.44 2.56C7.122 22 6.415 22 5 22c-1.414 0-2.121 0-2.56-.44C2 21.122 2 20.415 2 19zM16 19c0-1.414 0-2.121.44-2.56C16.878 16 17.585 16 19 16c1.414 0 2.121 0 2.56.44.44.439.44 1.146.44 2.56 0 1.414 0 2.121-.44 2.56-.439.44-1.146.44-2.56.44-1.414 0-2.121 0-2.56-.44C16 21.122 16 20.415 16 19zM10.286 2h3.428C15.79 2 16 3.11 16 5s-.211 3-2.286 3h-3.428C8.21 8 8 6.89 8 5s.211-3 2.286-3z'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
}
