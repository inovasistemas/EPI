import { CaretUpIcon } from '@/components/Display/Icons/CaretUp'
import { ChartAreaGradient } from '../../Small/Colaborator'

type ChartProps = {
  day: string
  last_week: number
  this_week: number
}

type MovementTemplateProps = {
  chart: ChartProps[]
}

export function MovementTemplate({ chart }: MovementTemplateProps) {
  return (
    <button
      type='button'
      className='group flex flex-col justify-start items-start col-span-2 bg-[--backgroundPrimary] rounded-2xl w-full overflow-hidden transition-all duration-300'
    >
      <div className='flex justify-between items-start p-3 w-full'>
        <h3 className='font-medium text-base select-none'>
          Movimentação por semana
        </h3>
        <span className='-mr-1 rotate-90'>
          <CaretUpIcon size='size-5' stroke='stroke-[--textSecondary]' />
        </span>
      </div>
      <div className='relative col-span-2 w-full'>
        <ChartAreaGradient chart={chart} />
      </div>
    </button>
  )
}
