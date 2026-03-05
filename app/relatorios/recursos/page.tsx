'use client'
import { SecondaryButton } from '@/components/Buttons/SecondaryButton'
import { ChartCost } from '@/components/Chart/Cost'
import { FilterIcon } from '@/components/Display/Icons/Filter'
import { Modal } from '@/components/Display/Modal'
import { PermissionDeniedScreen } from '@/components/Features/PermissionDenied'
import { FilterReportCost } from '@/components/Template/Filter/ReportCost'
import { ReportCostSkeleton } from '@/components/Template/Skeletons/ReportCost'
import { ToastError } from '@/components/Template/Toast/Error'
import { getResourcesReport } from '@/services/Report'
import dayjs from 'dayjs'
import { useCallback, useEffect, useState, type FC } from 'react'
import { toast } from 'sonner'

type reportDataType = {
  sector: string
  name: string
  cost: number
  expected: number
}

const Costs: FC = () => {
  const [modalStatus, setModalStatus] = useState(false)
  const [loading, setLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(true);
  const [filters, setFilters] = useState({
    dateStart: dayjs().startOf('month'),
    dateEnd: dayjs().endOf('month'),
  })
  const [reportData, setReportData] = useState<[reportDataType]>()

  const handleFiltersChange = (name: string, value: dayjs.Dayjs) => {
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCloseModal = useCallback(() => {
    setModalStatus(prev => !prev)
  }, [])

  const fetchReport = async () => {
    const response = await getResourcesReport({
      loading: setLoading,
      start_date: filters.dateStart.format('YYYY-MM-DD'),
      end_date: filters.dateEnd.format('YYYY-MM-DD'),
    })

    if (response) {
			if (response.status === 200) {
				setReportData(response.data);
			} else if (response.status === 403) {
				setHasPermission(false);
			} else {
				toast.custom(() => (
					<ToastError text="Não foi possível buscar os recursos" />
				));
			}
		} else {
			toast.custom(() => (
				<ToastError text="Não foi possível buscar os recursos" />
			));
		}
    handleCloseModal()
  }

  useEffect(() => {
		fetchReport();
	}, []);

  return (
    <div className='flex flex-col gap-6 bg-[--backgroundSecondary] sm:pr-3 pb-8 sm:pb-3 w-full lg:h-[calc(100vh-50px)] overflow-auto'>
      <Modal
        title='Filtros'
        size='small'
        isModalOpen={modalStatus}
        handleClickOverlay={handleCloseModal}
      >
        <FilterReportCost start={filters.dateStart} end={filters.dateEnd} action={handleFiltersChange} saveAction={fetchReport} />
      </Modal>
      <div className='flex flex-col items-start gap-3 bg-[--backgroundPrimary] sm:rounded-2xl w-full h-full'>
        <div className='flex justify-between items-center gap-3 p-6 w-full'>
          <h2 className='font-medium text-xl leading-none select-none'>
            Relatório recursos
          </h2>
          {hasPermission && (
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
          )}
        </div>

        <div className='flex flex-col gap-3 px-6 pb-6 w-full h-full overflow-hidden'>
          {hasPermission && loading && (
            <ReportCostSkeleton />
          )}
          
          {hasPermission && reportData && !loading && (
            <ChartCost chartData={reportData} />
          )}

          {!hasPermission && (
            <div className='flex justify-center items-center w-full h-full'>
              <PermissionDeniedScreen margin={true} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Costs