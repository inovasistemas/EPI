import { CaretDownIcon } from '@/components/Display/Icons/CaretDownIcon'
import { CaretUpIcon } from '@/components/Display/Icons/CaretUp'
import { CaretUpDownIcon } from '@/components/Display/Icons/CaretUpDown'

type CaretOrderProps = {
  field: string
  name: string
  order: string
}

export function CaretOrder({ field, name, order }: CaretOrderProps) {
  return field === name ? (
    order === 'asc' ? (
      <CaretDownIcon
        size='size-4'
        stroke='stroke-[--textSecondary]'
        strokeWidth={2.5}
      />
    ) : (
      <CaretUpIcon
        size='size-4'
        stroke='stroke-[--textSecondary]'
        strokeWidth={2.5}
      />
    )
  ) : (
    <CaretUpDownIcon
      size='size-4'
      stroke='stroke-[--textSecondary]'
      strokeWidth={2.5}
    />
  )
}
