import classNames from 'classnames'

type SecondaryButtonProps = {
  label: string
  icon?: React.ReactElement
  onClick: () => void
}

export function SecondaryButton({
  label,
  icon,
  onClick,
}: SecondaryButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={classNames(
        {
          'pl-4 pr-5': icon,
          'px-8': !icon,
        },
        'group z-[55] relative flex justify-center items-center gap-3 bg-[--tableRow] hover:bg-[--buttonPrimary] px-4 rounded-xl h-10 text-[--textSecondary] active:scale-95 transition-all duration-300 cursor-pointer select-none'
      )}
    >
      {icon ?? icon}

      <span className='font-medium text-sm'>{label}</span>
    </button>
  )
}
