type TagProps = {
  label: string
}

export function Tag({ label }: TagProps) {
  return (
    <span className='bg-blue-600/10 px-2 py-1 rounded-md font-medium text-[--textSecondaryLight] text-[10px] whitespace-nowrap'>
      {label}
    </span>
  )
}
