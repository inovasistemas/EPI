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
import { CaretOrder } from '@/components/Template/Filter/CaretOrder'
import { FilterOperator } from '@/components/Template/Filter/Operator'
import { useQueryParams } from '@/components/Utils/UseQueryParams'

type Operator = {
  id: string
  name: string
  code: string
  username: string
  permission: string
  createdAt: string
}

const Operator: FC = () => {
  const setQueryParam = useQueryParams()
  const searchParams = useSearchParams()
  const permissionGroup = useMemo(() => {
    return searchParams.get('permissionGroup')
  }, [searchParams])
  const [checkedAll, setCheckedAll] = useState(false)
  const checkboxRefs = useRef<HTMLInputElement[]>([])
  const [hasChecked, setHasChecked] = useState(false)
  const [modalStatus, setModalStatus] = useState(false)
  const [orderBy, setOrderBy] = useState({
    field: '',
    order: '',
  })
  const operators: Operator[] = [
    {
      id: 'us_93d8a0d66ad2494f',
      name: 'Inova Sistemas',
      code: 'op_93d8a0d66ad2494f',
      username: 'teste@inovasistemas',
      permission: 'administrador',
      createdAt: '10/06/2025',
    },
    {
      id: 'us_93d8a0d66ad2494g',
      name: 'João Gomes',
      code: 'op_93d8a0d66ad2494g',
      username: 'joao@inovasistemas',
      permission: 'administrador',
      createdAt: '10/06/2025',
    },
  ]

  const handleCloseModal = useCallback(() => {
    setModalStatus(prev => !prev)
  }, [])

  const updateCheckedStatus = () => {
    const anyChecked = checkboxRefs.current.some(ref => ref?.checked)
    setHasChecked(anyChecked)
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

  useEffect(() => {
    const allChecked =
      checkboxRefs.current.length > 0 &&
      checkboxRefs.current.every(ref => ref?.checked)
    setCheckedAll(allChecked)
  }, [])

  return (
    <div className='flex flex-col gap-6 bg-[--backgroundSecondary] sm:pr-3 pb-8 sm:pb-3 w-full lg:h-[calc(100vh-50px)] overflow-auto'>
      {modalStatus && (
        <Modal
          title='Filtros'
          size='small'
          isModalOpen={modalStatus}
          handleClickOverlay={handleCloseModal}
        >
          <FilterOperator actionClose={handleCloseModal} />
        </Modal>
      )}
      <div className='flex flex-col items-start gap-3 bg-[--backgroundPrimary] sm:rounded-2xl w-full h-full'>
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
                  onClick={handleCloseModal}
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
                    onClick={() => null}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <PrimaryLink
              label='Adicionar'
              icon={
                <AddIcon
                  size='size-4'
                  fill='fill-white group-data-[active=true]:fill-[--primaryColor]'
                />
              }
              href='/usuarios/novo'
            />
          </div>
        </div>

        <div className='flex flex-row items-center gap-3 px-6 w-1/2'>
          <div className='bg-[--tableRow] box-border flex flex-row items-center gap-2 focus-within:bg-[--buttonPrimary] px-3 rounded-lg w-full h-10 transition-all duration-300'>
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

        <div className='w-full'>
          <ul className='flex flex-col gap-2 px-3'>
            <li className='gap-3 grid grid-cols-12 px-3 font-medium text-[--textSecondary] text-sm'>
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
                  onClick={() => handleOrderBy('username')}
                  type='button'
                  className='flex items-center gap-2 hover:opacity-60 truncate transition-all duration-300'
                >
                  <span>Usuário</span>
                  <CaretOrder
                    field={orderBy.field}
                    name='username'
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
            </li>
            {operators.map((operator, i) => (
              <li key={operator.id}>
                <Link
                  href={`/usuarios/detalhes/${operator.id}`}
                  className='bg-[--tableRow] gap-3 grid grid-cols-12 px-3 rounded-xl font-normal text-[--textSecondary] text-sm capitalize transition-all duration-300'
                >
                  <div className='flex items-center gap-3 col-span-5 py-4 font-medium'>
                    <input
                      ref={el => {
                        if (el) {
                          checkboxRefs.current[i] = el
                        }
                      }}
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
                    <span>{operator.name}</span>
                  </div>
                  <div className='col-span-3 py-4 lowercase'>
                    {operator.username}
                  </div>
                  <div className='col-span-2 py-4'>{operator.permission}</div>
                  <div className='col-span-2 py-4 pr-1 text-right lowercase'>
                    10/06/2025
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Operator
