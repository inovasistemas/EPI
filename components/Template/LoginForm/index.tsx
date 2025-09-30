'use client'
import Cookies from 'cookies-js'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { Logo } from '@/components/Display/Logo'
import { PrimaryButton } from '@/components/Inputs/Button/Primary'
import { PasswordInput } from '@/components/Inputs/Password'
import { FormInput } from '@/components/Inputs/Text/FormInput'
import useUser from '@/lib/context/user'
import {
  checkTwoFactorAuthentication,
  isUserRegistered,
  postAuth,
  setTwoFactorAuthentication,
} from '@/services/Login'
import QRCode from 'react-qr-code'
import { SecurityCodeSimple } from '../SecurityCodeSimples'
import { SecurityIcon } from '@/components/Display/Icons/Security'
import classNames from 'classnames'
import { toast } from 'sonner'
import { ToastError } from '../Toast/Error'
import { LoadingIcon } from '@/components/Display/Icons/Loading'

type OperatorEnterprise = {
  enterprise_uuid: string
  name: string
  password: string
  permission_group: string
  user_uuid: string
  username: string
  security_code: string
  security_code_secret: string
  required_2fa_configuration: boolean
}

export function LoginForm() {
  const [formData, setFormData] = useState<OperatorEnterprise>({
    enterprise_uuid: '',
    name: '',
    password: '',
    permission_group: '',
    user_uuid: '',
    username: '',
    security_code: '',
    security_code_secret: '',
    required_2fa_configuration: false,
  })

  const [height, setHeight] = useState(0)
  const [step, setStep] = useState(0)
  const [qrCodeUri, setQrCodeUri] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const setUser = useUser(state => state.setUser)

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleChangeSecurityCode = (value: string) => {
    setFormData(prev => ({
      ...prev,
      ['security_code']: value,
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
        email: formData.username, loading: setLoading
      })
      if (response && response.status === 200 && response.data.name) {
        handleChange('name', response.data.name)
        setStep(prev => Math.min(prev + 1, 2))
      } else if (response && !response.data.name) {
        toast.custom(() => (
          <ToastError text='Não conseguimos encontrar esse usuário' />
        ))
      } else {
        toast.custom(() => (
          <ToastError text='Não foi possível buscar o usuário no momento' />
        ))
      }
    }

    if (step === 1) {
      const response = await postAuth({
        email: formData.username,
        password: formData.password,
        loading: setLoading
      })

      if (response && response.status === 200) {
        setUser(
          formData.name,
          formData.permission_group,
          response.data.enterprise
        )

        handleChange('user_uuid', response.data.uuid)
        handleChange('permission_group', response.data.permission_group)
        handleChange(
          'required_2fa_configuration',
          response.data.required_2fa_configuration
        )

        if (response.data.required_2fa_configuration === true) {
          const response = await setTwoFactorAuthentication({loading: setLoading})

          if (response && response.data && response.data.uri) {
            setQrCodeUri(response.data.uri)
            handleChange('security_code_secret', response.data.secret)
          }
        }

        setStep(prev => Math.min(prev + 1, 2))
      } else if (response && response.status === 400) {
        toast.custom(() => <ToastError text='Usuário ou senha incorretos' />)
      } else if (response && response.status === 401) {
        toast.custom(() => (
          <ToastError text='Os dados informados não são válidos' />
        ))
      } else {
        toast.custom(() => (
          <ToastError text='Não foi possível autenticar o usuário' />
        ))
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
    if (loading) {
      return true
    }

    if (step === 0) {
      return !(formData.username.length > 2)
    }
    if (step === 1) {
      return !(formData.password.length > 0)
    }
    if (step === 2) {
      return !(formData.security_code.length === 6)
    }
    return false
  }

  const handleCopyToClipboard = async () => {
    await navigator.clipboard.writeText(formData.security_code_secret)
    setCopied(true)
  }

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined
    if (copied) {
      timer = setTimeout(() => setCopied(false), 3000)
    }
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [copied])

  useEffect(() => {
    const checkCode = async () => {
      if (formData.security_code.length === 6) {
        const response = await checkTwoFactorAuthentication({
          code: formData.security_code,
          loading: setLoading
        })

        if (response && response.status === 204) {
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
        } else {
          toast.custom(() => (
            <ToastError text='Não foi possível verificar o código de segurança. Por favor, tente novamente' />
          ))
        }
      }
    }
    checkCode()
  }, [formData.security_code])

  return (
    <div className='flex justify-center items-center w-full h-full'>
      <motion.div
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className='relative flex flex-col justify-center gap-6 p-6 sm:p-8 rounded-xl w-full lg:w-3/4 h-full'
      >
        {step < 2 && (
          <div className='flex justify-center items-center'>
            <Logo width={110} />
          </div>
        )}

        <div
          ref={containerRef}
          className={classNames(
            {
              'h-full': step === 2,
            },
            'w-full'
          )}
        >
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
                  {formData.name?.split(' ')[0].toLocaleLowerCase()}
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
                onKeyDown={handleKeyDown}
              />
            </motion.div>
          )}
          {step === 2 && (
            <motion.div
              key='twofactorauthentication'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className='flex flex-col justify-center gap-6 h-full overflow-auto'
            >
              <div className='flex flex-row items-center gap-3'>
                <SecurityIcon
                  size='size-5'
                  stroke='stroke-[--iconPrimaryColor]'
                />
                <span className='justify-start items-start w-full font-medium text-lg text-left'>
                  {formData.required_2fa_configuration
                    ? 'Configurar Aplicativo Autenticador'
                    : 'Autenticação de 2 Fatores'}
                </span>
              </div>

              {formData.required_2fa_configuration && (
                <div className='bg-[--tableRow] flex flex-col justify-center items-center gap-6 p-4 rounded-xl'>
                  <div className='flex flex-row items-center gap-6 w-full'>
                    <div className='flex flex-col gap-2 rounded w-full'>
                      <span className='text-sm'>
                        Escaneie o QR code ou insira manualmente a chave no seu
                        aplicativo autenticador
                      </span>
                      <button
                        onClick={handleCopyToClipboard}
                        className={`w-40 justify-center items-center px-8 py-1.5 rounded-lg font-medium text-white text-sm active:scale-95 transition-all duration-300 select-none
        ${copied ? 'bg-green-600' : 'bg-[--primaryColor] hover:bg-[--secondaryColor]'}
      `}
                        disabled={copied}
                      >
                        {copied ? 'Copiado' : 'Copiar Chave'}
                      </button>
                    </div>
                    <div className='flex justify-center items-center'>
                      <QRCode
                        value={qrCodeUri}
                        className='rounded w-24 min-w-24 h-24'
                        bgColor='var(--tableRow)'
                      />
                    </div>
                  </div>
                </div>
              )}

              <span className='text-sm'>
                Insira o código de 6 dígitos que você vê no seu aplicativo
                autenticador
              </span>

              <div className='w-full overflow-hidden'>
                <SecurityCodeSimple onChange={handleChangeSecurityCode} />
              </div>

              {step === 2 && (
                <div className='flex justify-end items-center gap-3 w-full transition-all duration-300'>
                  <AnimatePresence>
                    {loading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className='flex flex-col gap-3'
                    >
                      <LoadingIcon size='size-6' stroke='stroke-[--textSecondary]' strokeWidth={2}  />
                    </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type='button'
                    onClick={() => handleBack()}
                    disabled={handleDisabled()}
                    className={classNames(
                      'px-8 py-2.5 group z-[55] relative flex justify-center items-center gap-3 bg-[--buttonPrimary] hover:bg-[--buttonSecondary] sm:w-auto w-full rounded-xl text-[--textSecondary] active:scale-95 transition-all duration-300 cursor-pointer select-none'
                    )}
                  >
                    <span className='font-medium'>Voltar</span>
                  </button>
                </div>
              )}
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

        {step <= 1 && (
          <div className='flex justify-end items-center gap-3 w-full transition-all duration-300'>
              <AnimatePresence>
                {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className='flex flex-col gap-3'
                >
                  <LoadingIcon size='size-6' stroke='stroke-[--textSecondary]' strokeWidth={2}  />
                </motion.div>
                )}
              </AnimatePresence>
            
            <div className='flex w-full sm:max-w-36'>
              <PrimaryButton
                name='primary'
                action={handleNext}
                type='button'
                text={
                  step === 0 ? 'Continuar' : step === 1 ? 'Entrar' : 'Verificar'
                }
                disabled={handleDisabled()}
              />
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
