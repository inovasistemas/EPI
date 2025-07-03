import classnames from 'classnames'

type HomeIconProps = {
  fill: string
  height: string
  width: string
  stroke: string
  active: boolean
}

export function HomeIcon({
  fill,
  height,
  width,
  stroke,
  active,
}: HomeIconProps) {
  return (
    <svg
      viewBox='0 0 18 20'
      xmlns='http://www.w3.org/2000/svg'
      className={classnames(fill, height, width, 'transition-all duration-300')}
    >
      <path
        d='M11.686 1.835a4 4 0 00-5.372 0l-5 4.53A4 4 0 000 9.33V16a4 4 0 004 4h1a2 2 0 002-2v-3a2 2 0 014 0v3a2 2 0 002 2h1a4 4 0 004-4V9.33a4 4 0 00-1.314-2.964l-5-4.531z'
        className={classnames(fill)}
      />
    </svg>
  )
}
