import classNames from 'classnames'

type LinkIconProps = {
  size: string
  stroke: string
  strokeWidth?: number
}

export function LinkIcon({ size, stroke, strokeWidth = 2 }: LinkIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      className={classNames(size, 'fill-none transition-all duration-300')}
    >
      <path
        d='M10 13.229c.142.232.31.451.504.654a3.56 3.56 0 004.454.59c.26-.16.505-.357.73-.59l3.239-3.372c1.43-1.49 1.43-3.904 0-5.394a3.564 3.564 0 00-5.184 0l-.713.743'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
      />
      <path
        d='M10.97 18.14l-.713.743a3.564 3.564 0 01-5.184 0c-1.43-1.49-1.43-3.905 0-5.394l3.24-3.372a3.564 3.564 0 015.183 0c.194.202.362.422.504.654'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
      />
      <path
        d='M21 16h-2.079m-2.92 5v-2.079M3 8H5.08M8 3v2.079'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
