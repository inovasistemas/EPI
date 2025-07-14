'use client'
import { CaretLeft } from '@phosphor-icons/react'
import classNames from 'classnames'
import Link from 'next/link'
import type { FC } from 'react'
import { ActionGroup } from '@/components/Surfaces/ActionGroup'

const CreateEquipment: FC = () => {
  return (
    <div className='flex flex-col gap-6 bg-[--backgroundSecondary] sm:pr-3 pb-8 sm:pb-3 w-full lg:h-[calc(100vh-50px)] overflow-auto'>
      <div className='relative flex flex-col items-start gap-6 bg-[--backgroundPrimary] sm:rounded-xl w-full h-full'>
        <div className='flex justify-between items-center gap-3 p-6 w-full'>
          <div className='flex flex-row items-center gap-3'>
            <Link
              href='/usuarios'
              type='button'
              className={classNames(
                'active:scale-95 group flex relative justify-center items-center hover:bg-[--backgroundSecondary] bg-[--backgroundPrimary] rounded-lg w-8 h-8 text-zinc-200 transition z-[200]'
              )}
            >
              <CaretLeft
                size={20}
                weight='bold'
                className='text-[--textSecondary]'
              />
            </Link>

            <h2 className='font-medium text-2xl leading-none select-none'>
              Adicionar usuário
            </h2>
          </div>
        </div>

        <form className='gap-4 grid sm:grid-cols-2 px-6 w-full'>
          <ActionGroup />
        </form>
      </div>
    </div>
  )
}

export default CreateEquipment
