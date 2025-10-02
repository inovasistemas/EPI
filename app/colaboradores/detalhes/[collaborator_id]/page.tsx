'use client'
import { useParams, useRouter } from 'next/navigation'
import { type FC, useEffect, useRef, useState, useCallback } from 'react'
import { SearchSelect } from '@/components/Inputs/Select/SearchSelect'
import { FormInput } from '@/components/Inputs/Text/FormInput'
import { TextArea } from '@/components/Inputs/Text/TextArea'
import { GoBackButton } from '@/components/Navigation/GoBackButton'
import { ActionGroup } from '@/components/Surfaces/ActionGroup'
import { GroupLabel } from '@/components/Utils/Label/GroupLabel'
import { toast } from 'sonner'
import { ToastError } from '@/components/Template/Toast/Error'
import {
  deleteCollaborator,
  getCollaborator,
  updateCollaborator,
} from '@/services/Collaborator'
import { timestampToDateTime } from '@/utils/timestamp-to-datetime'
import { MaskedInput } from '@/components/Inputs/Masked'
import { SelectJobPositions } from '@/components/Inputs/Select/JobPositions'
import { Modal } from '@/components/Display/Modal'
import { ToastSuccess } from '@/components/Template/Toast/Success'
import { timestampToDate } from '@/utils/timestamp-to-date'
import { PermissionDeniedScreen } from '@/components/Features/PermissionDenied'
import { CollaboratorSkeleton } from '@/components/Template/Skeletons/Collaborator'
import { AnimatePresence, motion } from 'framer-motion'
import { getJobPositions } from '@/services/JobPosition'

type Collaborator = {
  name: string
  birthdate: string
  rg: string
  cpf: string
  gender: string
  job_position: string
  admission_date: string
  zip_code: string
  address: string
  number: string
  neighborhood: string
  city: string
  state: string
  phone: string
  observations: string
  created_at: string
  situation: string
}

const CollaboratorDetails: FC = () => {
  const router = useRouter()
  const params = useParams()
  const CollaboratorId = params?.collaborator_id
  const [loading, setLoading] = useState(false)
  const [loadingJobPositions, setLoadingJobPositions] = useState(true)
  const [collaborator, setCollaborator] = useState<Collaborator>({
    name: '',
    birthdate: '',
    rg: '',
    cpf: '',
    gender: '',
    job_position: '',
    admission_date: '',
    zip_code: '',
    address: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    phone: '',
    observations: '',
    created_at: '',
    situation: ''
  })
  const fetchedCollaborator = useRef(false)
  const [hasPermission, setHasPermission] = useState(true)
  const fetchedJobPositions = useRef(false)

  const handleChange = (name: string, value: string) => {
    setCollaborator(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const [modalStatus, setModalStatus] = useState(false)
  const handleCloseModal = useCallback(() => {
    setModalStatus(prev => !prev)
  }, [])

  const [jobPositionsData, setJobPositionsData] = useState([
    {
      uuid: '',
      name: '',
      sector: '',
      created_at: '',
      updated_at: '',
    },
  ])

  const fetchCollaborator = async () => {
    if (CollaboratorId && typeof CollaboratorId === 'string') {
      const response = await getCollaborator({
        loading: setLoading,
        id: CollaboratorId,
      })

      if (response) {
        if (response.status === 200) {
          setCollaborator(response.data)
        } else if (response.status === 403) {
          setHasPermission(false)
        } else {
          toast.custom(() => (
            <ToastError text='Não foi possível buscar o colaborador' />
          ))
        }
      } else {
        toast.custom(() => (
          <ToastError text='Não foi possível buscar o colaborador' />
        ))
      }
      
      fetchedCollaborator.current = true
    }
  }

  const updateCollabroator = async () => {
    const response = await updateCollaborator({
      loading: setLoading,
      id: Array.isArray(CollaboratorId)
        ? CollaboratorId[0]
        : CollaboratorId || '',
      name: collaborator.name,
      birthdate: collaborator.birthdate,
      rg: collaborator.rg,
      cpf: collaborator.cpf,
      gender: collaborator.gender,
      job_position: collaborator.job_position,
      admission_date: collaborator.admission_date,
      zip_code: collaborator.zip_code,
      address: collaborator.address,
      number: collaborator.number,
      neighborhood: collaborator.neighborhood,
      city: collaborator.city,
      state: collaborator.state,
      phone: collaborator.phone,
      observations: collaborator.observations,
      situation: collaborator.situation
    })

    if (response) {
      if (response.status === 200) {
        toast.custom(() => (
          <ToastSuccess text='Colaborador atualizado com sucesso' />
        ))
      } else if (response.status === 403) {
        toast.custom(() => (
          <ToastError text='Você não possui permissão para esta ação' />
        )) 
      } else {
        toast.custom(() => (
          <ToastError text='Não foi possível atualizar o colaborador' />
        ))
      }
    } else {
      toast.custom(() => (
        <ToastError text='Não foi possível atualizar o colaborador' />
      ))
    }
  }

  const handleDeleteCollaborator = async () => {
    const response = await deleteCollaborator({
      loading: setLoading,
      id: Array.isArray(CollaboratorId)
        ? CollaboratorId[0]
        : CollaboratorId || '',
    })

    if (response) {
      if (response.status === 204) {
        router.push('/colaboradores')
      } else if (response.status === 403) {
        toast.custom(() => (
          <ToastError text='Você não possui permissão para esta ação' />
        )) 
      } else {
        toast.custom(() => (
          <ToastError text='Não foi possível excluir o colaborador' />
        ))
      }
    } else {
      toast.custom(() => (
        <ToastError text='Não foi possível excluir o colaborador' />
      ))
    }
  }

  useEffect(() => {
    if (
      (!CollaboratorId || typeof CollaboratorId !== 'string') &&
      fetchedCollaborator
    )
      return
    fetchCollaborator()
  }, [CollaboratorId, fetchedCollaborator])

  const fetchJobPositions = async () => {
    const response = await getJobPositions({loading: setLoadingJobPositions})

    if (response && response.status === 200) {
      setJobPositionsData(response.data.data)
    } else {
      toast.custom(() => (
        <ToastError text='Não foi possível buscar os cargos' />
      ))
    }
  }

  useEffect(() => {
    if (fetchedJobPositions.current) return
    fetchedJobPositions.current = true
    fetchJobPositions()
  }, [])

  return (
    <div className='flex flex-col gap-6 bg-[--backgroundSecondary] sm:pr-3 pb-8 sm:pb-3 w-full lg:h-[calc(100vh-50px)] overflow-auto'>
      <Modal
        title=''
        size='extra-small'
        isModalOpen={modalStatus}
        handleClickOverlay={handleCloseModal}
        showClose={false}
      >
        <div className='flex flex-col gap-2'>
          <span className='font-medium text-xl text-center'>
            Tem certeza que deseja excluir o colaborador?
          </span>
          <span className='px-6 text-base text-center'>
            Esta ação é irreversível e todos os dados associados serão
            permanentemente apagados.
          </span>

          <div className='z-[55] flex flex-row justify-center gap-3 pt-6'>
            <button
              type='button'
              onClick={handleDeleteCollaborator}
              className='group group z-[55] relative flex justify-center items-center gap-3 bg-[--errorLoader] px-8 rounded-xl h-10 text-white active:scale-95 transition-all duration-300 cursor-pointer select-none'
            >
              <span className='font-medium text-white text-sm transition-all duration-300'>
                Confirmar
              </span>
            </button>

            <button
              type='button'
              onClick={handleCloseModal}
              className='group z-[55] relative flex justify-center items-center gap-3 bg-[--buttonPrimary] hover:bg-[--buttonSecondary] px-8 rounded-xl h-10 text-white active:scale-95 transition-all duration-300 cursor-pointer select-none'
            >
              <span className='font-medium text-[--textSecondary] text-sm'>
                Cancelar
              </span>
            </button>
          </div>
        </div>
      </Modal>
      <div className='relative flex flex-col items-start gap-6 bg-[--backgroundPrimary] sm:rounded-xl w-full h-full'>
      <AnimatePresence mode='wait'>
      {loading || loadingJobPositions
      ? <CollaboratorSkeleton /> 
      : 
      <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className='relative flex flex-col items-start gap-6 bg-[--backgroundPrimary] sm:rounded-xl w-full h-full'>
        <div className='flex justify-between items-center gap-3 p-6 w-full'>
          <div className='flex flex-row items-center gap-3'>
            <GoBackButton href='/colaboradores' />

            <h2 className='font-medium text-xl capitalize leading-none select-none'>
              {collaborator?.name
                ? collaborator?.name.toLocaleLowerCase()
                : 'Detalhes do colaborador'}
            </h2>
          </div>
        </div>

        {(hasPermission && !loading) && (
          <form className='gap-x-4 gap-y-10 grid sm:grid-cols-1 w-full overflow-y-auto'>
            <div className='gap-4 grid sm:grid-cols-3 px-6 w-full'>
              <div className='hidden sm:block relative col-span-full mb-4'>
                <GroupLabel
                  isVisible={true}
                  label={'Dados do Colaborador'}
                  showFixed={true}
                />
              </div>

              <FormInput
                name='name'
                label='Nome'
                required={true}
                type='text'
                value={collaborator?.name.toLocaleLowerCase()}
                position='right'
                onChange={e => handleChange('name', e.target.value)}
                textTransform='capitalize'
              />

              <MaskedInput
                name='birthdate'
                label='Data de nascimento'
                required={false}
                type='date'
                value={timestampToDate(collaborator?.birthdate ?? '')}
                position='right'
                onChange={e => handleChange('birthdate', e.target.value)}
              />

              <SearchSelect
                name='gender'
                options={[
                  { value: 'ACTIVE', label: 'Ativo' },
                  { value: 'AWAY', label: 'Afastado' },
                  { value: 'SICKLEAVE', label: 'Atestado' },
                  { value: 'INACTIVE', label: 'Inativo' },
                ]}
                placeholder='Situação'
                value={collaborator?.situation ?? ''}
                onChange={(value: string) => handleChange('situation', value)}
              />

              <MaskedInput
                name='rg'
                label='RG'
                required={false}
                type='rg'
                value={collaborator?.rg}
                position='right'
                onChange={e => handleChange('rg', e.target.value)}
              />

              <MaskedInput
                name='cpf'
                label='CPF'
                required={false}
                type='cpf'
                value={collaborator?.cpf}
                position='right'
                onChange={e => handleChange('cpf', e.target.value)}
              />

              <SearchSelect
                name='gender'
                value={collaborator?.gender}
                options={[
                  { value: 'FEMALE', label: 'Feminino' },
                  { value: 'MALE', label: 'Masculino' },
                  { value: 'NOTINFORMED', label: 'Não informado' },
                ]}
                placeholder='Gênero'
                onChange={(value: string) => handleChange('gender', value)}
              />
            </div>

            <div className='gap-4 grid grid-cols-2 px-6 w-full'>
              <div className='hidden sm:block relative col-span-full mb-4'>
                <GroupLabel
                  isVisible={true}
                  label={'Dados sobre Cargo'}
                  showFixed={true}
                />
              </div>

              <SelectJobPositions
                jobPositionsData={jobPositionsData}
                value={collaborator?.job_position}
                onChange={(value: string) => handleChange('job_position', value)}
              />

              <MaskedInput
                name='admission_date'
                label='Data de admissão'
                required={false}
                type='date'
                value={timestampToDate(collaborator?.admission_date ?? '')}
                position='right'
                onChange={e => handleChange('admission_date', e.target.value)}
              />
            </div>

            <div className='gap-4 grid grid-cols-3 px-6 w-full'>
              <div className='hidden sm:block relative col-span-full mb-4'>
                <GroupLabel
                  isVisible={true}
                  label={'Dados de Contato'}
                  showFixed={true}
                />
              </div>

              <MaskedInput
                name='zip_code'
                label='CEP'
                required={false}
                type='zipcode'
                value={collaborator?.zip_code}
                position='right'
                onChange={e => handleChange('zip_code', e.target.value)}
              />

              <div className='gap-4 grid grid-cols-3 col-span-2 w-full'>
                <div className='col-span-2'>
                  <FormInput
                    name='address'
                    label='Endereço'
                    required={false}
                    type='text'
                    value={collaborator?.address}
                    position='right'
                    onChange={e => handleChange('address', e.target.value)}
                  />
                </div>

                <FormInput
                  name='number'
                  label='Número'
                  required={false}
                  type='text'
                  value={collaborator?.number}
                  position='right'
                  onChange={e => handleChange('number', e.target.value)}
                />
              </div>

              <FormInput
                name='neighborhood'
                label='Bairro'
                required={false}
                type='text'
                value={collaborator?.neighborhood}
                position='right'
                onChange={e => handleChange('neighborhood', e.target.value)}
              />

              <div className='gap-4 grid grid-cols-3 col-span-2 w-full'>
                <div className='col-span-2'>
                  <FormInput
                    name='city'
                    label='Cidade'
                    required={false}
                    type='text'
                    value={collaborator?.city}
                    position='right'
                    onChange={e => handleChange('city', e.target.value)}
                  />
                </div>
                <FormInput
                  name='state'
                  label='UF'
                  required={false}
                  type='text'
                  value={collaborator?.state}
                  position='right'
                  onChange={e => handleChange('state', e.target.value)}
                  maxLength={2}
                />
              </div>

              <MaskedInput
                name='phone'
                label='Celular'
                required={false}
                type='phone'
                value={collaborator?.phone}
                position='right'
                onChange={e => handleChange('phone', e.target.value)}
              />
            </div>

            <div className='gap-4 grid sm:grid-cols-2 px-6 w-full'>
              <div className='hidden sm:block relative col-span-full mb-4'>
                <GroupLabel
                  isVisible={true}
                  label={'Observações'}
                  showFixed={true}
                />
              </div>
              <TextArea
                value={collaborator?.observations}
                onChange={e => handleChange('observations', e.target.value)}
                name='observations'
                required={false}
                label='Observações'
              />
            </div>

            <div className='flex flex-col justify-end items-end gap-1 col-span-full px-6 w-full'>
              <div className='flex font-semibold text-[--labelPrimary] text-[10px] uppercase'>
                Criado em {timestampToDateTime(collaborator?.created_at)}
              </div>
            </div>

            <ActionGroup
              uriBack='/colaboradores'
              onDelete={handleCloseModal}
              onClick={updateCollabroator}
              showDelete={true}
            />
          </form>
        )}
        {!hasPermission && (
          <PermissionDeniedScreen />
        )}
      </motion.div>
      }
      </AnimatePresence>
      </div>
    </div>
  )
}

export default CollaboratorDetails
