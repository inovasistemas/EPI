import { CaretUpIcon } from '@/components/Display/Icons/CaretUp'
import { LockIcon } from '@/components/Display/Icons/Lock'
import classNames from 'classnames'
import Link from 'next/link'
import { SmallChartIssues } from '../../Small/Issues'

type PendingTemplateProps = {
  equipment: string
  withdrawn: number
  not_withdrawn: number
  show: boolean
}

export function PendingTemplate({
  equipment,
  withdrawn,
  not_withdrawn,
  show
}: PendingTemplateProps) {
  const calcPercent = (a: number, total: number) => {
    if (total === 0) return '0%'
    const percent = (a / total) * 100
    return `${Math.round(percent)}%`
  }

  return (
    <Link
      href={show ? '/agenda' : ''}
      className='group relative flex flex-col justify-between items-start bg-[--backgroundPrimary] hover:bg-[--backgroundTertiary] p-3 rounded-2xl w-full transition-all duration-300 cursor-pointer'
    >
      <div className='flex justify-between items-start px-1 w-full'>
        <h3 className='font-medium text-base select-none'>
          Taxa de pendências
        </h3>
        <span className='-mr-2 rotate-90'>
          <CaretUpIcon size='size-5' stroke='stroke-[--textSecondary]' />
        </span>
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

      <div className={classNames({ 'blur-sm select-none opacity-60': !show}, ['relative col-span-2 w-full'])}>
        <SmallChartIssues
          equipment={equipment}
          withdrawn={withdrawn}
          not_withdrawn={not_withdrawn}
        />
      </div>
      <div className={classNames({ 'blur-sm select-none opacity-60': !show}, ['flex flex-col gap-4 px-1 w-full'])}>
        <div className='flex justify-between items-center pr-1 w-full h-5 select-none'>
          <div className='flex items-center gap-2 h-full'>
            <span className='bg-[--primaryColor] rounded-full w-1 h-full'></span>
            <span className='font-medium leading-none'>
              {Number(withdrawn) === 0 && Number(not_withdrawn) === 0 ? '100%' : calcPercent(Number(withdrawn), Number(withdrawn) + Number(not_withdrawn))}
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
              {calcPercent(Number(not_withdrawn), Number(withdrawn) + Number(not_withdrawn))}
            </span>
          </div>
          <span className='text-[--textSecondary] text-sm'>
            {not_withdrawn} {not_withdrawn !== 1 ? 'pendentes' : 'pendente'}
          </span>
        </div>
      </div>
    </Link>
  )
}
