import { SubIcon } from '@/components/Display/Icons/Sub'

type SubsectorProps = {
  label: string
  onClick: () => void
}

export function Subsector({ label, onClick }: SubsectorProps) {
  return (
    <button
      onClick={onClick}
      type='button'
      className='group z-[200] relative flex justify-center items-center gap-2 bg-blue-600/10 hover:bg-blue-600/20 px-3 pr-4 rounded-xl h-8 active:scale-95 transition-all duration-300'
    >
      <SubIcon
        size='size-4'
        stroke='stroke-[--textSecondaryLight] group-data-[active=true]:stroke-[--primaryColor]'
        strokeWidth={2}
      />
      <span className='font-medium text-[--textSecondaryLight] text-xs'>
        {label}
      </span>
    </button>
  )
}
