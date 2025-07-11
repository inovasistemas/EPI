import classnames from 'classnames'

type FloppyDiskIconProps = {
  stroke: string
  height: string
  width: string
}

export function FloppyDiskIcon({ stroke, height, width }: FloppyDiskIconProps) {
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
      <title>Floppy Disk Icon</title>
      <path
        d='M8 4v3a1 1 0 001 1h6a1 1 0 001-1V4m4 4.243V17a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h8.757a3 3 0 012.122.879L19.12 6.12A3 3 0 0120 8.243zM8 14v5a1 1 0 001 1h6a1 1 0 001-1v-5a1 1 0 00-1-1H9a1 1 0 00-1 1z'
        className={classnames(stroke, 'transition-all duration-300')}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
