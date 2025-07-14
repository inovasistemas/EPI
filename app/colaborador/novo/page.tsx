'use client'
import { CaretLeft } from '@phosphor-icons/react'
import classNames from 'classnames'
import Link from 'next/link'
import { type FC, useState } from 'react'
import { SearchSelect } from '@/components/Inputs/Select/SearchSelect'
import { FormInput } from '@/components/Inputs/Text/FormInput'
import { TextArea } from '@/components/Inputs/Text/TextArea'
import { ActionGroup } from '@/components/Surfaces/ActionGroup'
import { GroupLabel } from '@/components/Utils/Label/GroupLabel'

const CreateUser: FC = () => {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')

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
              <CaretLeft
                size={20}
                weight='bold'
                className='text-[--textSecondary]'
              />
            </Link>

            <h2 className='font-medium text-2xl leading-none select-none'>
              Adicionar colaborador
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
                value={name}
                position='right'
                onChange={e => setName(e.target.value)}
              />
            </div>

            <FormInput
              name='birthdate'
              label='Data de nascimento'
              required={false}
              type='text'
              value={username}
              position='right'
              onChange={e => setUsername(e.target.value)}
            />

            <FormInput
              name='rg'
              label='RG'
              required={false}
              type='text'
              value={username}
              position='right'
              onChange={e => setUsername(e.target.value)}
            />

            <FormInput
              name='cpf'
              label='CPF'
              required={false}
              type='text'
              value={username}
              position='right'
              onChange={e => setUsername(e.target.value)}
            />

            <SearchSelect
              name='gender'
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
              name='cargo'
              options={[
                { value: 'admin', label: 'Administrador' },
                { value: 'operator', label: 'Operador' },
              ]}
              placeholder='Cargo'
            />

            <FormInput
              name='admissionDate'
              label='Data de admissão'
              required={false}
              type='text'
              value={username}
              position='right'
              onChange={e => setUsername(e.target.value)}
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
              value={username}
              position='right'
              onChange={e => setUsername(e.target.value)}
            />

            <div className='gap-4 grid grid-cols-3 col-span-2 w-full'>
              <div className='col-span-2'>
                <FormInput
                  name='address'
                  label='Endereço'
                  required={false}
                  type='text'
                  value={username}
                  position='right'
                  onChange={e => setUsername(e.target.value)}
                />
              </div>

              <FormInput
                name='number'
                label='Número'
                required={false}
                type='text'
                value={username}
                position='right'
                onChange={e => setUsername(e.target.value)}
              />
            </div>

            <FormInput
              name='neighborhood'
              label='Bairro'
              required={false}
              type='text'
              value={username}
              position='right'
              onChange={e => setUsername(e.target.value)}
            />

            <div className='gap-4 grid grid-cols-3 col-span-2 w-full'>
              <div className='col-span-2'>
                <FormInput
                  name='city'
                  label='Cidade'
                  required={false}
                  type='text'
                  value={username}
                  position='right'
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
              <FormInput
                name='state'
                label='UF'
                required={false}
                type='text'
                value={username}
                position='right'
                onChange={e => setUsername(e.target.value)}
              />
            </div>

            <FormInput
              name='phone'
              label='Telefone'
              required={false}
              type='text'
              value={username}
              position='right'
              onChange={e => setUsername(e.target.value)}
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
              name='observations'
              required={false}
              label='Observações'
            />
          </div>

          <ActionGroup />
        </form>
      </div>
    </div>
  )
}

export default CreateUser
