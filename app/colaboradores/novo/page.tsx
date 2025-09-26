'use client'
import { type FC, useState } from 'react'
import { SearchSelect } from '@/components/Inputs/Select/SearchSelect'
import { FormInput } from '@/components/Inputs/Text/FormInput'
import { TextArea } from '@/components/Inputs/Text/TextArea'
import { GoBackButton } from '@/components/Navigation/GoBackButton'
import { ActionGroup } from '@/components/Surfaces/ActionGroup'
import { GroupLabel } from '@/components/Utils/Label/GroupLabel'
import { MaskedInput } from '@/components/Inputs/Masked'
import { SelectJobPositions } from '@/components/Inputs/Select/JobPositions'
import { createCollaborator } from '@/services/Collaborator'
import { ToastSuccess } from '@/components/Template/Toast/Success'
import { toast } from 'sonner'
import { ToastError } from '@/components/Template/Toast/Error'
import { useRouter } from 'next/navigation'

const CreateCollaborator: FC = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    birthdate: '',
    rg: '',
    cpf: '',
    gender: '',
    cargo: '',
    admission_date: '',
    job_position: '',
    zip_code: '',
    address: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    phone: '',
    observations: '',
    situation: ''
  })

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCreateCollaborator = async () => {
    const response = await createCollaborator({
      name: formData.name,
      birthdate: formData.birthdate,
      rg: formData.rg,
      cpf: formData.cpf,
      gender: formData.gender,
      job_position: formData.job_position,
      admission_date: formData.admission_date,
      zip_code: formData.zip_code,
      address: formData.address,
      number: formData.number,
      neighborhood: formData.neighborhood,
      city: formData.city,
      state: formData.state,
      phone: formData.phone,
      observations: formData.observations,
      situation: formData.situation
    })

    if (response) {
      if (response.status === 201) {
        toast.custom(() => <ToastSuccess text='Colaborador criado com sucesso' />)
        router.push('/colaboradores')
      } else if (response.status === 403) {
        toast.custom(() => (
          <ToastError text='Você não possui permissão para esta ação' />
        )) 
      } else {
        toast.custom(() => (
          <ToastError text='Não foi possível criar o colaborador. Verifique os campos obrigatórios e tente novamente' />
        ))
      }
    } else {
      toast.custom(() => (
        <ToastError text='Não foi possível criar o colaborador. Verifique os campos obrigatórios e tente novamente' />
      ))
    }
  }

  return (
    <div className='flex flex-col gap-6 bg-[--backgroundSecondary] sm:pr-3 pb-8 sm:pb-3 w-full lg:h-[calc(100vh-50px)] overflow-auto'>
      <div className='relative flex flex-col items-start gap-6 bg-[--backgroundPrimary] sm:rounded-xl w-full h-full'>
        <div className='flex justify-between items-center gap-3 p-6 w-full'>
          <div className='flex flex-row items-center gap-3'>
            <GoBackButton href='/colaboradores' />

            <h2 className='font-medium text-xl leading-none select-none'>
              Adicionar colaborador
            </h2>
          </div>
        </div>

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
              value={formData.name}
              position='right'
              onChange={e => handleChange('name', e.target.value)}
            />

            <MaskedInput
              name='birthdate'
              label='Data de nascimento'
              required={false}
              type='date'
              value={formData?.birthdate}
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
              value={formData.situation}
              onChange={(value: string) => handleChange('situation', value)}
            />

            <MaskedInput
              name='rg'
              label='RG'
              required={false}
              type='rg'
              value={formData?.rg}
              position='right'
              onChange={e => handleChange('rg', e.target.value)}
            />

            <MaskedInput
              name='cpf'
              label='CPF'
              required={false}
              type='cpf'
              value={formData?.cpf}
              position='right'
              onChange={e => handleChange('cpf', e.target.value)}
            />

            <SearchSelect
              name='gender'
              options={[
                { value: 'FEMALE', label: 'Feminino' },
                { value: 'MALE', label: 'Masculino' },
                { value: 'NOTINFORMED', label: 'Não informar' },
              ]}
              placeholder='Gênero'
              value={formData.gender}
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
              value={formData?.job_position}
              onChange={(value: string) => handleChange('job_position', value)}
            />

            <MaskedInput
              name='admission_date'
              label='Data de admissão'
              required={false}
              type='date'
              value={formData.admission_date}
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
              value={formData.zip_code}
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
                  value={formData.address}
                  position='right'
                  onChange={e => handleChange('address', e.target.value)}
                />
              </div>

              <FormInput
                name='number'
                label='Número'
                required={false}
                type='text'
                value={formData.number}
                position='right'
                onChange={e => handleChange('number', e.target.value)}
              />
            </div>

            <FormInput
              name='neighborhood'
              label='Bairro'
              required={false}
              type='text'
              value={formData.neighborhood}
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
                  value={formData.city}
                  position='right'
                  onChange={e => handleChange('city', e.target.value)}
                />
              </div>
              <FormInput
                name='state'
                label='UF'
                required={false}
                type='text'
                value={formData.state}
                position='right'
                onChange={e => handleChange('state', e.target.value)}
                maxLength={2}
              />
            </div>

            <MaskedInput
              name='phone'
              label='Telefone'
              required={false}
              type='phone'
              value={formData.phone}
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
              name='observations'
              required={false}
              label='Observações'
              value={formData.observations}
              onChange={e => handleChange('observations', e.target.value)}
            />
          </div>

          <ActionGroup
            uriBack='/colaboradores'
            onClick={handleCreateCollaborator}
          />
        </form>
      </div>
    </div>
  )
}

export default CreateCollaborator
