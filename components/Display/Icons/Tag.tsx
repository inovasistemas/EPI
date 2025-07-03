import classnames from 'classnames'

type TagIconProps = {
  fill: string
  height: string
  width: string
  stroke: string
}

export function TagIcon({ fill, height, width, stroke }: TagIconProps) {
  return (
    <svg
      className={classnames(fill, height, width, 'transition-all duration-300')}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M8 7.5a.5.5 0 11-1 0 .5.5 0 011 0z'
        strokeWidth={2.2}
        strokeLinecap='square'
        className={classnames(stroke)}
      />
      <path
        d='M3 10.757V6a3 3 0 013-3h4.757a3 3 0 012.122.879l7.25 7.25a3 3 0 010 4.242L15.37 20.13a3 3 0 01-4.242 0l-7.25-7.25A3 3 0 013 10.757zM7.398 7.5h.2'
        strokeWidth={2.2}
        strokeLinecap='square'
        strokeLinejoin='round'
        className={classnames(stroke)}
      />
    </svg>
  )
}
