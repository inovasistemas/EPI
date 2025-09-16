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
            <div className='flex justify-between items-start p-3 w-full'>
              <h3 className='font-medium text-base select-none'>
                Movimentação por semana
              </h3>
              <span className='-mr-1 rotate-90'>
                <CaretUpIcon size='size-5' stroke='stroke-[--textSecondary]' />
              </span>
            </div>
            <div className='relative col-span-2 w-full'>
              <ChartAreaGradient />
            </div>
          </div>
          <div className='group relative flex flex-col justify-between items-start bg-[--backgroundPrimary] p-3 rounded-2xl w-full transition-all duration-300'>
            <div className='flex justify-between items-start px-1 w-full'>
              <h3 className='font-medium text-base select-none'>
                Taxa de pendências
              </h3>
              <span className='-mr-2 rotate-90'>
                <CaretUpIcon size='size-5' stroke='stroke-[--textSecondary]' />
              </span>
            </div>
            <SmallChartIssues />
            <div className='flex flex-col gap-4 px-1 w-full'>
              <div className='flex justify-between items-center pr-1 w-full h-5 select-none'>
                <div className='flex items-center gap-2 h-full'>
                  <span className='bg-[--primaryColor] rounded-full w-1 h-full'></span>
                  <span className='font-medium leading-none'>78,81%</span>
                </div>
                <span className='text-[--textSecondary] text-sm'>
                  186 regularizados
                </span>
              </div>
              <div className='flex justify-between items-center pr-1 w-full h-5 select-none'>
                <div className='flex items-center gap-2 h-full'>
                  <span className='bg-[--chartYellow] rounded-full w-1 h-full'></span>
                  <span className='font-medium leading-none'>21,19%</span>
                </div>
                <span className='text-[--textSecondary] text-sm'>
                  50 pendentes
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className='gap-6 grid grid-cols-2 sm:grid-cols-3'>
          <button
            type='button'
            className='group relative flex flex-col justify-start items-center bg-[--backgroundPrimary] p-3 rounded-2xl w-full overflow-hidden transition-all duration-300 cursor-pointer select-none'
          >
            <div className='flex flex-row justify-between items-start w-full'>
              <div className='flex flex-col justify-start items-start w-full'>
                <span className='text-[--textSecondary] text-xs'>
                  Equipamentos
                </span>
                <span className='z-20 pb-3 w-full font-medium text-2xl text-left transition-all duration-300'>
                  103
                </span>
              </div>
              <span className='-mr-1 rotate-90'>
                <CaretUpIcon size='size-5' stroke='stroke-[--textSecondary]' />
              </span>
            </div>
            <div className='flex flex-col gap-1 w-full'>
              <div className='flex flex-row justify-start items-center gap-1 w-full'>
                <span className='font-semibold text-sm'>1</span>
                <span className='text-sm'>com validade expirada</span>
              </div>
              <div className='flex flex-row justify-start items-center gap-1 w-full text-[--chartRed]'>
                <span className='font-semibold text-sm'>10</span>
                <span className='text-sm'>devoluções pendentes</span>
              </div>
            </div>
          </button>

          <button
            type='button'
            className='group relative flex flex-col justify-start items-center bg-[--backgroundPrimary] p-3 rounded-2xl w-full overflow-hidden transition-all duration-300 cursor-pointer select-none'
          >
            <div className='flex flex-row justify-between items-start w-full'>
              <div className='flex flex-col justify-start items-start w-full'>
                <span className='text-[--textSecondary] text-xs'>Usuários</span>
                <span className='z-20 pb-3 w-full font-medium text-2xl text-left transition-all duration-300'>
                  2
                </span>
              </div>
              <span className='-mr-1 rotate-90'>
                <CaretUpIcon size='size-5' stroke='stroke-[--textSecondary]' />
              </span>
            </div>
            <div className='flex flex-col gap-1 w-full'>
              <div className='flex flex-row justify-start items-center gap-1 w-full'>
                <span className='font-semibold text-sm'>23</span>
                <span className='text-sm'>
                  registros alterados pelo financeiro
                </span>
              </div>
              <div className='flex flex-row justify-start items-center gap-1 w-full text-[--chartRed]'>
                <span className='font-semibold text-sm'>2</span>
                <span className='text-sm'>
                  registros excluídos pelo administrador
                </span>
              </div>
            </div>
          </button>

          <button
            type='button'
            className='group relative flex flex-col justify-start items-center bg-[--backgroundPrimary] p-3 rounded-2xl w-full overflow-hidden transition-all duration-300 cursor-pointer select-none'
          >
            <div className='flex flex-row justify-between items-start w-full'>
              <div className='flex flex-col justify-start items-start w-full'>
                <span className='text-[--textSecondary] text-xs'>
                  Colaboradores
                </span>
                <span className='z-20 pb-3 w-full font-medium text-2xl text-left transition-all duration-300'>
                  52
                </span>
              </div>
              <span className='-mr-1 rotate-90'>
                <CaretUpIcon size='size-5' stroke='stroke-[--textSecondary]' />
              </span>
            </div>
            <div className='flex flex-col gap-1 w-full'>
              <div className='flex flex-row justify-start items-center gap-1 w-full'>
                <span className='font-semibold text-sm'>49</span>
                <span className='text-sm'>ativos</span>
              </div>
              <div className='flex flex-row justify-start items-center gap-1 w-full'>
                <span className='font-semibold text-sm'>3</span>
                <span className='text-sm'>afastados</span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
