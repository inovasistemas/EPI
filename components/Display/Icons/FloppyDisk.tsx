import classNames from 'classnames'

type FloppyDiskIconProps = {
  size: string
  stroke: string
  strokeWidth?: number
}

export function FloppyDiskIcon({
  size,
  stroke,
  strokeWidth = 2,
}: FloppyDiskIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      className={classNames(size, 'fill-none transition-all duration-300')}
    >
      <title>FloppyDiskIcon</title>
      <path
        d='M8 22v-3c0-1.886 0-2.828.586-3.414C9.172 15 10.114 15 12 15c1.886 0 2.828 0 3.414.586C16 16.172 16 17.114 16 19v3'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinejoin='round'
      />
      <path
        d='M10 7h4'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M3 11.858c0-4.576 0-6.864 1.387-8.314a5 5 0 01.157-.157C5.994 2 8.282 2 12.858 2c1.085 0 1.607.004 2.105.19.479.178.88.512 1.682 1.181l2.196 1.83c1.062.885 1.592 1.327 1.876 1.932C21 7.737 21 8.428 21 9.81V13c0 3.75 0 5.625-.955 6.939a5 5 0 01-1.106 1.106C17.625 22 15.749 22 12 22c-3.75 0-5.625 0-6.939-.955a5 5 0 01-1.106-1.106C3 18.625 3 16.749 3 13v-1.142z'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
}
