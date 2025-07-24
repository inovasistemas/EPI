'use client'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { type FC, useCallback, useEffect, useRef, useState } from 'react'
import { DestructiveButton } from '@/components/Buttons/DestructiveButton'
import { SecondaryButton } from '@/components/Buttons/SecondaryButton'
import { AddIcon } from '@/components/Display/Icons/Add'
import { ConnectedIcon } from '@/components/Display/Icons/Connected'
import { FilterIcon } from '@/components/Display/Icons/Filter'
import { SearchIcon } from '@/components/Display/Icons/Search'
import { TrashIcon } from '@/components/Display/Icons/Trash'
import { Modal } from '@/components/Display/Modal'
import { PrimaryLink } from '@/components/Links/PrimaryLink'
import { CaretOrder } from '@/components/Template/Filter/CaretOrder'
import { FilterEquipments } from '@/components/Template/Filter/Equipments'
import { useQueryParams } from '@/components/Utils/UseQueryParams'

type Equipment = {
  id: string
  name: string
  code: string
  manufacturer: string
  category: string
  stock: number
  image?: string
}

const Equipment: FC = () => {
  const setQueryParam = useQueryParams()
  const searchParams = useSearchParams()
  const [modalStatus, setModalStatus] = useState(false)
  const [orderBy, setOrderBy] = useState({
    field: searchParams.get('sortField') || '',
    order: searchParams.get('sortOrder') || '',
  })
  const [checkedAll, setCheckedAll] = useState(false)
  const checkboxRefs = useRef<HTMLInputElement[]>([])
  const [hasChecked, setHasChecked] = useState(false)
  const equipments: Equipment[] = [
    {
      id: 'eq_93d8a0d66ad2494f',
      name: 'Luva Nitrílica Sem Forro',
      code: 'co_93d8a0d66ad2494f',
      manufacturer: 'Fabricante 1',
      category: 'Capacetes',
      stock: 13,
    },
    {
      id: 'eq_93d8a0d66ad2494g',
      name: 'Capacete Msa V-gard Carneira Push Key',
      code: 'co_93d8a0d66ad2494g',
      manufacturer: 'Fabricante 2',
      category: 'Luvas',
      stock: 101,
    },
  ]

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

  const handleCloseModal = useCallback(() => {
    setModalStatus(prev => !prev)
  }, [])

  useEffect(() => {
    const allChecked =
      checkboxRefs.current.length > 0 &&
      checkboxRefs.current.every(ref => ref?.checked)
    setCheckedAll(allChecked)
  }, [])

  return (
    <div className='flex flex-col gap-6 bg-[--backgroundSecondary] sm:pr-3 pb-8 sm:pb-3 w-full lg:h-[calc(100vh-50px)] overflow-auto'>
      <Modal
        title='Filtros'
        size='small'
        isModalOpen={modalStatus}
        handleClickOverlay={handleCloseModal}
      >
        <FilterEquipments actionClose={handleCloseModal} />
      </Modal>
      <div className='flex flex-col items-start gap-3 bg-[--backgroundPrimary] sm:rounded-2xl w-full h-full'>
        <div className='flex justify-between items-center gap-3 p-6 w-full'>
          <div className='flex flex-row items-center gap-3'>
            <h2 className='font-medium text-[--textSecondary] text-xl select-none'>
              Equipamentos
            </h2>
          </div>

          <div className='flex flex-row gap-3'>
            <AnimatePresence>
              {hasChecked && (
                <motion.div
                  key='overlay'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  onClick={() => null}
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

            <SecondaryButton
              label='Associar'
              icon={
                <ConnectedIcon
                  size='size-4'
                  stroke='stroke-[--textSecondary] group-data-[active=true]:stroke-[--primaryColor]'
                  strokeWidth={2.5}
                />
              }
              onClick={handleCloseModal}
            />

            <PrimaryLink
              label='Adicionar'
              icon={
                <AddIcon
                  size='size-4'
                  stroke='stroke-white group-data-[active=true]:stroke-[--primaryColor]'
                  strokeWidth={2.5}
                />
              }
              href='/equipamentos/novo'
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

        <div className='flex flex-col gap-y-6 w-full'>
          <ul className='flex flex-col gap-2 px-3'>
            <li className='gap-3 grid grid-cols-12 px-3 font-medium text-[--textSecondary] text-sm'>
              <div className='grid col-span-5 py-3'>
                <div className='group flex justify-start items-center gap-2 transition-all duration-300'>
                  <div className='flex items-center h-full'>
                    <input
                      id='checkboxAll'
                      type='checkbox'
                      name='equipment[]'
                      className='rounded focus:ring-2 focus:ring-primaryDarker focus:ring-offset-0 text-[--secondaryColor] checkboxSecondary'
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
                  onClick={() => handleOrderBy('manufacturer')}
                  type='button'
                  className='flex items-center gap-2 hover:opacity-60 truncate transition-all duration-300'
                >
                  <span>Fabricante</span>
                  <CaretOrder
                    field={orderBy.field}
                    name='manufacturer'
                    order={orderBy.order}
                  />
                </button>
              </div>
              <div className='flex items-center col-span-2 py-3'>
                <button
                  onClick={() => handleOrderBy('category')}
                  type='button'
                  className='flex items-center gap-2 hover:opacity-60 truncate transition-all duration-300'
                >
                  <span>Categoria</span>
                  <CaretOrder
                    field={orderBy.field}
                    name='category'
                    order={orderBy.order}
                  />
                </button>
              </div>
              <div className='flex justify-end items-center col-span-2 py-3'>
                <button
                  onClick={() => handleOrderBy('stock')}
                  type='button'
                  className='flex items-center gap-2 hover:opacity-60 truncate transition-all duration-300'
                >
                  <span>Estoque</span>
                  <CaretOrder
                    field={orderBy.field}
                    name='stock'
                    order={orderBy.order}
                  />
                </button>
              </div>
            </li>
            {equipments.map((equipment, i) => (
              <li key={equipment.id}>
                <Link
                  href={`/equipamentos/detalhes/${equipment.code}`}
                  className='bg-[--tableRow] gap-3 grid grid-cols-12 px-3 rounded-xl font-normal text-[--textSecondary] text-sm capitalize transition-all duration-300'
                >
                  <div className='flex items-center gap-3 col-span-5 py-3 font-medium'>
                    <input
                      ref={el => {
                        if (el) {
                          checkboxRefs.current[i] = el
                        }
                      }}
                      type='checkbox'
                      name='equipment[]'
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
                    <div className='relative bg-[--backgroundPrimary] rounded-xl w-16 aspect-square overflow-hidden'>
                      {equipment.image && (
                        <Image
                          src={equipment.image}
                          alt={equipment.name}
                          fill
                          className='w-full h-full object-cover'
                        />
                      )}
                    </div>
                    <span className='inline-block overflow-hidden text-ellipsis leading-none whitespace-nowrap'>
                      {equipment.name}
                    </span>
                  </div>
                  <div className='flex items-center col-span-3 py-4'>
                    {equipment.manufacturer}
                  </div>
                  <div className='flex items-center col-span-2 py-4 pr-1 capitalize'>
                    {equipment.category}
                  </div>
                  <div className='flex justify-end items-center col-span-2 py-4 pr-1 lowercase'>
                    {equipment.stock} unidades
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

export default Equipment
