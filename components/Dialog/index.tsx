import cn from 'classnames'

export function Dialog({
  title,
  description,
  handleDelete,
  handleCancel,
}: DialogProps) {
  return (
    <div className='flex flex-col gap-2'>
      <span className='font-medium text-xl text-center'>{title}</span>
      <span className='px-6 text-base text-center'>{description}</span>

      <div className='flex flex-row justify-center gap-3 pt-6'>
        <button
          type='button'
          onClick={handleDelete}
          className={cn(
            'group group z-[55] relative flex justify-center items-center gap-3 bg-[--errorLoader] px-8 rounded-xl h-10 text-white active:scale-95 transition-all duration-300 cursor-pointer select-none'
          )}
        >
          <span className='font-medium text-white text-sm transition-all duration-300'>
            Confirmar
          </span>
        </button>

        <button
          type='button'
          onClick={handleCancel}
          className={cn(
            'group z-[55] relative flex justify-center items-center gap-3 bg-[--buttonPrimary] hover:bg-[--buttonSecondary] px-8 rounded-xl h-10 text-white active:scale-95 transition-all duration-300 cursor-pointer select-none'
          )}
        >
          <span className='font-medium text-[--textSecondary] text-sm'>
            Cancelar
          </span>
        </button>
      </div>
    </div>
  )
}
