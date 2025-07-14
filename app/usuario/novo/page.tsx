'use client'
import { CaretLeft, Eye, EyeClosed } from '@phosphor-icons/react'
import classNames from 'classnames'
import Link from 'next/link'
import { type FC, useState } from 'react'
import { SearchSelect } from '@/components/Inputs/Select/SearchSelect'
import { FormInput } from '@/components/Inputs/Text/FormInput'
import { ActionGroup } from '@/components/Surfaces/ActionGroup'
import { GroupLabel } from '@/components/Utils/Label/GroupLabel'

const CreateUser: FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [revealPassword, setRevealPassword] = useState(false)

  const handleRevealPassword = () => {
    setRevealPassword(prev => !prev)
  }

  const passwordIcon = (
    <EyeClosed size={20} weight='bold' className='text-[--textSecondary]' />
  )

  const passwordIconShow = (
    <Eye size={20} weight='bold' className='text-[--textSecondary]' />
  )

  return (
    <div className='flex flex-col gap-6 bg-[--backgroundSecondary] sm:pr-3 pb-8 sm:pb-3 w-full lg:h-[calc(100vh-50px)] overflow-auto'>
      <div className='relative flex flex-col items-start gap-6 bg-[--backgroundPrimary] sm:rounded-xl w-full h-full'>
        <div className='flex justify-between items-center gap-3 p-6 w-full'>
          <div className='flex flex-row items-center gap-3'>
            <Link
              href='/usuario'
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
              value={name}
              position='right'
              onChange={e => setName(e.target.value)}
            />

            <FormInput
              name='mail'
              label='E-mail'
              required={false}
              type='mail'
              value={username}
              position='right'
              onChange={e => setUsername(e.target.value)}
            />

            <FormInput
              name='password'
              label='Senha'
              required={false}
              type='password'
              reveal={revealPassword}
              value={password}
              onChange={e => setPassword(e.target.value)}
              position='right'
              icon={revealPassword ? passwordIconShow : passwordIcon}
              actionButton={handleRevealPassword}
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

export default CreateUser
