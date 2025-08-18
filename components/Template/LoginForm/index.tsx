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
import {
  checkTwoFactorAuthentication,
  isUserRegistered,
  postAuth,
  setTwoFactorAuthentication,
} from '@/services/Login'
import QRCode from 'react-qr-code'
import { SecurityCodeSimple } from '../SecurityCodeSimples'
import { SecondaryButton } from '@/components/Buttons/SecondaryButton'

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

  const [alertState, setAlertState] = useState(false)
  const [alertText, setAlertText] = useState('')
  const [alertUUID, setAlertUUID] = useState('')
  const [height, setHeight] = useState(0)
  const [step, setStep] = useState(0)
  const [qrCodeUri, setQrCodeUri] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)
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
        email: formData.username,
      })
      if (response && response.status === 200) {
        handleChange('name', response.data.name)
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
        email: formData.username,
        password: formData.password,
      })

      setUser(formData.name, formData.permission_group)

      if (response && response.status === 200) {
        handleChange('user_uuid', response.data.uuid)
        handleChange('permission_group', response.data.permission_group)
        handleChange(
          'required_2fa_configuration',
          response.data.required_2fa_configuration
        )

        if (response.data.required_2fa_configuration === true) {
          const response = await setTwoFactorAuthentication()

          if (response && response.data && response.data.uri) {
            setQrCodeUri(response.data.uri)
            handleChange('security_code_secret', response.data.secret)
          }
        }

        setStep(prev => Math.min(prev + 1, 2))
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

    // if (step === 2) {
    //   const response = await checkTwoFactorAuthentication({
    //     code: formData.security_code,
    //   })

    //   if (response && response.status === 204) {
    //     Cookies.set(
    //       'authToken',
    //       Buffer.from(
    //         JSON.stringify({
    //           enterprise: '',
    //           name: formData.name,
    //           permission_group: formData.permission_group,
    //           user: formData.user_uuid,
    //         }),
    //         'binary'
    //       ).toString('base64'),
    //       { expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) }
    //     )

    //     router.push('/painel')
    //   } else {
    //     setAlertText('Erro ao verificar o código.')
    //     setAlertState(true)
    //   }
    // }
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
    if (step === 2) {
      return !(formData.security_code.length === 6)
    }
    return false
  }

  const handleAlert = () => {
    setAlertState(false)
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
          setAlertText('Erro ao verificar o código.')
          setAlertState(true)
        }
      }
    }
    checkCode()
  }, [formData.security_code])

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
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className='relative flex flex-col justify-center gap-6 p-8 rounded-xl w-full lg:w-3/4 h-full'
      >
        {step < 2 && (
          <div className='flex justify-center items-center py-6'>
            <Logo width={110} />
          </div>
        )}

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
          {step === 2 && (
            <motion.div
              key='twofactorauthentication'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className='flex flex-col gap-6'
            >
              <span className='justify-start items-start w-full font-medium text-lg text-left'>
                {formData.required_2fa_configuration
                  ? 'Configurar Aplicativo Autenticador'
                  : 'Autenticação de 2 Fatores'}
              </span>
              {formData.required_2fa_configuration && (
                <span className='text-sm'>
                  Cada vez que você fizer login, além da sua senha, você usará
                  um aplicativo autenticador para gerar um código de uso único.
                </span>
              )}

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
              <SecurityCodeSimple onChange={handleChangeSecurityCode} />

              {formData.required_2fa_configuration === false && (
                <div className='flex justify-end'>
                  <SecondaryButton label='Voltar' onClick={handleBack} />
                </div>
              )}

              {/* <FormInput
                name='security_code'
                label='Código'
                required={false}
                type='text'
                value={formData.security_code}
                position='right'
                onChange={e => }
                onKeyDown={handleKeyDown}
                maxLength={6}
              /> */}
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
          <div className='flex justify-end gap-3 w-full transition-all duration-300'>
            <div className='w-full sm:w-auto sm:max-w-36'>
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
