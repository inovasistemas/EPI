import { ActionGroupSave } from '@/components/Surfaces/ActionGroupSave'
import { FormInput } from '@/components/Inputs/Text/FormInput'
import { ToastError } from '@/components/Template/Toast/Error'
import { getUserMe, updateUser } from '@/services/User'
import { toast } from 'sonner'
import { useEffect, useRef, useState } from 'react'
import { ToastSuccess } from '../Toast/Success'

type UserMeType = {
  uuid: string
  name: string
  email: string
  is_active: boolean
  permission_group: boolean
  notifications_enabled: boolean
  created_at: string
  updated_at: string
}

export function PersonalDetailsSettings() {
  const [operatorData, setOperatorData] = useState<UserMeType | null>(null)
  const [isOn, setIsOn] = useState(operatorData?.notifications_enabled ?? false)
  const fetchedUserMe = useRef(false)

  const [customOperatorData, setCustomOperatorData] = useState({
    name: operatorData?.name ?? '',
    email: operatorData?.email ?? '',
    notifications_enabled: operatorData?.notifications_enabled ?? false,
  })

  const [hasChanges, setHasChanges] = useState(false)

  const handleUpdateUser = async () => {
    const response = await updateUser({
      id: operatorData?.uuid || '',
      email: customOperatorData?.email.toLocaleUpperCase() || '',
      name: customOperatorData?.name.toLocaleUpperCase() || '',
    })

    if (response && response.status === 200) {
      fetchedUserMe.current = false
      fetchUser()
      setHasChanges(false)

      toast.custom(() => (
        <ToastSuccess text='Dados pessoais atualizados com sucesso' />
      ))
    } else {
      toast.custom(() => <ToastError text='Erro ao atualizar dados pessoais' />)
    }
  }

  const handleChange = (name: string, value: string | boolean) => {
    const newData = {
      ...customOperatorData,
      [name]: value,
    }

    setCustomOperatorData(newData)

    const changed =
      newData.name !== operatorData?.name ||
      newData.email !== operatorData?.email ||
      newData.notifications_enabled !== operatorData?.notifications_enabled

    setHasChanges(changed)
  }

  const fetchUser = async () => {
    const response = await getUserMe()

    if (response && response.status === 200) {
      setOperatorData(response.data[0])
      setCustomOperatorData(response.data[0])
      setIsOn(response.data[0].notifications_enabled ?? false)
    } else {
      toast.custom(() => <ToastError text='Erro ao buscar dados do usuário' />)
    }
  }

  useEffect(() => {
    if (fetchedUserMe.current) return
    fetchedUserMe.current = true
    fetchUser()
  }, [])

  return (
    <div className='relative flex flex-col w-full h-full'>
      <div className='flex flex-col px-6 divide-y divide-[--border] h-full overflow-y-auto'>
        <div className='py-6 select-none'>
          <h2 className='font-medium text-xl leading-none'>Dados pessoais</h2>
          <span className='opacity-60 text-[--textSecondary] text-sm'>
            Edite seus dados pessoais e mantenha seu perfil atualizado.
          </span>
        </div>

        <div className='gap-3 grid grid-cols-2 pt-8'>
          <FormInput
            name='name'
            label='Nome'
            required={false}
            type='text'
            value={customOperatorData.name.toLocaleLowerCase()}
            position='right'
            onChange={e => handleChange('name', e.target.value)}
            textTransform='capitalize'
          />

          <FormInput
            name='email'
            label='E-mail'
            required={false}
            type='text'
            value={customOperatorData.email}
            position='right'
            onChange={e => handleChange('email', e.target.value)}
            textTransform='lowercase'
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
                    handleChange('notifications_enabled', !isOn)
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

      <ActionGroupSave
        actionDisabled={!hasChanges}
        onClick={handleUpdateUser}
      />
    </div>
  )
}
