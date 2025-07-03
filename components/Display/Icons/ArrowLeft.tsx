import classnames from 'classnames'

type ArrowLeftIconProps = {
  fill: string
  height: string
  width: string
}

export function ArrowLeftIcon({ fill, height, width }: ArrowLeftIconProps) {
  return (
    <svg
      className={classnames(fill, height, width, 'transition-all duration-150')}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M6.414 11H20a1 1 0 010 2H6.414l3.243 3.243a1 1 0 01-1.414 1.414L4 13.414a2 2 0 010-2.828l4.243-4.243a1 1 0 011.414 1.414L6.414 11z'
        fillRule='nonzero'
      />
    </svg>
  )
}
