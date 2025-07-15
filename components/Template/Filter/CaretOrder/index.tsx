import { CaretDown, CaretUp, CaretUpDown } from '@phosphor-icons/react'

type CaretOrderProps = {
  field: string
  name: string
  order: string
}

export function CaretOrder({ field, name, order }: CaretOrderProps) {
  return field === name ? (
    order === 'asc' ? (
      <CaretDown size={13} weight='bold' className='text-[--textSecondary]' />
    ) : (
      <CaretUp size={13} weight='bold' className='text-[--textSecondary]' />
    )
  ) : (
    <CaretUpDown size={16} weight='bold' className='text-[--textSecondary]' />
  )
}
