import classNames from "classnames"

type LoadingIconProps = {
  size: string
  stroke: string
  strokeWidth?: number
}

export function LoadingIcon({size, stroke, strokeWidth}: LoadingIconProps) {
  return (

    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      className={classNames(size, 'fill-none transition-all duration-300 animate-spin')}
    >
      <path d="M12 3v3" className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth} strokeLinecap="round" />
      <path
        opacity={0.4}
        d="M12 18v3M21 12h-3"
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path d="M6 12H3" className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth} strokeLinecap="round" />
      <path
        opacity={0.4}
        d="M18.363 5.637l-2.12 2.121"
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M7.758 16.242l-2.121 2.121"
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        opacity={0.4}
        d="M18.363 18.363l-2.12-2.12"
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M7.758 7.758L5.637 5.637"
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  )
}
