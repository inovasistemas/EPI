import classNames from 'classnames'
import Link from 'next/link'
import { FloppyDiskIcon } from '@/components/Display/Icons/FloppyDisk'

export function ActionGroup() {
  return (
    <div className='right-0 bottom-0 z-40 absolute flex justify-end items-center gap-3 bg-[--backgroundPrimary] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-3 rounded-b-xl w-full text-sm transition-all duration-300'>
      <Link
        href='/usuario'
        className={classNames(
          'select-none active:scale-95 z-[55] cursor-pointer flex gap-3 group relative justify-center items-center bg-[--buttonPrimary] hover:bg-[--buttonSecondary] rounded-lg h-10 text-white transition-all duration-300 px-4 pr-5'
        )}
      >
        <span className='font-medium text-[--textSecondary] text-sm'>
          Cancelar
        </span>
      </Link>

      <Link
        href='/usuario'
        className={classNames(
          'select-none active:scale-95 z-[55] cursor-pointer flex gap-3 group relative justify-center items-center bg-primary hover:bg-primaryDarker rounded-lg h-10 text-white transition-all duration-300 px-4 pr-5'
        )}
      >
        <FloppyDiskIcon height='w-4' width='h-4' stroke='stroke-white' />
        <span className='font-medium text-white text-sm'>Salvar</span>
      </Link>
    </div>
  )
}
