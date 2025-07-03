import { PenIcon } from '@/components/Display/Icons/Pen'

type ItemProps = {
  id: number
  name: string
  document: string
  city: string | null
  uf: string
  code: string | null
}

type ListItemProps = {
  data: ItemProps
}

export function ListItem({ data }: ListItemProps) {
  return (
    <div className='gap-3 grid grid-cols-7 sm:grid-cols-12 hover:bg-zinc-50 p-3 w-full text-sm hover:underline hover:underline-offset-2 transition-all duration-300 cursor-pointer'>
      <div className='hidden sm:block col-span-1 text-left truncate'>
        <span>{data.code ? data.code : '–'}</span>
      </div>
      <div className='col-span-6 truncate'>
        <span>{data.name}</span>
      </div>
      <div className='col-span-2 truncate'>
        <span>{data.document}</span>
      </div>
      <div className='hidden sm:block col-span-2 truncate'>
        <span>{data.city ? data.city : '–'}</span>
      </div>
      <div className='hidden sm:block col-span-1 truncate'>
        <span>{data.uf ? data.uf : '–'}</span>
      </div>
    </div>
  )
}
