'use client'

import { ChartAreaGradient } from '@/components/Chart/Small/Colaborator'
import { SmallChartIssues } from '@/components/Chart/Small/Issues'
import { CaretUpIcon } from '@/components/Display/Icons/CaretUp'

export default function Home() {
  return (
    <div className='flex flex-col gap-6 bg-[--backgroundSecondary] sm:pr-3 pb-8 sm:pb-3 w-full lg:h-[calc(100vh-50px)] overflow-auto'>
      <div className='flex flex-col gap-6 bg-[--backgroundSecondary] sm:rounded-2xl w-full h-full'>
        <div className='gap-6 grid sm:grid-cols-3'>
          <div className='group flex flex-col justify-start items-start col-span-2 bg-[--backgroundPrimary] rounded-2xl w-full overflow-hidden transition-all duration-300'>
            <div className='flex justify-between items-center p-3 w-full'>
              <h3 className='font-medium text-base'>
                Retirada de equipamentos
              </h3>
              <span className='rotate-90'>
                <CaretUpIcon size='size-5' stroke='stroke-[--textSecondary]' />
              </span>
            </div>
            <div className='relative col-span-2 w-full'>
              <ChartAreaGradient />
            </div>
          </div>
          <div className='group relative flex flex-col justify-between items-start bg-[--backgroundPrimary] p-3 rounded-2xl w-full transition-all duration-300'>
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
                  <span className='bg-[--chartYellow] rounded-full w-1 h-full'></span>
                  <span className='font-medium leading-none'>21,19%</span>
                </div>
                <span className='opacity-50 text-[--textSecondary] text-sm'>
                  50 colaboradores
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className='gap-6 grid grid-cols-2 sm:grid-cols-3'>
          <div className='group relative flex flex-col justify-start items-center bg-[--backgroundPrimary] p-3 rounded-2xl w-full overflow-hidden transition-all duration-300 cursor-pointer select-none'>
            <span className='z-20 pb-3 w-full font-medium text-[--textSecondary] text-base transition-all duration-300'>
              Colaboradores
            </span>
            <div className='flex flex-row justify-between items-center w-full'>
              <span className='text-sm'>Ativos</span>
              <span className='font-medium text-sm'>103</span>
            </div>
            <div className='flex flex-row justify-between items-center w-full'>
              <span className='text-sm'>Afastados</span>
              <span className='font-medium text-sm'>1</span>
            </div>
            <div className='flex flex-row justify-between items-center w-full'>
              <span className='text-sm'>Devolução pendente</span>
              <span className='font-medium text-sm'>0</span>
            </div>
          </div>

          <div className='group relative flex flex-col justify-start items-center bg-[--backgroundPrimary] p-3 rounded-2xl w-full overflow-hidden transition-all duration-300 cursor-pointer select-none'>
            <span className='z-20 pb-3 w-full font-medium text-[--textSecondary] text-base transition-all duration-300'>
              Operadores
            </span>
            <div className='flex flex-row justify-between items-center w-full'>
              <span className='text-sm'>Ativos</span>
              <span className='font-medium text-sm'>103</span>
            </div>
            <div className='flex flex-row justify-between items-center w-full'>
              <span className='text-sm'>Afastados</span>
              <span className='font-medium text-sm'>1</span>
            </div>
            <div className='flex flex-row justify-between items-center w-full'>
              <span className='text-sm'>Devolução pendente</span>
              <span className='font-medium text-sm'>0</span>
            </div>
          </div>

          <div className='group relative flex flex-col justify-start items-center bg-[--backgroundPrimary] p-3 rounded-2xl w-full overflow-hidden transition-all duration-300 cursor-pointer select-none'>
            <span className='z-20 pb-3 w-full font-medium text-[--textSecondary] text-base transition-all duration-300'>
              Equipamentos
            </span>
            <div className='flex flex-row justify-between items-center w-full'>
              <span className='text-sm'>Ativos</span>
              <span className='font-medium text-sm'>103</span>
            </div>
            <div className='flex flex-row justify-between items-center w-full'>
              <span className='text-sm'>Vencidos</span>
              <span className='font-medium text-sm'>1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
