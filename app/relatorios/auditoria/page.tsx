'use client'
import { SecondaryButton } from '@/components/Buttons/SecondaryButton'
import { FilterIcon } from '@/components/Display/Icons/Filter'
import { PrinterIcon } from '@/components/Display/Icons/Printer'
import { SearchIcon } from '@/components/Display/Icons/Search'
import { Modal } from '@/components/Display/Modal'
import { Paginations } from '@/components/Navigation/Paginations'
import { CaretOrder } from '@/components/Template/Filter/CaretOrder'
import { FilterReportAudit } from '@/components/Template/Filter/ReportAudit'
import { ToastError } from '@/components/Template/Toast/Error'
import { useQueryParams } from '@/components/Utils/UseQueryParams'
import useDebounce from '@/lib/context/debounce'
import { getAuditReport } from '@/services/Report'
import { convertMoneyBRL } from '@/utils/convert-money-brl'
import { convertToBoolean } from '@/utils/convert-to-boolean'
import { timestampToDate } from '@/utils/timestamp-to-date'
import dayjs, { type Dayjs } from 'dayjs'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState, type FC } from 'react'
import { toast } from 'sonner'

type AuditReport = {
  collaborator: string | null;
  cost: string | null;
  equipment: string | null;
  expected_withdrawl_at: Date;
  quantity: string | null;
  uuid: string | null;
  withdrawl_at: Date | null;
};

type filtersData = {
  start: Dayjs
  end: Dayjs
  status: 'null' | 'true' | 'false',
  collaborator: {
    value: string
    label: string
  }[],
  sector: {
    value: string
    label: string
  }[]
}

const Audit: FC = () => {
  const router = useRouter()
  const setQueryParam = useQueryParams()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce({ value: search, delay: 500 });
  const [report, setReport] = useState<AuditReport[]>([]);
  const [hasPermission, setHasPermission] = useState(true);
  const [loading, setLoading] = useState(false);
  const [pageSettings, setPageSettings] = useState({
    numberOfDocuments: 1,
    numberPerPage: 1,
  });

  const [orderBy, setOrderBy] = useState({
    field: searchParams.get('sortField') || '',
    order: searchParams.get('sortOrder') || '',
  })

  const page = useMemo(() => {
    return searchParams.get("page");
  }, [searchParams]);

  const [filters, setFilters] = useState<filtersData>({
    start: dayjs(),
    end: dayjs(),
    status: 'null',
    sector: [],
    collaborator: [],
  })

  const resetFields = () => { 
    setFilters({
      start: dayjs(),
      end: dayjs(),
      status: 'null',
      sector: [],
      collaborator: [],
    })
  }

  const handleFiltersChange = (name: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFiltersDateChange = (name: 'start' | 'end', value: dayjs.Dayjs | null) => {
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFiltersChangeMulti = (
    name: string,
    value: { value: string; label: string }[]
  ) => {
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const onButtonClick = async () => {
    const uri = `/relatorios/auditoria/imprimir?q=${debouncedSearch || ''}&sortField=${orderBy.field || ''}&sortOrder=${orderBy.order || ''}&collaborator=${filters.collaborator.map(s => s.value).join(',')}&sector=${filters.sector.map(s => s.value).join(',')}&page=${Number(page) || 1}&start_date=${String(filters.start)}&end_date=${String(filters.end)}&status=${filters.status}`
    window.open(uri, '_blank')
  };

  const [modalStatus, setModalStatus] = useState(false)

  const handleCloseModal = useCallback(() => {
    setModalStatus(prev => !prev)
  }, [])

  const handleOrderBy = useCallback(
      (field: string) => {
        if (field !== orderBy.field) {
          setOrderBy({
            field,
            order: 'asc',
          })
        } else {
          setOrderBy(prev => ({
            ...prev,
            order: prev.order === 'asc' ? 'desc' : 'asc',
          }))
        }
  
        setQueryParam({
          sortField: field,
          sortOrder: orderBy.order === 'asc' ? 'desc' : 'asc',
        })
      },
      [orderBy.field, orderBy.order, setQueryParam],
  )

  const handlePageSettings = (name: string, value: string) => {
		setPageSettings((prev) => ({
			...prev,
			[name]: value,
		}));
	};

  const fetchReport = async () => {
    const response = await getAuditReport({
      q: debouncedSearch || undefined,
      loading: setLoading,
      sortField: orderBy.field || "id",
      sortOrder: orderBy.order || "asc",
      collaborator: filters.collaborator.map(s => s.value).join(','),
      sector: filters.sector.map(s => s.value).join(','),
      page: Number(page) || undefined,
      start_date: String(filters.start),
      end_date: String(filters.end),
      status: convertToBoolean(filters.status)
    });

    if (response) {
      if (response.status === 200) {
        handlePageSettings("numberOfDocuments", response.data.total);
        handlePageSettings("numberPerPage", response.data.per_page);
        setReport(response.data.data);
      } else if (response.status === 403) {
        setHasPermission(false);
      } else {
        toast.custom(() => (
          <ToastError text="Não foi possível buscar o relatório" />
        ));
      }
    } else {
      toast.custom(() => (
        <ToastError text="Não foi possível buscar o relatório" />
      ));
    }
  };

  const handleFilterApply = async () => {
    handleCloseModal();
    fetchReport();
  }

  useEffect(() => {
    fetchReport();
  }, [debouncedSearch, orderBy, searchParams]);

  return (
    <div className='flex flex-col gap-6 bg-[--backgroundSecondary] sm:pr-3 pb-8 sm:pb-3 w-full lg:h-[calc(100vh-50px)] overflow-auto scroll-smooth'>
      <Modal
        title='Filtros'
        size='small'
        isModalOpen={modalStatus}
        handleClickOverlay={handleCloseModal}
        overflow={false}
        padding={false}
      >
        <FilterReportAudit data={filters} applyAction={handleFilterApply} onChange={handleFiltersChange} reset={resetFields} changeMulti={handleFiltersChangeMulti} changeDate={handleFiltersDateChange} />
      </Modal>
      <div className='flex flex-col items-start gap-3 bg-[--backgroundPrimary] sm:rounded-2xl w-full h-full overflow-auto'>
        <div className='flex justify-between items-center gap-3 p-6 w-full'>
          <h2 className='font-medium text-xl leading-none select-none'>
            Auditoria
          </h2>
          <div className='flex gap-3'>
              <button
                disabled={false}
                name={'print'}
                onClick={onButtonClick}
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
                    <PrinterIcon
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
                    Imprimir
                  </motion.span>
                </AnimatePresence>
              </button>
          </div>
        </div>

        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-row items-center gap-3 px-6 w-1/2"
          >
            <div className="box-border flex flex-row items-center gap-2 bg-[--tableRow] focus-within:bg-[--buttonPrimary] px-3 rounded-xl w-full h-10 transition-all duration-300">
              <div className="flex">
                <SearchIcon
                  size="size-4"
                  stroke="stroke-[--textSecondary]"
                  strokeWidth={2.5}
                />
              </div>
              <input
                type="text"
                placeholder=""
                spellCheck={false}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent pr-3 pl-1 rounded-xl focus:outline-none w-full h-full placeholder:font-normal font-medium text-sm"
              />
            </div>
            <SecondaryButton
              label="Filtrar"
              icon={
                <FilterIcon
                  size="size-4"
                  stroke="stroke-[--textSecondary] group-data-[active=true]:stroke-[--primaryColor]"
                  strokeWidth={2.5}
                />
              }
              onClick={handleCloseModal}
            />
          </motion.div>
        </AnimatePresence>
        
        <div className="flex flex-col justify-between gap-y-6 pb-6 w-full h-full">
          <div className="flex flex-col gap-2 px-3 pb-3">
            <table className="w-full text-[--textSecondary] text-sm border-separate border-spacing-y-2">
              <thead>
                <tr className="">
                  <th className="px-3 py-3 rounded-l-xl font-medium text-left">
                    <button
                    onClick={() => handleOrderBy('id')}
                    type="button"
                    className="flex items-center gap-2 hover:opacity-60 truncate transition-all duration-300"
                  >
                    <span>Registro</span>
                    <CaretOrder
                      field={orderBy.field}
                      name="id"
                      order={orderBy.order}
                    />
                  </button>
                  </th>
                  <th className="px-3 py-3 font-medium text-left">
                    <button
                    onClick={() => handleOrderBy('expected_withdrawl_at')}
                    type="button"
                    className="flex items-center gap-2 hover:opacity-60 truncate transition-all duration-300"
                  >
                    <span>Previsão</span>
                    <CaretOrder
                      field={orderBy.field}
                      name="expected_withdrawl_at"
                      order={orderBy.order}
                    />
                  </button>
                  </th>
                  <th className="px-3 py-3 font-medium text-left">
                    <button
                    onClick={() => handleOrderBy('withdrawl_at')}
                    type="button"
                    className="flex items-center gap-2 hover:opacity-60 truncate transition-all duration-300"
                  >
                    <span>Entrega</span>
                    <CaretOrder
                      field={orderBy.field}
                      name="withdrawl_at"
                      order={orderBy.order}
                    />
                  </button>
                  </th>
                  <th className="px-3 py-3 font-medium text-left">
                    <button
                    onClick={() => handleOrderBy('collaborator')}
                    type="button"
                    className="flex items-center gap-2 hover:opacity-60 truncate transition-all duration-300"
                  >
                    <span>Colaborador</span>
                    <CaretOrder
                      field={orderBy.field}
                      name="collaborator"
                      order={orderBy.order}
                    />
                  </button>
                  </th>
                  <th className="px-3 py-3 font-medium text-left">
                    <button
                    onClick={() => handleOrderBy('equipment')}
                    type="button"
                    className="flex items-center gap-2 hover:opacity-60 truncate transition-all duration-300"
                  >
                    <span>Equipamento</span>
                    <CaretOrder
                      field={orderBy.field}
                      name="equipment"
                      order={orderBy.order}
                    />
                  </button>
                  </th>
                  <th className="px-2 py-3 font-medium text-right">
                    <button
                    onClick={() => handleOrderBy('quantity')}
                    type="button"
                    className="flex justify-end items-center gap-2 hover:opacity-60 w-full truncate transition-all duration-300"
                  >
                    <span>Qtd</span>
                    <CaretOrder
                      field={orderBy.field}
                      name="quantity"
                      order={orderBy.order}
                    />
                  </button>
                  </th>
                  <th className="items-end px-3 py-3 rounded-r-xl font-medium text-right">
                    <button
                    onClick={() => handleOrderBy('amount')}
                    type="button"
                    className="flex justify-end items-center gap-2 hover:opacity-60 w-full truncate transition-all duration-300"
                  >
                    <span>Valor</span>
                    <CaretOrder
                      field={orderBy.field}
                      name="amount"
                      order={orderBy.order}
                    />
                  </button>
                  </th>
                </tr>
              </thead>

              <tbody>
                {report.map((event, i) => (
                  <tr key={event.uuid} className="bg-[--tableRow] rounded-xl">
                    <td className="px-3 py-4 rounded-l-xl">
                      <span className="block w-full overflow-hidden text-ellipsis lowercase whitespace-nowrap">
                        {event.uuid}
                      </span>
                    </td>
                    <td className="px-3 py-4">
                      <span className="block w-full overflow-hidden text-ellipsis whitespace-nowrap">
                        {timestampToDate(String(event.expected_withdrawl_at))}
                      </span>
                    </td>
                    <td className="px-3 py-4 lowercase">
                      {event.withdrawl_at ? timestampToDate(String(event.withdrawl_at)) : '–'}
                    </td>
                    <td className="px-3 py-4 capitalize">
                      {event.collaborator?.toLocaleLowerCase()}
                    </td>
                    <td className="px-3 py-4 capitalize">
                      {event.equipment?.toLocaleLowerCase()}
                    </td>
                    <td className="px-3 py-4 text-right">
                      {event.quantity}
                    </td>
                    <td className="px-3 py-4 rounded-r-xl font-medium text-right">
                      R$ {event.cost ? convertMoneyBRL(Number(event.cost)) : 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Paginations
              numberOfPages={1}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Audit
