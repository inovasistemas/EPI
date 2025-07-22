'use client'
import Cookies from 'cookies-js'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { CustomAlert } from '@/components/Display/CustomAlert'
import { Logo } from '@/components/Display/Logo'
import { PrimaryButton } from '@/components/Inputs/Button/Primary'
import { PasswordInput } from '@/components/Inputs/Password'
import { FormInput } from '@/components/Inputs/Text/FormInput'
import useUser from '@/lib/context/user'
import { isUserRegistered, postAuth } from '@/services/Login'

type OperatorEnterprise = {
  enterprise_uuid: string
  name: string
  password: string
  permission_group: string
  user_uuid: string
  username: string
}

export function LoginForm() {
  const [formData, setFormData] = useState<OperatorEnterprise>({
    enterprise_uuid: '',
    name: '',
    password: '',
    permission_group: '',
    user_uuid: '',
    username: '',
  })

  const [alertState, setAlertState] = useState(false)
  const [alertText, setAlertText] = useState('')
  const [alertUUID, setAlertUUID] = useState('')
  const [height, setHeight] = useState(0)
  const [step, setStep] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const setUser = useUser(state => state.setUser)

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  useEffect(() => {
    if (containerRef.current) {
      setHeight(containerRef.current.scrollHeight)
    }
  }, [])

  const handleNext = async () => {
    if (step === 0) {
      const response = await isUserRegistered({
        username: formData.username,
      })
      if (response && response.status === 200) {
        handleChange('name', response.data.data.user.name)
        setStep(prev => Math.min(prev + 1, 2))
      } else if (response && response.status === 403) {
        setAlertText('Não conseguimos encontrar esse usuário.')
        setAlertState(true)
        setAlertUUID(uuidv4())
      } else {
        setAlertText('Não foi possível buscar o usuário no momento.')
        setAlertState(true)
        setAlertUUID(uuidv4())
      }
    }

    if (step === 1) {
      const response = await postAuth({
        username: formData.username,
        password: formData.password,
      })

      if (response && response.status === 200) {
        handleChange('user_uuid', response.data.data.user.uuid)
        handleChange(
          'permission_group',
          response.data.data.user.permission_group_uuid
        )

        setUser(formData.name, formData.permission_group)

        Cookies.set(
          'authToken',
          Buffer.from(
            JSON.stringify({
              enterprise: '',
              name: formData.name,
              permission_group: formData.permission_group,
              user: formData.user_uuid,
            }),
            'binary'
          ).toString('base64'),
          { expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) }
        )

        router.push('/painel')
      } else if (response && response.status === 401) {
        setAlertText('Usuário ou senha incorretos.')
        setAlertState(true)
      } else if (response && response.status === 400) {
        setAlertText('Os dados informados não são válidos.')
        setAlertState(true)
      } else {
        setAlertText('Erro ao autenticar o usuário.')
        setAlertState(true)
      }
    }
  }

  const handleBack = () => {
    setStep(prev => Math.max(prev - 1, 0))

    if (step === 1) {
      handleChange('password', '')
      handleChange('user_uuid', '')
      handleChange('permission_group', '')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleNext()
    }
  }

  const handleDisabled = () => {
    if (step === 0) {
      return !(formData.username.length > 2)
    }
    if (step === 1) {
      return !(formData.password.length > 0)
    }
    return false
  }

  const handleAlert = () => {
    setAlertState(false)
  }

  return (
    <div className='flex justify-center items-center w-full h-full'>
      <AnimatePresence mode='wait'>
        {alertState && (
          <CustomAlert
            key={alertUUID}
            text={alertText}
            state={alertState}
            action={handleAlert}
          />
        )}
      </AnimatePresence>

      <motion.div
        animate={{ height: step === 0 ? height + 300 : height + 230 }}
        initial={{ height: 300 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className='relative flex flex-col gap-6 p-8 rounded-xl w-full lg:w-3/4 h-full overflow-hidden'
      >
        <div className='flex justify-center items-center py-6'>
          <Logo width={110} />
        </div>

        <div ref={containerRef} className='w-full'>
          {step === 0 && (
            <motion.div
              key='cnpj'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className='flex flex-col gap-3'
            >
              <FormInput
                name='username'
                label='Seu usuário'
                required={false}
                type='text'
                value={formData.username}
                position='right'
                onChange={e => handleChange('username', e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </motion.div>
          )}
          {step === 1 && (
            <motion.div
              key='password'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className='flex flex-col gap-3'
            >
              <div className='flex justify-start items-center gap-2'>
                <span className='font-semibold text-lef text-base capitalize'>
                  {formData.name.toLocaleLowerCase()}
                </span>
                <button
                  type='button'
                  onClick={handleBack}
                  className='font-medium text-[--primaryColor] hover:text-[--secondaryColor] text-base transition-all duration-300 select-none'
                >
                  Trocar usuário
                </button>
              </div>
              <PasswordInput
                label='Sua senha'
                value={formData.password}
                onChange={e => handleChange('password', e.target.value)}
              />
            </motion.div>
          )}
        </div>

        {step === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className='flex flex-col gap-3'
          >
            <p className='text-[--textSecondary] text-sm'>
              Não está no seu computador? Acesse com uma janela anônima para
              maior segurança.
            </p>
          </motion.div>
        )}

        <div className='flex justify-end gap-3 w-full transition-all duration-300'>
          <div className='w-full sm:w-auto sm:max-w-32'>
            <PrimaryButton
              name='primary'
              action={handleNext}
              type='button'
              text={step === 2 ? 'Entrar' : 'Avançar'}
              disabled={handleDisabled()}
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
