import { CaretUpIcon } from '@/components/Display/Icons/CaretUp'
import { SmallChartIssues } from '../../Small/Issues'

type PendingTemplateProps = {
  equipment: string
  withdrawn: number
  notwithdrawn: number
}

export function PendingTemplate({
  equipment,
  withdrawn,
  notwithdrawn,
}: PendingTemplateProps) {
  const calcPercent = (a: number, total: number) => {
    if (total === 0) return '0%'
    const percent = (a / total) * 100
    return `${Math.round(percent)}%`
  }

  return (
    <button
      type='button'
      className='group relative flex flex-col justify-between items-start bg-[--backgroundPrimary] p-3 rounded-2xl w-full transition-all duration-300'
    >
      <div className='flex justify-between items-start px-1 w-full'>
        <h3 className='font-medium text-base select-none'>
          Taxa de pendências
        </h3>
        <span className='-mr-2 rotate-90'>
          <CaretUpIcon size='size-5' stroke='stroke-[--textSecondary]' />
        </span>
      </div>
      <SmallChartIssues
        equipment={equipment}
        withdrawn={withdrawn}
        notwithdrawn={notwithdrawn}
      />
      <div className='flex flex-col gap-4 px-1 w-full'>
        <div className='flex justify-between items-center pr-1 w-full h-5 select-none'>
          <div className='flex items-center gap-2 h-full'>
            <span className='bg-[--primaryColor] rounded-full w-1 h-full'></span>
            <span className='font-medium leading-none'>
              {calcPercent(withdrawn, withdrawn + notwithdrawn)}
            </span>
          </div>
          <span className='text-[--textSecondary] text-sm'>
            {withdrawn} {withdrawn !== 1 ? 'regularizados' : 'regularizado'}
          </span>
        </div>
        <div className='flex justify-between items-center pr-1 w-full h-5 select-none'>
          <div className='flex items-center gap-2 h-full'>
            <span className='bg-[--chartYellow] rounded-full w-1 h-full'></span>
            <span className='font-medium leading-none'>
              {calcPercent(notwithdrawn, withdrawn + notwithdrawn)}
            </span>
          </div>
          <span className='text-[--textSecondary] text-sm'>
            {notwithdrawn} {notwithdrawn !== 1 ? 'pendentes' : 'pendente'}
          </span>
        </div>
      </div>
    </button>
  )
}
