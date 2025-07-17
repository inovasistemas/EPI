'use client'
import classNames from 'classnames'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { SearchSelect } from '@/components/Inputs/Select/SearchSelect'
import { useQueryParams } from '@/components/Utils/UseQueryParams'

type FilterCollaboratorProps = {
  actionClose: () => void
}

export function FilterCollaborator({ actionClose }: FilterCollaboratorProps) {
  const setQueryParam = useQueryParams()
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState({
    jobPosition: searchParams.get('jobPosition') || '',
  })

  const handleFiltersChange = (name: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFilter = () => {
    setQueryParam({ jobPosition: filters.jobPosition })
    actionClose()
  }

  return (
    <div className='flex flex-col gap-8 -mt-8 w-full'>
      <h2 className='font-semibold text-2xl text-start'>Filtros</h2>
      <div className='items-center grid grid-cols-2 w-full select-none'>
        <div>
          <span className='font-medium'>Cargo</span>
        </div>
        <div className='grid w-full'>
          <SearchSelect
            value={filters.jobPosition}
            name='selectPermissionGroup'
            onChange={(value: string) =>
              handleFiltersChange('jobPosition', value)
            }
            options={[
              { value: 'production_assistant', label: 'Auxiliar Produção' },
            ]}
            placeholder=''
          />
        </div>
      </div>
      <div className='flex justify-end gap-3'>
        <button
          onClick={actionClose}
          type='button'
          className={classNames(
            'select-none active:scale-95 cursor-pointer flex gap-3 group relative justify-center items-center bg-transparent hover:bg-[--buttonPrimary] rounded-lg h-10 text-white transition-all duration-300 px-4'
          )}
        >
          <span className='font-medium text-[--textSecondary] text-sm'>
            Cancelar
          </span>
        </button>

        <button
          onClick={handleFilter}
          type='button'
          className={classNames(
            'select-none active:scale-95 cursor-pointer flex gap-3 group relative justify-center items-center bg-[--primaryColor] hover:bg-[--secondaryColor] rounded-lg h-10 text-white transition-all duration-300 px-8'
          )}
        >
          <span className='font-medium text-sm'>Filtrar</span>
        </button>
      </div>
    </div>
  )
}
