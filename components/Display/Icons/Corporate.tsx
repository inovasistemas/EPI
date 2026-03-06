import classNames from 'classnames'

type CorporateIconProps = {
  size: string
  stroke: string
  strokeWidth?: number
}

export function CorporateIcon({
  size,
  stroke,
  strokeWidth = 2,
}: CorporateIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={128}
      height={128}
      viewBox="0 0 24 24"
      className={classNames(size, 'fill-none transition-all duration-300')}
    >
      <path
        d="M12 22V6c0-1.886 0-2.828-.586-3.414C10.828 2 9.886 2 8 2H6c-1.886 0-2.828 0-3.414.586C2 3.172 2 4.114 2 6v12c0 1.886 0 2.828.586 3.414C3.172 22 4.114 22 6 22h6zM12 22h6c1.886 0 2.828 0 3.414-.586C22 20.828 22 19.886 22 18v-6c0-1.886 0-2.828-.586-3.414C20.828 8 19.886 8 18 8h-6"
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
      />
      <path
        d="M18.5 16h-3m3-4h-3M8.5 14h-3m3-4h-3m3-4h-3"
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  )
}
