'use client'
import { getAuditReportPrint } from '@/services/Report'
import { convertToBoolean } from '@/utils/convert-to-boolean'
import { timestampToDate } from '@/utils/timestamp-to-date'
import { timestampToDateTime } from '@/utils/timestamp-to-datetime'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useMemo, useRef, useState, type FC } from 'react'

export interface AuditReport {
  enterprise: Enterprise
  reports: Reports[]
  metadata: Metadata
}

export interface Reports {
  collaborator: Collaborator
  events: Event[]
}

export interface Enterprise {
  corporate_name: string
  commercial_name: string
}

export interface Collaborator {
  name: string
  uuid: string
  job_position: string
  cpf: string
  location: string
}

export interface Event {
  routine: Routine
}

export interface Routine {
  code: string
  equipments: Equipment[]
}

export interface Equipment {
  code: string
  description: string
  quantity: number
  ca: string
  withdrawal_date: string
  signature_code: string
}

export interface Metadata {
  emitted_at: string
  signature_date: string
  ip: string
  requested_by_uuid: string
  requested_by_name: string
}

const AuditPrint: FC = () => {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [reportData, setReportData] = useState<AuditReport>()
  const hasFetched = useRef(false)
  
  const queryParams = useMemo(() => {
    return {
      q: searchParams.get('q') || '',
      sortField: searchParams.get('sortField') || '',
      sortOrder: searchParams.get('sortOrder') || '',
      collaborator: searchParams.get('collaborator') || '',
      sector: searchParams.get('sector') || '',
      page: Number(searchParams.get('page')) || 1,
      start_date: searchParams.get('start_date') || '',
      end_date: searchParams.get('end_date') || '',
      status: searchParams.get('status') || '',
    }
  }, [searchParams])

  const fetchReportData = async () => {
    const response = await getAuditReportPrint({
      q: queryParams.q || undefined,
      loading: setLoading,
      sortField: queryParams.sortField || "id",
      sortOrder: queryParams.sortOrder || "asc",
      collaborator: queryParams.collaborator || undefined,
      sector: queryParams.sector || undefined,
      page: Number(queryParams.page) || undefined,
      start_date: String(queryParams.start_date),
      end_date: String(queryParams.end_date),
      status: convertToBoolean(queryParams.status)
    })

    if (response) {
      if (response.status === 200) {
        setReportData(response.data);
      }
    }
  }

  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true
    fetchReportData()
  }, [])

  useEffect(() => {
  if (!reportData) return

  const handleAfterPrint = () => {
    window.close()
  }

  window.addEventListener('afterprint', handleAfterPrint)

  const timeout = setTimeout(() => {
    window.print()
  }, 300)

  return () => {
    window.removeEventListener('afterprint', handleAfterPrint)
    clearTimeout(timeout)
  }
}, [reportData])

  return (
    <div className="bg-[--backgroundPrimary] print:bg-white py-8 print:py-0 min-h-screen">
      {reportData?.reports.map((report, i) => (
        <React.Fragment key={`report-${i}`}>
          {report.events.map((event) => {
            return (
              <div
                key={event.routine.code}
                className="bg-white shadow-lg print:shadow-none mx-auto p-6 print:p-6 w-[210mm] min-h-[297mm] font-sans text-[10px] text-black last:print:break-after-avoid print:break-after-page leading-tight"
              >
                <div className="flex justify-between items-center mb-2 pb-2 border-black border-b">
                  <div className="text-left">
                    <h1 className="font-bold text-[12px] uppercase">{reportData.enterprise.commercial_name}</h1>
                    <p className="font-semibold uppercase">{reportData.enterprise.corporate_name}</p>
                  </div>
                  <div className="text-[9px] text-right">
                    <p>Emissão: {timestampToDate(reportData.metadata.emitted_at)}</p>
                  </div>
                </div>

                <div className="bg-gray-100 mb-2 py-1 border border-black text-center">
                  <h2 className="font-bold text-[11px] uppercase">
                    Termo de Responsabilidade - Recebimento, Uso, Guarda e Conservação dos EPI(s)
                  </h2>
                </div>

                <div className="grid grid-cols-6 mb-4 border-black border-t border-l">
                  <div className="col-span-4 p-1 border-black border-r border-b">
                    <span className="block font-bold text-[8px] text-gray-600 uppercase">Colaborador</span>
                    <span className="font-medium text-[11px]">{report.collaborator.name} </span>
                  </div>
                  <div className="col-span-2 p-1 border-black border-r border-b">
                    <span className="block font-bold text-[8px] text-gray-600 uppercase">ID / Registro</span>
                    <span className="font-medium text-[11px]">{report.collaborator.uuid} </span>
                  </div>
                  <div className="col-span-3 p-1 border-black border-r border-b">
                    <span className="block font-bold text-[8px] text-gray-600 uppercase">Cargo / Função</span>
                    <span className="text-[10px]">{report.collaborator.job_position} </span>
                  </div>
                  <div className="col-span-1 p-1 border-black border-r border-b">
                    <span className="block font-bold text-[8px] text-gray-600 uppercase">Documento</span>
                    <span className="text-[10px]">{report.collaborator.cpf}</span>
                  </div>
                  <div className="col-span-2 p-1 border-black border-r border-b">
                    <span className="block font-bold text-[8px] text-gray-600 uppercase">Pedido</span>
                    <span className="text-[10px]">{event.routine.code}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4 px-1 text-[9px] text-justify">
                  <p>
                    Eu, empregado acima identificado, devidamente registrado, declaro, para todos os fins e efeitos previstos na 
                    Portaria 3.214/78-Ministério do Trabalho, ter recebido gratuitamente os Equipamentos de Proteção Individual - EPI(s) abaixo relacionados.
                  </p>
                  <p>
                    Declaro ter conhecimento que estes equipamentos são indispensáveis durante a execução das minhas tarefas e trabalhos, 
                    e que deverei fazer uso dos mesmos apenas para a finalidade que se destina. Manifesto ciência das instruções 
                    de guarda e conservação, ficando sob minha responsabilidade os cuidados para evitar extravio ou dano precoce.
                  </p>
                  <p className="font-bold italic">
                    Constitui ATO FALTOSO a recusa no uso correto de qualquer um dos EPI(s), sendo passível de punições como ADVERTÊNCIA, 
                    SUSPENSÃO ou DEMISSÃO POR JUSTA CAUSA.
                  </p>
                </div>

                <table className="mb-4 border border-black w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-200 text-[9px] uppercase">
                      <th className="p-1 border border-black w-12 text-center">Cód.</th>
                      <th className="p-1 border border-black text-left">Descrição do EPI</th>
                      <th className="p-1 border border-black w-10 text-center">Qtde</th>
                      <th className="p-1 border border-black w-16 text-center">C.A.</th>
                      <th className="p-1 border border-black w-20 text-center">Data</th>
                      <th className="p-1 border border-black w-32 text-left">Assinatura Digital</th>
                    </tr>
                  </thead>
                  <tbody className="text-[9px]">
                    {event.routine.equipments.map((equipment, i) => (
                      <tr key={`${equipment.code}-${i}`}>
                        <td className="p-1 border border-black text-center">{equipment.code}</td>
                        <td className="p-1 border border-black font-semibold uppercase">{equipment.description}</td>
                        <td className="p-1 border border-black text-center">{equipment.quantity}</td>
                        <td className="p-1 border border-black text-center">{equipment.ca}</td>
                        <td className="p-1 border border-black text-center">{equipment.withdrawal_date}</td>
                        <td className="p-1 border border-black text-[8px] italic">{equipment.signature_code}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="mt-auto pt-4 border-gray-300 border-t">
                  <div className="bg-gray-50 p-2 border border-gray-400 border-dashed rounded">
                    <p className="mb-1 font-bold text-[8px] text-gray-600 uppercase">Metadados de Autenticidade Digital</p>
                    <div className="gap-1 grid grid-cols-2 text-[8px]">
                      <p><strong>Data/Hora:</strong> {timestampToDateTime(reportData.metadata.signature_date)}</p>
                      <p><strong>Endereço IP:</strong> {reportData.metadata.ip}</p>
                      <p><strong>Usuário:</strong> {reportData.metadata.requested_by_name}</p>
                      <p><strong>Usuário ID:</strong> {reportData.metadata.requested_by_uuid}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-[9px] text-gray-400 text-center">
                    Documento gerado eletronicamente.
                  </p>
                </div>
              </div>
            )
          })}
        </React.Fragment>
      ))}
    </div>
  )
}

export default AuditPrint
