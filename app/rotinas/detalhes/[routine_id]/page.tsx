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
import { type FC, useCallback, useEffect, useState, useMemo } from 'react'
import { Modal } from '@/components/Display/Modal'
import { EquipmentsModal } from '@/components/Features/Equipments'
import { TrashIcon } from '@/components/Display/Icons/Trash'
import { toast } from 'sonner'
import { ToastError } from '@/components/Template/Toast/Error'
import { ToastSuccess } from '@/components/Template/Toast/Success'
import { FormInput } from '@/components/Inputs/Text/FormInput'
import { createRoutine, createRoutineEquipment, deleteRoutine, deleteRoutineEquipment, getRoutine, updateRoutine, updateRoutineEquipment } from '@/services/Routine'
import { useParams, useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { EquipmentSkeleton } from '@/components/Template/Skeletons/Equipment'
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
  cycle_quantity: number
  cycle_period: string
  started_at: string
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

const OperatorDetails: FC = () => {
  const router = useRouter()
  const params = useParams()
  const RoutineId = Array.isArray(params.routine_id)
    ? params.routine_id[0]
    : params.routine_id
  const [collaboratorsData, setCollaboratorsData] = useState<Collaborator[]>([])
  const [formData, setFormData] = useState<formData>({
    name: '',
    cycle_quantity: 0,
    cycle_period: '',
    started_at: '',
    sectors: [],
    collaborators: [],
    equipments: [],
  })
  const [loading, setLoading] = useState(false)
  const [loadingCollaborators, setLoadingCollaborators] = useState(false)
  const [loadingSectors, setLoadingSectors] = useState(false)
  const [modalStatus, setModalStatus] = useState(false)
  const [sectorsData, setSectorsData] = useState<Sector[]>([])

  const quantityOptions = useMemo(
    () => Array.from({ length: 30 }, (_, i) => ({
      value: String(i + 1),
      label: String(i + 1),
    })),
    []
  )

  const selectedCollaborators = useMemo(() => {
    if (!formData.collaborators?.length || !collaboratorsData?.length) return []
    return formData.collaborators
      .map(f => collaboratorsData.find(c => c.uuid === f.value))
      .filter(Boolean)
      .map(c => ({ value: c!.uuid, label: c!.name }))
  }, [formData.collaborators, collaboratorsData])

  const selectedSectors = useMemo(() => {
    if (!formData.sectors?.length || !sectorsData?.length) return []
    return formData.sectors
      .map(f => sectorsData.find(c => c.uuid === f.value))
      .filter(Boolean)
      .map(c => ({ value: c!.uuid, label: c!.name }))
  }, [formData.sectors, sectorsData])

  const fetchRoutine = async () => {
    if (!RoutineId) return

    const response = await getRoutine({id: RoutineId, loading: setLoading})

    if (response && response.status === 200) {
      const data = response.data

      const parsedData = {
        ...data,
        collaborators: (() => {
          try {
            return JSON.parse(data.collaborators).map((c: any) => ({
              value: c.value,
              label: c.label,
            }))
          } catch {
            return []
          }
        })(),
        sectors: (() => {
          try {
            return JSON.parse(data.sectors).map((s: any) => ({
              value: s.value,
              label: s.label,
            }))
          } catch {
            return []
          }
        })(),
      }

      setFormData(parsedData)
    }

    setLoadingSectors(false)
  }

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

  const handleAddEquipment = async (uuid: string, name: string, quantity: number) => {
    if (!RoutineId) return

    const alreadyExists = formData.equipments.some(equipment => equipment.uuid === uuid)

    if (!alreadyExists) {
      const response = await createRoutineEquipment({
        loading: setLoading,
        equipment: uuid,
        quantity: quantity,
        routine: RoutineId,
      })

      if (response) {
        if (response.status === 201) {
          setFormData(prev => ({
            ...prev,
            ['equipments']: [...prev.equipments, { uuid, name, quantity, created_at: dayjs().toString(), updated_at: ''  } ],
          }))

          toast.custom(() => (
            <ToastSuccess text="Equipamento adicionado com sucesso" />
          ))
        } else if (response.status === 403) {
          toast.custom(() => (
            <ToastError text='Você não possui permissão para esta ação' />
          ))
        } else {
          toast.custom(() => (
            <ToastError text="Não foi possível adicionar o equipamento. Verifique os campos obrigatórios e tente novamente" />
          ))
        }
      } else {
        toast.custom(() => (
          <ToastError text="Não foi possível adicionar o equipamento. Verifique os campos obrigatórios e tente novamente" />
        ))
      }
    } else {
      toast.custom(() => (
        <ToastError text="Equipamento já adicionado anteriormente" />
      ))
    }
    
  }

  const handleDeleteEquipment = async (uuid: string) => {
    if (!RoutineId) return

    const response = await deleteRoutineEquipment({
      loading: setLoading,
      id: RoutineId,
      equipmentId: uuid
    });

    if (response) {
      if (response.status === 204) {
        setFormData(prev => ({
          ...prev,
          equipments: prev.equipments.filter(equipment => equipment.uuid !== uuid),
        }))

        toast.custom(() => (
          <ToastSuccess text="Equipamento removido com sucesso" />
        ))
      } else if (response.status === 403) {
          toast.custom(() => (
            <ToastError text='Você não possui permissão para esta ação' />
          )) 
      } else {
        toast.custom(() => (
          <ToastError text="Não foi possível remover o equipamento. Verifique os campos obrigatórios e tente novamente" />
        ))
      }
    } else {
      toast.custom(() => (
        <ToastError text="Não foi possível remover o equipamento. Verifique os campos obrigatórios e tente novamente" />
      ))
    }
  }

  const handleModal = useCallback(() => {
      setModalStatus(prev => !prev)
    }, [])

  const handleUpdateEquipmentQuantity = async (uuid: string, newQuantity: number) => {
    if (!RoutineId) return

    const response = await updateRoutineEquipment({
      loading: setLoading,
      id: RoutineId,
      equipment: uuid,
      quantity: newQuantity
    })

    if (response) {
      if (response.status === 200) {
        setFormData(prev => ({
          ...prev,
          equipments: prev.equipments.map(equipment =>
            equipment.uuid === uuid
              ? { ...equipment, quantity: newQuantity, updated_at: dayjs().toString() }
              : equipment
          ),
        }))

        toast.custom(() => (
          <ToastSuccess text="Equipamento atualizado com sucesso" />
        ))
      } else if (response.status === 403) {
        toast.custom(() => (
          <ToastError text='Você não possui permissão para esta ação' />
        ))
      } else {
        toast.custom(() => (
          <ToastError text="Não foi possível alterar o equipamento. Verifique os campos obrigatórios e tente novamente" />
        ))
      }
    } else {
      toast.custom(() => (
        <ToastError text="Não foi possível alterar o equipamento. Verifique os campos obrigatórios e tente novamente" />
      ))
    }
  }

  const handleUpdateRoutine = async () => {
    if (!RoutineId) return

    const response = await updateRoutine({
      id: RoutineId,
      loading: setLoading,
      name: formData.name,
      cycle_quantity: Number(formData.cycle_quantity),
      cycle_period: formData.cycle_period,
      started_at: formData.started_at,
      collaborators: JSON.stringify(formData.collaborators),
      sectors: JSON.stringify(formData.sectors),
    })

    if (response) {
      if (response.status === 200) {
        toast.custom(() => <ToastSuccess text='Rotina atualizada com sucesso' />)
      } else if (response.status === 403) {
          toast.custom(() => (
          <ToastError text='Você não possui permissão para esta ação' />
        ))
      } else {
        toast.custom(() => (
          <ToastError text='Não foi possível atualizar a rotina. Verifique os campos obrigatórios e tente novamente' />
        ))
      }
    } else {
      toast.custom(() => (
        <ToastError text='Não foi possível atualizar a rotina. Verifique os campos obrigatórios e tente novamente' />
      ))
    }
  }

  useEffect(() => {
    fetchRoutine()
  }, [RoutineId])
  
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
                      : 'Detalhes da rota'}
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
                        value={selectedCollaborators} 
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
                        value={selectedSectors} 
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
                        start={formData.started_at ? dayjs(formData.started_at) : dayjs()}
                        calendarType='day'
                        label='Início'
                        name='started_at'
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
                          value={String(formData.cycle_quantity)}
                          name='cycleQuantity'
                          options={quantityOptions}
                          placeholder='Quantidade'
                          required={true}
                          onChange={(value: string) => handleChange('cycle_auantity', value)}
                          background='bg-[--backgroundPrimary]'
                        />

                        <SearchSelect
                          value={formData.cycle_period}
                          name='cycleUnit'
                          options={[
                            { value: 'day', label: 'Dia' },
                            { value: 'week', label: 'Semana' },
                            { value: 'month', label: 'Mês' },
                            { value: 'year', label: 'Ano' },
                          ]}
                          placeholder='Periodo'
                          required={true}
                          onChange={(value: string) => handleChange('cycle_unit', value)}
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
                    {formData.equipments && formData.equipments.length > 0 && formData.equipments.map((equipment, i) => (
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

                <ActionGroup uriBack='/rotinas' onClick={handleUpdateRoutine} showDelete={false} />
              </form>
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </div>
  )
}

export default OperatorDetails
