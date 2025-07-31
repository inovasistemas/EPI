'use client'

import { SmallChartIssues } from '@/components/Chart/Small/Issues'
import { CaretUpIcon } from '@/components/Display/Icons/CaretUp'

export default function Home() {
  return (
    <div className='flex flex-col gap-6 bg-[--backgroundSecondary] sm:pr-3 pb-8 sm:pb-3 w-full lg:h-[calc(100vh-50px)] overflow-auto'>
      <div className='flex flex-col gap-6 bg-[--backgroundPrimary] p-6 sm:rounded-2xl w-full h-full'>
        {/* <button
          type='button'
          className='flex flex-row items-center bg-[--errorLoader] px-3 py-2 rounded-xl w-full transition-all duration-300'
        >
          <BellSimpleRinging
            size={18}
            weight='fill'
            className='text-white group-hover:text-red-400/30 scale-125 sm:scale-100 transition-all duration-300'
          />

          <span className='ml-3 font-medium text-white text-sm'>
            9 colaboradores ainda não retiraram seus EPIs dentro do prazo,
          </span>

          <span className='ml-1 font-medium text-white text-sm underline'>
            clique para ver a lista
          </span>
        </button> */}

        <div className='gap-3 grid sm:grid-cols-3'>
          <div className=''></div>
          <div className=''></div>
          <div className='group relative flex flex-col justify-center items-start p-2 py-3 rounded-2xl w-full transition-all duration-300'>
            <div className='flex justify-between items-center px-1 w-full'>
              <h3 className='font-medium text-base'>Taxa de pendências</h3>
              <span className='rotate-90'>
                <CaretUpIcon size='size-5' stroke='stroke-[--textSecondary]' />
              </span>
            </div>
            <SmallChartIssues />
            <div className='flex flex-col gap-4 px-1 w-full'>
              <div className='flex justify-between items-center pr-1 w-full h-5'>
                <div className='flex items-center gap-2 h-full'>
                  <span className='bg-[--primaryColor] rounded-full w-1 h-full'></span>
                  <span className='font-medium leading-none'>78,81%</span>
                </div>
                <span className='opacity-50 text-[--textSecondary] text-sm'>
                  186 colaboradores
                </span>
              </div>
              <div className='flex justify-between items-center pr-1 w-full h-5'>
                <div className='flex items-center gap-2 h-full'>
                  <span className='bg-[--chartOrange] rounded-full w-1 h-full'></span>
                  <span className='font-medium leading-none'>21,19%</span>
                </div>
                <span className='opacity-50 text-[--textSecondary] text-sm'>
                  50 colaboradores
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* <div className='gap-3 grid grid-cols-2 sm:grid-cols-3'>
          <div className='group relative flex items-center gap-3 bg-[--backgroundSecondary] hover:shadow-lg p-6 py-10 border border-[--outlinePrimary] hover:border-amber-400/50 rounded-xl w-full overflow-hidden hover:scale-[1.015] transition-all duration-300 cursor-pointer'>
            <span className='group right-0 bottom-0 absolute -mr-6 -mb-6'>
              <HardHat
                size={100}
                weight='duotone'
                className='text-[--outlinePrimary] group-hover:text-amber-400/30 scale-125 sm:scale-100 transition-all duration-300'
              />
            </span>
            <span className='z-20 font-medium text-[--textSecondary] group-hover:text-amber-400 text-xl transition-all duration-300'>
              Equipamentos
            </span>
          </div>

          <div className='group relative flex items-center gap-3 bg-[--backgroundSecondary] hover:shadow-lg p-6 py-10 border border-[--outlinePrimary] hover:border-purple-400/50 rounded-xl w-full overflow-hidden hover:scale-[1.015] transition-all duration-300 cursor-pointer'>
            <span className='group right-0 bottom-0 absolute -mr-2 -mb-6'>
              <Users
                size={100}
                weight='duotone'
                className='text-[--outlinePrimary] group-hover:text-purple-400/30 scale-125 sm:scale-100 transition-all duration-300'
              />
            </span>
            <span className='z-20 font-medium text-[--textSecondary] group-hover:text-purple-400 text-xl transition-all duration-300'>
              Colaboradores
            </span>
          </div>

          <div className='group relative flex items-center gap-3 bg-[--backgroundSecondary] hover:shadow-lg p-6 py-10 border border-[--outlinePrimary] hover:border-emerald-400/50 rounded-xl w-full overflow-hidden hover:scale-[1.015] transition-all duration-300 cursor-pointer'>
            <span className='group right-0 bottom-0 absolute -mr-6 -mb-6'>
              <IdentificationBadge
                size={100}
                weight='duotone'
                className='text-[--outlinePrimary] group-hover:text-emerald-400/30 scale-125 sm:scale-100 transition-all duration-300'
              />
            </span>
            <span className='z-20 font-medium text-[--textSecondary] group-hover:text-emerald-400 text-xl transition-all duration-300'>
              Operadores
            </span>
          </div>

          <div className='group relative flex items-center gap-3 bg-[--backgroundSecondary] hover:shadow-lg p-6 py-10 border border-[--outlinePrimary] rounded-xl w-full overflow-hidden hover:text-[--primaryColor] hover:scale-[1.015] transition-all duration-300 cursor-pointer'>
            <span className='group right-0 bottom-0 absolute -mr-6 -mb-6'>
              <ChartBar
                size={100}
                weight='duotone'
                className='text-[--outlinePrimary] group-hover:text-[--primaryColor]/30 scale-125 sm:scale-100 transition-all duration-300'
              />
            </span>
            <span className='z-20 font-medium text-[--textSecondary] group-hover:text-[--primaryColor] text-xl transition-all duration-300'>
              Relatórios
            </span>
          </div>

          <div className='group relative flex items-center gap-3 bg-[--backgroundSecondary] hover:shadow-lg p-6 py-10 border border-[--outlinePrimary] hover:border-red-400/50 rounded-xl w-full overflow-hidden hover:scale-[1.015] transition-all duration-300 cursor-pointer'>
            <span className='group right-0 bottom-0 absolute -mr-6 -mb-6'>
              <Gear
                size={100}
                weight='duotone'
                className='text-[--outlinePrimary] group-hover:text-red-400/30 scale-125 sm:scale-100 transition-all duration-300'
              />
            </span>
            <span className='z-20 font-medium text-[--textSecondary] group-hover:text-red-400 text-xl transition-all duration-300'>
              Ajustes
            </span>
          </div>
        </div> */}
      </div>
    </div>
  )
}
