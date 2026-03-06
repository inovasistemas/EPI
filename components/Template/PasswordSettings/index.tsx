import { SecondaryButton } from '@/components/Buttons/SecondaryButton'
import { FloppyDiskIcon } from '@/components/Display/Icons/FloppyDisk'
import { SecurityIcon } from '@/components/Display/Icons/Security'
import { SettingsIcon } from '@/components/Display/Icons/Settings'
import { TrashIcon } from '@/components/Display/Icons/Trash'
import { Modal } from '@/components/Display/Modal'
import { PasswordInput } from '@/components/Inputs/Password'
import { ActionGroupSave } from '@/components/Surfaces/ActionGroupSave'
import { checkTwoFactorAuthentication, deleteTwoFactorAuthentication, setTwoFactorAuthentication } from '@/services/Login'
import { getUserMe, updateUserMePassword } from '@/services/User'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import QRCode from 'react-qr-code'
import { toast } from 'sonner'
import { SecurityCodeSimple } from '../SecurityCodeSimples'
import { ToastError } from '../Toast/Error'
import { ToastSuccess } from '../Toast/Success'

type PasswordSettingsProps = {
  onChange: (value: string) => void
  oldPasswordChange: (value: string) => void
  actionModal: () => void
}

export function PasswordSettings({
  onChange,
  oldPasswordChange,
  actionModal,
}: PasswordSettingsProps) {
  const fetchedUserMe = useRef(false)
  const [modalStatus, setModalStatus] = useState(false)
  const [modalAlertStatus, setModalAlertStatus] = useState(false)
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)
  const [qrCodeUri, setQrCodeUri] = useState('')

  const [operatorData, setOperatorData] = useState({
    currentPassword: '',
    newPassword: '',
    twoFactorAuthenticationInUse: true,
    securityCodeSecret: '',
    securityCode: ''
  })

  const [hasChanges, setHasChanges] = useState(false)

  const handlePasswordChange = async () => {
    const response = await updateUserMePassword({
      code: '999999',
      oldPassword: operatorData.currentPassword,
      password: operatorData.newPassword,
      loading: setLoading
    })

    if (response && response.status === 204) {
      toast.custom(() => <ToastSuccess text='Senha atualizada com sucesso' />)
    } else if (response && response.status === 401) {
      toast.custom(() => (
        <ToastError text='A senha atual informada está incorreta' />
      ))
    } else {
      toast.custom(() => (
        <ToastError text='Não foi possível atualizar a senha' />
      ))
    }
  }

  const handleCloseModal = useCallback(() => {
    setModalStatus((prev) => !prev);
  }, []);

  const handleTwoFactorAuthenticationCreate = async () => {
    const response = await setTwoFactorAuthentication({loading: setLoading})
    
    if (response && response.data && response.data.uri) {
      setQrCodeUri(response.data.uri)
      handleChange('securityCodeSecret', response.data.secret)
    }

    handleCloseModal()
  }

  const handleCopyToClipboard = async () => {
    await navigator.clipboard.writeText(operatorData.securityCodeSecret)
    setCopied(true)
  }

  const handleChange = (name: string, value: string | boolean) => {
    const newData = {
      ...operatorData,
      [name]: value,
    }

    setOperatorData(newData)
    oldPasswordChange(newData.currentPassword)
    onChange(newData.newPassword)

    const changed = newData.currentPassword !== '' && newData.newPassword !== ''

    setHasChanges(changed)
  }

  const handleChangeOperator = (name: string, value: string | boolean) => {
    const newData = {
      ...operatorData,
      [name]: value,
    }

    setOperatorData(newData)
  }

  const handleSetTwoFactorAuthentication = async () => {
    if (operatorData.securityCode.length === 6) {
      const response = await checkTwoFactorAuthentication({
        code: operatorData.securityCode,
        loading: setLoading
      })

      if (response && response.status === 204) {
        toast.custom(() => (
          <ToastSuccess text='Autenticação 2FA habilitada com sucesso' />
        ))

        handleCloseModal()
        fetchUser()
      } else {
        toast.custom(() => (
          <ToastError text='Não foi possível verificar o código de segurança. Por favor, tente novamente' />
        ))
      }
    }
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

  const fetchUser = async () => {
    const response = await getUserMe({loading: setLoading})

    if (response && response.status === 200) {
      handleChangeOperator('twoFactorAuthenticationInUse', response.data[0].two_factor_authentication_in_use)
    } else {
      toast.custom(() => (
        <ToastError text='Não foi possível buscar os dados do usuário' />
      ))
    }
  }

  const handleChangeSecurityCode = (value: string) => {
    setOperatorData(prev => ({
      ...prev,
      ['securityCode']: value,
    }))
  }

  const handleDeleteTwoFactorAuthentication = async () => {
    const response = await deleteTwoFactorAuthentication({loading: setLoading})
    
    if (response && response.status === 204) {
      toast.custom(() => (
        <ToastSuccess text='Autenticação em duas etapas desativada com sucesso' />
      ))

      handleCloseModal()
      fetchUser()
    } else {
      toast.custom(() => (
        <ToastError text='Não foi possível desativar a autenticação em duas etapas dessa conta' />
      ))
    }
  }

  const handleCloseModalAlert = () => {
    setModalAlertStatus(prev => !prev)
  }

  useEffect(() => {
    if (fetchedUserMe.current) return
    fetchedUserMe.current = true
    fetchUser()
  }, [])

  return (
    <div className='relative flex flex-col w-full h-full'>
      <Modal
        title=''
        size='extra-small'
        isModalOpen={modalAlertStatus}
        handleClickOverlay={handleCloseModalAlert}
        showClose={false}
      >
        <div className='flex flex-col gap-2'>
          <span className='font-medium text-xl text-center'>
            Tem certeza que deseja desativar o 2FA?
          </span>
          <span className='px-6 text-base text-center'>
            A autenticação em duas etapas será removida da sua conta e sua segurança pode ser reduzida.
          </span>

          <div className='flex flex-row justify-center gap-3 pt-6'>
            <button
              onClick={handleDeleteTwoFactorAuthentication}
              type='button'
              className='group group z-[55] relative flex justify-center items-center gap-3 bg-[--errorLoader] px-8 rounded-xl h-10 text-white active:scale-95 transition-all duration-300 cursor-pointer select-none'
            >
              <span className='font-medium text-white text-sm transition-all duration-300'>
                Confirmar
              </span>
            </button>

            <button
              type='button'
              onClick={handleCloseModalAlert}
              className='group z-[55] relative flex justify-center items-center gap-3 bg-[--buttonPrimary] hover:bg-[--buttonSecondary] px-8 rounded-xl h-10 text-white active:scale-95 transition-all duration-300 cursor-pointer select-none'
            >
              <span className='font-medium text-[--textSecondary] text-sm'>
                Cancelar
              </span>
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        title="Autenticação 2FA"
        size="small"
        isModalOpen={modalStatus}
        handleClickOverlay={handleCloseModal}
      >
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
            <span className='justify-start items-start w-full font-medium text-xl text-left'>
              Configurar Aplicativo Autenticador
            </span>
          </div>
          
          <div className='flex flex-col justify-center items-center gap-6 bg-[--tableRow] p-4 rounded-xl'>
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
                  {copied ? 'Copiado' : 'Copiar chave'}
                </button>
              </div>
              <div className='flex justify-center items-center'>
                <QRCode
                  value={qrCodeUri}
                  className='rounded w-24 min-w-24 h-24'
                  bgColor='var(--tableRow)'
                  fgColor='var(--alertText)'
                />
              </div>
            </div>
          </div>

          <span className='text-sm text-center'>
            Insira o código de 6 dígitos que você vê no seu aplicativo
            autenticador
          </span>

          <div className='flex justify-center items-center w-full'>
            <div className='sm:w-2/3 overflow-hidden'>
              <SecurityCodeSimple onChange={handleChangeSecurityCode} />
            </div>
          </div>

          <div className='flex justify-end items-center gap-3 w-full transition-all duration-300'>
            <button
              onClick={handleSetTwoFactorAuthentication}
              type='button'
              className={classNames(
                'group flex flex-row gap-3 relative justify-center items-center bg-[--primaryColor] hover:bg-[--secondaryColor] disabled:bg-[--buttonPrimary] px-4 pr-5 h-10 rounded-xl font-medium text-white disabled:text-zinc-500 text-base active:scale-95 transition-all duration-300 select-none'
              )}
            >
              <FloppyDiskIcon
                size='size-4'
                stroke='stroke-white group-data-[disabled=true]:stroke-zinc-500 group-data-[active=true]:stroke-[--primaryColor]'
                strokeWidth={2.5}
              />
              <span className='font-medium text-sm'>Salvar</span>
            </button>
          </div>
        </motion.div>
      </Modal>
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

        <div className='py-6 !border-t-0 select-none'>
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className='hidden sm:block mt-6 px-1 !border-t-0 font-semibold text-[--labelPrimary] text-[10px] transition-all duration-300 select-none'
            >
              <span className='uppercase'>Autenticação em dois fatores</span>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className='flex flex-col gap-6 mt-3 !border-t-0'>
          <div className='flex gap-3'>
            <SecondaryButton
              label="Configurar 2FA"
              disabled={operatorData.twoFactorAuthenticationInUse}
              icon={
                <SettingsIcon
                  size="size-4"
                  stroke="stroke-[--textSecondary] group-data-[active=true]:stroke-[--primaryColor]"
                  strokeWidth={2.5}
                />
              }
              onClick={handleTwoFactorAuthenticationCreate}
            />

            <button
              disabled={!operatorData.twoFactorAuthenticationInUse}
              type='button'
              onClick={handleCloseModalAlert}
              className='group z-[45] relative flex justify-center items-center gap-3 bg-[--tableRow] hover:bg-[--buttonPrimary] disabled:bg-[--tableRow] disabled:opacity-60 px-4 rounded-xl h-10 text-[--textSecondary] active:scale-95 transition-all duration-300 cursor-pointer disabled:cursor-not-allowed select-none'
            >
              <TrashIcon
                size="size-4"
                stroke="stroke-[--textSecondary] group-data-[active=true]:stroke-[--primaryColor]"
                strokeWidth={2.5}
              />
            </button>
          </div>
        </div>
      </div>

      <ActionGroupSave actionDisabled={!hasChanges} onClick={operatorData.twoFactorAuthenticationInUse ? actionModal : handlePasswordChange} />
    </div>
  )
}
