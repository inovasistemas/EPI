import classNames from 'classnames'
import Link from 'next/link'
import { FloppyDiskIcon } from '@/components/Display/Icons/FloppyDisk'
import { TrashIcon } from '@/components/Display/Icons/Trash'
import { AddIcon } from '@/components/Display/Icons/Add'

type ActionGroup = {
  onDelete?: () => void
  onClick?: () => void
  showDelete?: boolean
  uriBack?: string
  onClickBack?: () => void
  backType?: 'link' | 'button'
  type?: 'add' | 'save'
}

export function ActionGroup({
  onDelete,
  onClick,
  showDelete = false,
  uriBack = '',
  onClickBack,
  backType = 'link',
  type = 'save',
}: ActionGroup) {
  return (
    <div
      className="bottom-0 sticky inset-x-0 flex justify-between items-center gap-3 bg-[--backgroundPrimary] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-3 rounded-b-xl w-full text-sm transition-all duration-300">
      {showDelete && (
        <button
          type="button"
          onClick={onDelete}
          className={classNames(
            'group select-none active:scale-95 z-[55] cursor-pointer flex gap-3 group relative justify-center items-center bg-transparent hover:bg-[--errorLoader] rounded-xl h-10 text-white transition-all duration-300 px-4 pr-5',
          )}
        >
          <TrashIcon
            size="size-4"
            stroke="stroke-[--textSecondary] group-hover:stroke-white"
            strokeWidth={2.5}
          />

          <span
            className="font-medium text-[--textSecondary] group-hover:text-white text-sm transition-all duration-300">
            Excluir
          </span>
        </button>
      )}
      <div className="flex justify-end items-center gap-3 w-full">
        {backType === 'link' && (
          <Link
            href={uriBack}
            className={classNames(
              'select-none active:scale-95 z-[55] cursor-pointer flex gap-3 group relative justify-center items-center bg-[--buttonPrimary] hover:bg-[--buttonSecondary] rounded-xl h-10 text-white transition-all duration-300 px-4',
            )}
          >
            <span className="font-medium text-[--textSecondary] text-sm">
              Cancelar
            </span>
          </Link>
        )}
        
        {backType === 'button' && (
          <button
            onClick={onClickBack}
            type="button"
            className={classNames(
              'select-none active:scale-95 z-[55] cursor-pointer flex gap-3 group relative justify-center items-center bg-[--buttonPrimary] hover:bg-[--buttonSecondary] rounded-xl h-10 text-white transition-all duration-300 px-4',
            )}
          >
            <span className="font-medium text-white text-sm">Cancelar</span>
          </button>
        )}

        {type === 'save' && (
          <button
            onClick={onClick}
            type="button"
            className={classNames(
              'select-none active:scale-95 z-[55] cursor-pointer flex gap-3 group relative justify-center items-center bg-[--primaryColor] hover:bg-[--secondaryColor] rounded-xl h-10 text-white transition-all duration-300 px-4 pr-5',
            )}
          >
            <FloppyDiskIcon
              size="size-4"
              stroke="stroke-white"
              strokeWidth={2.5}
            />
            <span className="font-medium text-white text-sm">Salvar</span>
          </button>
        )}

        {type === 'add' && (
          <button
            onClick={onClick}
            type="button"
            className={classNames(
              'select-none active:scale-95 z-[55] cursor-pointer flex gap-2 group relative justify-center items-center bg-[--primaryColor] hover:bg-[--secondaryColor] rounded-xl h-10 text-white transition-all duration-300 px-4 pr-5',
            )}
          >
            <AddIcon
              size="size-4"
              stroke="stroke-white"
              strokeWidth={2.5}
            />
            <span className="font-medium text-white text-sm">Adicionar</span>
          </button>
        )}
      </div>
    </div>
  )
}
