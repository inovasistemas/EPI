import { SubIcon } from '@/components/Display/Icons/Sub'
import { useQueryParams } from '@/components/Utils/UseQueryParams'

type SubsectorProps = {
  id: string
  label: string
  onClick: () => void
}

export function Subsector({ id, label, onClick }: SubsectorProps) {
  const setQueryParam = useQueryParams()
  const handleClick = () => {
    setQueryParam({
      sector: id,
      type: 'editSubsector',
    })
    onClick()
  }

  return (
    <button
      onClick={handleClick}
      type='button'
      className='group z-[200] relative flex justify-center items-center gap-2 bg-blue-600/10 hover:bg-blue-600/20 px-3 pr-4 rounded-xl h-8 active:scale-95 transition-all duration-300'
    >
      <SubIcon
        size='size-4'
        stroke='stroke-[--textSecondaryLight] group-data-[active=true]:stroke-[--primaryColor]'
        strokeWidth={2}
      />
      <span className='font-medium text-[--textSecondaryLight] text-xs capitalize'>
        {label}
      </span>
    </button>
  )
}
