'use client'
import { FadersHorizontal, MagnifyingGlass } from '@phosphor-icons/react'
import { FilterButton } from '@/components/Inputs/Button/FilterButton'
import { SearchInput } from '@/components/Inputs/Text/SearchInput'
import { Modal } from '../Modal'
import { Privacy } from '@/components/Template/Terms/Privacy'
import { useCallback, useState } from 'react'
import { CreateButton } from '@/components/Navigation/CreateButton'
import { SecondaryButton } from '@/components/Navigation/SecondaryButton'

export function PageSearch() {
  const [modalStatus, setModalStatus] = useState(false)

  const handleClickOverlay = useCallback(() => {
    setModalStatus(prev => !prev)
  }, [])

  return (
    <>
      <Modal
        title='Filtrar e ordenar'
        isModalOpen={modalStatus}
        handleClickOverlay={handleClickOverlay}
        titleFixed={true}
      >
        <div className='flex flex-col gap-16'>
          <div className='flex'>
            <h2 className='z-[999] font-semibold text-2xl text-start'>
              Filtrar e ordenar
            </h2>
          </div>

          <div className='flex flex-col'>
            <div className='gap-3 sm:gap-0 grid sm:grid-cols-2 pt-0 pb-16 border-[#EDEDED] border-b w-full'>
              <div>
                <span className='font-medium text-sm'>Ordenar por</span>
              </div>
              <div className='text-sm'>Padrão</div>
            </div>

            <div className='gap-3 sm:gap-0 grid sm:grid-cols-2 pt-6 pb-36 w-full'>
              <div>
                <span className='font-medium text-sm'>
                  Filtros recomendados
                </span>
              </div>
              <div className='text-sm'>Padrão</div>
            </div>
          </div>
        </div>
        <div className='bottom-0 left-0 z-[100] fixed flex flex-row gap-3 mx-auto px-6 py-4 border-[#EDEDED] border-t w-full max-h-[80%] sm:max-h-[75%] text-black'>
          <CreateButton label='Aplicar' href='' />
          <SecondaryButton label='Limpar filtros' href='' />
        </div>
      </Modal>
      <div className='relative flex flex-row items-center gap-3'>
        <div className='w-full sm:w-1/3'>
          <SearchInput
            label='Pesquisa'
            name='search'
            required={false}
            icon={
              <MagnifyingGlass
                size={16}
                weight='bold'
                className='text-zinc-900'
              />
            }
          />
        </div>

        <div className='grid bg-[#D9D9D9] ml-4 w-[1px] h-4'></div>

        <div className='w-auto'>
          <FilterButton
            label='Filtrar e ordenar'
            name='status'
            action={handleClickOverlay}
            icon={
              <FadersHorizontal
                size={16}
                weight='bold'
                className='text-zinc-900'
              />
            }
          />
        </div>

        <div className='hidden right-0 absolute sm:flex justify-end text-[#999999] text-sm'>
          0 produções
        </div>
      </div>
    </>
  )
}
