import classNames from 'classnames'
import { AddIcon } from '@/components/Display/Icons/Add'

type ActionGroupAddProps = {
  addLabel?: string
  onClick?: (id: string) => void
}

export function ActionGroupAdd({
  addLabel = 'Adicionar',
  onClick,
}: ActionGroupAddProps) {
  return (
    <div className='bottom-0 z-[201] sticky inset-x-0 flex justify-end items-center gap-3 bg-[--backgroundPrimary] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-3 rounded-b-xl w-full text-sm transition-all duration-300'>
      <div className='flex justify-end items-center gap-3 w-full'>
        <button
          onClick={() => {
            if (onClick) {
              onClick('')
            }
          }}
          type='button'
          className={classNames(
            'select-none active:scale-95 z-[55] cursor-pointer flex gap-3 group relative justify-center items-center bg-[--primaryColor] hover:bg-[--secondaryColor] rounded-xl h-10 text-white transition-all duration-300 px-4 pr-5'
          )}
        >
          <AddIcon
            size='size-4'
            stroke='stroke-white group-data-[active=true]:stroke-[--primaryColor]'
            strokeWidth={2.5}
          />
          <span className='font-medium text-white text-sm'>{addLabel}</span>
        </button>
      </div>
    </div>
  )
}
