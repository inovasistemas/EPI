import { RangeDateInput } from '@/components/Inputs/RangeDate'
import { SelectCollaborators } from '@/components/Inputs/Select/Collaborator'
import { SearchSelect } from '@/components/Inputs/Select/SearchSelect'
import { SelectSectors } from '@/components/Inputs/Select/Sector'
import { getCollaborators } from '@/services/Collaborator'
import { getSectors } from '@/services/Sector'
import type dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import { useEffect, useState } from 'react'

type Data = {
  start: dayjs.Dayjs,
  end: dayjs.Dayjs,
  status: string,
  sector: { value: string; label: string; }[]
  collaborator: { value: string; label: string; }[]
}

type FilterReportAuditProps = {
  data: Data,
  applyAction: () => void
  onChange: (name: string, value: string) => void
  changeDate: (name: "start" | "end", value: Dayjs) => void
  reset: () => void
  changeMulti: (name: string, value: {
    value: string;
    label: string;
  }[]) => void
}

type Collaborator = {
  uuid: string
  name: string
  cpf: string
  job_position: string
  created_at: string
}

type Sector = {
  uuid: string
  name: string
  sector: string
  created_at: string
  updated_at: string
  subsectors: [],
}

export function FilterReportAudit({applyAction, data, onChange, reset, changeMulti, changeDate}: FilterReportAuditProps) {
  const [collaboratorsData, setCollaboratorsData] = useState<Collaborator[]>([])
  const [loadingCollaborators, setLoadingCollaborators] = useState(false)

  const fetchCollaborators = async () => {
    const response = await getCollaborators({loading: setLoadingCollaborators})

    if (response && response.status === 200) {
      const data = response.data

      setCollaboratorsData(data.data)
    }

    setLoadingCollaborators(false)
  }

  const [sectorsData, setSectorsData] = useState<Sector[]>([])
  const [loadingSectors, setLoadingSectors] = useState(false)

  const fetchSectors = async () => {
    const response = await getSectors({loading: setLoadingSectors})

    if (response && response.status === 200) {
      const data = response.data

      setSectorsData(data.data)
    }

    setLoadingSectors(false)
  }

  useEffect(() => {
    fetchSectors()
    fetchCollaborators()
  }, [])

  return (
    <div className="relative flex flex-col w-full max-h-[500px]">
      <div className="flex-1 p-6 overflow-y-auto">
        <h2 className='mb-6 font-medium text-xl text-start'>Filtros</h2>
        <div className="flex flex-col gap-6 divide-y divide-[--outlinePrimary] w-full">
          <div className='items-center grid grid-cols-2 w-full select-none'>
            <div>
              <span className='font-medium'>Período</span>
            </div>
            <div>
              <RangeDateInput start={data.start} end={data.end} onChange={changeDate} />
            </div>
          </div>
          <div className='items-center grid grid-cols-2 pt-6 w-full select-none'>
            <div>
              <span className='font-medium'>Situação</span>
            </div>
            <div className='grid w-full'>
              <SearchSelect
                value={data.status}
                name='selectStatus'
                onChange={(value: string) => onChange('status', value)}
                options={
                  [
                    {
                      value: 'null',
                      label: 'Todos',
                    },
                    {
                      value: 'false',
                      label: 'Pendente',
                    },
                    {
                      value: 'true',
                      label: 'Concluído',
                    },
                  ]
                }
                placeholder=''
              />
            </div>
          </div>
          <div className='items-center grid grid-cols-2 pt-6 w-full select-none'>
            <div>
              <span className='font-medium'>Setor</span>
            </div>
            <div className='grid w-full'>
              <SelectSectors
                value={data.sector}
                onChange={(selected) =>
                  changeMulti(
                    'sector',
                    selected.map(s => ({ value: s.value, label: s.label }))
                  )
                }
                SectorsData={sectorsData}
                background='bg-[--backgroundSecondary]'
              />
            </div>
          </div>
          <div className='items-center grid grid-cols-2 pt-6 w-full select-none'>
            <div>
              <span className='font-medium'>Colaborador</span>
            </div>
            <div className='grid w-full'>
              <SelectCollaborators
                value={data.collaborator}
                onChange={(selected) =>
                  changeMulti(
                    'collaborator',
                    selected.map(s => ({ value: s.value, label: s.label }))
                  )
                }
                CollaboratorsData={collaboratorsData} 
                background='bg-[--backgroundSecondary]'
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-0 z-50 sticky flex justify-end items-center gap-3 bg-[--backgroundPrimary] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-3 rounded-b-xl w-full text-sm">
        <button
          onClick={reset}
          type='button'
          className='group relative flex justify-center items-center gap-3 bg-transparent hover:bg-[--buttonPrimary] px-4 rounded-xl h-10 text-white active:scale-95 transition-all duration-300 cursor-pointer select-none'
        >
          <span className='font-medium text-[--textSecondary] text-sm'>
            Limpar
          </span>
        </button>
  
        <button
          onClick={applyAction}
          type='button'
          className='group relative flex justify-center items-center gap-3 bg-[--primaryColor] hover:bg-[--secondaryColor] px-8 rounded-xl h-10 text-white active:scale-95 transition-all duration-300 cursor-pointer select-none'
        >
          <span className='font-medium text-sm'>Filtrar</span>
        </button>
      </div>
    </div>
  )
}
