import { RangeDateInput } from '@/components/Inputs/RangeDate'
import type dayjs from 'dayjs'

type FilterReportCostProps = {
  start: dayjs.Dayjs
  end: dayjs.Dayjs
}

export function FilterReportCost({ start, end }: FilterReportCostProps) {
  return (
    <div className='flex flex-col gap-8 w-full'>
      <h2 className='font-medium text-xl text-start'>Filtros</h2>
      <div className='flex flex-col gap-6 divide-y divide-[--outlinePrimary] w-full'>
        <div className='items-center grid grid-cols-2 w-full select-none'>
          <div>
            <span className='font-medium'>Período</span>
          </div>
          <div>
            <RangeDateInput start={start} end={end} onChange={() => null} />
          </div>
        </div>
      </div>

      <div className='flex justify-end gap-3'>
        <button
          type='button'
          className='group relative flex justify-center items-center gap-3 bg-transparent hover:bg-[--buttonPrimary] px-4 rounded-xl h-10 text-white active:scale-95 transition-all duration-300 cursor-pointer select-none'
        >
          <span className='font-medium text-[--textSecondary] text-sm'>
            Limpar
          </span>
        </button>

        <button
          type='button'
          className='group relative flex justify-center items-center gap-3 bg-[--primaryColor] hover:bg-[--secondaryColor] px-8 rounded-xl h-10 text-white active:scale-95 transition-all duration-300 cursor-pointer select-none'
        >
          <span className='font-medium text-sm'>Filtrar</span>
        </button>
      </div>
    </div>
  )
}
