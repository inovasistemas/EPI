import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { FloppyDiskIcon } from '@/components/Display/Icons/FloppyDisk'
import { FormInput } from '@/components/Inputs/Text/FormInput'

export function Sector() {
  const searchParams = useSearchParams()
  const sector = useMemo(() => {
    return {
      sector: searchParams.get('sector'),
      type: searchParams.get('type'),
    }
  }, [searchParams])

  const [sectorData, setSectorData] = useState({
    id: sector.sector,
    parentName: '',
    name: '',
    inherit: true,
  })
  const [isOn, setIsOn] = useState(sectorData.inherit)

  const handleSectorDataChange = (name: string, value: string | boolean) => {
    setSectorData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const title = useMemo(() => {
    if (!sector.sector) {
      return 'Adicionar novo setor'
    } else {
      if (sector.type === 'editSector') return 'Editar dados do setor'
    }

    if (sector.type === 'editSubsector') return 'Editar dados do subsetor'

    return (
      <>
        <span>Adicionar subsetor à </span>
        <span className='font-medium text-[--primaryColor]'>
          {sectorData.parentName}
        </span>
      </>
    )
  }, [sector, sectorData.parentName])

  useEffect(() => {
    if (sector.sector) {
      setSectorData(prev => ({
        ...prev,
        parentName: 'Manutenção Máquinas',
      }))
    }
  }, [sector.sector])

  return (
    <div className='flex flex-col justify-center items-center gap-6 w-full h-full'>
      <div className='flex flex-col items-center gap-3 w-full'>
        <h2 className='font-medium text-xl leading-none'>{title}</h2>
        <div className='flex flex-col'>
          <span className='opacity-60 text-[--textSecondary] text-sm text-center'>
            {!sector.sector &&
              'Adicione um novo setor para organizar as áreas principais da empresa.'}
            {sector.sector &&
              'Adicione um subsetor vinculado a um setor principal para detalhar a estrutura.'}
          </span>
        </div>
      </div>

      <div className='gap-3 w-full'>
        <FormInput
          name='name'
          label='Nome'
          required={false}
          type='text'
          value={sectorData.name}
          position='right'
          onChange={e => handleSectorDataChange('name', e.target.value)}
        />

        {sector.sector && (
          <div className='col-span-full pt-6'>
            <div className='flex flex-row justify-between items-center gap-1 bg-[--backgroundSecondary] p-3 rounded-2xl w-full'>
              <div className='flex flex-col gap-1 p-3'>
                <span className='font-medium text-sm'>
                  Compartilhar equipamentos do setor principal
                </span>
                <span className='opacity-60 text-[--textSecondary] text-sm'>
                  Este subsetor terá acesso aos mesmos equipamentos do setor
                  principal.
                </span>
              </div>

              <div className='flex justify-end items-center min-w-16'>
                <button
                  type='button'
                  onClick={() => {
                    handleSectorDataChange('notifications', !isOn)
                    setIsOn(!isOn)
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setIsOn(!isOn)
                    }
                  }}
                  aria-pressed={isOn}
                  className={`w-10 h-6 flex items-center bg-[--buttonPrimary] rounded-full p-1 cursor-pointer transition-colors ${
                    isOn ? '!bg-primary' : ''
                  }`}
                  tabIndex={0}
                >
                  <div
                    className={`bg-[--backgroundPrimary] w-5 h-5 rounded-full shadow-md transform transition-transform ${
                      isOn ? 'translate-x-[13px]' : '-translate-x-[1px]'
                    }`}
                  ></div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className='flex flex-row justify-end w-full'>
        <div className='flex flex-row gap-3'>
          <button
            type='button'
            className='group relative flex flex-row justify-center items-center gap-3 bg-[--primaryColor] hover:bg-[--secondaryColor] disabled:bg-[--buttonPrimary] px-4 pr-5 rounded-xl h-10 font-medium text-white disabled:text-zinc-500 text-base active:scale-95 transition-all duration-300 select-none'
          >
            <FloppyDiskIcon
              size='size-4'
              stroke='stroke-white group-data-[disabled=true]:stroke-zinc-500 group-data-[active=true]:stroke-[--primaryColor]'
              strokeWidth={2.5}
            />
            <span className='font-medium text-sm'>Salvar</span>
          </button>
        </div>
      </div>
    </div>
  )
}
