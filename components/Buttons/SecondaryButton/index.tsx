import classNames from 'classnames'

type SecondaryButtonProps = {
  label: string
  icon?: React.ReactElement
  onClick: () => void
  disabled?: boolean
}

export function SecondaryButton({
  label,
  icon,
  onClick,
  disabled=false
}: SecondaryButtonProps) {
  return (
    <button
      disabled={disabled}
      type='button'
      onClick={onClick}
      className={classNames(
        {
          'pl-4 pr-5': icon,
          'px-8': !icon,
        },
        'group z-[45] relative flex justify-center disabled:cursor-not-allowed disabled:opacity-60 items-center gap-3 bg-[--tableRow] disabled:bg-[--tableRow] hover:bg-[--buttonPrimary] px-4 rounded-xl h-10 text-[--textSecondary] active:scale-95 transition-all duration-300 cursor-pointer select-none'
      )}
    >
      {icon ?? icon}

      <span className='font-medium text-sm'>{label}</span>
    </button>
  )
}
