import classNames from 'classnames'

type SecurityIconProps = {
  size: string
  stroke: string
  strokeWidth?: number
}

export function SecurityIcon({
  size,
  stroke,
  strokeWidth = 2,
}: SecurityIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      className={classNames(size, 'fill-none transition-all duration-300')}
    >
      <title>SecurityIcon</title>
      <path
        d='M18.709 3.495C16.817 2.554 14.5 2 12 2c-2.5 0-4.816.554-6.709 1.495-.928.462-1.392.693-1.841 1.419C3 5.64 3 6.343 3 7.748v3.49c0 5.683 4.542 8.843 7.173 10.196.734.377 1.1.566 1.827.566.726 0 1.093-.189 1.827-.566C16.457 20.08 21 16.92 21 11.237V7.748c0-1.405 0-2.108-.45-2.834s-.913-.957-1.841-1.419z'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12 9v1m-1-.5a1 1 0 102 0 1 1 0 00-2 0z'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12.75 14h-1.5l.75-3.5.75 3.5z'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
