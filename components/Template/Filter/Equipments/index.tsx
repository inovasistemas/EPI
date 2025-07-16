'use client'
import classNames from 'classnames'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { SearchSelect } from '@/components/Inputs/Select/SearchSelect'
import { useQueryParams } from '@/components/Utils/UseQueryParams'

type FilterEquipmentsProps = {
  actionClose: () => void
}

export function FilterEquipments({ actionClose }: FilterEquipmentsProps) {
  const setQueryParam = useQueryParams()
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    manufacturer: searchParams.get('manufacturer') || '',
  })

  const handleFiltersChange = (name: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFilter = () => {
    setQueryParam({
      category: filters.category,
      manufacturer: filters.manufacturer,
    })
    actionClose()
  }

  return (
    <div className='flex flex-col gap-8 -mt-8 w-full'>
      <h2 className='font-semibold text-2xl text-start'>Filtros</h2>
      <div className='flex flex-col gap-6 divide-[--outlinePrimary] divide-y w-full'>
        <div className='items-center grid grid-cols-2 w-full select-none'>
          <div>
            <span className='font-medium'>Fabricante</span>
          </div>
          <div className='grid w-full'>
            <SearchSelect
              value={filters.manufacturer}
              name='selectManufacturer'
              onChange={(value: string) =>
                handleFiltersChange('manufacturer', value)
              }
              options={[
                { value: 'manufacturer1', label: 'Fabricante 1' },
                { value: 'manufacturer2', label: 'Fabricante 2' },
              ]}
              placeholder=''
            />
          </div>
        </div>
        <div className='items-center grid grid-cols-2 pt-6 w-full select-none'>
          <div>
            <span className='font-medium'>Categoria</span>
          </div>
          <div className='grid w-full'>
            <SearchSelect
              value={filters.category}
              name='selectCategory'
              onChange={(value: string) =>
                handleFiltersChange('category', value)
              }
              options={[
                { value: 'hard_hat', label: 'Capacete' },
                { value: 'gloves', label: 'Luvas' },
              ]}
              placeholder=''
            />
          </div>
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
