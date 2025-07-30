'use client'
import dayjs from 'dayjs'
import { type FC, useCallback, useState } from 'react'
import { SecondaryButton } from '@/components/Buttons/SecondaryButton'
import { FilterIcon } from '@/components/Display/Icons/Filter'
import { Modal } from '@/components/Display/Modal'
import { FilterReportIssues } from '@/components/Template/Filter/ReportIssues'

const Issues: FC = () => {
  const [modalStatus, setModalStatus] = useState(false)
  const [filter, setFilter] = useState({
    dateStart: dayjs(),
  })

  const handleCloseModal = useCallback(() => {
    setModalStatus(prev => !prev)
  }, [])

  return (
    <div className='flex flex-col gap-6 bg-[--backgroundSecondary] sm:pr-3 pb-8 sm:pb-3 w-full lg:h-[calc(100vh-50px)] overflow-auto'>
      <Modal
        title='Filtros'
        size='small'
        isModalOpen={modalStatus}
        handleClickOverlay={handleCloseModal}
      >
        <FilterReportIssues start={filter.dateStart} />
      </Modal>
      <div className='flex flex-col items-start gap-3 bg-[--backgroundPrimary] sm:rounded-2xl w-full h-full'>
        <div className='flex justify-between items-center gap-3 p-6 w-full'>
          <h2 className='font-medium text-xl leading-none select-none'>
            Relatório pendências
          </h2>
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

        <div className='flex flex-col gap-3 px-6 pb-6 w-full overflow-hidden'></div>
      </div>
    </div>
  )
}

export default Issues
