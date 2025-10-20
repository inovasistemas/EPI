'use client'
import classNames from 'classnames'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { SearchSelect } from '@/components/Inputs/Select/SearchSelect'
import { useQueryParams } from '@/components/Utils/UseQueryParams'
import { getSectors } from '@/services/Sector'
import { getCollaborators } from '@/services/Collaborator'

type FilterRotinasProps = {
  actionClose: () => void
}

type Collaborator = {
  uuid: string
  name: string
  cpf: string
  job_position: string
  created_at: string
}

type Sector = {
  uuid: string
  name: string
  sector: string
  created_at: string
  updated_at: string
  subsectors: {
    uuid: string
    name: string
  }[]
}

export function FilterRotinas({ actionClose }: FilterRotinasProps) {
  const fetchedCollaborators = useRef(false)
  const fetchedSectors = useRef(false)
  const [loading, setLoading] = useState(false)
  const setQueryParam = useQueryParams()
  const searchParams = useSearchParams()
  const [loadingCollaborators, setLoadingCollaborators] = useState(false)
  const [loadingSectors, setLoadingSectors] = useState(false)
  const [sectorsData, setSectorsData] = useState<Sector[]>([])
  const [collaboratorsData, setCollaboratorsData] = useState<Collaborator[]>([])
  const [filters, setFilters] = useState({
    collaborator: searchParams.get('collaborator') || '',
    sector: searchParams.get('sector') || '',
  })

  const handleFiltersChange = (name: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const fetchSectors = async () => {
    const response = await getSectors({loading: setLoadingSectors})

    if (response && response.status === 200) {
      const data = response.data

      setSectorsData(data.data)
    }

    setLoadingSectors(false)
  }

  const fetchCollaborators = async () => {
    const response = await getCollaborators({loading: setLoadingCollaborators})

    if (response && response.status === 200) {
      const data = response.data

      setCollaboratorsData(data.data)
    }

    setLoadingCollaborators(false)
  }

  useEffect(() => {
    if (fetchedSectors.current) return
    fetchedSectors.current = true
    fetchSectors()
  }, [])

  useEffect(() => {
    if (fetchedCollaborators.current) return
    fetchedCollaborators.current = true
    fetchCollaborators()
  }, [])

  const handleFilter = () => {
    setQueryParam({
      collaborator: filters.collaborator,
      sector: filters.sector,
    })
    actionClose()
  }

  const handleFilterClean = () => {
    handleFiltersChange('category', '')
    handleFiltersChange('manufacturer', '')
  }

  return (
    <div className='flex flex-col gap-8 -mt-8 w-full'>
      <h2 className='font-medium text-xl text-start'>Filtros</h2>
      <div className='flex flex-col gap-6 divide-[--outlinePrimary] divide-y w-full'>
        <div className='items-center grid grid-cols-2 w-full select-none'>
          <div>
            <span className='font-medium'>Colaboradores</span>
          </div>
          <div className='grid w-full'>
            <SearchSelect
              value={filters.collaborator}
              name='selectCollaborator'
              onChange={(value: string) =>
                handleFiltersChange('collaborator', value)
              }
              options={
                collaboratorsData
                  ? collaboratorsData.map(collaborator => ({
                      value: collaborator.uuid,
                      label: collaborator.name,
                    }))
                  : []
              }
              placeholder=''
            />
          </div>
        </div>
        <div className='items-center grid grid-cols-2 pt-6 w-full select-none'>
          <div>
            <span className='font-medium'>Setores</span>
          </div>
          <div className='grid w-full'>
            <SearchSelect
              value={filters.sector}
              name='selectSector'
              onChange={(value: string) =>
                handleFiltersChange('sector', value)
              }
              options={
                sectorsData
                  ? sectorsData.flatMap(sector => [
                      { value: sector.uuid, label: sector.name },
                      ...(sector.subsectors?.map(sub => ({
                        value: sub.uuid,
                        label: sub.name,
                      })) ?? []),
                    ])
                  : []
              }
              placeholder=''
            />
          </div>
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
