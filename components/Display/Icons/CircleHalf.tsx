import classnames from 'classnames'

type CircleHalfIconProps = {
  fill: string
  height: string
  width: string
}

export function CircleHalfIcon({ fill, height, width }: CircleHalfIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      className={classnames(
        height,
        width,
        'fill-none transition-all duration-300'
      )}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12 4a8 8 0 100 16V4zM2 12C2 6.477 6.477 2 12 2c.375 0 .745.02 1.11.061C18.11 2.614 22 6.852 22 12s-3.89 9.386-8.89 9.939c-.365.04-.735.061-1.11.061-5.523 0-10-4.477-10-10z'
        className={classnames(fill, 'transition-all duration-300')}
      />
    </svg>
  )
}
