import classNames from 'classnames'

type FactoryIconProps = {
  size: string
  stroke: string
  strokeWidth?: number
}

export function FactoryIcon({
  size,
  stroke,
  strokeWidth = 2,
}: FactoryIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      className={classNames(size, 'fill-none transition-all duration-300')}
    >
      <path
        d='M2.057 19.874L4.005 4.701C4.183 3.314 4.535 3 5.956 3c1.422 0 1.774.314 1.952 1.7L10 21H3.06c-.535 0-.802 0-.953-.17-.151-.169-.117-.431-.05-.956zM10.154 21H21c.471 0 .707 0 .854-.146C22 20.707 22 20.47 22 20V7l-4.36 3.633c-.71.592-1.064.887-1.352.752C16 11.25 16 10.79 16 9.865V7l-4.448 3.235c-.522.38-.782.569-1.084.667C10.167 11 9.844 11 9.2 11H9M4 6h4M12 15h2M17 15h2'
        className={classNames(stroke, 'transition-all duration-300')}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
