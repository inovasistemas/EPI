import { CaretUpIcon } from '@/components/Display/Icons/CaretUp'

type EquipmentTemplateProps = {
  count: number
  pending: number
  expired: number
}

export function EquipmentTemplate({
  count,
  pending,
  expired,
}: EquipmentTemplateProps) {
  return (
    <button
      type='button'
      className='group relative flex flex-col justify-start items-center bg-[--backgroundPrimary] p-3 rounded-2xl w-full overflow-hidden transition-all duration-300 cursor-pointer select-none'
    >
      <div className='flex flex-row justify-between items-start w-full'>
        <div className='flex flex-col justify-start items-start w-full'>
          <span className='text-[--textSecondary] text-xs'>Equipamentos</span>
          <span className='z-20 pb-3 w-full font-medium text-2xl text-left transition-all duration-300'>
            {count}
          </span>
        </div>
        <span className='-mr-1 rotate-90'>
          <CaretUpIcon size='size-5' stroke='stroke-[--textSecondary]' />
        </span>
      </div>
      <div className='flex flex-col gap-1 w-full'>
        <div className='flex flex-row justify-start items-center gap-1 w-full'>
          <span className='font-semibold text-sm'>{expired}</span>
          <span className='text-sm'>com validade expirada</span>
        </div>
        <div className='flex flex-row justify-start items-center gap-1 w-full text-[--chartRed]'>
          <span className='font-semibold text-sm'>{pending}</span>
          <span className='text-sm'>devoluções pendentes</span>
        </div>
      </div>
    </button>
  )
}
