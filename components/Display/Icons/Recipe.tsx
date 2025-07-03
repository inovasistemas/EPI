import classnames from 'classnames'

type RecipeIconProps = {
  fill: string
  height: string
  width: string
  stroke: string
}

export function RecipeIcon({ fill, height, width, stroke }: RecipeIconProps) {
  return (
    <svg
      className={classnames(fill, height, width, 'transition-all duration-300')}
      viewBox='0 0 22 21'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4 13.296c-1.48.52-2.5 1.318-2.5 2.62 0 4.365 11.878 4.709 16.5 3.462m-3.5-2.392c1.883-.093 5.999-.686 5.985-2.648-.008-1.158-1.864-1.689-3.985-1.81M11.414 8.075L13.31 1'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
        className={classnames(stroke)}
      />
      <path
        d='M7.351 11.645c.5-1.867 2.333-3.516 3.933-3.087 1.6.428 2.363 2.773 1.863 4.64-.5 1.867-2.333 3.516-3.933 3.087-1.6-.429-2.363-2.773-1.863-4.64z'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
        className={classnames(stroke)}
      />
    </svg>
  )
}
