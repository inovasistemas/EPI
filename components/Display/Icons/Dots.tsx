import classNames from 'classnames'

type DotsIconProps = {
  size: string
  fill: string
}

export function DotsIcon({
  size,
  fill
}: DotsIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={64}
      height={64}
      viewBox="0 0 24 24"
      className={classNames(size, fill, 'transition-all duration-300')}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.25 6a4.75 4.75 0 109.5 0 4.75 4.75 0 00-9.5 0zM1.25 18a4.75 4.75 0 109.5 0 4.75 4.75 0 00-9.5 0zM13.25 6a4.75 4.75 0 109.5 0 4.75 4.75 0 00-9.5 0zM13.25 18a4.75 4.75 0 109.5 0 4.75 4.75 0 00-9.5 0z"
        className={classNames(fill, 'transition-all duration-300')}
      />
    </svg>
  )
}
