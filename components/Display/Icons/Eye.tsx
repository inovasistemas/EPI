import classnames from 'classnames'

type EyeIconProps = {
  stroke: string
  height: string
  width: string
}

export function EyeIcon({ stroke, height, width }: EyeIconProps) {
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
        d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
        stroke='currentColor'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
        className={classnames(stroke, 'transition-all duration-300')}
      />
      <path
        d='M21.225 10.652c-4.816-7.536-13.634-7.536-18.45 0a2.507 2.507 0 000 2.696c4.816 7.536 13.634 7.536 18.45 0a2.507 2.507 0 000-2.696z'
        stroke='currentColor'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
        className={classnames(stroke, 'transition-all duration-300')}
      />
    </svg>
  )
}
