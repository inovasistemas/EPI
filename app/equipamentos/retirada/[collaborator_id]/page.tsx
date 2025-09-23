'use client'
import { DataTable } from '@/components/teste'
import { type FC } from 'react'

const EquipmentWithdrawal: FC = () => {
  return (
    <div className='flex flex-col gap-6 bg-[--backgroundSecondary] pb-8 sm:pb-3 w-full lg:h-[calc(100vh-50px)] overflow-auto'>
      <div className='relative flex flex-col items-start gap-6 bg-[--backgroundPrimary] sm:rounded-xl w-full h-full overflow-auto'>
        <div className='w-full'>
          <div className='flex justify-between items-center gap-3 p-6 w-full'>
            <div className='flex flex-row items-center gap-3'>
              <h2 className='font-medium text-[--textSecondary] text-xl select-none'>
                Retirada de equipamentos
              </h2>
            </div>
          </div>
          <div className='p-6'>
            <DataTable
              data={[
                {
                  id: 1,
                  header: '1',
                  type: '1',
                  status: '1',
                  target: '1',
                  limit: '1',
                  reviewer: '1',
                },
                {
                  id: 2,
                  header: '2',
                  type: '2',
                  status: '2',
                  target: '2',
                  limit: '2',
                  reviewer: '2',
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EquipmentWithdrawal
