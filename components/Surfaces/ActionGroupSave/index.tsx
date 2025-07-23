import classNames from 'classnames'
import { FloppyDiskIcon } from '@/components/Display/Icons/FloppyDisk'

type ActionGroupSaveProps = {
  actionDisabled?: boolean
  onClick?: () => void
}

export function ActionGroupSave({
  actionDisabled = false,
  onClick,
}: ActionGroupSaveProps) {
  return (
    <div className='bottom-0 z-[201] sticky inset-x-0 flex justify-end items-center gap-3 bg-[--backgroundPrimary] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-3 rounded-b-xl w-full text-sm transition-all duration-300'>
      <div className='flex justify-end items-center gap-3 w-full'>
        <button
          disabled={actionDisabled}
          data-disabled={actionDisabled}
          onClick={onClick}
          type='button'
          className={classNames(
            'group flex flex-row gap-3 relative justify-center items-center bg-[--primaryColor] hover:bg-[--secondaryColor] disabled:bg-[--buttonPrimary] px-4 pr-5 h-10 rounded-xl font-medium text-white disabled:text-zinc-500 text-base active:scale-95 transition-all duration-300 select-none'
          )}
        >
          <FloppyDiskIcon
            size='size-4'
            stroke='stroke-white group-data-[disabled=true]:stroke-zinc-500 group-data-[active=true]:stroke-[--primaryColor]'
            strokeWidth={2.5}
          />
          <span className='font-medium text-sm'>Salvar</span>
        </button>
      </div>
    </div>
  )
}
