'use client'
import { type FC } from 'react'
import { LockIcon } from '@/components/Display/Icons/Lock'
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import { Countdown } from '@/components/Countdown';

const Rotine: FC = () => {
  return (
    <div className='flex flex-col gap-6 bg-[--backgroundSecondary] sm:pr-3 pb-8 sm:pb-3 w-full lg:h-[calc(100vh-50px)] overflow-auto'>
      <div className='flex flex-col items-start gap-3 bg-[--backgroundPrimary] sm:rounded-2xl w-full h-full overflow-auto'>
        <div className='flex justify-between items-center gap-3 p-6 w-full'>
          <div className='flex flex-row items-center gap-2'>
            <LockIcon size="min-w-[1.5rem] size-5" stroke="stroke-[--textSecondary]" />
            <h2 className='font-medium text-[--textSecondary] text-xl select-none'>
              Rotinas 
            </h2>
          </div>
        </div>
        
        <div className="flex justify-center items-center w-full h-full">
          <div className="flex items-center gap-3 mb-20">
            
            <div>
              <div className="text-[--textSecondary] text-base select-none">
                <Countdown date='2025-10-23 00:00:00' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Rotine
