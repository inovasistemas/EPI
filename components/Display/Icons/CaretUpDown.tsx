import classnames from 'classnames'

type CarretUpDownProps = {
  fill: string
  height: string
  width: string
}

export function CarretUpDown({ fill, height, width }: CarretUpDownProps) {
  return (
    <span className='flex flex-col justify-center items-center leading-none'>
      <svg
        className={classnames(
          fill,
          height,
          width,
          'transition-all duration-150  rotate-180'
        )}
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M6.293 10.414l4.293 4.293a2 2 0 002.828 0l4.293-4.293A1 1 0 0016.293 9L12 13.293 7.707 9a1 1 0 10-1.414 1.414z'
          fillRule='nonzero'
        />
      </svg>

      <svg
        className={classnames(
          fill,
          height,
          width,
          'transition-all duration-150 -mt-2'
        )}
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M6.293 10.414l4.293 4.293a2 2 0 002.828 0l4.293-4.293A1 1 0 0016.293 9L12 13.293 7.707 9a1 1 0 10-1.414 1.414z'
          fillRule='nonzero'
        />
      </svg>
    </span>
  )
}
