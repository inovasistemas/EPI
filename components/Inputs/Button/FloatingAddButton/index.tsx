type FloatingAddButtonProps = {
  icon?: React.ReactElement
}

export function FloatingAddButton({ icon }: FloatingAddButtonProps) {
  return (
    <button
      type='button'
      className='right-0 bottom-0 absolute bg-blue-500 shadow-md hover:shadow-lg m-6 border border-[#D9D9D9] rounded-full w-16 h-16 transition-all duration-150'
    ></button>
  )
}
