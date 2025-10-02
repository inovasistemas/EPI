'use client'
import classNames from 'classnames'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { SearchSelect } from '@/components/Inputs/Select/SearchSelect'
import { useQueryParams } from '@/components/Utils/UseQueryParams'
import { getPermissionGroups } from '@/services/User'

type FilterOperatorProps = {
  actionClose: () => void
}

export function FilterOperator({ actionClose }: FilterOperatorProps) {
  const setQueryParam = useQueryParams()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    permissionGroup: searchParams.get('permissionGroup') || '',
  })
  const fetchedPermissionGroups = useRef(false)
  const [permissionGroups, setPermissionGroups] = useState([])

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

  const handleFilterClean = () => {
    handleFiltersChange('permissionGroup', '')
  }

  useEffect(() => {
    if (fetchedPermissionGroups.current) return
    fetchedPermissionGroups.current = true

    const fetchPermissionGroups = async () => {
      const response = await getPermissionGroups({loading: setLoading})

      if (response && response.status === 200) {
        const filtered = response.data.data.map(
          (item: { name: string; uuid: string }) => ({
            label: item.name,
            value: item.uuid,
          })
        )
        setPermissionGroups(filtered)
      }
    }
    fetchPermissionGroups()
  }, [])

  return (
    <div className='flex flex-col gap-8 -mt-8 w-full'>
      <h2 className='font-medium text-xl text-start'>Filtros</h2>
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
            options={permissionGroups}
            placeholder=''
          />
        </div>
      </div>
      <div className='flex justify-end gap-3'>
        <button
          onClick={handleFilterClean}
          type='button'
          className={classNames(
            'select-none active:scale-95 cursor-pointer flex gap-3 group relative justify-center items-center bg-transparent hover:bg-[--buttonPrimary] rounded-xl h-10 text-white transition-all duration-300 px-4'
          )}
        >
          <span className='font-medium text-[--textSecondary] text-sm'>
            Limpar
          </span>
        </button>

        <button
          onClick={handleFilter}
          type='button'
          className={classNames(
            'select-none active:scale-95 cursor-pointer flex gap-3 group relative justify-center items-center bg-[--primaryColor] hover:bg-[--secondaryColor] rounded-xl h-10 text-white transition-all duration-300 px-8'
          )}
        >
          <span className='font-medium text-sm'>Filtrar</span>
        </button>
      </div>
    </div>
  )
}
