'use client'
import Cookies from 'cookies-js'
import DocumentInput from '@/components/Inputs/Text/Document'
import React, { useState, useEffect, useRef, FC } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { v4 as uuidv4 } from 'uuid'
import { CustomAlert } from '@/components/Display/CustomAlert'
import { EyeIcon } from '@/components/Display/Icons/Eye'
import { EyeSlashIcon } from '@/components/Display/Icons/EyeSlash'
import { FormInput } from '@/components/Inputs/Text/FormInput'
import { PrimaryButton } from '@/components/Inputs/Button/Primary'
import { isUserRegistered, postAuth } from '@/services/Login'
import { useRouter } from 'next/navigation'
import useUser from '@/lib/context/user'
import { useTheme } from 'next-themes'
import { Logo } from '@/components/Display/Logo'
import { permission } from 'process'
import { Eye, EyeSlash } from '@phosphor-icons/react'

type User = {
  id: string
  name: string
  permissions: string
}

export function LoginForm() {
  const [alertState, setAlertState] = useState(false)
  const [alertText, setAlertText] = useState('')
  const [alertUUID, setAlertUUID] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [height, setHeight] = useState(0)
  const [password, setPassword] = useState('')
  const [revealPassword, setRevealPassword] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User>()
  const [step, setStep] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [users, setUsers] = useState<User[]>([])
  const [storeName, setStoreName] = useState('')
  const [storeId, setStoreId] = useState(0)
  const router = useRouter()
  const setUser = useUser(state => state.setUser)

  const isDark = useTheme().resolvedTheme === 'dark'

  useEffect(() => {
    if (containerRef.current) {
      setHeight(containerRef.current.scrollHeight)
    }
  }, [step])

  const handleRevealPassword = () => {
    setRevealPassword(prev => !prev)
  }

  const handleNext = async () => {
    if (step == 0) {
      const response = await isUserRegistered({
        username: cnpj,
      })
      if (response && response.status === 200) {
        setSelectedUser({
          id: '',
          name: response.data.data.user.name,
          permissions: '',
        })

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

    if (step == 1) {
      const response = await postAuth({
        username: cnpj,
        password: password,
      })

      console.log(response)

      if (response && response.status === 200) {
        setSelectedUser({
          id: response.data.data.user.uuid,
          name: selectedUser!.name,
          permissions: response.data.data.user.permission_group,
        })
        setUser(selectedUser!.name, selectedUser!.permissions)

        Cookies.set(
          'authToken',
          Buffer.from(
            JSON.stringify({
              user: selectedUser!.id,
              permissions: selectedUser!.permissions,
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

    if (step == 1) {
      setRevealPassword(false)
      setPassword('')
      setSelectedUser(undefined)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleNext()
    }
  }

  const passwordIcon = (
    <EyeSlashIcon
      height='h-5'
      width='w-5'
      stroke='stroke-[--textSecondary]'
      fill='fill-[--textSecondary]'
    />
  )

  const passwordIconShow = (
    <EyeIcon height='h-5' width='w-5' stroke='stroke-[--textSecondary]' />
  )

  const isNextDisabled = () => {
    if (step === 0) {
      return !(cnpj.length > 2)
    }
    if (step === 1) {
      return !selectedUser
    }
    if (step === 2) {
      return !password
    }
    return false
  }

  const teste = () => {
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
            action={teste}
          />
        )}
      </AnimatePresence>

      <motion.div
        animate={{ height: step === 0 ? height + 300 : height + 230 }}
        initial={{ height: 300 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className='relative flex flex-col gap-6 p-8 rounded-md w-full lg:w-3/4 h-full overflow-hidden'
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
              <DocumentInput
                name='document'
                label='Seu usuário'
                required={false}
                onChange={setCnpj}
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
                  {selectedUser?.name.toLocaleLowerCase()}
                </span>
                <button
                  onClick={handleBack}
                  className='font-medium text-primary hover:text-primaryDarker text-base transition-all duration-150 select-none'
                >
                  Trocar usuário
                </button>
              </div>
              <FormInput
                name='password'
                label='Sua senha'
                required={false}
                type='password'
                reveal={revealPassword}
                value={password}
                onChange={e => setPassword(e.target.value)}
                position='right'
                icon={revealPassword ? passwordIconShow : passwordIcon}
                actionButton={handleRevealPassword}
                onKeyDown={handleKeyDown}
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

        <div className='right-0 bottom-0 absolute flex justify-end gap-3 p-6 w-full transition-all duration-150'>
          <div className='w-full sm:w-auto sm:max-w-32'>
            <PrimaryButton
              name='primary'
              action={handleNext}
              type='button'
              text={step === 2 ? 'Entrar' : 'Avançar'}
              disabled={isNextDisabled()}
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
