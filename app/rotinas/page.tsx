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
import { useQueryParams } from '@/components/Utils/UseQueryParams'
import { ToastError } from '@/components/Template/Toast/Error'
import { toast } from 'sonner'
import useDebounce from '@/lib/context/debounce'
import { calcPages } from '@/utils/calc-pages'
import { ToastSuccess } from '@/components/Template/Toast/Success'
import { CalendarIcon } from '@/components/Display/Icons/Calendar'
import { PermissionDeniedScreen } from '@/components/Features/PermissionDenied'
import { Skeleton } from '@/components/ui/skeleton'
import { FilterRotinas } from '@/components/Template/Filter/Rotinas'
import { deleteRoutine, getRoutines } from '@/services/Routine'
import { timestampToDate } from '@/utils/timestamp-to-date'

enum RoutinesModals {
  Filter,
  Deletion,
  Category,
  Manufacturer,
  Default,
}

type Routine = {
  uuid: string
  name: string
  collaborators: {value: string, label: string}[]
  sectors: {value: string, label: string}[]
  started_at: string
  created_at: string
}

const Rotinas: FC = () => {
  const setQueryParam = useQueryParams()
  const searchParams = useSearchParams()
  const [modalStatus, setModalStatus] = useState(false)
  const [modalDeleteStatus, setModalDeleteStatus] = useState(false)
  const [loading, setLoading] = useState(false)
  const [orderBy, setOrderBy] = useState({
    field: searchParams.get('sortField') || '',
    order: searchParams.get('sortOrder') || '',
  })
  const sector = useMemo(() => {
    return searchParams.get('sector')
  }, [searchParams])
  const collaborator = useMemo(() => {
    return searchParams.get('collaborator')
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
  const [routines, setRoutines] = useState<Routine[]>([])
  const [isCardOpen, setCardOpen] = useState(RoutinesModals.Default)
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
          deleteRoutine({ loading: setLoading, id: uuid }),
        ),
      )

      toast.custom(() => (
        <ToastSuccess
          text={
            checkedCount === 1
              ? '1 rotina excluída com sucesso'
              : `${checkedCount} rotinas excluídas com sucesso`
          }
        />
      ))
      fetchRoutines()
      handleCloseModalDelete()
      setHasChecked(false)
    } catch (error) {
      toast.custom(() => (
        <ToastError
          text={
            checkedCount === 1
              ? `Não foi possível excluir ${checkedCount} rotina`
              : `Não foi possível excluir ${checkedCount} rotinas`
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

  const fetchRoutines = async () => {
    const response = await getRoutines({
      q: debouncedSearch || undefined,
      loading: setLoading,
      sortField: orderBy.field || 'name',
      sortOrder: orderBy.order || 'asc',
      collaborator: collaborator || undefined,
      sector: sector || undefined,
      page: Number(page) || undefined,
    })

    if (response) {
      if (response.status === 200) {
        handlePageSettings('numberOfDocuments', response.data.total)
        handlePageSettings('numberPerPage', response.data.per_page)
        
        const parsedData = response.data.data.map((routine: any) => ({
          ...routine,
          collaborators: (() => {
            try {
              return JSON.parse(routine.collaborators)
            } catch {
              return []
            }
          })(),
          sectors: (() => {
            try {
              return JSON.parse(routine.sectors)
            } catch {
              return []
            }
          })(),
        }))

        setRoutines(parsedData)
      } else if (response.status === 403) {
        setHasPermission(false)
      } else {
        toast.custom(() => (
          <ToastError text="Não foi possível buscar as rotinas" />
        ))
      }
    } else {
      toast.custom(() => (
        <ToastError text="Não foi possível buscar as rotinas" />
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
    fetchRoutines()
  }, [debouncedSearch, orderBy, collaborator, sector, searchParams])

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
            {checkedCount === 1 ? 'rotina' : 'rotinas'}?
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
        <FilterRotinas actionClose={handleCloseModal} />
      </Modal>
      <div
        className="flex flex-col items-start gap-3 bg-[--backgroundPrimary] sm:rounded-2xl w-full h-full overflow-auto">
        <div className="flex justify-between items-center gap-3 p-6 w-full">
          <div className="flex flex-row items-center gap-3">
            <h2 className="font-medium text-[--textSecondary] text-xl select-none">
              Rotinas
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

            <PrimaryLink
              label="Adicionar"
              icon={
                <AddIcon
                  size="size-4"
                  stroke="stroke-white group-data-[active=true]:stroke-[--primaryColor]"
                  strokeWidth={2.5}
                />
              }
              href="/rotinas/novo"
            />
          </div>
        </div>

        <AnimatePresence>
          {hasPermission && (
            <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-row items-center gap-3 px-6 w-1/2">
              <div
                className="box-border flex flex-row items-center gap-2 bg-[--tableRow] focus-within:bg-[--buttonPrimary] px-3 rounded-xl w-full h-10 transition-all duration-300">
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

        <div className="flex flex-col justify-between gap-y-6 pb-6 w-full h-full">
          <div className="flex flex-col gap-2 px-3">
            <AnimatePresence mode='wait'>
              {hasPermission && (
                <motion.div className="gap-3 grid grid-cols-12 px-3 font-medium text-[--textSecondary] text-sm">
                  <div className="grid col-span-5 py-3">
                    <div className="group flex justify-start items-center gap-2 transition-all duration-300">
                      <div className="flex items-center h-full">
                        <input
                          id="checkboxAll"
                          type="checkbox"
                          name="routine[]"
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
                      onClick={() => handleOrderBy('sector')}
                      type="button"
                      className="flex items-center gap-2 hover:opacity-60 truncate transition-all duration-300"
                    >
                      <span>Setor</span>
                      <CaretOrder
                        field={orderBy.field}
                        name="sector"
                        order={orderBy.order}
                      />
                    </button>
                  </div>
                  <div className="flex items-center col-span-2 py-3">
                    <button
                      onClick={() => handleOrderBy('collaborator')}
                      type="button"
                      className="flex items-center gap-2 hover:opacity-60 truncate transition-all duration-300"
                    >
                      <span>Colaborador</span>
                      <CaretOrder
                        field={orderBy.field}
                        name="collaborator"
                        order={orderBy.order}
                      />
                    </button>
                  </div>
                  <div className="flex justify-end items-center col-span-2 py-3">
                    <button
                      onClick={() => handleOrderBy('startedAt')}
                      type="button"
                      className="flex items-center gap-2 hover:opacity-60 truncate transition-all duration-300"
                    >
                      <span>Início</span>
                      <CaretOrder
                        field={orderBy.field}
                        name="startedAt"
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
                className="flex flex-col gap-6 pb-6 h-full overflow-y-auto"
              >
                <ul className="flex flex-col gap-3">
                  {routines.map((routine, i) => (
                    <li key={routine.uuid}>
                      <Link
                        href={`/rotinas/detalhes/${routine.uuid}`}
                        className="gap-3 grid grid-cols-12 bg-[--tableRow] px-3 rounded-xl font-normal text-[--textSecondary] text-sm capitalize transition-all duration-300"
                      >
                        <div className="flex items-center gap-3 col-span-5 py-3 font-medium">
                          <input
                            ref={el => {
                              if (el) {
                                checkboxRefs.current[i] = el
                              }
                            }}
                            type="checkbox"
                            name="routine[]"
                            onClick={e => {
                              e.stopPropagation()
                            }}
                            value={routine.uuid}
                            onChange={() => {
                              const allChecked =
                                checkboxRefs.current.length > 0 &&
                                checkboxRefs.current.every(ref => ref?.checked)
                              setCheckedAll(allChecked)
                              updateCheckedStatus()
                            }}
                            className="rounded focus:ring-2 focus:ring-primaryDarker focus:ring-offset-0 text-[--secondaryColor]"
                          />
                          <span
                            className="inline-block overflow-hidden text-ellipsis capitalize leading-none whitespace-nowrap">
                        {routine.name.toLocaleLowerCase()}
                      </span>
                        </div>
                        <div className="flex items-center col-span-3 py-4">
                          <span className="block w-full overflow-hidden text-ellipsis capitalize whitespace-nowrap">
                            {routine.sectors?.map(sector => sector.label).join(', ')}
                          </span>
                        </div>
                        <div className="flex items-center col-span-2 py-4 pr-1">
                          <span className="block w-full overflow-hidden text-ellipsis capitalize whitespace-nowrap">
                            {routine.collaborators
                            ?.map(collaborator => collaborator.label.split(' ')[0])
                            .join(', ')}
                          </span>
                        </div>
                        <div className="flex justify-end items-center col-span-2 py-4 pr-1 lowercase">
                          {timestampToDate(routine.started_at)}
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
      </div>
    </div>
  )
}

export default Rotinas
