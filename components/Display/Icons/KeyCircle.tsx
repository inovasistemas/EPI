import classnames from 'classnames'

type KeyCircleProps = {
  fill: string
  height: string
  width: string
}

export function KeyCircle({ fill, height, width }: KeyCircleProps) {
  return (
    <svg
      className={classnames(
        height,
        width,
        'fill-none transition-all duration-300'
      )}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm3-12a2.996 2.996 0 01-1.25 2.437v2.813a1.75 1.75 0 11-3.5 0v-2.813A3 3 0 1115 10z'
        className={classnames(fill)}
      />
    </svg>
  )
}
