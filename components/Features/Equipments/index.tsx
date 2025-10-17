'use client'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { SecondaryButton } from '@/components/Buttons/SecondaryButton'
import { FilterIcon } from '@/components/Display/Icons/Filter'
import { SearchIcon } from '@/components/Display/Icons/Search'
import { Modal } from '@/components/Display/Modal'
import { Paginations } from '@/components/Navigation/Paginations'
import { CaretOrder } from '@/components/Template/Filter/CaretOrder'
import { FilterEquipments } from '@/components/Template/Filter/Equipments'
import { useQueryParams } from '@/components/Utils/UseQueryParams'
import { getEquipments } from '@/services/Equipment'
import { ToastError } from '@/components/Template/Toast/Error'
import { toast } from 'sonner'
import useDebounce from '@/lib/context/debounce'
import { calcPages } from '@/utils/calc-pages'
import { ToastSuccess } from '@/components/Template/Toast/Success'
import { PermissionDeniedScreen } from '@/components/Features/PermissionDenied'
import { Skeleton } from '@/components/ui/skeleton'
import { ActionGroup } from '@/components/Surfaces/ActionGroup'

type Equipment = {
  uuid: string
  name: string
  category: string
  manufacturer: string
  stock: number
  picture: string | null
  created_at: string
}

type EquipmentsModalProps = {
  handleMainModal: () => void
  addEquipment: (uuid: string, name: string, quantity: number) => void
}


export function EquipmentsModal({handleMainModal, addEquipment}: EquipmentsModalProps) {
  const setQueryParam = useQueryParams()
  const searchParams = useSearchParams()
  const [modalStatus, setModalStatus] = useState(false)
  const [loading, setLoading] = useState(false)
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
  const [checkedAll, setCheckedAll] = useState(false)
  const checkboxRefs = useRef<HTMLInputElement[]>([])
  const [hasChecked, setHasChecked] = useState(false)
  const [checkedCount, setCheckedCount] = useState(0)
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce({ value: search, delay: 500 })
  const [pageSettings, setPageSettings] = useState({
    numberOfDocuments: 1,
    numberPerPage: 1,
  })
  const [equipments, setEquipments] = useState<Equipment[]>([])
  const [hasPermission, setHasPermission] = useState(true)

  const updateCheckedStatus = () => {
    const anyChecked = checkboxRefs.current.some(ref => ref?.checked)
    setHasChecked(anyChecked)

    const count = checkboxRefs.current.filter(ref => ref?.checked).length
    setCheckedCount(count)
  }

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
    [orderBy.field, orderBy.order, setQueryParam],
  )

  const handleCloseModal = useCallback(() => {
    setModalStatus(prev => !prev)
  }, [])

  const handleMultipleSave = async () => {
    const checkedEquipments = equipments.filter(equipment =>
      checkboxRefs.current.some(ref => ref?.checked && ref.value === equipment.uuid)
    )

    for (const equipment of checkedEquipments) {
      addEquipment(equipment.uuid, equipment.name, 1)
    }

    toast.custom(() => (
      <ToastSuccess
        text={
          checkedCount === 1
            ? '1 equipamento adicionado com sucesso'
            : `${checkedCount} equipamentos adicionados com sucesso`
        }
      />
    ))
    handleMainModal()
  }

  const handlePageSettings = (name: string, value: string) => {
    setPageSettings(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const fetchEquipments = async () => {
    const response = await getEquipments({
      q: debouncedSearch || undefined,
      loading: setLoading,
      sortField: orderBy.field || 'name',
      sortOrder: orderBy.order || 'asc',
      category: category || undefined,
      manufacturer: manufacturer || undefined,
      page: Number(page) || undefined,
    })

    if (response) {
      if (response.status === 200) {
        handlePageSettings('numberOfDocuments', response.data.total)
        handlePageSettings('numberPerPage', response.data.per_page)
        setEquipments(response.data.data)
      } else if (response.status === 403) {
        setHasPermission(false)
      } else {
        toast.custom(() => (
          <ToastError text="Não foi possível buscar os equipamentos" />
        ))
      }
    } else {
      toast.custom(() => (
        <ToastError text="Não foi possível buscar os equipamentos" />
      ))
    }
  }

  useEffect(() => {
    const allChecked =
      checkboxRefs.current.length > 0 &&
      checkboxRefs.current.every(ref => ref?.checked)
    setCheckedAll(allChecked)
  }, [])

  useEffect(() => {
    fetchEquipments()
  }, [debouncedSearch, orderBy, category, manufacturer, searchParams])

  return (
      <div className="flex flex-col items-start gap-6 bg-[--backgroundPrimary] sm:rounded-2xl w-full h-full overflow-auto">
        <Modal
          title="Filtros"
          size="small"
          isModalOpen={modalStatus}
          handleClickOverlay={handleCloseModal}
        >
          <FilterEquipments actionClose={handleCloseModal} />
        </Modal>
        <div className="flex justify-between items-center gap-3 p-6 pb-0 w-full">
          <div className="flex flex-row items-center gap-3">
            <h2 className="font-medium text-[--textSecondary] text-xl select-none">
              Equipamentos
            </h2>
          </div>
        </div>

        <AnimatePresence>
          {hasPermission && (
            <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-row items-center gap-3 px-6 w-full">
              <div
                className="bg-[--tableRow] box-border flex flex-row items-center gap-2 focus-within:bg-[--buttonPrimary] px-3 rounded-xl w-full h-10 transition-all duration-300">
                <div className="flex">
                  <SearchIcon
                    size="size-4"
                    stroke="stroke-[--textSecondary]"
                    strokeWidth={2.5}
                  />
                </div>
                <input
                  type="text"
                  placeholder=""
                  spellCheck={false}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="bg-transparent pr-3 pl-1 rounded-xl focus:outline-none w-full h-full placeholder:font-normal font-medium text-sm"
                />
              </div>
              <SecondaryButton
                label="Filtrar"
                icon={
                  <FilterIcon
                    size="size-4"
                    stroke="stroke-[--textSecondary] group-data-[active=true]:stroke-[--primaryColor]"
                    strokeWidth={2.5}
                  />
                }
                onClick={handleCloseModal}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col justify-between gap-y-6 px-6 pb-6 w-full h-full">
          <div className="flex flex-col gap-2">
            <AnimatePresence mode='wait'>
              {hasPermission && (
                <motion.div className="gap-3 grid grid-cols-12 px-3 font-medium text-[--textSecondary] text-sm">
                  <div className="grid col-span-6 py-3">
                    <div className="group flex justify-start items-center gap-2 transition-all duration-300">
                      <div className="flex items-center h-full">
                        <input
                          id="checkboxAll"
                          type="checkbox"
                          name="equipment[]"
                          className="rounded focus:ring-2 focus:ring-primaryDarker focus:ring-offset-0 text-[--secondaryColor] checkboxSecondary"
                          checked={checkedAll}
                          onChange={e => {
                            const checkboxes = checkboxRefs.current
                            const newValue = !checkedAll
                            checkboxes.forEach(ref => {
                              if (ref) ref.checked = newValue
                            })
                            setCheckedAll(newValue)
                            updateCheckedStatus()
                            e.stopPropagation()
                          }}
                        />
                      </div>

                      <button
                        onClick={() => handleOrderBy('name')}
                        type="button"
                        className="flex items-center gap-2 group-hover:opacity-60 truncate transition-all duration-300"
                      >
                        <span>Nome</span>
                        <div className="min-w-4">
                          <CaretOrder
                            field={orderBy.field}
                            name="name"
                            order={orderBy.order}
                          />
                        </div>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center col-span-2 py-3">
                    <button
                      onClick={() => handleOrderBy('manufacturer')}
                      type="button"
                      className="flex items-center gap-2 hover:opacity-60 truncate transition-all duration-300"
                    >
                      <span>Fabricante</span>
                      <CaretOrder
                        field={orderBy.field}
                        name="manufacturer"
                        order={orderBy.order}
                      />
                    </button>
                  </div>
                  <div className="flex justify-end items-center col-span-4 py-3">
                    <button
                      onClick={() => handleOrderBy('stock')}
                      type="button"
                      className="flex items-center gap-2 hover:opacity-60 truncate transition-all duration-300"
                    >
                      <span>Estoque</span>
                      <CaretOrder
                        field={orderBy.field}
                        name="stock"
                        order={orderBy.order}
                      />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence mode='wait'>
            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col justify-center items-start gap-3 w-full h-full"
              >
                <Skeleton className='rounded-xl w-full h-[88px]' />

                <div className='flex justify-center items-center pt-3 w-full'>
                  <Paginations
                    numberOfPages={calcPages(
                      1,
                      1,
                    )}
                  />
                </div>
              </motion.div>
            )}

            {!loading && (
              <motion.div
                key="data"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6 pb-6 sm:min-w-[50rem] h-full overflow-y-auto"
              >
                <ul className="flex flex-col gap-3">
                  {equipments.map((equipment, i) => (
                    <li key={equipment.uuid}>
                      <Link
                        href={`/equipamentos/detalhes/${equipment.uuid}`}
                        className="bg-[--tableRow] gap-3 grid grid-cols-12 px-3 rounded-xl font-normal text-[--textSecondary] text-sm capitalize transition-all duration-300"
                      >
                        <div className="flex items-center gap-3 col-span-6 py-3 font-medium">
                          <input
                            ref={el => {
                              if (el) {
                                checkboxRefs.current[i] = el
                              }
                            }}
                            type="checkbox"
                            name="equipment[]"
                            onClick={e => {
                              e.stopPropagation()
                            }}
                            value={equipment.uuid}
                            onChange={() => {
                              const allChecked =
                                checkboxRefs.current.length > 0 &&
                                checkboxRefs.current.every(ref => ref?.checked)
                              setCheckedAll(allChecked)
                              updateCheckedStatus()
                            }}
                            className="rounded focus:ring-2 focus:ring-primaryDarker focus:ring-offset-0 text-[--secondaryColor]"
                          />
                          <div
                            className="relative bg-[--backgroundPrimary] rounded-xl w-16 aspect-square overflow-hidden">
                            {equipment.picture &&
                              equipment.picture.length > 3 && (
                                <Image
                                  src={`https://api.inovasistemas.app${equipment.picture}`}
                                  alt={equipment.name}
                                  fill
                                  className="w-full h-full object-cover"
                                />
                              )}
                          </div>
                          <span
                            className="inline-block overflow-hidden text-ellipsis capitalize leading-none whitespace-nowrap">
                        {equipment.name.toLocaleLowerCase()}
                      </span>
                        </div>
                        <div className="flex items-center col-span-2 py-4 capitalize">
                          {equipment.manufacturer?.toLocaleLowerCase()}
                        </div>
                        <div className="flex justify-end items-center col-span-4 py-4 pr-1 lowercase">
                          {equipment.stock}{' '}
                          {equipment.stock != 1 ? 'unidades' : 'unidade'}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Paginations
                  numberOfPages={calcPages(
                    pageSettings.numberOfDocuments,
                    pageSettings.numberPerPage,
                  )}
                />
              </motion.div>
            )}
            </AnimatePresence>
          </div>
        </div>
          
        {!hasPermission && (
          <PermissionDeniedScreen />
        )}

        <div className='flex justify-end gap-3 w-full'>
          <ActionGroup 
            onClick={handleMultipleSave} 
            showDelete={false} 
            backType='button' 
            onClickBack={handleMainModal}
            type='add'
          />
        </div>
      </div>
  )
}

export default Equipment
