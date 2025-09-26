'use client'
import classNames from 'classnames'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SearchSelect } from '@/components/Inputs/Select/SearchSelect'
import { useQueryParams } from '@/components/Utils/UseQueryParams'
import { getJobPositions } from '@/services/JobPosition'

type FilterCollaboratorProps = {
  actionClose: () => void
}

export function FilterCollaborator({ actionClose }: FilterCollaboratorProps) {
  const setQueryParam = useQueryParams()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    jobPosition: searchParams.get('jobPosition') || '',
  })
  const [jobPositionData, setJobPositionData] = useState([
    {
      uuid: '',
      name: '',
      sector: '',
      created_at: '',
      updated_at: '',
    },
  ])

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

  const handleFilterClean = () => {
    handleFiltersChange('jobPosition', '')
  }

  const fetchJobPositions = async () => {
    const response = await getJobPositions({loading: setLoading})

    if (response && response.status === 200) {
      const data = response.data

      setJobPositionData(data.data)
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchJobPositions()
  }, [])

  return (
    <div className='flex flex-col gap-8 -mt-8 w-full'>
      <h2 className='font-medium text-xl text-start'>Filtros</h2>
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
            options={
              jobPositionData
                ? jobPositionData.map(jobPosition => ({
                    value: jobPosition.uuid,
                    label: jobPosition.name,
                  }))
                : []
            }
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
