import classNames from 'classnames'

type DownloadIconProps = {
  size: string
  stroke: string
  strokeWidth?: number
}

export function DownloadIcon({
  size,
  stroke,
  strokeWidth = 2,
}: DownloadIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={128}
      height={128}
      viewBox="0 0 24 24"
      className={classNames(size, 'fill-none transition-all duration-300')}
    >
      <path
        d="M3 17c0 .93 0 1.395.102 1.777a3 3 0 002.121 2.121C5.605 21 6.07 21 7 21h10c.93 0 1.395 0 1.776-.102a3 3 0 002.122-2.121C21 18.395 21 17.93 21 17M16.5 11.5S13.186 16 12 16s-4.5-4.5-4.5-4.5M12 15V3"
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
