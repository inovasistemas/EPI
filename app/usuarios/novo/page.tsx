'use client'
import { CaretLeft } from '@phosphor-icons/react'
import classNames from 'classnames'
import Link from 'next/link'
import { type FC, useState } from 'react'
import { PasswordInput } from '@/components/Inputs/Password'
import { SearchSelect } from '@/components/Inputs/Select/SearchSelect'
import { FormInput } from '@/components/Inputs/Text/FormInput'
import { ActionGroup } from '@/components/Surfaces/ActionGroup'
import { GroupLabel } from '@/components/Utils/Label/GroupLabel'

const CreateOperator: FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    permissionGroup: '',
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
              href='/usuarios'
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
              Adicionar usuário
            </h2>
          </div>
        </div>

        <form className='gap-4 grid sm:grid-cols-2 px-6 w-full'>
          <div className='flex flex-col gap-4 w-full'>
            <div className='hidden sm:block relative mb-4'>
              <GroupLabel
                isVisible={true}
                label={'Dados do Usuário'}
                showFixed={true}
              />
            </div>

            <FormInput
              name='name'
              label='Nome'
              required={false}
              type='text'
              value={formData.name}
              position='right'
              onChange={e => handleChange('name', e.target.value)}
            />

            <FormInput
              name='email'
              label='E-mail'
              required={false}
              type='email'
              value={formData.email}
              position='right'
              onChange={e => handleChange('email', e.target.value)}
            />

            <PasswordInput
              label='Senha'
              value=''
              onChange={e => handleChange('password', e.target.value)}
            />
          </div>

          <div className='flex flex-col gap-4 w-full'>
            <div className='hidden sm:block relative mb-4'>
              <GroupLabel
                isVisible={true}
                label={'Permissões'}
                showFixed={true}
              />
            </div>

            <SearchSelect
              value={formData.permissionGroup}
              name='Grupo de permissão'
              options={[
                { value: 'admin', label: 'Administrador' },
                { value: 'operator', label: 'Operador' },
              ]}
              placeholder='Grupo de permissão'
            />
          </div>

          <ActionGroup />
        </form>
      </div>
    </div>
  )
}

export default CreateOperator
