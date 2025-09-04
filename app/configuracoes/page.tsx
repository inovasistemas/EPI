'use client'
import { type FC, useCallback, useState } from 'react'
import { GroupIcon } from '@/components/Display/Icons/Group'
import { LaborIcon } from '@/components/Display/Icons/Labor'
import { PersonalDetailsIcon } from '@/components/Display/Icons/PersonalDetails'
import { ShieldIcon } from '@/components/Display/Icons/Shield'
import { Modal } from '@/components/Display/Modal'
import { PasswordSettings } from '@/components/Template/PasswordSettings'
import { PermissionGroupSettings } from '@/components/Template/PermissionGroupSettings'
import { PersonalDetailsSettings } from '@/components/Template/PersonalDetailsSettings'
import { Sector } from '@/components/Features/Sector'
import { SecurityCode } from '@/components/Template/SecurityCode'
import {
  useClearQueryParams,
  useQueryParams,
} from '@/components/Utils/UseQueryParams'
import { updateUserMePassword } from '@/services/User'
import { toast } from 'sonner'
import { ToastSuccess } from '@/components/Template/Toast/Success'
import { ToastError } from '@/components/Template/Toast/Error'
import { BriefcaseIcon } from '@/components/Display/Icons/Briefcase'
import { JobPosition } from '@/components/Features/JobPosition'

enum menus {
  personalDetails,
  permissionGroup,
  sector,
  jobPosition,
  security,
}

const Settings: FC = () => {
  const setClearQueryParam = useClearQueryParams()
  const [activeMenu, setActiveMenu] = useState<menus>(menus.personalDetails)
  const [modalStatus, setModalStatus] = useState(false)
  const [modalAlertStatus, setModalAlertStatus] = useState(false)
  const [securityCode, setSecurityCode] = useState('')
  const [password, setPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [passwordReset, setPasswordReset] = useState(false)
  const [deleteAction, setDeleteAction] = useState(false)

  const handleChangeSecurityCode = (value: string) => {
    setSecurityCode(value)
  }

  const handleChangePassword = (value: string) => {
    setPassword(value)
  }

  const handleChangeOldPassword = (value: string) => {
    setOldPassword(value)
  }

  const handlePasswordChange = async () => {
    const response = await updateUserMePassword({
      code: securityCode,
      oldPassword,
      password,
    })

    if (response && response.status === 204) {
      toast.custom(() => <ToastSuccess text='Senha atualizada com sucesso' />)
      setPasswordReset(prev => !prev)
      handleCloseModal()
    } else if (response && response.status === 401) {
      toast.custom(() => (
        <ToastError text='A senha atual informada está incorreta' />
      ))
    } else {
      toast.custom(() => <ToastError text='Erro ao atualizar a senha' />)
    }
  }

  const handleCloseModal = useCallback(() => {
    if (modalStatus) {
      setClearQueryParam()
    }

    setModalStatus(prev => !prev)
  }, [modalStatus, setClearQueryParam])

  const handleCloseModalAlert = () => {
    setModalAlertStatus(prev => !prev)
  }

  const handleActiveMenu = (menu: menus) => {
    setActiveMenu(menu)
  }

  const handleDeleteAction = () => {
    setDeleteAction(prev => !prev)

    if (deleteAction) {
      handleCloseModalAlert()
    }
  }

  return (
    <div className='flex flex-col gap-6 bg-[--backgroundSecondary] sm:pr-3 pb-8 sm:pb-3 w-full lg:h-[calc(100vh-50px)] overflow-auto'>
      <Modal
        title='Filtros'
        size='small'
        isModalOpen={modalStatus}
        handleClickOverlay={handleCloseModal}
        overflow={true}
      >
        {activeMenu === menus.security && (
          <SecurityCode
            buttonLabel='Confirmar'
            onSuccess={handlePasswordChange}
            onChange={handleChangeSecurityCode}
          />
        )}
      </Modal>
      <Modal
        title=''
        size='extra-small'
        isModalOpen={modalAlertStatus}
        handleClickOverlay={handleCloseModalAlert}
        showClose={false}
      >
        <div className='flex flex-col gap-2'>
          <span className='font-medium text-xl text-center'>
            Tem certeza que deseja excluir?
          </span>
          <span className='px-6 text-base text-center'>
            Esta ação é irreversível e todos os dados associados serão
            permanentemente apagados.
          </span>

          <div className='flex flex-row justify-center gap-3 pt-6'>
            <button
              onClick={handleDeleteAction}
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
      <div className='items-start gap-2 grid grid-cols-3 sm:rounded-2xl w-full h-full'>
        <div className='flex flex-col gap-2 bg-[--backgroundPrimary] p-3 rounded-2xl w-full h-full'>
          <button
            onClick={() => handleActiveMenu(menus.personalDetails)}
            type='button'
            data-active={activeMenu === menus.personalDetails}
            className='group flex items-center gap-1 data-[active=true]:bg-[--backgroundSecondary] hover:bg-[--backgroundSecondary] px-1 py-3 rounded-xl font-normal active:scale-95 transition-all duration-300'
          >
            <div className='group flex justify-center min-w-[32px] !max-w-[32px]'>
              <PersonalDetailsIcon
                size='size-5'
                stroke='stroke-[--iconPrimaryColor] group-data-[active=true]:stroke-[--primaryColor]'
              />
            </div>
            <span className='hidden sm:flex w-full font-medium text-[--iconPrimaryColor] group-data-[active=true]:text-[--primaryColor] text-sm transition-all select-none'>
              Dados pessoais
            </span>
          </button>

          <button
            onClick={() => handleActiveMenu(menus.permissionGroup)}
            type='button'
            data-active={activeMenu === menus.permissionGroup}
            className='group flex items-center gap-1 data-[active=true]:bg-[--backgroundSecondary] hover:bg-[--backgroundSecondary] px-1 py-3 rounded-xl font-normal active:scale-95 transition-all duration-300'
          >
            <div className='group flex justify-center min-w-[32px] !max-w-[32px]'>
              <GroupIcon
                size='size-5'
                stroke='stroke-[--iconPrimaryColor] group-data-[active=true]:stroke-[--primaryColor]'
              />
            </div>
            <span className='hidden sm:flex w-full font-medium text-[--iconPrimaryColor] group-data-[active=true]:text-[--primaryColor] text-sm transition-all select-none'>
              Grupo de permissões
            </span>
          </button>

          <button
            onClick={() => handleActiveMenu(menus.sector)}
            type='button'
            data-active={activeMenu === menus.sector}
            className='group flex items-center gap-1 data-[active=true]:bg-[--backgroundSecondary] hover:bg-[--backgroundSecondary] px-1 py-3 rounded-xl font-normal active:scale-95 transition-all duration-300'
          >
            <div className='group flex justify-center min-w-[32px] !max-w-[32px]'>
              <LaborIcon
                size='size-5'
                stroke='stroke-[--iconPrimaryColor] group-data-[active=true]:stroke-[--primaryColor]'
              />
            </div>
            <span className='hidden sm:flex w-full font-medium text-[--iconPrimaryColor] group-data-[active=true]:text-[--primaryColor] text-sm transition-all select-none'>
              Setores e subsetores
            </span>
          </button>

          <button
            onClick={() => handleActiveMenu(menus.jobPosition)}
            type='button'
            data-active={activeMenu === menus.jobPosition}
            className='group flex items-center gap-1 data-[active=true]:bg-[--backgroundSecondary] hover:bg-[--backgroundSecondary] px-1 py-3 rounded-xl font-normal active:scale-95 transition-all duration-300'
          >
            <div className='group flex justify-center min-w-[32px] !max-w-[32px]'>
              <BriefcaseIcon
                size='size-5'
                stroke='stroke-[--iconPrimaryColor] group-data-[active=true]:stroke-[--primaryColor]'
              />
            </div>
            <span className='hidden sm:flex w-full font-medium text-[--iconPrimaryColor] group-data-[active=true]:text-[--primaryColor] text-sm transition-all select-none'>
              Cargos e Funções
            </span>
          </button>

          <button
            onClick={() => handleActiveMenu(menus.security)}
            type='button'
            data-active={activeMenu === menus.security}
            className='group flex items-center gap-1 data-[active=true]:bg-[--backgroundSecondary] hover:bg-[--backgroundSecondary] px-1 py-3 rounded-xl font-normal active:scale-95 transition-all duration-300'
          >
            <div className='group flex justify-center min-w-[32px] !max-w-[32px]'>
              <ShieldIcon
                size='size-5'
                stroke='stroke-[--iconPrimaryColor] group-data-[active=true]:stroke-[--primaryColor]'
              />
            </div>
            <span className='hidden sm:flex w-full font-medium text-[--iconPrimaryColor] group-data-[active=true]:text-[--primaryColor] text-sm transition-all select-none'>
              Senha e segurança
            </span>
          </button>
        </div>

        <div className='col-span-2 bg-[--backgroundPrimary] rounded-2xl w-full h-full overflow-y-auto'>
          {activeMenu === menus.personalDetails && <PersonalDetailsSettings />}
          {activeMenu === menus.permissionGroup && <PermissionGroupSettings />}
          {activeMenu === menus.jobPosition && <JobPosition />}
          {activeMenu === menus.sector && <Sector />}
          {activeMenu === menus.security && (
            <PasswordSettings
              key={passwordReset ? 'reset-1' : 'reset-0'}
              onChange={handleChangePassword}
              oldPasswordChange={handleChangeOldPassword}
              actionModal={handleCloseModal}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Settings
