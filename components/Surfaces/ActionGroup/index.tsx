import classNames from 'classnames'
import Link from 'next/link'
import { FloppyDiskIcon } from '@/components/Display/Icons/FloppyDisk'
import { TrashIcon } from '@/components/Display/Icons/Trash'

type ActionGroup = {
  showDelete?: boolean
}

export function ActionGroup({ showDelete = false }: ActionGroup) {
  return (
    <div className='bottom-0 z-40 sticky inset-x-0 flex justify-between items-center gap-3 bg-[--backgroundPrimary] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-3 rounded-b-xl w-full text-sm transition-all duration-300'>
      {showDelete && (
        <Link
          href='/usuarios'
          className={classNames(
            'group select-none active:scale-95 z-[55] cursor-pointer flex gap-3 group relative justify-center items-center bg-transparent hover:bg-[--errorLoader] rounded-lg h-10 text-white transition-all duration-300 px-4 pr-5'
          )}
        >
          <TrashIcon
            size='size-4'
            stroke='stroke-[--textSecondary] group-hover:stroke-white'
            strokeWidth={2.5}
          />

          <span className='font-medium text-[--textSecondary] group-hover:text-white text-sm transition-all duration-300'>
            Excluir
          </span>
        </Link>
      )}
      <div className='flex justify-end items-center gap-3 w-full'>
        <Link
          href='/usuarios'
          className={classNames(
            'select-none active:scale-95 z-[55] cursor-pointer flex gap-3 group relative justify-center items-center bg-[--buttonPrimary] hover:bg-[--buttonSecondary] rounded-lg h-10 text-white transition-all duration-300 px-4'
          )}
        >
          <span className='font-medium text-[--textSecondary] text-sm'>
            Cancelar
          </span>
        </Link>

        <Link
          href='/usuarios'
          className={classNames(
            'select-none active:scale-95 z-[55] cursor-pointer flex gap-3 group relative justify-center items-center bg-[--primaryColor] hover:bg-[--secondaryColor] rounded-lg h-10 text-white transition-all duration-300 px-4 pr-5'
          )}
        >
          <FloppyDiskIcon
            size='size-4'
            stroke='stroke-white'
            strokeWidth={2.5}
          />
          <span className='font-medium text-white text-sm'>Salvar</span>
        </Link>
      </div>
    </div>
  )
}
