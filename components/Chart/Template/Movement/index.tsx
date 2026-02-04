import { LockIcon } from '@/components/Display/Icons/Lock'
import { DateInput } from '@/components/Inputs/Date'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { ChartAreaGradient } from '../../Small/Colaborator'

type ChartProps = {
  day: string
  expected: number
  exited: number
}

type MovementTemplateProps = {
  chart: ChartProps[]
  show: boolean
}

export function MovementTemplate({ chart, show }: MovementTemplateProps) {
  const start = dayjs().startOf('week')
  const end = dayjs().endOf('week')

  return (
    <button
      type='button'
      className='group relative flex flex-col justify-start items-start col-span-2 bg-[--backgroundPrimary] hover:bg-[--backgroundTertiary] rounded-2xl w-full overflow-hidden transition-all duration-300 cursor-default'
    >
      <div className='flex justify-between items-start p-3 w-full'>
        <h3 className='font-medium text-base select-none'>
          Fluxo de Saída de Equipamentos
        </h3>

        <div className='-mr-2 w-[12ch] scale-75'>
          <DateInput start={start} calendarType='week' />
        </div>
      </div>
      
      {!show && 
        <>
        <div className="top-0 left-0 absolute flex justify-center items-center w-full h-full">
          <div className="flex items-center gap-2">
            <LockIcon size="min-w-[1.5rem] size-5" stroke="stroke-[--textSecondary]" />
            <div>
              <div className="text-[--textSecondary] text-base select-none">Acesso não permitido
              </div>
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
