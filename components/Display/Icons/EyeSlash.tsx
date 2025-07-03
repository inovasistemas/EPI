import classnames from 'classnames'

type EyeSlashIconProps = {
  fill: string
  height: string
  width: string
  stroke: string
}

export function EyeSlashIcon({
  fill,
  height,
  width,
  stroke,
}: EyeSlashIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={classnames(
        height,
        width,
        'fill-none transition-all duration-300 hover:opacity-80'
      )}
      viewBox='0 0 24 24'
    >
      <path
        d='M10.742 5.086c3.813-.522 7.78 1.335 10.484 5.57.524.82.524 1.868 0 2.689-.294.46-.603.894-.926 1.298'
        stroke='currentColor'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
        className={classnames(stroke, 'transition-all duration-300')}
      />
      <path
        d='M3.707 2.293a1 1 0 00-1.414 1.414l1.414-1.414zm16.586 19.414a1 1 0 001.414-1.414l-1.414 1.414zm-18-18l18 18 1.414-1.414-18-18-1.414 1.414z'
        className={classnames(fill, 'transition-all duration-300')}
      />
      <path
        d='M10.333 10.895a1 1 0 10-1.666-1.108l1.666 1.108zm3.88 4.438a1 1 0 00-1.108-1.666l1.108 1.666zM12 14a2 2 0 01-2-2H8a4 4 0 004 4v-2zm-2-2c0-.41.123-.789.333-1.105L8.667 9.787A3.986 3.986 0 008 12h2zm3.105 1.667c-.316.21-.695.333-1.105.333v2c.816 0 1.579-.246 2.213-.667l-1.108-1.666z'
        className={classnames(fill, 'transition-all duration-300')}
      />
      <path
        d='M6.128 7c-1.238.909-2.379 2.127-3.355 3.655a2.5 2.5 0 00.001 2.691c3.576 5.599 9.362 7.04 14.075 4.322'
        stroke='currentColor'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
        className={classnames(stroke, 'transition-all duration-300')}
      />
    </svg>
  )
}
