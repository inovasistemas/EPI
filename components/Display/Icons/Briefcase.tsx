import classNames from 'classnames'

type BriefcaseIconProps = {
  size: string
  stroke: string
  strokeWidth?: number
}

export function BriefcaseIcon({
  size,
  stroke,
  strokeWidth = 2,
}: BriefcaseIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      className={classNames(size, 'fill-none transition-all duration-300')}
    >
      <path
        d='M8.5 6.5c0-1.404 0-2.107.337-2.611a2 2 0 01.552-.552C9.893 3 10.596 3 12 3c1.405 0 2.107 0 2.611.337a2 2 0 01.552.552c.337.504.337 1.207.337 2.611M22 14v-.5c0-3.3 0-4.95-1.025-5.975C19.95 6.5 18.3 6.5 15 6.5H9c-3.3 0-4.95 0-5.975 1.025C2 8.55 2 10.2 2 13.5v.5c0 3.3 0 4.95 1.025 5.975C4.05 21 5.7 21 9 21h6c3.3 0 4.95 0 5.975-1.025C22 18.95 22 17.3 22 14z'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M2 11s2.632 4 10 4 10-4 10-4'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinejoin='round'
      />
      <path
        d='M12 12h.009'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
