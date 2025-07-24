import { useState } from 'react'
import { FormInput } from '@/components/Inputs/Text/FormInput'
import { ActionGroupSave } from '@/components/Surfaces/ActionGroupSave'

type PersonalDetailsSettingsProps = {
  actionModal: () => void
}

export function PersonalDetailsSettings({
  actionModal,
}: PersonalDetailsSettingsProps) {
  const [operatorData, setOperatorData] = useState({
    name: 'João Felipe Gomes',
    email: 'teste@inovasistemas.com.br',
    notifications: true,
  })
  const [isOn, setIsOn] = useState(operatorData.notifications)

  const [customOperatorData, setCustomOperatorData] = useState({
    name: operatorData.name,
    email: operatorData.email,
    notifications: operatorData.notifications,
  })

  const [hasChanges, setHasChanges] = useState(false)

  const handleChange = (name: string, value: string | boolean) => {
    const newData = {
      ...customOperatorData,
      [name]: value,
    }

    setCustomOperatorData(newData)

    const changed =
      newData.name !== operatorData.name ||
      newData.email !== operatorData.email ||
      newData.notifications !== operatorData.notifications

    setHasChanges(changed)
  }

  return (
    <div className='relative flex flex-col w-full h-full'>
      <div className='flex flex-col px-6 divide-y divide-[--border] h-full overflow-y-auto'>
        <div className='py-6 select-none'>
          <h2 className='font-medium text-xl'>Dados pessoais</h2>
        </div>

        <div className='gap-3 grid grid-cols-2 pt-8'>
          <FormInput
            name='name'
            label='Nome'
            required={false}
            type='text'
            value={customOperatorData.name}
            position='right'
            onChange={e => handleChange('name', e.target.value)}
          />

          <FormInput
            name='email'
            label='E-mail'
            required={false}
            type='text'
            value={customOperatorData.email}
            position='right'
            onChange={e => handleChange('email', e.target.value)}
          />

          <div className='col-span-full pt-6'>
            <div className='flex flex-row justify-between items-center gap-1 bg-[--backgroundSecondary] p-3 rounded-2xl w-full'>
              <div className='flex flex-col gap-1 p-3'>
                <span className='font-medium text-sm'>
                  Receber notificações no meu e-mail cadastrado
                </span>
                <span className='opacity-60 text-[--textSecondary] text-sm'>
                  Escolha se deseja receber notificações importantes no e-mail
                  que você cadastrou. Essa opção garante que você fique por
                  dentro de atualizações e avisos diretamente na sua caixa de
                  entrada.
                </span>
              </div>

              <div className='flex justify-end items-center min-w-16'>
                <button
                  type='button'
                  onClick={() => {
                    handleChange('notifications', !isOn)
                    setIsOn(!isOn)
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setIsOn(!isOn)
                    }
                  }}
                  aria-pressed={isOn}
                  className={`w-10 h-6 flex items-center bg-[--buttonPrimary] rounded-full p-1 cursor-pointer transition-colors ${
                    isOn ? '!bg-primary' : ''
                  }`}
                  tabIndex={0}
                >
                  <div
                    className={`bg-[--backgroundPrimary] w-5 h-5 rounded-full shadow-md transform transition-transform ${
                      isOn ? 'translate-x-[13px]' : '-translate-x-[1px]'
                    }`}
                  ></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ActionGroupSave actionDisabled={!hasChanges} onClick={actionModal} />
    </div>
  )
}
