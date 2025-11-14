'use client'
import { Countdown } from '@/components/Countdown'
import { LockIcon } from '@/components/Display/Icons/Lock'
import { type FC } from 'react'

const Costs: FC = () => {
  // const [modalStatus, setModalStatus] = useState(false)
  // const [filter, setFilter] = useState({
  //   dateStart: dayjs().startOf('month'),
  //   dateEnd: dayjs().endOf('month'),
  // })

  // const handleCloseModal = useCallback(() => {
  //   setModalStatus(prev => !prev)
  // }, [])

  return (
    <div className='flex flex-col gap-6 bg-[--backgroundSecondary] sm:pr-3 pb-8 sm:pb-3 w-full lg:h-[calc(100vh-50px)] overflow-auto'>
      <div className='flex flex-col items-start gap-3 bg-[--backgroundPrimary] sm:rounded-2xl w-full h-full overflow-auto'>
        <div className='flex justify-between items-center gap-3 p-6 w-full'>
          <div className='flex flex-row items-center gap-2'>
            <LockIcon size="min-w-[1.5rem] size-5" stroke="stroke-[--textSecondary]" />
            <h2 className='font-medium text-[--textSecondary] text-xl select-none'>
              Relatório de recursos 
            </h2>
          </div>
        </div>
        
        <div className="flex justify-center items-center w-full h-full">
          <div className="flex items-center gap-3 mb-20">
            
            <div>
              <div className="text-[--textSecondary] text-base select-none">
                <Countdown date='2025-11-30 00:00:00' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div className='flex flex-col gap-6 bg-[--backgroundSecondary] sm:pr-3 pb-8 sm:pb-3 w-full lg:h-[calc(100vh-50px)] overflow-auto'>
    //   <Modal
    //     title='Filtros'
    //     size='small'
    //     isModalOpen={modalStatus}
    //     handleClickOverlay={handleCloseModal}
    //   >
    //     <FilterReportCost start={filter.dateStart} end={filter.dateEnd} />
    //   </Modal>
    //   <div className='flex flex-col items-start gap-3 bg-[--backgroundPrimary] sm:rounded-2xl w-full h-full'>
    //     <div className='flex justify-between items-center gap-3 p-6 w-full'>
    //       <h2 className='font-medium text-xl leading-none select-none'>
    //         Relatório recursos
    //       </h2>
    //       <SecondaryButton
    //         label='Filtrar'
    //         icon={
    //           <FilterIcon
    //             size='size-4'
    //             stroke='stroke-[--textSecondary] group-data-[active=true]:stroke-[--primaryColor]'
    //             strokeWidth={2.5}
    //           />
    //         }
    //         onClick={handleCloseModal}
    //       />
    //     </div>

    //     <div className='flex flex-col gap-3 px-6 pb-6 w-full overflow-hidden'>
    //       <ChartCost />
    //     </div>
    //   </div>
    // </div>
  )
}

export default Costs
