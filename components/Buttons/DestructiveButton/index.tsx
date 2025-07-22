type DestructiveButtonProps = {
  label: string
  icon: React.ReactElement
  onClick: () => void
}

export function DestructiveButton({
  label,
  icon,
  onClick,
}: DestructiveButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className='group z-[55] relative flex justify-center items-center gap-3 bg-transparent hover:bg-[--errorLoader] px-4 pr-5 rounded-lg h-10 text-[--textSecondary] hover:text-white active:scale-95 transition-all duration-300 cursor-pointer select-none'
    >
      {icon}

      <span className='font-medium text-sm'>{label}</span>
    </button>
  )
}
