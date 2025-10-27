import { CaretUpIcon } from '@/components/Display/Icons/CaretUp'
import { ChartAreaGradient } from '../../Small/Colaborator'
import classNames from 'classnames'
import { PermissionDeniedScreen } from '@/components/Features/PermissionDenied'
import { LockIcon } from '@/components/Display/Icons/Lock'
import { Countdown } from '@/components/Countdown'

type ChartProps = {
  day: string
  last_week: number
  this_week: number
}

type MovementTemplateProps = {
  chart: ChartProps[]
  show: boolean
}

export function MovementTemplate({ chart, show }: MovementTemplateProps) {
  return (
    <button
      type='button'
      className='group relative flex flex-col justify-start items-start col-span-2 bg-[--backgroundPrimary] rounded-2xl w-full overflow-hidden transition-all duration-300 cursor-default'
    >
      <div className='flex justify-between items-start p-3 w-full'>
        <h3 className='font-medium text-base select-none'>
          Movimentação por semana
        </h3>
        <span className='-mr-1 rotate-90'>
          <CaretUpIcon size='size-5' stroke='stroke-[--textSecondary]' />
        </span>
      </div>
      {!show && 
        <>
        <div className="absolute flex justify-center items-center w-full h-full">
          <div className="flex items-center gap-2">
            <div className='mt-6 scale-[.60]'>
              <Countdown date={'2025-11-10 00:00:00'} />
            </div>
          </div>
        </div>
        <div className='z-50 absolute w-full h-full'></div>
        </>
      }

      <div className={classNames({ 'blur-sm select-none': !show}, ['relative col-span-2 w-full'])}>
        <ChartAreaGradient chart={chart} />
      </div>
    </button>
  )
}
