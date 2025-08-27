'use client'
import { type FC, useCallback, useState } from 'react'
import { GroupIcon } from '@/components/Display/Icons/Group'
import { LaborIcon } from '@/components/Display/Icons/Labor'
import { PersonalDetailsIcon } from '@/components/Display/Icons/PersonalDetails'
import { ShieldIcon } from '@/components/Display/Icons/Shield'
import { Modal } from '@/components/Display/Modal'
import { PasswordSettings } from '@/components/Template/PasswordSettings'
import { PermissionGroup } from '@/components/Template/PermissionGroup'
import { PermissionGroupSettings } from '@/components/Template/PermissionGroupSettings'
import { PersonalDetailsSettings } from '@/components/Template/PersonalDetailsSettings'
import { Sector } from '@/components/Template/Sector'
import { SectorSettings } from '@/components/Template/SectorSettings'
import { SecurityCode } from '@/components/Template/SecurityCode'
import {
  useClearQueryParams,
  useQueryParams,
} from '@/components/Utils/UseQueryParams'
import { updateUserMePassword } from '@/services/User'
import { toast } from 'sonner'
import { ToastSuccess } from '@/components/Template/Toast/Success'
import { ToastError } from '@/components/Template/Toast/Error'

enum menus {
  personalDetails,
  permissionGroup,
  sector,
  security,
}

const Settings: FC = () => {
  const setClearQueryParam = useClearQueryParams()
  const [activeMenu, setActiveMenu] = useState<menus>(menus.personalDetails)
  const [modalStatus, setModalStatus] = useState(false)
  const [securityCode, setSecurityCode] = useState('')
  const [password, setPassword] = useState('')
  const [passwordReset, setPasswordReset] = useState(false)

  const handleChangeSecurityCode = (value: string) => {
    setSecurityCode(value)
  }

  const handleChangePassword = (value: string) => {
    setPassword(value)
  }

  const handlePasswordChange = async () => {
    const response = await updateUserMePassword({
      code: securityCode,
      password,
    })

    if (response && response.status === 204) {
      toast.custom(() => <ToastSuccess text='Senha atualizada com sucesso' />)
      setPasswordReset(prev => !prev)
      handleCloseModal()
    } else {
      toast.custom(() => <ToastError text='Erro ao atualizar sua senha' />)
    }
  }

  const handleCloseModal = useCallback(() => {
    if (modalStatus) {
      setClearQueryParam()
    }

    setModalStatus(prev => !prev)
  }, [modalStatus, setClearQueryParam])

  const handleActiveMenu = (menu: menus) => {
    setActiveMenu(menu)
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
        {activeMenu === menus.permissionGroup && <PermissionGroup />}
        {activeMenu === menus.sector && <Sector />}
        {activeMenu === menus.security && (
          <SecurityCode
            buttonLabel='Confirmar'
            onSuccess={handlePasswordChange}
            onChange={handleChangeSecurityCode}
          />
        )}
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
          {activeMenu === menus.permissionGroup && (
            <PermissionGroupSettings actionModal={handleCloseModal} />
          )}
          {activeMenu === menus.sector && (
            <SectorSettings actionModal={handleCloseModal} />
          )}
          {activeMenu === menus.security && (
            <PasswordSettings
              key={passwordReset ? 'reset-1' : 'reset-0'}
              onChange={handleChangePassword}
              actionModal={handleCloseModal}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Settings
