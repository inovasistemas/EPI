export function ActionGroup() {
  return (
    <div className='right-0 bottom-0 z-40 fixed flex justify-end items-center gap-3 bg-white mb-[70px] sm:mb-0 p-3 border-[#D9D9D9] border-t w-full text-sm transition-all duration-150'>
      <button className='bg-zinc-200 p-6 py-1.5 rounded-md font-medium'>
        Cancelar
      </button>
      <button className='bg-blue-500 p-6 py-1.5 rounded-md font-medium text-white'>
        Salvar
      </button>
    </div>
  )
}
