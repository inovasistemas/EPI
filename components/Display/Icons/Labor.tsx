import classNames from 'classnames'

type LaborIconProps = {
  size: string
  stroke: string
  strokeWidth?: number
}

export function LaborIcon({ size, stroke, strokeWidth = 2 }: LaborIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      className={classNames(size, 'fill-none transition-all duration-300')}
    >
      <path
        d='M6.5 9h-1m5 0h-1m-3-3h-1m5 0h-1M18.5 15h-1m1-4h-1'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
      />
      <path
        d='M14 8v14h4c1.886 0 2.828 0 3.414-.586C22 20.828 22 19.886 22 18v-6c0-1.886 0-2.828-.586-3.414C20.828 8 19.886 8 18 8h-4zm0 0c0-2.828 0-4.243-.879-5.121C12.243 2 10.828 2 8 2c-2.828 0-4.243 0-5.121.879C2 3.757 2 5.172 2 8v2'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M8.025 13.954a2 2 0 11-3.999 0 2 2 0 013.999 0zM2.07 20.21c1.058-1.628 2.739-2.238 3.955-2.237 1.216.001 2.847.609 3.906 2.237.068.105.087.235.025.344-.247.439-1.016 1.31-1.57 1.368-.639.068-2.307.078-2.36.078-.053 0-1.773-.01-2.41-.078-.556-.059-1.324-.929-1.572-1.368-.061-.109-.043-.239.026-.344z'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
      />
    </svg>
  )
}
