'use client'
import dayjs from 'dayjs'
import { ActionGroup } from '@/components/Surfaces/ActionGroup'
import { AddIcon } from '@/components/Display/Icons/Add'
import { DateInput } from '@/components/Inputs/Date'
import { DotsIcon } from '@/components/Display/Icons/Dots'
import { GoBackButton } from '@/components/Navigation/GoBackButton'
import { SearchSelect } from '@/components/Inputs/Select/SearchSelect'
import { SecondaryButton } from '@/components/Buttons/SecondaryButton'
import { SelectCollaborators } from '@/components/Inputs/Select/Collaborator'
import { SelectSectors } from '@/components/Inputs/Select/Sector'
import { SmallSelect } from '@/components/Inputs/Select/SmallSelect'
import { getCollaborators } from '@/services/Collaborator'
import { getSectors } from '@/services/Sector'
import { type FC, useCallback, useEffect, useState } from 'react'
import { Modal } from '@/components/Display/Modal'
import { EquipmentsModal } from '@/components/Features/Equipments'
import { TrashIcon } from '@/components/Display/Icons/Trash'
import { toast } from 'sonner'
import { ToastError } from '@/components/Template/Toast/Error'

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

type formData = {
  cycleQuantity: number
  cycleUnit: string
  startedAt: string
  sector: string,
  collaborator: string,
  equipments: {
    uuid: string
    name: string
    quantity: number
    created_at: string
    updated_at: string
  }[]
}

const CreateOperator: FC = () => {
  const [collaboratorsData, setCollaboratorsData] = useState<Collaborator[]>([])
  const [formData, setFormData] = useState<formData>({
    cycleQuantity: 0,
    cycleUnit: '',
    startedAt: '',
    sector: '',
    collaborator: '',
    equipments: [],
  })
  const [loading, setLoading] = useState(false)
  const [loadingCollaborators, setLoadingCollaborators] = useState(false)
  const [loadingSectors, setLoadingSectors] = useState(false)
  const [modalStatus, setModalStatus] = useState(false)
  const [sectorsData, setSectorsData] = useState<Sector[]>([])

  const fetchSectors = async () => {
    const response = await getSectors({loading: setLoadingSectors})

    if (response && response.status === 200) {
      const data = response.data

      setSectorsData(data.data)
    }

    setLoadingSectors(false)
  }

  const fetchCollaborators = async () => {
    const response = await getCollaborators({loading: setLoadingCollaborators})

    if (response && response.status === 200) {
      const data = response.data

      setCollaboratorsData(data.data)
    }

    setLoadingCollaborators(false)
  }

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddEquipment = (uuid: string, name: string, quantity: number) => {
    const alreadyExists = formData.equipments.some(equipment => equipment.uuid === uuid)

    if (!alreadyExists) {
      setFormData(prev => ({
        ...prev,
        ['equipments']: [...prev.equipments, { uuid, name, quantity, created_at: dayjs().toString(), updated_at: ''  } ],
      }))
    } else {
      toast.custom(() => (
        <ToastError text="Equipamento já adicionado anteriormente" />
      ))
    }
    
  }

  const handleDeleteEquipment = (uuid: string) => {
    setFormData(prev => ({
      ...prev,
      equipments: prev.equipments.filter(equipment => equipment.uuid !== uuid),
    }))

    toast.custom(() => (
      <ToastError text="Equipamento removido com sucesso" />
    ))
  }

  const handleModal = useCallback(() => {
      setModalStatus(prev => !prev)
    }, [])

  const handleUpdateEquipmentQuantity = (uuid: string, newQuantity: number) => {
    setFormData(prev => ({
      ...prev,
      equipments: prev.equipments.map(equipment =>
        equipment.uuid === uuid
          ? { ...equipment, quantity: newQuantity, updated_at: dayjs().toString() }
          : equipment
      ),
    }))
  }
  
  useEffect(() => {
    fetchSectors()
    fetchCollaborators()
  }, [])

  return (
    <div className='flex flex-col gap-6 bg-[--backgroundSecondary] sm:pr-3 pb-8 sm:pb-3 w-full lg:h-[calc(100vh-50px)] overflow-auto'>
      <Modal
        title=""
        isModalOpen={modalStatus}
        handleClickOverlay={handleModal}
        showClose={false}
        padding={false}
      >
        <EquipmentsModal handleMainModal={handleModal} addEquipment={handleAddEquipment} />
      </Modal>
      <div className='relative flex flex-col items-start bg-[--backgroundPrimary] sm:rounded-xl w-full h-full overflow-auto'>
        <div className='flex justify-between items-center gap-3 p-6 w-full'>
          <div className='flex flex-row items-center gap-3'>
            <GoBackButton href='/agenda' />

            <h2 className='font-medium text-xl leading-none select-none'>
              Adicionar rotina
            </h2>
          </div>
        </div>

        <form className='flex flex-col gap-x-4 gap-y-10 w-full h-full'>
          <div className='gap-4 grid grid-cols-2 sm:grid-cols-4 px-6'>
            <div className='col-span-2 py-1'>
              <div className='flex flex-col gap-4 bg-[--backgroundSecondary] p-4 rounded-2xl'>
                <div className='flex flex-col gap-1 pb-1'>
                  <span className='font-medium text-[--textSecondary]'>
                    Definir Aplicação
                  </span>
                  <span className='opacity-70 text-[--textSecondary] text-sm'>
                    Escolha se a rotina será aplicado a um colaborador, setor ou ambos.
                  </span>
                </div>
                <SelectCollaborators
                  value={formData.collaborator} 
                  onChange={(value: string) => handleChange('collaborator', value)}
                  CollaboratorsData={collaboratorsData} 
                  background='bg-[--backgroundPrimary]'
                />

                <SelectSectors 
                  value={formData.sector} 
                  onChange={(value: string) => handleChange('sector', value)}
                  SectorsData={sectorsData}
                  background='bg-[--backgroundPrimary]'
                />
              </div>
            </div>

            <div className='flex flex-col gap-3 col-span-2'>
              <div className='flex flex-col gap-4 py-1 rounded-2xl'>
                <DateInput
                  start={dayjs(formData.startedAt)}
                  calendarType='day'
                  label='Início'
                  onChange={handleChange}
                />
              </div>

              <div className='flex flex-col gap-4 bg-[--backgroundSecondary] p-4 rounded-2xl'>
                <div className='flex flex-col gap-1 pb-1'>
                  <span className='font-medium text-[--textSecondary]'>
                    Ciclo
                  </span>
                  <span className='opacity-70 text-[--textSecondary] text-sm'>
                    Escolha a frequência com que esta rotina deve se repetir.
                  </span>
                </div>
                <div className="gap-3 grid grid-cols-2 w-full">
                  <SearchSelect
                    value={String(formData.cycleQuantity)}
                    name='cycleQuantity'
                    options={Array.from({ length: 30 }, (_, i) => ({ value: String(i + 1), label: String(i + 1) }))}
                    placeholder='Quantidade'
                    required={false}
                    onChange={(value: string) => handleChange('cycleQuantity', value)}
                    background='bg-[--backgroundPrimary]'
                  />

                  <SearchSelect
                    value={formData.cycleUnit}
                    name='cycleUnit'
                    options={[
                      { value: 'days', label: 'Dia' },
                      { value: 'weeks', label: 'Semana' },
                      { value: 'months', label: 'Mês' },
                      { value: 'years', label: 'Ano' },
                    ]}
                    placeholder='Periodo'
                    required={false}
                    onChange={(value: string) => handleChange('cycleUnit', value)}
                    background='bg-[--backgroundPrimary]'
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-8 px-6 h-full'>
            <div className='flex flex-row justify-between items-center w-full'>
              <h2 className='font-medium text-xl leading-none select-none'>
                Equipamentos
              </h2>
              <div className='flex flex-row gap-3'>
                <SecondaryButton
                  icon={
                    <AddIcon
                      size='size-4'
                      stroke='stroke-white group-data-[active=true]:stroke-[--primaryColor]'
                      strokeWidth={2.5}
                    />
                  }
                  onClick={handleModal}
                  label='Adicionar Equipamento'
                />
              </div>
            </div>
            
            <div className='flex flex-col gap-3 w-full'>
              {formData.equipments.map((equipment, i) => (
                <div key={equipment.uuid} className="bg-[--tableRow] gap-3 grid grid-cols-2 rounded-xl font-normal text-[--textSecondary] text-sm capitalize transition-all duration-300">
                  <div className="flex items-center col-span-1 py-3 font-medium">
                    <button type='button' className='p-3'>
                      <DotsIcon size="size-3" fill="fill-[--textSecondary]" />
                    </button>
                    <div className="relative bg-[--backgroundPrimary] rounded-xl w-16 aspect-square overflow-hidden">
                    </div>
                    <span className="inline-block pl-3 overflow-hidden text-ellipsis capitalize leading-none whitespace-nowrap">
                      Equipamento Teste
                    </span>
                  </div>
                  <div className="flex justify-end items-center gap-3 col-span-1 p-4 lowercase">
                    <div className='w-24'>
                      <SmallSelect
                        name='quantity'
                        options={Array.from({ length: 30 }, (_, i) => ({ value: String(i + 1), label: String(i + 1) }))}
                        background='bg-[--backgroundPrimary]'
                        value={String(equipment.quantity)}
                        onChange={(value: string) => handleUpdateEquipmentQuantity(equipment.uuid, Number(value))}
                      />
                    </div>
                    <button
                        type="button"
                        onClick={() => handleDeleteEquipment(equipment.uuid)}
                        className='group group z-[55] relative flex justify-center items-center gap-3 bg-transparent hover:bg-[--backgroundPrimary] px-4 rounded-xl h-10 text-white active:scale-95 transition-all duration-300 cursor-pointer select-none'
                      >
                        <TrashIcon
                          size="size-4"
                          stroke="stroke-[--textSecondary] group-hover:stroke-[--errorLoader]"
                          strokeWidth={2.5}
                        />
                      </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <ActionGroup uriBack='/rotinas' onClick={() => null} showDelete={false} />
        </form>
      </div>
    </div>
  )
}

export default CreateOperator
