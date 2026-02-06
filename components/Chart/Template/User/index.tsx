import { CaretUpIcon } from '@/components/Display/Icons/CaretUp'
import { LockIcon } from '@/components/Display/Icons/Lock'
import classNames from 'classnames'
import Link from 'next/link'

type UserTemplateRowsProps = {
  users: number
  name: string
}

type UserTemplateProps = {
  count: number
  rows: [UserTemplateRowsProps]
  show: boolean
}

export function UserTemplate({ count, rows, show }: UserTemplateProps) {
  return (
    <Link
      href='/usuarios'
      className='group relative flex flex-col justify-between items-center bg-[--backgroundPrimary] hover:bg-[--backgroundTertiary] p-3 rounded-2xl w-full overflow-hidden transition-all duration-300 cursor-pointer select-none'
    >
      <div className='flex flex-row justify-between items-start w-full'>
        <div className={classNames({'blur-sm select-none opacity-60': !show}, ['flex flex-col justify-start items-start w-full'])}>
          <span className='text-[--textSecondary] text-xs'>Usuários</span>
          <span className='z-20 pb-3 w-full font-medium text-2xl text-left transition-all duration-300'>
            {count}
          </span>
        </div>
        <span className='-mr-1 rotate-90'>
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

      <div className={classNames({'blur-sm select-none opacity-60': !show}, ['flex flex-col gap-1 w-full'])}>
        {rows.map((row, i) => (
          <div key={`user-${i}`} className='flex flex-row justify-start items-center gap-1 w-full'>
            <span className='font-semibold text-sm'>{row.users}</span>
            <span className='text-sm capitalize'>{row.name}</span>
          </div>
        ))}
      </div>
    </Link>
  )
}
