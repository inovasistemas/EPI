'use client'
import classNames from 'classnames'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { type FC, useState } from 'react'
import { ArrowLeftIcon } from '@/components/Display/Icons/ArrowLeft'
import { SearchSelect } from '@/components/Inputs/Select/SearchSelect'
import { FormInput } from '@/components/Inputs/Text/FormInput'
import { TextArea } from '@/components/Inputs/Text/TextArea'
import { ActionGroup } from '@/components/Surfaces/ActionGroup'
import { GroupLabel } from '@/components/Utils/Label/GroupLabel'

const ColaboratorDetails: FC = () => {
  const params = useParams()
  const colaboratorId = params?.colaborator_id

  const [formData, setFormData] = useState({
    name: 'João Felipe Gomes',
    birthdate: '05/04/1997',
    rg: '37.349.666-7',
    cpf: '447.866.598-27',
    gender: 'male',
    cargo: 'Auxiliar de Produção',
    admissionDate: '01/01/2023',
    zipCode: '13031-390',
    address: 'Avenida João Batista Morato do Canto',
    number: '1400',
    neighborhood: 'Parque Industrial',
    city: 'Campinas',
    state: 'SP',
    phone: '(19) 98602-5363',
    observations: '',
  })

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className='flex flex-col gap-6 bg-[--backgroundSecondary] sm:pr-3 pb-8 sm:pb-3 w-full lg:h-[calc(100vh-50px)] overflow-auto'>
      <div className='relative flex flex-col items-start gap-6 bg-[--backgroundPrimary] sm:rounded-xl w-full h-full'>
        <div className='flex justify-between items-center gap-3 p-6 w-full'>
          <div className='flex flex-row items-center gap-3'>
            <Link
              href='/colaborador'
              type='button'
              className={classNames(
                'active:scale-95 group flex relative justify-center items-center hover:bg-[--backgroundSecondary] bg-[--backgroundPrimary] rounded-lg w-8 h-8 text-zinc-200 transition z-[200]'
              )}
            >
              <ArrowLeftIcon
                height='w-5'
                width='h-5'
                fill='fill-[--textSecondary]'
              />
            </Link>

            <h2 className='font-medium text-2xl leading-none select-none'>
              Detalhes do colaborador
            </h2>
          </div>
        </div>

        <form className='gap-x-4 gap-y-10 grid sm:grid-cols-1 px-6 pb-40 w-full overflow-y-auto'>
          <div className='gap-4 grid sm:grid-cols-3 w-full'>
            <div className='hidden sm:block relative col-span-full mb-4'>
              <GroupLabel
                isVisible={true}
                label={'Dados do Colaborador'}
                showFixed={true}
              />
            </div>

            <div className='col-span-2'>
              <FormInput
                name='name'
                label='Nome'
                required={false}
                type='text'
                value={formData.name}
                position='right'
                onChange={e => handleChange('name', e.target.value)}
              />
            </div>

            <FormInput
              name='birthdate'
              label='Data de nascimento'
              required={false}
              type='text'
              value={formData.birthdate}
              position='right'
              onChange={e => handleChange('birthdate', e.target.value)}
            />

            <FormInput
              name='rg'
              label='RG'
              required={false}
              type='text'
              value={formData.rg}
              position='right'
              onChange={e => handleChange('rg', e.target.value)}
            />

            <FormInput
              name='cpf'
              label='CPF'
              required={false}
              type='text'
              value={formData.cpf}
              position='right'
              onChange={e => handleChange('cpf', e.target.value)}
            />

            <SearchSelect
              name='gender'
              value={formData.gender}
              options={[
                { value: 'female', label: 'Feminino' },
                { value: 'male', label: 'Masculino' },
                { value: 'other', label: 'Não informar' },
              ]}
              placeholder='Gênero'
            />
          </div>

          <div className='gap-4 grid grid-cols-2 w-full'>
            <div className='hidden sm:block relative col-span-full mb-4'>
              <GroupLabel
                isVisible={true}
                label={'Dados sobre Cargo'}
                showFixed={true}
              />
            </div>

            <SearchSelect
              value={formData.cargo}
              name='cargo'
              options={[
                {
                  value: 'Auxiliar de Produção',
                  label: 'Auxiliar de Produção',
                },
              ]}
              placeholder='Cargo'
            />

            <FormInput
              name='admissionDate'
              label='Data de admissão'
              required={false}
              type='text'
              value={formData.admissionDate}
              position='right'
              onChange={e => handleChange('admissionDate', e.target.value)}
            />
          </div>

          <div className='gap-4 grid grid-cols-3 w-full'>
            <div className='hidden sm:block relative col-span-full mb-4'>
              <GroupLabel
                isVisible={true}
                label={'Dados de Contato'}
                showFixed={true}
              />
            </div>

            <FormInput
              name='zipCode'
              label='CEP'
              required={false}
              type='text'
              value={formData.zipCode}
              position='right'
              onChange={e => handleChange('zipCode', e.target.value)}
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
              />
            </div>

            <FormInput
              name='phone'
              label='Telefone'
              required={false}
              type='text'
              value={formData.phone}
              position='right'
              onChange={e => handleChange('phone', e.target.value)}
            />
          </div>

          <div className='gap-4 grid sm:grid-cols-2 w-full'>
            <div className='hidden sm:block relative col-span-full mb-4'>
              <GroupLabel
                isVisible={true}
                label={'Observações'}
                showFixed={true}
              />
            </div>
            <TextArea
              value={formData.observations}
              onChange={e => handleChange('observations', e.target.value)}
              name='observations'
              required={false}
              label='Observações'
            />
          </div>

          <div className='flex flex-col justify-end items-end gap-1 col-span-full w-full'>
            <div className='flex font-semibold text-[--labelPrimary] text-[10px] uppercase'>
              Criado em 01/01/2023 às 11:41
            </div>
          </div>

          <ActionGroup showDelete={true} />
        </form>
      </div>
    </div>
  )
}

export default ColaboratorDetails
