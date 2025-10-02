'use client'
import { type FC, useCallback, useEffect, useState } from 'react'
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
import { WorkflowSquareIcon } from '@/components/Display/Icons/WorkflowSquare'
import { FactoryIcon } from '@/components/Display/Icons/Factory'
import { Manufacturer } from '@/components/Features/Manufacturer'
import { Category } from '@/components/Features/Category'
import { useParams } from 'next/navigation'
import { LoadingIcon } from '@/components/Display/Icons/Loading'
import Link from 'next/link'

enum menus {
  personalDetails,
  permissionGroup,
  sector,
  jobPosition,
  security,
  category,
  manufacturer,
  default
}

const Settings: FC = () => {
  const params = useParams()
  const setClearQueryParam = useClearQueryParams()
  const [activeMenu, setActiveMenu] = useState<menus>(menus.default)
  const [modalStatus, setModalStatus] = useState(false)
  const [loading, setLoading] = useState(false)
  const [modalAlertStatus, setModalAlertStatus] = useState(false)
  const [securityCode, setSecurityCode] = useState('')
  const [password, setPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [passwordReset, setPasswordReset] = useState(false)
  const [deleteAction, setDeleteAction] = useState(false)

  const SettingsMenu = Array.isArray(params.menu_id)
    ? params.menu_id[0]
    : params.menu_id

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
      loading: setLoading
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
      toast.custom(() => (
        <ToastError text='Não foi possível atualizar a senha' />
      ))
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

  useEffect(()=>{
    if (SettingsMenu === 'dados') setActiveMenu(menus.personalDetails)
    if (SettingsMenu === 'grupo-permissoes') setActiveMenu(menus.permissionGroup)
    if (SettingsMenu === 'cargos') setActiveMenu(menus.jobPosition)
    if (SettingsMenu === 'setores') setActiveMenu(menus.sector)
    if (SettingsMenu === 'categorias') setActiveMenu(menus.category)
    if (SettingsMenu === 'fabricantes') setActiveMenu(menus.manufacturer)
    if (SettingsMenu === 'senhas') setActiveMenu(menus.security)
    
  }, [SettingsMenu])

  return (
    <div className='flex flex-col gap-6 bg-[--backgroundSecondary] sm:pr-3 pb-8 sm:pb-3 w-full h-[calc(100vh-65px)] lg:h-[calc(100vh-50px)] overflow-auto'>
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
            icon={loading? <LoadingIcon size='size-5' stroke='stroke-[--textSecondary]' strokeWidth={2}  /> : null}
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
      <div className='items-start gap-2 grid sm:grid-cols-3 grid-rows-12 sm:grid-rows-1 sm:rounded-2xl w-full h-full'>
        <div className='flex flex-row sm:flex-col justify-between sm:justify-start items-center sm:items-start sm:gap-2 order-1 sm:order-1 sm:col-start-1 row-span-1 bg-[--backgroundPrimary] p-3 rounded-2xl w-full h-full'>
          <Link
            href="/configuracoes/dados"
            data-active={activeMenu === menus.personalDetails}
            className='group flex items-center gap-1 data-[active=true]:bg-[--backgroundSecondary] hover:bg-[--backgroundSecondary] px-2 sm:px-1 py-1 sm:py-3 rounded-xl sm:w-full font-normal active:scale-95 transition-all duration-300'
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
          </Link>

          <Link
            href="/configuracoes/grupo-permissoes"
            data-active={activeMenu === menus.permissionGroup}
            className='group flex items-center gap-1 data-[active=true]:bg-[--backgroundSecondary] hover:bg-[--backgroundSecondary] px-2 sm:px-1 py-1 sm:py-3 rounded-xl sm:w-full font-normal active:scale-95 transition-all duration-300'
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
          </Link>

          <Link
            href="/configuracoes/setores"
            data-active={activeMenu === menus.sector}
            className='group flex items-center gap-1 data-[active=true]:bg-[--backgroundSecondary] hover:bg-[--backgroundSecondary] px-2 sm:px-1 py-1 sm:py-3 rounded-xl sm:w-full font-normal active:scale-95 transition-all duration-300'
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
          </Link>

          <Link
            href="/configuracoes/cargos"
            data-active={activeMenu === menus.jobPosition}
            className='group flex items-center gap-1 data-[active=true]:bg-[--backgroundSecondary] hover:bg-[--backgroundSecondary] px-2 sm:px-1 py-1 sm:py-3 rounded-xl sm:w-full font-normal active:scale-95 transition-all duration-300'
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
          </Link>

          <Link
            href="/configuracoes/categorias"
            data-active={activeMenu === menus.category}
            className='group flex items-center gap-1 data-[active=true]:bg-[--backgroundSecondary] hover:bg-[--backgroundSecondary] px-2 sm:px-1 py-1 sm:py-3 rounded-xl sm:w-full font-normal active:scale-95 transition-all duration-300'
          >
            <div className='group flex justify-center min-w-[32px] !max-w-[32px]'>
              <WorkflowSquareIcon
                size='size-5'
                stroke='stroke-[--iconPrimaryColor] group-data-[active=true]:stroke-[--primaryColor]'
              />
            </div>
            <span className='hidden sm:flex w-full font-medium text-[--iconPrimaryColor] group-data-[active=true]:text-[--primaryColor] text-sm transition-all select-none'>
              Categorias e subcategorias
            </span>
          </Link>

          <Link
            href="/configuracoes/fabricantes"
            data-active={activeMenu === menus.manufacturer}
            className='group flex items-center gap-1 data-[active=true]:bg-[--backgroundSecondary] hover:bg-[--backgroundSecondary] px-2 sm:px-1 py-1 sm:py-3 rounded-xl sm:w-full font-normal active:scale-95 transition-all duration-300'
          >
            <div className='group flex justify-center min-w-[32px] !max-w-[32px]'>
              <FactoryIcon
                size='size-5'
                stroke='stroke-[--iconPrimaryColor] group-data-[active=true]:stroke-[--primaryColor]'
              />
            </div>
            <span className='hidden sm:flex w-full font-medium text-[--iconPrimaryColor] group-data-[active=true]:text-[--primaryColor] text-sm transition-all select-none'>
              Fabricantes
            </span>
          </Link>

          <Link
            href="/configuracoes/senhas"
            data-active={activeMenu === menus.security}
            className='group flex items-center gap-1 data-[active=true]:bg-[--backgroundSecondary] hover:bg-[--backgroundSecondary] px-2 sm:px-1 py-1 sm:py-3 rounded-xl sm:w-full font-normal active:scale-95 transition-all duration-300'
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
          </Link>
        </div>

        <div className='order-2 sm:order-2 sm:col-span-2 sm:col-start-2 row-span-full row-start-2 sm:row-start-auto bg-[--backgroundPrimary] rounded-2xl w-full h-full overflow-y-auto'>
          {activeMenu === menus.personalDetails && <PersonalDetailsSettings />}
          {activeMenu === menus.permissionGroup && <PermissionGroupSettings />}
          {activeMenu === menus.jobPosition && <JobPosition />}
          {activeMenu === menus.sector && <Sector />}
          {activeMenu === menus.manufacturer && <Manufacturer />}
          {activeMenu === menus.category && <Category />}
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
