'use client'
// import { useParams } from 'next/navigation'
import { type FC, useState } from 'react'
import { PasswordInput } from '@/components/Inputs/Password'
import { SearchSelect } from '@/components/Inputs/Select/SearchSelect'
import { FormInput } from '@/components/Inputs/Text/FormInput'
import { GoBackButton } from '@/components/Navigation/GoBackButton'
import { ActionGroup } from '@/components/Surfaces/ActionGroup'
import { GroupLabel } from '@/components/Utils/Label/GroupLabel'

const OperatorDetails: FC = () => {
  // const params = useParams()
  // const CollaboratorId = params?.Collaborator_id

  const [formData, setFormData] = useState({
    name: 'João Felipe Gomes',
    email: 'teste@inovasistemas.com.br',
    password: '123456',
    permissionGroup: 'admin',
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
            <GoBackButton href='/usuarios' />

            <h2 className='font-medium text-2xl leading-none select-none'>
              Detalhes do usuário
            </h2>
          </div>
        </div>

        <form className='flex flex-col gap-x-4 gap-y-10 w-full h-full overflow-y-auto'>
          <div className='gap-4 grid grid-cols-2 h-full'>
            <div className='flex flex-col gap-4 px-6 w-full'>
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
                name='mail'
                label='E-mail'
                required={false}
                type='mail'
                value={formData.email}
                position='right'
                onChange={e => handleChange('username', e.target.value)}
              />

              <PasswordInput
                label='Senha'
                value={formData.password}
                onChange={e => handleChange('password', e.target.value)}
              />
            </div>

            <div className='flex flex-col gap-4 px-6 w-full'>
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
                onChange={() => null}
              />
            </div>

            <div className='flex flex-col justify-end items-end gap-1 col-span-full px-6 w-full'>
              <div className='flex font-semibold text-[--labelPrimary] text-[10px] uppercase'>
                Criado em 01/01/2023 às 11:41
              </div>
            </div>
          </div>

          <ActionGroup showDelete={true} />
        </form>
      </div>
    </div>
  )
}

export default OperatorDetails
