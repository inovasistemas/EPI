'use client'
import { useSearchParams } from 'next/navigation'
import { type FC, useCallback, useMemo, useState } from 'react'
import { SecondaryButton } from '@/components/Buttons/SecondaryButton'
import { AddIcon } from '@/components/Display/Icons/Add'
import { FilterIcon } from '@/components/Display/Icons/Filter'
import { SearchIcon } from '@/components/Display/Icons/Search'
import { Modal } from '@/components/Display/Modal'
import { PrimaryLink } from '@/components/Links/PrimaryLink'
import { useQueryParams } from '@/components/Utils/UseQueryParams'
import useDebounce from '@/lib/context/debounce'

enum AgendaModals {
  Filter,
  Deletion,
  Category,
  Manufacturer,
  Default,
}

type Agenda = {
  uuid: string
  name: string
  category: string
  manufacturer: string
  stock: number
  picture: string | null
  created_at: string
}

const Agenda: FC = () => {
  const setQueryParam = useQueryParams()
  const searchParams = useSearchParams()
  const [modalStatus, setModalStatus] = useState(false)
  const [orderBy, setOrderBy] = useState({
    field: searchParams.get('sortField') || '',
    order: searchParams.get('sortOrder') || '',
  })
  const category = useMemo(() => {
    return searchParams.get('category')
  }, [searchParams])
  const manufacturer = useMemo(() => {
    return searchParams.get('manufacturer')
  }, [searchParams])
  const page = useMemo(() => {
    return searchParams.get('page')
  }, [searchParams])
  const [hasChecked, setHasChecked] = useState(false)
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce({ value: search, delay: 500 })
  const [pageSettings, setPageSettings] = useState({
    numberOfDocuments: 1,
    numberPerPage: 1,
  })
  const [agenda, setAgenda] = useState<Agenda[]>([])

  const handleOrderBy = useCallback(
    (field: string) => {
      if (field !== orderBy.field) {
        setOrderBy({
          field,
          order: 'asc',
        })
      } else {
        setOrderBy(prev => ({
          ...prev,
          order: prev.order === 'asc' ? 'desc' : 'asc',
        }))
      }

      setQueryParam({
        sortField: field,
        sortOrder: orderBy.order === 'asc' ? 'desc' : 'asc',
      })
    },
    [orderBy.field, orderBy.order, setQueryParam]
  )

  const handleCloseModal = useCallback(() => {
    setModalStatus(prev => !prev)
  }, [])

  const handlePageSettings = (name: string, value: string) => {
    setPageSettings(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className='flex flex-col gap-6 bg-[--backgroundSecondary] sm:pr-3 pb-8 sm:pb-3 w-full lg:h-[calc(100vh-50px)] overflow-auto'>
      <Modal
        title='Filtros'
        size='small'
        isModalOpen={modalStatus}
        handleClickOverlay={handleCloseModal}
      >
        <div></div>
      </Modal>
      <div className='flex flex-col items-start gap-3 bg-[--backgroundPrimary] sm:rounded-2xl w-full h-full overflow-auto'>
        <div className='flex justify-between items-center gap-3 p-6 w-full'>
          <div className='flex flex-row items-center gap-3'>
            <h2 className='font-medium text-[--textSecondary] text-xl select-none'>
              Agenda de entregas
            </h2>
          </div>

          <div className='flex flex-row gap-3'>
            <PrimaryLink
              label='Adicionar'
              icon={
                <AddIcon
                  size='size-4'
                  stroke='stroke-white group-data-[active=true]:stroke-[--primaryColor]'
                  strokeWidth={2.5}
                />
              }
              href='/agenda/novo'
            />
          </div>
        </div>

        <div className='flex flex-row items-center gap-3 px-6 w-1/2'>
          <div className='bg-[--tableRow] box-border flex flex-row items-center gap-2 focus-within:bg-[--buttonPrimary] px-3 rounded-xl w-full h-10 transition-all duration-300'>
            <div className='flex'>
              <SearchIcon
                size='size-4'
                stroke='stroke-[--textSecondary]'
                strokeWidth={2.5}
              />
            </div>
            <input
              type='text'
              placeholder=''
              spellCheck={false}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className='bg-transparent pr-3 pl-1 rounded-xl focus:outline-none w-full h-full placeholder:font-normal font-medium text-sm'
            />
          </div>
          <SecondaryButton
            label='Filtrar'
            icon={
              <FilterIcon
                size='size-4'
                stroke='stroke-[--textSecondary] group-data-[active=true]:stroke-[--primaryColor]'
                strokeWidth={2.5}
              />
            }
            onClick={handleCloseModal}
          />
        </div>

        <div className='flex flex-col justify-between gap-y-6 pb-6 w-full h-full'>
          <div className='flex flex-col gap-2 px-3'></div>
        </div>
      </div>
    </div>
  )
}

export default Agenda
