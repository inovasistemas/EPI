import { useState } from 'react'
import { PasswordInput } from '@/components/Inputs/Password'
import { FormInput } from '@/components/Inputs/Text/FormInput'
import { ActionGroupSave } from '@/components/Surfaces/ActionGroupSave'

type PasswordSettingsProps = {
  actionModal: () => void
}

export function PasswordSettings({ actionModal }: PasswordSettingsProps) {
  const [operatorData, setOperatorData] = useState({
    currentPassword: '',
    newPassword: '',
  })

  const [hasChanges, setHasChanges] = useState(false)

  const handleChange = (name: string, value: string | boolean) => {
    const newData = {
      ...operatorData,
      [name]: value,
    }

    setOperatorData(newData)

    const changed = newData.currentPassword !== '' && newData.newPassword !== ''

    setHasChanges(changed)
  }

  return (
    <div className='relative flex flex-col w-full h-full'>
      <div className='flex flex-col px-6 divide-y divide-[--border] h-full overflow-y-auto'>
        <div className='py-6 select-none'>
          <h2 className='font-medium text-xl leading-none'>
            Senha e segurança
          </h2>
          <span className='opacity-60 text-[--textSecondary] text-sm'>
            Altere ou recupere sua senha para manter sua conta segura.
          </span>
        </div>

        <div className='flex flex-col gap-6 pt-8'>
          <div className='gap-3 grid grid-cols-2'>
            <PasswordInput
              name='currentPassword'
              label='Senha atual'
              value={operatorData.currentPassword}
              onChange={e => handleChange('currentPassword', e.target.value)}
            />

            <PasswordInput
              name='newPassword'
              label='Nova senha'
              value={operatorData.newPassword}
              onChange={e => handleChange('newPassword', e.target.value)}
            />
          </div>
        </div>
      </div>

      <ActionGroupSave actionDisabled={!hasChanges} onClick={actionModal} />
    </div>
  )
}
