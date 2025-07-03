import classnames from 'classnames'

type PenIconProps = {
  fill: string
  height: string
  width: string
}

export function PenIcon({ fill, height, width }: PenIconProps) {
  return (
    <svg
      className={classnames(fill, height, width, 'transition-all duration-300')}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M.914 13l2 2H15.5v-4H2.914l-2 2zM2.5 9h14a1 1 0 011 1v6a1 1 0 01-1 1h-14a1 1 0 01-.707-.293l-3-3a1 1 0 010-1.414l3-3A1 1 0 012.5 9zm15 6h4v-4h-4v4zm-1-6h6a1 1 0 011 1v6a1 1 0 01-1 1h-6a1 1 0 01-1-1v-6a1 1 0 011-1z'
        transform='rotate(-45 11 13)'
        fillRule='nonzero'
      />
    </svg>
  )
}
