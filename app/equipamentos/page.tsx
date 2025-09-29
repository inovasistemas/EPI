'use client'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  type FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { DestructiveButton } from '@/components/Buttons/DestructiveButton'
import { SecondaryButton } from '@/components/Buttons/SecondaryButton'
import { AddIcon } from '@/components/Display/Icons/Add'
import { FilterIcon } from '@/components/Display/Icons/Filter'
import { SearchIcon } from '@/components/Display/Icons/Search'
import { TrashIcon } from '@/components/Display/Icons/Trash'
import { Modal } from '@/components/Display/Modal'
import { PrimaryLink } from '@/components/Links/PrimaryLink'
import { Paginations } from '@/components/Navigation/Paginations'
import { CaretOrder } from '@/components/Template/Filter/CaretOrder'
import { FilterEquipments } from '@/components/Template/Filter/Equipments'
import { useQueryParams } from '@/components/Utils/UseQueryParams'
import { deleteEquipment, getEquipments } from '@/services/Equipment'
import { ToastError } from '@/components/Template/Toast/Error'
import { toast } from 'sonner'
import useDebounce from '@/lib/context/debounce'
import { calcPages } from '@/utils/calc-pages'
import { ToastSuccess } from '@/components/Template/Toast/Success'
import { CalendarIcon } from '@/components/Display/Icons/Calendar'
import { PermissionDeniedScreen } from '@/components/Features/PermissionDenied'

enum EquipmentModals {
  Filter,
  Deletion,
  Category,
  Manufacturer,
  Default,
}

type Equipment = {
  uuid: string
  name: string
  category: string
  manufacturer: string
  stock: number
  picture: string | null
  created_at: string
}

const Equipment: FC = () => {
  const setQueryParam = useQueryParams()
  const searchParams = useSearchParams()
  const [modalStatus, setModalStatus] = useState(false)
  const [modalDeleteStatus, setModalDeleteStatus] = useState(false)
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
  const [isCardOpen, setCardOpen] = useState(EquipmentModals.Default)
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

  const handleCloseModalDelete = useCallback(() => {
    setModalDeleteStatus(prev => !prev)
  }, [])

  const handleMultipleDelete = async () => {
    const checkedValues = checkboxRefs.current
      .filter(ref => ref?.checked)
      .map(ref => ref?.value)

    try {
      await Promise.all(
        checkedValues.map(uuid =>
          deleteEquipment({ loading: setLoading, id: uuid }),
        ),
      )

      toast.custom(() => (
        <ToastSuccess
          text={
            checkedCount === 1
              ? '1 equipamento excluído com sucesso'
              : `${checkedCount} equipamentos excluídos com sucesso`
          }
        />
      ))
      fetchEquipments()
      handleCloseModalDelete()
      setHasChecked(false)
    } catch (error) {
      toast.custom(() => (
        <ToastError
          text={
            checkedCount === 1
              ? `Não foi possível excluir ${checkedCount} equipamento`
              : `Não foi possível excluir ${checkedCount} equipamentos`
          }
        />
      ))
    }
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
    <div
      className="flex flex-col gap-6 bg-[--backgroundSecondary] sm:pr-3 pb-8 sm:pb-3 w-full lg:h-[calc(100vh-50px)] overflow-auto">
      <Modal
        title=""
        size="extra-small"
        isModalOpen={modalDeleteStatus}
        handleClickOverlay={handleCloseModalDelete}
        showClose={false}
      >
        <div className="flex flex-col gap-2">
          <span className="font-medium text-xl text-center">
            Tem certeza que deseja excluir {checkedCount}{' '}
            {checkedCount === 1 ? 'equipamento' : 'equipamentos'}?
          </span>
          <span className="px-6 text-base text-center">
            Esta ação é irreversível e todos os dados associados serão
            permanentemente apagados.
          </span>

          <div className="z-[55] flex flex-row justify-center gap-3 pt-6">
            <button
              type="button"
              onClick={handleMultipleDelete}
              className="group group z-[55] relative flex justify-center items-center gap-3 bg-[--errorLoader] px-8 rounded-xl h-10 text-white active:scale-95 transition-all duration-300 cursor-pointer select-none"
            >
              <span className="font-medium text-white text-sm transition-all duration-300">
                Confirmar
              </span>
            </button>

            <button
              type="button"
              onClick={handleCloseModalDelete}
              className="group z-[55] relative flex justify-center items-center gap-3 bg-[--buttonPrimary] hover:bg-[--buttonSecondary] px-8 rounded-xl h-10 text-white active:scale-95 transition-all duration-300 cursor-pointer select-none"
            >
              <span className="font-medium text-[--textSecondary] text-sm">
                Cancelar
              </span>
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        title="Filtros"
        size="small"
        isModalOpen={modalStatus}
        handleClickOverlay={handleCloseModal}
      >
        <FilterEquipments actionClose={handleCloseModal} />
      </Modal>
      <div
        className="flex flex-col items-start gap-3 bg-[--backgroundPrimary] sm:rounded-2xl w-full h-full overflow-auto">
        <div className="flex justify-between items-center gap-3 p-6 w-full">
          <div className="flex flex-row items-center gap-3">
            <h2 className="font-medium text-[--textSecondary] text-xl select-none">
              Equipamentos
            </h2>
          </div>

          <div className="flex flex-row gap-3">
            <AnimatePresence>
              {hasChecked && (
                <motion.div
                  key="overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  onClick={() => null}
                >
                  <DestructiveButton
                    label="Excluir"
                    icon={
                      <TrashIcon
                        size="size-4"
                        stroke="stroke-[--textSecondary] group-hover:stroke-white"
                        strokeWidth={2.5}
                      />
                    }
                    onClick={handleCloseModalDelete}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/*<SecondaryButton
              label="Planejar Retiradas"
              onClick={function(): void {
                throw new Error('Function not implemented.')
              }}
              icon={
                <CalendarIcon
                  size="size-4"
                  stroke="stroke-[--textSecondary] group-data-[active=true]:stroke-[--primaryColor]"
                  strokeWidth={2.5}
                />
              }
            />*/}

            <PrimaryLink
              label="Adicionar"
              icon={
                <AddIcon
                  size="size-4"
                  stroke="stroke-white group-data-[active=true]:stroke-[--primaryColor]"
                  strokeWidth={2.5}
                />
              }
              href="/equipamentos/novo"
            />
          </div>
        </div>

        {(hasPermission && !loading) && (
          <>
            <div className="flex flex-row items-center gap-3 px-6 w-1/2">
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
            </div>

            <div className="flex flex-col justify-between gap-y-6 pb-6 w-full h-full">
              <div className="flex flex-col gap-2 px-3">
                <div className="gap-3 grid grid-cols-12 px-3 font-medium text-[--textSecondary] text-sm">
                  <div className="grid col-span-5 py-3">
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
                  <div className="flex items-center col-span-3 py-3">
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
                  <div className="flex items-center col-span-2 py-3">
                    <button
                      onClick={() => handleOrderBy('category')}
                      type="button"
                      className="flex items-center gap-2 hover:opacity-60 truncate transition-all duration-300"
                    >
                      <span>Categoria</span>
                      <CaretOrder
                        field={orderBy.field}
                        name="category"
                        order={orderBy.order}
                      />
                    </button>
                  </div>
                  <div className="flex justify-end items-center col-span-2 py-3">
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
                </div>
                {loading && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex justify-center items-start pt-10 w-full h-full"
                  >
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="fill-[--primaryColor] w-8 h-8 text-[--buttonPrimary] animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Carregando...</span>
                    </div>
                  </motion.div>
                )}
                {!loading && (
                  <motion.div
                    key="data"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex flex-col gap-6 pb-6 h-full overflow-y-auto"
                  >
                    <ul className="flex flex-col gap-3">
                      {equipments.map((equipment, i) => (
                        <li key={equipment.uuid}>
                          <Link
                            href={`/equipamentos/detalhes/${equipment.uuid}`}
                            className="bg-[--tableRow] gap-3 grid grid-cols-12 px-3 rounded-xl font-normal text-[--textSecondary] text-sm capitalize transition-all duration-300"
                          >
                            <div className="flex items-center gap-3 col-span-5 py-3 font-medium">
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
                            <div className="flex items-center col-span-3 py-4 capitalize">
                              {equipment.manufacturer?.toLocaleLowerCase()}
                            </div>
                            <div className="flex items-center col-span-2 py-4 pr-1 capitalize">
                              {equipment.category?.toLocaleLowerCase()}
                            </div>
                            <div className="flex justify-end items-center col-span-2 py-4 pr-1 lowercase">
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
              </div>
            </div>
          </>
        )}

        {!hasPermission && (
          <PermissionDeniedScreen />
        )}
      </div>
    </div>
  )
}

export default Equipment
