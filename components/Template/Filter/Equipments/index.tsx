'use client'
import classNames from 'classnames'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { SearchSelect } from '@/components/Inputs/Select/SearchSelect'
import { useQueryParams } from '@/components/Utils/UseQueryParams'
import { getCategories } from '@/services/Category'
import { toast } from 'sonner'
import { ToastError } from '../../Toast/Error'
import { getManufacturers } from '@/services/Manufacturer'
import { sub } from 'date-fns'

type FilterEquipmentsProps = {
  actionClose: () => void
}

export function FilterEquipments({ actionClose }: FilterEquipmentsProps) {
  const fetchedCategories = useRef(false)
  const fetchedManufacturers = useRef(false)
  const [CategoriesData, setCategoriesData] = useState([
    {
      uuid: '',
      name: '',
      active_equipments: '',
      created_at: '',
      updated_at: '',
      subcategories: [
        {
          uuid: '',
          name: '',
          active_equipments: '',
          created_at: '',
          updated_at: '',
        },
      ],
    },
  ])
  const [ManufacturersData, setManufacturersData] = useState([
    {
      uuid: '',
      name: '',
      active_equipments: '',
      created_at: '',
      updated_at: '',
    },
  ])
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

  const fetchCategories = async () => {
    const response = await getCategories()

    if (response && response.status === 200) {
      setCategoriesData(response.data.data)
    } else {
      toast.custom(() => <ToastError text='Erro ao buscar categorias' />)
    }
  }

  const fetchManufacturers = async () => {
    const response = await getManufacturers()

    if (response && response.status === 200) {
      setManufacturersData(response.data.data)
    } else {
      toast.custom(() => <ToastError text='Erro ao buscar fabricantes' />)
    }
  }

  useEffect(() => {
    if (fetchedCategories.current) return
    fetchedCategories.current = true
    fetchCategories()
  }, [])

  useEffect(() => {
    if (fetchedManufacturers.current) return
    fetchedManufacturers.current = true
    fetchManufacturers()
  }, [])

  const handleFilter = () => {
    setQueryParam({
      category: filters.category,
      manufacturer: filters.manufacturer,
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
            <span className='font-medium'>Fabricante</span>
          </div>
          <div className='grid w-full'>
            <SearchSelect
              value={filters.manufacturer}
              name='selectManufacturer'
              onChange={(value: string) =>
                handleFiltersChange('manufacturer', value)
              }
              options={
                ManufacturersData
                  ? ManufacturersData.map(jobPosition => ({
                      value: jobPosition.uuid,
                      label: jobPosition.name,
                    }))
                  : []
              }
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
              options={
                CategoriesData
                  ? CategoriesData.flatMap(category => [
                      { value: category.uuid, label: category.name },
                      ...(category.subcategories?.map(sub => ({
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
