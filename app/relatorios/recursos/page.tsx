'use client'
import { SecondaryButton } from '@/components/Buttons/SecondaryButton'
import { ChartCost } from '@/components/Chart/Cost'
import { DownloadIcon } from '@/components/Display/Icons/Download'
import { FilterIcon } from '@/components/Display/Icons/Filter'
import { Modal } from '@/components/Display/Modal'
import { PermissionDeniedScreen } from '@/components/Features/PermissionDenied'
import { FilterReportCost } from '@/components/Template/Filter/ReportCost'
import { ReportCostSkeleton } from '@/components/Template/Skeletons/ReportCost'
import { ToastError } from '@/components/Template/Toast/Error'
import { getResourcesReport } from '@/services/Report'
import dayjs from 'dayjs'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useState, type FC } from 'react'
import { toast } from 'sonner'
import * as XLSX from "xlsx"

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

  const handleDownload = () => {
    const formattedData = (reportData || []).map(item => ({
      "ID": item.sector,
      "Setor": item.name,
      "Custo": item.cost,
      "Custo Esperado": item.expected,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Recursos");

    XLSX.writeFile(workbook, `Relatório de Recursos - ${filters.dateStart.format('DD/MM/YYYY')}-${filters.dateEnd.format('DD/MM/YYYY')}.xlsx`);
  }

  const handleCloseModal = useCallback(() => {
    setModalStatus(prev => !prev)
  }, [])

  const handleFilter = async () => {
    fetchReport()
    handleCloseModal()
  }

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
        <FilterReportCost start={filters.dateStart} end={filters.dateEnd} action={handleFiltersChange} saveAction={handleFilter} />
      </Modal>
      <div className='flex flex-col items-start gap-3 bg-[--backgroundPrimary] sm:rounded-2xl w-full h-full'>
        <div className='flex justify-between items-center gap-3 p-6 w-full'>
          <h2 className='font-medium text-xl leading-none select-none'>
            Relatório recursos
          </h2>
          {hasPermission && (
            <div>
              <div className='flex gap-3'>
                <button
                  disabled={false}
                  name={'print'}
                  onClick={handleDownload}
                  type={'button'}
                  className='group z-[55] relative flex justify-center items-center gap-2 bg-[--primaryColor] hover:bg-[--secondaryColor] px-4 pr-5 rounded-xl h-10 text-white active:scale-95 transition-all duration-300 cursor-pointer select-none'
                >
                  <AnimatePresence mode='wait'>
                    <motion.div
                      key="button-icon"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className='flex flex-col gap-3 py-0.5'
                    >
                      <DownloadIcon
                        size="size-4"
                        stroke="stroke-white group-data-[active=true]:stroke-[--primaryColor]"
                        strokeWidth={2.5}
                      />
                    </motion.div>

                    <motion.span
                      key="button-text"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className='font-medium text-sm'
                    >
                      Baixar
                    </motion.span>
                  </AnimatePresence>
                </button>
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
            </div>
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