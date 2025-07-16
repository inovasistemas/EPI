'use client'
import classNames from 'classnames'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { SearchSelect } from '@/components/Inputs/Select/SearchSelect'
import { useQueryParams } from '@/components/Utils/UseQueryParams'

type FilterOperatorProps = {
  actionClose: () => void
}

export function FilterOperator({ actionClose }: FilterOperatorProps) {
  const setQueryParam = useQueryParams()
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState({
    permissionGroup: searchParams.get('permissionGroup') || '',
  })

  const handleFiltersChange = (name: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFilter = () => {
    setQueryParam({ permissionGroup: filters.permissionGroup })
    actionClose()
  }

  return (
    <div className='flex flex-col gap-8 -mt-8 w-full'>
      <h2 className='font-semibold text-2xl text-start'>Filtros</h2>
      <div className='items-center grid grid-cols-2 w-full select-none'>
        <div>
          <span className='font-medium'>Grupo de permissão</span>
        </div>
        <div className='grid w-full'>
          <SearchSelect
            value={filters.permissionGroup}
            name='selectOperator'
            onChange={(value: string) =>
              handleFiltersChange('permissionGroup', value)
            }
            options={[
              { value: 'admin', label: 'Administrador' },
              { value: 'operator', label: 'Operador' },
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
