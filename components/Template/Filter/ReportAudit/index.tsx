import { RangeDateInput } from '@/components/Inputs/RangeDate'
import { SelectCollaborators } from '@/components/Inputs/Select/Collaborator'
import { SearchSelect } from '@/components/Inputs/Select/SearchSelect'
import { SelectSectors } from '@/components/Inputs/Select/Sector'
import { getCollaborators } from '@/services/Collaborator'
import { getSectors } from '@/services/Sector'
import type dayjs from 'dayjs'
import { useEffect, useState } from 'react'

type Data = {
  start: dayjs.Dayjs,
  end: dayjs.Dayjs,
  status: string[],
  sector: string[],
  collaborator: string[],
}

type FilterReportAuditProps = {
  data: Data,
  onChange: (name: string, value: string) => void
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

export function FilterReportAudit({data, onChange}: FilterReportAuditProps) {
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
    <>
      <div className='flex flex-col gap-8 w-full p-6'>
        <h2 className='font-medium text-xl text-start'>Filtros</h2>
        <div className='flex flex-col gap-6 divide-y divide-[--outlinePrimary] w-full'>
          <div className='items-center grid grid-cols-2 w-full select-none'>
            <div>
              <span className='font-medium'>Período</span>
            </div>
            <div>
              <RangeDateInput start={data.start} end={data.end} onChange={onChange} />
            </div>
          </div>
          <div className='items-center grid grid-cols-2 w-full select-none pt-6'>
            <div>
              <span className='font-medium'>Situação</span>
            </div>
            <div className='grid w-full'>
              <SearchSelect
                value={'null'}
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
          <div className='items-center grid grid-cols-2 w-full select-none pt-6'>
            <div>
              <span className='font-medium'>Setor</span>
            </div>
            <div className='grid w-full'>
              <SelectSectors
                value={[]}
                onChange={(value: { value: string; label: string }[]) => onChange('sector', value[0].value)}
                SectorsData={sectorsData}
                background='bg-[--backgroundSecondary]'
              />
            </div>
          </div>
          <div className='items-center grid grid-cols-2 w-full select-none pt-6'>
            <div>
              <span className='font-medium'>Colaborador</span>
            </div>
            <div className='grid w-full'>
              <SelectCollaborators
                value={[]}
                onChange={(value: { value: string; label: string }[]) => onChange('collaborator', value[0].value)}
                CollaboratorsData={collaboratorsData} 
                background='bg-[--backgroundSecondary]'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='bottom-0 z-[50] sticky inset-x-0 flex justify-end items-center gap-3 bg-[--backgroundPrimary] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-3 rounded-b-xl w-full text-sm transition-all duration-300'>
          <button
            type='button'
            className='group relative flex justify-center items-center gap-3 bg-transparent hover:bg-[--buttonPrimary] px-4 rounded-xl h-10 text-white active:scale-95 transition-all duration-300 cursor-pointer select-none'
          >
            <span className='font-medium text-[--textSecondary] text-sm'>
              Limpar
            </span>
          </button>
  
          <button
            type='button'
            className='group relative flex justify-center items-center gap-3 bg-[--primaryColor] hover:bg-[--secondaryColor] px-8 rounded-xl h-10 text-white active:scale-95 transition-all duration-300 cursor-pointer select-none'
          >
            <span className='font-medium text-sm'>Filtrar</span>
          </button>
        </div>
    </>
    )
}
