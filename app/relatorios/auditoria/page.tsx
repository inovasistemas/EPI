'use client'
import { SecondaryButton } from '@/components/Buttons/SecondaryButton'
import { FilterIcon } from '@/components/Display/Icons/Filter'
import { PrinterIcon } from '@/components/Display/Icons/Printer'
import { Modal } from '@/components/Display/Modal'
import { Paginations } from '@/components/Navigation/Paginations'
import { CaretOrder } from '@/components/Template/Filter/CaretOrder'
import { FilterReportAudit } from '@/components/Template/Filter/ReportAudit'
import { useQueryParams } from '@/components/Utils/UseQueryParams'
import dayjs from 'dayjs'
import { AnimatePresence, motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState, type FC } from 'react'

const Audit: FC = () => {
  const setQueryParam = useQueryParams()
  const searchParams = useSearchParams()

  const [orderBy, setOrderBy] = useState({
    field: searchParams.get('sortField') || '',
    order: searchParams.get('sortOrder') || '',
  })

  const [filters, setFilters] = useState({
    start: dayjs(),
    end: dayjs(),
    status: [],
    sector: [],
    collaborator: [],
  })

  const handleFiltersChange = (name: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const onButtonClick = () => {
    const pdfUrl = "/pdf/auditoria-inova-sistemas-28012026.pdf";
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "auditoria-inova-sistemas-28012026.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFiltersChangeSelect = (name: string, value: string[]) => {
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }))
  }

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

  useEffect(() => {
    console.log(filters)
  }, [filters])

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
        <FilterReportAudit data={filters} onChange={handleFiltersChange} />
      </Modal>
      <div className='flex flex-col items-start gap-3 bg-[--backgroundPrimary] sm:rounded-2xl w-full h-full overflow-auto'>
        <div className='flex justify-between items-center gap-3 p-6 w-full'>
          <h2 className='font-medium text-xl leading-none select-none'>
            Auditoria
          </h2>
          <div className='flex gap-3'>
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
        
        <div className="flex flex-col justify-between gap-y-6 pb-6 w-full h-full">
          <div className="flex flex-col gap-2 px-3 pb-3">
            <table className="w-full border-separate border-spacing-y-2 text-sm text-[--textSecondary]">
              <thead>
                <tr className="">
                  <th className="text-left px-3 py-3 rounded-l-xl font-medium">
                    <button
                    onClick={() => handleOrderBy('register')}
                    type="button"
                    className="flex items-center gap-2 hover:opacity-60 truncate transition-all duration-300"
                  >
                    <span>Registro</span>
                    <CaretOrder
                      field={orderBy.field}
                      name="register"
                      order={orderBy.order}
                    />
                  </button>
                  </th>
                  <th className="text-left px-3 py-3 font-medium">
                    <button
                    onClick={() => handleOrderBy('prevision')}
                    type="button"
                    className="flex items-center gap-2 hover:opacity-60 truncate transition-all duration-300"
                  >
                    <span>Previsão</span>
                    <CaretOrder
                      field={orderBy.field}
                      name="prevision"
                      order={orderBy.order}
                    />
                  </button>
                  </th>
                  <th className="text-left px-3 py-3 font-medium">
                    <button
                    onClick={() => handleOrderBy('deliveryDate')}
                    type="button"
                    className="flex items-center gap-2 hover:opacity-60 truncate transition-all duration-300"
                  >
                    <span>Entrega</span>
                    <CaretOrder
                      field={orderBy.field}
                      name="deliveryDate"
                      order={orderBy.order}
                    />
                  </button>
                  </th>
                  <th className="text-left px-3 py-3 font-medium">
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
                  <th className="text-left px-3 py-3 font-medium">
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
                  <th className="text-right px-2 py-3 font-medium">
                    <button
                    onClick={() => handleOrderBy('quantity')}
                    type="button"
                    className="w-full flex justify-end items-center gap-2 hover:opacity-60 truncate transition-all duration-300"
                  >
                    <span>Qtd</span>
                    <CaretOrder
                      field={orderBy.field}
                      name="quantity"
                      order={orderBy.order}
                    />
                  </button>
                  </th>
                  <th className="text-right items-end px-3 py-3 font-medium rounded-r-xl">
                    <button
                    onClick={() => handleOrderBy('value')}
                    type="button"
                    className="w-full flex justify-end items-center gap-2 hover:opacity-60 truncate transition-all duration-300"
                  >
                    <span>Valor</span>
                    <CaretOrder
                      field={orderBy.field}
                      name="value"
                      order={orderBy.order}
                    />
                  </button>
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr className="bg-[--tableRow] rounded-xl">
                  <td className="px-3 py-4 rounded-l-xl">
                    <span className="block w-full overflow-hidden text-ellipsis lowercase whitespace-nowrap">
                      ev_a1b2c3d4e5f6001
                    </span>
                  </td>
                  <td className="px-3 py-4">
                    <span className="block w-full overflow-hidden text-ellipsis whitespace-nowrap">
                      02/01/2026
                    </span>
                  </td>
                  <td className="px-3 py-4 lowercase">
                    02/01/2026
                  </td>
                  <td className="px-3 py-4 capitalize">
                    Carlos Eduardo Silva
                  </td>
                  <td className="px-3 py-4 capitalize">
                    Capacete de segurança
                  </td>
                  <td className="px-3 py-4 text-right">
                    1
                  </td>
                  <td className="px-3 py-4 text-right font-medium rounded-r-xl">
                    R$ 45,50
                  </td>
                </tr>

                <tr className="bg-[--tableRow] rounded-xl">
                  <td className="px-3 py-4 rounded-l-xl">
                    <span className="block w-full overflow-hidden text-ellipsis lowercase whitespace-nowrap">
                      ev_b2c3d4e5f6g7002
                    </span>
                  </td>
                  <td className="px-3 py-4">
                    03/01/2026
                  </td>
                  <td className="px-3 py-4 lowercase">
                    03/01/2026
                  </td>
                  <td className="px-3 py-4 capitalize">
                    Ana Beatriz Souza
                  </td>
                  <td className="px-3 py-4 capitalize">
                    Botina de couro
                  </td>
                  <td className="px-3 py-4 text-right">
                    1
                  </td>
                  <td className="px-3 py-4 text-right font-medium rounded-r-xl">
                    R$ 120,00
                  </td>
                </tr>

                <tr className="bg-[--tableRow] rounded-xl">
                  <td className="px-3 py-4 rounded-l-xl">
                    <span className="block w-full overflow-hidden text-ellipsis lowercase whitespace-nowrap">
                      ev_c3d4e5f6g7h8003
                    </span>
                  </td>
                  <td className="px-3 py-4">
                    05/01/2026
                  </td>
                  <td className="px-3 py-4 lowercase">
                    -
                  </td>
                  <td className="px-3 py-4 capitalize">
                    Roberto Mendes
                  </td>
                  <td className="px-3 py-4 capitalize">
                    Protetor auricular plug
                  </td>
                  <td className="px-3 py-4 text-right">
                    5
                  </td>
                  <td className="px-3 py-4 text-right font-medium rounded-r-xl">
                    R$ 15,00
                  </td>
                </tr>

                <tr className="bg-[--tableRow] rounded-xl">
                  <td className="px-3 py-4 rounded-l-xl">
                    <span className="block w-full overflow-hidden text-ellipsis lowercase whitespace-nowrap">
                      ev_d4e5f6g7h8i9004
                    </span>
                  </td>
                  <td className="px-3 py-4">
                    10/01/2026
                  </td>
                  <td className="px-3 py-4 lowercase">
                    10/01/2026
                  </td>
                  <td className="px-3 py-4 capitalize">
                    Fernanda Lima
                  </td>
                  <td className="px-3 py-4 capitalize">
                    Óculos incolor
                  </td>
                  <td className="px-3 py-4 text-right">
                    1
                  </td>
                  <td className="px-3 py-4 text-right font-medium rounded-r-xl">
                    R$ 22,90
                  </td>
                </tr>

                <tr className="bg-[--tableRow] rounded-xl">
                  <td className="px-3 py-4 rounded-l-xl">
                    <span className="block w-full overflow-hidden text-ellipsis lowercase whitespace-nowrap">
                      ev_e5f6g7h8i9j0005
                    </span>
                  </td>
                  <td className="px-3 py-4">
                    12/01/2026
                  </td>
                  <td className="px-3 py-4 lowercase">
                    12/01/2026
                  </td>
                  <td className="px-3 py-4 capitalize">
                    Ricardo Oliveira
                  </td>
                  <td className="px-3 py-4 capitalize">
                    Cinto paraquedista
                  </td>
                  <td className="px-3 py-4 text-right">
                    1
                  </td>
                  <td className="px-3 py-4 text-right font-medium rounded-r-xl">
                    R$ 350,00
                  </td>
                </tr>

                <tr className="bg-[--tableRow] rounded-xl">
                  <td className="px-3 py-4 rounded-l-xl">
                    <span className="block w-full overflow-hidden text-ellipsis lowercase whitespace-nowrap">
                      ev_f6g7h8i9j0k1006
                    </span>
                  </td>
                  <td className="px-3 py-4">
                    15/01/2026
                  </td>
                  <td className="px-3 py-4 lowercase">
                    -
                  </td>
                  <td className="px-3 py-4 capitalize">
                    Juliana Costa
                  </td>
                  <td className="px-3 py-4 capitalize">
                    Máscara PFF2
                  </td>
                  <td className="px-3 py-4 text-right">
                    10
                  </td>
                  <td className="px-3 py-4 text-right font-medium rounded-r-xl">
                    R$ 40,00
                  </td>
                </tr>

                <tr className="bg-[--tableRow] rounded-xl">
                  <td className="px-3 py-4 rounded-l-xl">
                    <span className="block w-full overflow-hidden text-ellipsis lowercase whitespace-nowrap">
                      ev_g7h8i9j0k1l2007
                    </span>
                  </td>
                  <td className="px-3 py-4">
                    18/01/2026
                  </td>
                  <td className="px-3 py-4 lowercase">
                    18/01/2026
                  </td>
                  <td className="px-3 py-4 capitalize">
                    Pedro Henrique
                  </td>
                  <td className="px-3 py-4 capitalize">
                    Luva de raspa
                  </td>
                  <td className="px-3 py-4 text-right">
                    2
                  </td>
                  <td className="px-3 py-4 text-right font-medium rounded-r-xl">
                    R$ 35,00
                  </td>
                </tr>
                
                <tr className="bg-[--tableRow] rounded-xl">
                  <td className="px-3 py-4 rounded-l-xl">
                    <span className="block w-full overflow-hidden text-ellipsis lowercase whitespace-nowrap">
                      ev_h8i9j0k1l2m3008
                    </span>
                  </td>
                  <td className="px-3 py-4">
                    20/01/2026
                  </td>
                  <td className="px-3 py-4 lowercase">
                    -
                  </td>
                  <td className="px-3 py-4 capitalize">
                    Mariana Dias
                  </td>
                  <td className="px-3 py-4 capitalize">
                    Creme protetor solar
                  </td>
                  <td className="px-3 py-4 text-right">
                    1
                  </td>
                  <td className="px-3 py-4 text-right font-medium rounded-r-xl">
                    R$ 28,50
                  </td>
                </tr>

                <tr className="bg-[--tableRow] rounded-xl">
                  <td className="px-3 py-4 rounded-l-xl">
                    <span className="block w-full overflow-hidden text-ellipsis lowercase whitespace-nowrap">
                      ev_i9j0k1l2m3n4009
                    </span>
                  </td>
                  <td className="px-3 py-4">
                    22/01/2026
                  </td>
                  <td className="px-3 py-4 lowercase">
                    22/01/2026
                  </td>
                  <td className="px-3 py-4 capitalize">
                    Lucas Gabriel
                  </td>
                  <td className="px-3 py-4 capitalize">
                    Avental de PVC
                  </td>
                  <td className="px-3 py-4 text-right">
                    1
                  </td>
                  <td className="px-3 py-4 text-right font-medium rounded-r-xl">
                    R$ 55,00
                  </td>
                </tr>

                <tr className="bg-[--tableRow] rounded-xl">
                  <td className="px-3 py-4 rounded-l-xl">
                    <span className="block w-full overflow-hidden text-ellipsis lowercase whitespace-nowrap">
                      ev_j0k1l2m3n4o5010
                    </span>
                  </td>
                  <td className="px-3 py-4">
                    25/01/2026
                  </td>
                  <td className="px-3 py-4 lowercase">
                    25/01/2026
                  </td>
                  <td className="px-3 py-4 capitalize">
                    Patrícia Santos
                  </td>
                  <td className="px-3 py-4 capitalize">
                    Colete refletivo
                  </td>
                  <td className="px-3 py-4 text-right">
                    1
                  </td>
                  <td className="px-3 py-4 text-right font-medium rounded-r-xl">
                    R$ 18,00
                  </td>
                </tr>
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
