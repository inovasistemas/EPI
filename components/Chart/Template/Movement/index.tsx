import { LockIcon } from '@/components/Display/Icons/Lock'
import classNames from 'classnames'
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
  return (
    <button
      type='button'
      className='group relative flex flex-col justify-start items-start col-span-2 bg-[--backgroundPrimary] rounded-2xl w-full overflow-hidden transition-all duration-300 cursor-default'
    >
      <div className='flex justify-between items-start p-3 w-full'>
        <h3 className='font-medium text-base select-none'>
          Fluxo de Saída de Equipamentos
        </h3>
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

      <div className='relative w-full'>
        <div className={classNames({ 'blur-sm select-none': !show}, ['relative col-span-2 w-full'])}>
          <ChartAreaGradient chart={chart} />
        </div>
        <div className='bottom-0 left-0 absolute p-2 w-full'>
          <div className='grid grid-cols-7 bg-white/10 shadow-lg backdrop-blur-lg px-3 py-1 border border-white/10 rounded-xl w-full font-semibold text-[0.65rem]'>
            <div className='flex justify-start'>D</div>
            <div  className='flex justify-start'>S</div>
            <div className='flex justify-start pl-6'>T</div>
            <div>Q</div>
            <div className='flex justify-end pr-5'>Q</div>
            <div className='flex justify-end -mr-1'>S</div>
            <div className='flex justify-end'>S</div>
          </div>
        </div>
      </div>
    </button>
  )
}
