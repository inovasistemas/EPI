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
import { ToastSuccess } from '@/components/Template/Toast/Success'
import { FormInput } from '@/components/Inputs/Text/FormInput'
import { createRoutine, createRoutineEquipment } from '@/services/Routine'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion, Reorder } from 'framer-motion'
import { RoutineSkeleton } from '@/components/Template/Skeletons/Routine'

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
  name: string
  cycleQuantity: number
  cycleUnit: string
  startedAt: string
  sectors: {
    value: string
    label: string
  }[],
  collaborators: {
    value: string
    label: string
  }[],
  equipments: {
    uuid: string
    name: string
    quantity: number
    created_at: string
    updated_at: string
  }[]
}

type Equipment = {
  uuid: string
  name: string
  quantity: number
  created_at: string
  updated_at: string
}

const CreateOperator: FC = () => {
  const router = useRouter()
  const [collaboratorsData, setCollaboratorsData] = useState<Collaborator[]>([])
  const [formData, setFormData] = useState<formData>({
    name: '',
    cycleQuantity: 0,
    cycleUnit: '',
    startedAt: '',
    sectors: [],
    collaborators: [],
    equipments: [],
  })
  const [equipmentsData, setEquipmentsData] = useState<Equipment[]>([])
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

  const handleChangeMulti = <T extends keyof formData>(name: T, value: formData[T]) => {
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
      setEquipmentsData(prev => [
        ...prev,
        { uuid, name, quantity, created_at: dayjs().toString(), updated_at: '' }
      ])
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
      <ToastSuccess text="Equipamento removido com sucesso" />
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

  const handleCreateRoutine = async () => {
    const response = await createRoutine({
      loading: setLoading,
      name: formData.name,
      cycle_quantity: Number(formData.cycleQuantity),
      cycle_period: formData.cycleUnit,
      started_at: formData.startedAt,
      collaborators: JSON.stringify(formData.collaborators),
      sectors: JSON.stringify(formData.sectors),
    })

    if (response) {
      if (response.status === 201) {
        if (formData.equipments.length > 0) {
          for (const equipment of equipmentsData) {
            await createRoutineEquipment({
              loading: setLoading,
              equipment: equipment.uuid,
              quantity: equipment.quantity,
              routine: response.data.uuid,
              order: equipmentsData.indexOf(equipment) + 1
            })
          }
        }

        toast.custom(() => <ToastSuccess text='Rotina criada com sucesso' />)
        router.push('/rotinas')
      } else if (response.status === 403) {
          toast.custom(() => (
          <ToastError text='Você não possui permissão para esta ação' />
        ))
      } else {
        toast.custom(() => (
          <ToastError text='Não foi possível criar a rotina. Verifique os campos obrigatórios e tente novamente' />
        ))
      }
    } else {
      toast.custom(() => (
        <ToastError text='Não foi possível criar a rotina. Verifique os campos obrigatórios e tente novamente' />
      ))
    }
  }

  useEffect(() => {
   handleChange("startedAt", dayjs().toString()) 
  }, [])
  
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
        overflowHidden={true}
      >
        <EquipmentsModal handleMainModal={handleModal} addEquipment={handleAddEquipment} />
      </Modal>
      <div className='relative flex flex-col items-start bg-[--backgroundPrimary] sm:rounded-xl w-full h-full overflow-auto'>
        <AnimatePresence mode='wait'>
          {loading || loadingCollaborators || loadingSectors
            ? <RoutineSkeleton /> 
            : <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className='w-full'>
              <div className='flex justify-between items-center gap-3 p-6 w-full'>
                <div className='flex flex-row items-center gap-3'>
                  <GoBackButton href='/rotinas' />

                  <h2 className='font-medium text-xl capitalize leading-none select-none'>
                    {formData.name
                      ? formData.name.toLocaleLowerCase()
                      : 'Adicionar rotina'}
                  </h2>
                </div>
              </div>

              <form className='flex flex-col gap-x-4 gap-y-10 w-full h-full'>
                <div className='gap-4 grid grid-cols-2 sm:grid-cols-4 px-6'>
                  <div className='col-span-full w-full'>
                    <FormInput 
                      value={formData.name} 
                      label='Nome'
                      onChange={(e) => handleChange('name', e.target.value)} 
                      name='name' 
                      required={true}/>
                  </div>

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
                        value={formData.collaborators} 
                        onChange={(selected) =>
                          handleChangeMulti(
                            'collaborators',
                            selected.map(s => ({ value: s.value, label: s.label }))
                          )
                        }
                        CollaboratorsData={collaboratorsData} 
                        background='bg-[--backgroundPrimary]'
                      />

                      <SelectSectors
                        value={formData.sectors} 
                        onChange={(selected) =>
                          handleChangeMulti(
                            'sectors',
                            selected.map(s => ({ value: s.value, label: s.label }))
                          )
                        }
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
                        name='startedAt'
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
                            { value: 'day', label: 'Dia' },
                            { value: 'week', label: 'Semana' },
                            { value: 'month', label: 'Mês' },
                            { value: 'year', label: 'Ano' },
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
                  
                  <Reorder.Group axis="y" values={equipmentsData} onReorder={setEquipmentsData} className='flex flex-col gap-3 w-full'>
                    {equipmentsData.map((equipment, i) => (
                      <Reorder.Item value={equipment} key={equipment.uuid} className="gap-3 grid grid-cols-2 bg-[--tableRow] rounded-xl font-normal text-[--textSecondary] text-sm capitalize">
                        <div className="flex items-center col-span-1 py-3 font-medium">
                          <button type='button' className='p-3'>
                            <DotsIcon size="size-3" fill="fill-[--textSecondary]" />
                          </button>
                          <div className="relative bg-[--backgroundPrimary] rounded-xl w-16 aspect-square overflow-hidden">
                          </div>
                          <span className="inline-block pl-3 overflow-hidden text-ellipsis capitalize leading-none whitespace-nowrap">
                            {equipment.name.toLocaleLowerCase()}
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
                              className='group group relative flex justify-center items-center gap-3 bg-transparent hover:bg-[--backgroundPrimary] px-4 rounded-xl h-10 text-white active:scale-95 transition-all duration-300 cursor-pointer select-none'
                            >
                              <TrashIcon
                                size="size-4"
                                stroke="stroke-[--textSecondary] group-hover:stroke-[--errorLoader]"
                                strokeWidth={2.5}
                              />
                            </button>
                        </div>
                      </Reorder.Item>
                    ))}
                  </Reorder.Group>
                </div>

                <ActionGroup uriBack='/rotinas' onClick={handleCreateRoutine} showDelete={false} />
              </form>
              </motion.div>
          }
        </AnimatePresence>
      </div>
    </div>
  )
}

export default CreateOperator
