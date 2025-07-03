import classnames from 'classnames'

type PostIconProps = {
  fill: string
  height: string
  width: string
}

export function PostIcon({ fill, height, width }: PostIconProps) {
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
        d='M4 6a4 4 0 014-4h8a4 4 0 014 4v12a4 4 0 01-4 4H8a4 4 0 01-4-4V6zm5 0a1 1 0 000 2h6a1 1 0 100-2H9zm0 4a1 1 0 100 2h6a1 1 0 100-2H9zm0 4a1 1 0 100 2h2a1 1 0 100-2H9z'
        className={classnames(fill, 'filltransition-all duration-300')}
      />
    </svg>
  )
}
