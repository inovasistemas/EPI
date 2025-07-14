'use client'
import { CaretUpDown, Plus, TrashSimple } from '@phosphor-icons/react'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { type FC, useCallback, useEffect, useRef, useState } from 'react'
import { FilterEquipments } from '@/components/Template/Filter/Equipments'

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
            Equipamentos
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
                    href='/equipamentos'
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

            <FilterEquipments
              onClick={handleFilterClick}
              action={handleClickOverlay}
              title={'Filtrar'}
              type={'button'}
              isOpen={isCardOpen}
            />

            <Link
              href='/equipamentos/novo'
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
              <div className='grid col-span-5 py-3'>
                <button
                  type='button'
                  className='group flex items-center gap-2 transition-all duration-300'
                >
                  <div className='flex items-center h-full'>
                    <input
                      id='checkboxAll'
                      type='checkbox'
                      name='equipment[]'
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
                    <CaretUpDown
                      size={16}
                      weight='bold'
                      className='text-[--textSecondary]'
                    />
                  </div>
                </button>
              </div>
              <div className='col-span-3 py-3'>
                <button
                  type='button'
                  className='flex items-center gap-2 hover:opacity-60 truncate transition-all duration-300'
                >
                  <span>Fabricante</span>
                  <CaretUpDown
                    size={16}
                    weight='bold'
                    className='text-[--textSecondary]'
                  />
                </button>
              </div>
              <div className='col-span-2 py-3'>
                <button
                  type='button'
                  className='flex items-center gap-2 hover:opacity-60 truncate transition-all duration-300'
                >
                  <span>Categoria</span>
                  <CaretUpDown
                    size={16}
                    weight='bold'
                    className='text-[--textSecondary]'
                  />
                </button>
              </div>
              <div className='flex justify-end col-span-2 py-3'>
                <button
                  type='button'
                  className='flex items-center gap-2 hover:opacity-60 truncate transition-all duration-300'
                >
                  <span>Estoque</span>
                  <CaretUpDown
                    size={16}
                    weight='bold'
                    className='text-[--textSecondary]'
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
                    <div className='relative bg-white rounded-lg w-16 aspect-square overflow-hidden'>
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
