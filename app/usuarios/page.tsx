'use client'
import { Plus, TrashSimple } from '@phosphor-icons/react'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { type FC, useCallback, useEffect, useRef, useState } from 'react'
import { CaretOrder } from '@/components/Template/Filter/CaretOrder'
import { FilterOperator } from '@/components/Template/Filter/Operator'

type Operator = {
  id: string
  name: string
  code: string
  username: string
  permission: string
  createdAt: string
}

const Operator: FC = () => {
  const [orderBy, setOrderBy] = useState({
    field: '',
    order: '',
  })
  const [checkedAll, setCheckedAll] = useState(false)
  const checkboxRefs = useRef<HTMLInputElement[]>([])
  const [hasChecked, setHasChecked] = useState(false)
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

  const updateCheckedStatus = () => {
    const anyChecked = checkboxRefs.current.some(ref => ref?.checked)
    setHasChecked(anyChecked)
  }

  enum MenuCards {
    Filter,
    Default,
  }
  const [isCardOpen, setCardOpen] = useState(MenuCards.Default)

  const handleClickOverlay = useCallback(() => {
    setCardOpen(MenuCards.Default)
  }, [])

  const handleFilterClick = useCallback(() => {
    setCardOpen(
      isCardOpen === MenuCards.Filter ? MenuCards.Default : MenuCards.Filter
    )
  }, [isCardOpen])

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
    },
    [orderBy.field]
  )

  useEffect(() => {
    const allChecked =
      checkboxRefs.current.length > 0 &&
      checkboxRefs.current.every(ref => ref?.checked)
    setCheckedAll(allChecked)
  }, [])

  return (
    <div className='flex flex-col gap-6 bg-[--backgroundSecondary] sm:pr-3 pb-8 sm:pb-3 w-full lg:h-[calc(100vh-50px)] overflow-auto'>
      <div className='flex flex-col items-start gap-6 bg-[--backgroundPrimary] sm:rounded-xl w-full h-full'>
        <div className='flex justify-between items-center gap-3 p-6 w-full'>
          <h2 className='font-medium text-2xl leading-none select-none'>
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
                  onClick={handleClickOverlay}
                >
                  <Link
                    href='/usuarios'
                    className={classNames(
                      'group select-none active:scale-95 z-[55] cursor-pointer flex gap-3 group relative justify-center items-center bg-transparent hover:bg-[--errorLoader] rounded-lg h-10 text-white transition-all duration-300 px-4 pr-5'
                    )}
                  >
                    <TrashSimple
                      size={16}
                      weight='fill'
                      className='text-[--textSecondary] group-hover:text-white'
                    />

                    <span className='font-medium text-[--textSecondary] group-hover:text-white text-sm transition-all duration-300'>
                      Excluir
                    </span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            <FilterOperator
              onClick={handleFilterClick}
              action={handleClickOverlay}
              title={'Filtrar'}
              type={'button'}
              isOpen={isCardOpen}
            />

            <Link
              href='/usuarios/novo'
              className={classNames(
                'select-none active:scale-95 z-[55] cursor-pointer flex gap-3 group relative justify-center items-center bg-[--primaryColor] hover:bg-[--secondaryColor] rounded-lg h-10 text-white transition-all duration-300 px-4 pr-5'
              )}
            >
              <Plus size={16} weight='bold' className='text-white' />
              <span className='font-medium text-sm'>Adicionar</span>
            </Link>
          </div>
        </div>

        <div className='w-full'>
          <ul className='flex flex-col gap-2 px-3'>
            <li className='gap-3 grid grid-cols-12 px-3 font-medium text-[--textSecondary] text-sm'>
              <div className='grid col-span-3 py-3'>
                <button
                  onClick={() => handleOrderBy('name')}
                  type='button'
                  className='group flex items-center gap-2 transition-all duration-300'
                >
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
                  <div className='flex items-center gap-2 group-hover:opacity-60 truncate transition-all duration-300'>
                    <span>Nome</span>
                    <CaretOrder
                      field={orderBy.field}
                      name='name'
                      order={orderBy.order}
                    />
                  </div>
                </button>
              </div>
              <div className='col-span-2 py-3'>
                <button
                  onClick={() => handleOrderBy('code')}
                  type='button'
                  className='flex items-center gap-2 hover:opacity-60 truncate transition-all duration-300'
                >
                  <span>Código</span>
                  <CaretOrder
                    field={orderBy.field}
                    name='code'
                    order={orderBy.order}
                  />
                </button>
              </div>
              <div className='col-span-3 py-3'>
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
              <div className='col-span-2 py-3'>
                <button
                  onClick={() => handleOrderBy('permission_group')}
                  type='button'
                  className='flex items-center gap-2 hover:opacity-60 truncate transition-all duration-300'
                >
                  <span>Permissão</span>
                  <CaretOrder
                    field={orderBy.field}
                    name='permission_group'
                    order={orderBy.order}
                  />
                </button>
              </div>
              <div className='flex justify-end col-span-2 py-3'>
                <button
                  onClick={() => handleOrderBy('created_at')}
                  type='button'
                  className='flex items-center gap-2 hover:opacity-60 truncate transition-all duration-300'
                >
                  <span>Criado em</span>
                  <CaretOrder
                    field={orderBy.field}
                    name='created_at'
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
                  <div className='flex items-center gap-3 col-span-3 py-4 font-medium'>
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
                  <div className='col-span-2 py-4 font-normal'>
                    <span className='inline-block max-w-[18ch] overflow-hidden text-ellipsis leading-none whitespace-nowrap'>
                      {operator.code}
                    </span>
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
