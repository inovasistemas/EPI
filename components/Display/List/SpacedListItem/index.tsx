type ListItemProps = {
  id: number
  name: string
  document: string
  city: string | null
  uf: string
  phone: string | null
}

type SpacedListItemProps = {
  data: ListItemProps
}

export function SpacedListItem({ data }: SpacedListItemProps) {
  return (
    <div className='gap-3 grid grid-cols-12 bg-white hover:bg-zinc-100 p-3 border border-[#D9D9D9] rounded-xl w-full text-sm transition-all duration-300 cursor-pointer'>
      <div className='col-span-4 truncate'>
        <span>{data.name}</span>
      </div>
      <div className='col-span-2 truncate'>
        <span>{data.document}</span>
      </div>
      <div className='col-span-2 truncate'>
        <span>{data.city ? data.city : '–'}</span>
      </div>
      <div className='col-span-1 truncate'>
        <span>{data.uf ? data.uf : '–'}</span>
      </div>
      <div className='col-span-2 truncate'>
        <span>{data.phone ? data.phone : '–'}</span>
      </div>
      <div className='flex justify-end items-center col-span-1 truncate'>
        <button className='hover:opacity-50 transition-all duration-300'>
        </button>
      </div>
    </div>
  )
}
