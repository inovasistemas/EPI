'use client'
import { AnimatePresence, motion } from 'framer-motion'
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
import { FilterOperator } from '@/components/Template/Filter/Operator'
import { useQueryParams } from '@/components/Utils/UseQueryParams'
import { deleteUser, getUsers } from '@/services/User'
import { timestampToDate } from '@/utils/timestamp-to-date'
import { calcPages } from '@/utils/calc-pages'
import { toast } from 'sonner'
import { ToastError } from '@/components/Template/Toast/Error'
import useDebounce from '@/lib/context/debounce'
import { ToastSuccess } from '@/components/Template/Toast/Success'

type Operator = {
  uuid: string
  name: string
  code: string
  email: string
  permission_group: string
  created_at: string
}

const Operator: FC = () => {
  const setQueryParam = useQueryParams()
  const searchParams = useSearchParams()
  const permissionGroup = useMemo(() => {
    return searchParams.get('permissionGroup')
  }, [searchParams])
  const page = useMemo(() => {
    return searchParams.get('page')
  }, [searchParams])
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce({ value: search, delay: 500 })
  const [checkedAll, setCheckedAll] = useState(false)
  const checkboxRefs = useRef<HTMLInputElement[]>([])
  const [hasChecked, setHasChecked] = useState(false)
  const [modalStatus, setModalStatus] = useState(false)
  const [modalDeleteStatus, setModalDeleteStatus] = useState(false)
  const [checkedCount, setCheckedCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [orderBy, setOrderBy] = useState({
    field: searchParams.get('sortField') || '',
    order: searchParams.get('sortOrder') || '',
  })
  const [pageSettings, setPageSettings] = useState({
    numberOfDocuments: 1,
    numberPerPage: 1,
  })
  const [users, setUsers] = useState<Operator[]>([])

  const handleCloseModal = useCallback(() => {
    setModalStatus(prev => !prev)
  }, [])

  const handlePageSettings = (name: string, value: string) => {
    setPageSettings(prev => ({
      ...prev,
      [name]: value,
    }))
  }

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
    [orderBy.field, orderBy.order, setQueryParam]
  )

  const fetchUsers = async () => {
    const response = await getUsers({
      q: debouncedSearch || undefined,
      loading: setLoading,
      sortField: orderBy.field || 'name',
      sortOrder: orderBy.order || 'asc',
      permissionGroup: permissionGroup || undefined,
      page: Number(page) || undefined,
    })

    if (response && response.status === 200) {
      handlePageSettings('numberOfDocuments', response.data.total)
      handlePageSettings('numberPerPage', response.data.per_page)
      setUsers(response.data.data)
    } else {
      toast.custom(() => <ToastError text='Erro ao buscar usuários' />)
    }
  }

  const handleCloseModalDelete = useCallback(() => {
    setModalDeleteStatus(prev => !prev)
  }, [])

  const handleMultipleDelete = async () => {
    const checkedValues = checkboxRefs.current
      .filter(ref => ref?.checked)
      .map(ref => ref?.value)

    try {
      await Promise.all(checkedValues.map(uuid => deleteUser(uuid)))

      toast.custom(() => (
        <ToastSuccess
          text={
            checkedCount === 1
              ? '1 usuário excluído com sucesso'
              : `${checkedCount} usuários excluídos com sucesso`
          }
        />
      ))
      fetchUsers()
      handleCloseModalDelete()
      setHasChecked(false)
    } catch (error) {
      toast.custom(() => (
        <ToastError
          text={
            checkedCount === 1
              ? `erro ao excluir ${checkedCount} usuário`
              : `erro ao excluir ${checkedCount} usuários`
          }
        />
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
    fetchUsers()
  }, [orderBy, permissionGroup, searchParams])

  useEffect(() => {
    fetchUsers()
  }, [debouncedSearch])

  return (
    <div className='flex flex-col gap-6 bg-[--backgroundSecondary] sm:pr-3 pb-8 sm:pb-3 w-full lg:h-[calc(100vh-50px)] overflow-auto'>
      <Modal
        title=''
        size='extra-small'
        isModalOpen={modalDeleteStatus}
        handleClickOverlay={handleCloseModalDelete}
        showClose={false}
      >
        <div className='flex flex-col gap-2'>
          <span className='font-medium text-xl text-center'>
            Tem certeza que deseja excluir {checkedCount}{' '}
            {checkedCount === 1 ? 'usuário' : 'usuários'}?
          </span>
          <span className='px-6 text-base text-center'>
            Esta ação é irreversível e todos os dados associados serão
            permanentemente apagados.
          </span>

          <div className='z-[55] flex flex-row justify-center gap-3 pt-6'>
            <button
              type='button'
              onClick={handleMultipleDelete}
              className='group group z-[55] relative flex justify-center items-center gap-3 bg-[--errorLoader] px-8 rounded-xl h-10 text-white active:scale-95 transition-all duration-300 cursor-pointer select-none'
            >
              <span className='font-medium text-white text-sm transition-all duration-300'>
                Confirmar
              </span>
            </button>

            <button
              type='button'
              onClick={handleCloseModalDelete}
              className='group z-[55] relative flex justify-center items-center gap-3 bg-[--buttonPrimary] hover:bg-[--buttonSecondary] px-8 rounded-xl h-10 text-white active:scale-95 transition-all duration-300 cursor-pointer select-none'
            >
              <span className='font-medium text-[--textSecondary] text-sm'>
                Cancelar
              </span>
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        title='Filtros'
        size='small'
        isModalOpen={modalStatus}
        handleClickOverlay={handleCloseModal}
      >
        <FilterOperator actionClose={handleCloseModal} />
      </Modal>
      <div className='flex flex-col items-start gap-3 bg-[--backgroundPrimary] sm:rounded-2xl w-full h-full overflow-auto scroll-smooth'>
        <div className='flex justify-between items-center gap-3 p-6 w-full'>
          <h2 className='font-medium text-xl leading-none select-none'>
            Usuários
          </h2>

          <div className='flex flex-row gap-3'>
            <AnimatePresence>
              {hasChecked && (
                <motion.div
                  key='overlay'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <DestructiveButton
                    label='Excluir'
                    icon={
                      <TrashIcon
                        size='size-4'
                        stroke='stroke-[--textSecondary] group-hover:stroke-white'
                        strokeWidth={2.5}
                      />
                    }
                    onClick={handleCloseModalDelete}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <PrimaryLink
              label='Adicionar'
              icon={
                <AddIcon
                  size='size-4'
                  stroke='stroke-white group-data-[active=true]:stroke-[--primaryColor]'
                  strokeWidth={2.5}
                />
              }
              href='/usuarios/novo'
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
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder='Pesquisar usuário'
              spellCheck={false}
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

        <div className='flex flex-col justify-between gap-6 pb-0 w-full h-full'>
          <div className='flex flex-col gap-2 px-3 h-full'>
            <div className='gap-3 grid grid-cols-12 px-3 font-medium text-[--textSecondary] text-sm'>
              <div className='grid col-span-5 py-3'>
                <div className='group flex items-center gap-2 transition-all duration-300'>
                  <div className='flex items-center h-full'>
                    <input
                      id='checkboxAll'
                      type='checkbox'
                      name='operator[]'
                      className='rounded focus:ring-2 focus:ring-primaryDarker focus:ring-offset-0 text-[--secondaryColor] checkboxSecondary'
                      checked={checkedAll}
                      onChange={() => {
                        const checkboxes = checkboxRefs.current
                        const newValue = !checkedAll
                        checkboxes.forEach(ref => {
                          if (ref) ref.checked = newValue
                        })
                        setCheckedAll(newValue)
                        updateCheckedStatus()
                      }}
                    />
                  </div>
                  <button
                    onClick={() => handleOrderBy('name')}
                    type='button'
                    className='flex items-center gap-2 group-hover:opacity-60 truncate transition-all duration-300'
                  >
                    <span>Nome</span>
                    <div className='min-w-4'>
                      <CaretOrder
                        field={orderBy.field}
                        name='name'
                        order={orderBy.order}
                      />
                    </div>
                  </button>
                </div>
              </div>
              <div className='flex items-center col-span-3 py-3'>
                <button
                  onClick={() => handleOrderBy('email')}
                  type='button'
                  className='flex items-center gap-2 hover:opacity-60 truncate transition-all duration-300'
                >
                  <span>E-mail</span>
                  <CaretOrder
                    field={orderBy.field}
                    name='email'
                    order={orderBy.order}
                  />
                </button>
              </div>
              <div className='flex items-center col-span-2 py-3'>
                <button
                  onClick={() => handleOrderBy('permissionGroup')}
                  type='button'
                  className='flex items-center gap-2 hover:opacity-60 truncate transition-all duration-300'
                >
                  <span>Permissão</span>
                  <CaretOrder
                    field={orderBy.field}
                    name='permissionGroup'
                    order={orderBy.order}
                  />
                </button>
              </div>
              <div className='flex justify-end items-center col-span-2 py-3'>
                <button
                  onClick={() => handleOrderBy('createdAt')}
                  type='button'
                  className='flex items-center gap-2 hover:opacity-60 truncate transition-all duration-300'
                >
                  <span>Criado em</span>
                  <CaretOrder
                    field={orderBy.field}
                    name='createdAt'
                    order={orderBy.order}
                  />
                </button>
              </div>
            </div>
            {loading && (
              <motion.div
                key='loading'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className='flex justify-center items-start pt-10 w-full h-full'
              >
                <div role='status'>
                  <svg
                    aria-hidden='true'
                    className='fill-[--primaryColor] w-8 h-8 text-[--buttonPrimary] animate-spin'
                    viewBox='0 0 100 101'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                      fill='currentColor'
                    />
                    <path
                      d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                      fill='currentFill'
                    />
                  </svg>
                  <span className='sr-only'>Carregando...</span>
                </div>
              </motion.div>
            )}
            {!loading && (
              <motion.div
                key='data'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className='flex flex-col gap-6 pb-6 h-full'
              >
                <ul className='flex flex-col gap-3'>
                  {users.map((operator, i) => (
                    <li key={operator.uuid}>
                      <Link
                        href={`/usuarios/detalhes/${operator.uuid}`}
                        className='bg-[--tableRow] gap-3 grid grid-cols-12 px-3 rounded-xl font-normal text-[--textSecondary] text-sm capitalize transition-all duration-300'
                      >
                        <div className='flex items-center gap-3 col-span-5 py-3 font-medium'>
                          <input
                            ref={el => {
                              if (el) {
                                checkboxRefs.current[i] = el
                              }
                            }}
                            value={operator.uuid}
                            type='checkbox'
                            name='operator[]'
                            onClick={e => {
                              e.stopPropagation()
                            }}
                            onChange={() => {
                              const allChecked =
                                checkboxRefs.current.length > 0 &&
                                checkboxRefs.current.every(ref => ref?.checked)
                              setCheckedAll(allChecked)
                              updateCheckedStatus()
                            }}
                            className='rounded focus:ring-2 focus:ring-primaryDarker focus:ring-offset-0 text-[--secondaryColor]'
                          />
                          <span className='capitalize'>
                            {operator.name.toLocaleLowerCase()}
                          </span>
                        </div>
                        <div className='col-span-3 py-3 lowercase'>
                          {operator.email}
                        </div>
                        <div className='col-span-2 py-3 capitalize'>
                          {operator.permission_group.toLocaleLowerCase()}
                        </div>
                        <div className='col-span-2 py-3 pr-1 text-right lowercase'>
                          {timestampToDate(operator.created_at)}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>

                <Paginations
                  numberOfPages={calcPages(
                    pageSettings.numberOfDocuments,
                    pageSettings.numberPerPage
                  )}
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Operator
