import classNames from 'classnames'

type LogoutIconProps = {
  size: string
  stroke: string
  strokeWidth?: number
}

export function LogoutIcon({ size, stroke, strokeWidth = 2 }: LogoutIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      className={classNames(size, 'fill-none transition-all duration-300')}
    >
      <path
        d='M18 20a2 2 0 002-2V6a2 2 0 00-2-2M4 6.848v10.304c0 1.593 0 2.39.465 2.946.464.555 1.25.698 2.82.983l3 .544c2.185.397 3.278.595 3.996-.003.719-.599.719-1.708.719-3.925V6.303c0-2.217 0-3.326-.719-3.925-.718-.598-1.81-.4-3.997-.003l-3 .544c-1.57.285-2.355.428-2.82.983C4 4.458 4 5.255 4 6.848zM11.5 11.998v-.01'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
