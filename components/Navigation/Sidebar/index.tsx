'use client'
import { ProfilePicture } from '@/components/Display/Avatar'
import { AlertIcon } from '@/components/Display/Icons/Alert'
import { HomeIcon } from '@/components/Display/Icons/Home'
import { PackageIcon } from '@/components/Display/Icons/Package'
import { UserIcon } from '@/components/Display/Icons/User'
import { UsersIcon } from '@/components/Display/Icons/Users'
import { NavLink } from '@/components/Navigation/NavLink'
import { GroupLabel } from '@/components/Utils/Label/GroupLabel'
import useSidebar from '@/lib/context/global'
import useUser from '@/lib/context/user'
import classNames from 'classnames'
import { MenuCard } from '../MenuCard'
import { MenuSettings } from '@/components/Template/MenuSettings'
import { useCallback, useState } from 'react'
import { CaretUpDownIcon } from '@/components/Display/Icons/CaretUpDown'
import { MoneyIcon } from '@/components/Display/Icons/Money'
import { CalendarIcon } from '@/components/Display/Icons/Calendar'
import { OrbitIcon } from '@/components/Display/Icons/Orbit'

enum SearchbarCards {
  Settings,
  Notifications,
  Default,
}

const Sidebar: React.FC = () => {
  const isSidebarVisible = useSidebar(state => state.isSidebarVisible)
  const userName = useUser(state => state.user_name)
  const userEnterprise = useUser(state => state.enterprise)
  const firstName = userName?.split(' ')[0]

  const [isCardOpen, setCardOpen] = useState(SearchbarCards.Default)
  const toggleSidebarVisibility = useSidebar(
    state => state.toggleSidebarVisibility
  )

  const handleClickOverlay = useCallback(() => {
    setCardOpen(SearchbarCards.Default)
  }, [])

  const handleSettingsClick = useCallback(() => {
    setCardOpen(
      isCardOpen === SearchbarCards.Settings
        ? SearchbarCards.Default
        : SearchbarCards.Settings
    )
  }, [isCardOpen])

  return (
    <aside
      data-show={isSidebarVisible}
      className='bottom-0 z-50 fixed sm:relative sm:flex sm:flex-col justify-between gap-3 grid grid-cols-5 bg-[--backgroundSecondary] px-3 sm:px-0 w-full sm:max-w-[200px] h-full font-medium transition-all duration-300'
    >
      <div className='sm:flex sm:flex-col justify-between gap-3 grid grid-cols-4 col-span-4 sm:px-3 w-full h-full overflow-x-hidden font-medium transition-all duration-300'>
        <div className='sm:flex sm:flex-col gap-3 sm:gap-0 grid grid-cols-4 col-span-4 w-full transition-all duration-300'>
          <div
            className={`col-span-1 grid grid-cols-1 gap-3 sm:gap-0 sm:flex sm:flex-col justify-between w-full relative transition-all duration-300 ${isSidebarVisible ? 'mt-3 pt-3' : 'pt-0'}`}
          >
            <GroupLabel
              isVisible={isSidebarVisible}
              label='Geral'
              showFixed={false}
            />

            <NavLink
              name='Painel'
              icon={
                <HomeIcon
                  size='size-5'
                  stroke='stroke-[--iconPrimaryColor] group-data-[active=true]:stroke-[--primaryColor]'
                />
              }
              href='/painel'
            />

            <NavLink
              name='Agenda'
              icon={
                <CalendarIcon
                  size='size-5'
                  stroke='stroke-[--iconPrimaryColor] group-data-[active=true]:stroke-[--primaryColor]'
                />
              }
              href='/agenda'
              mobile={false}
            />
          </div>

          <div
            className={`col-span-3 grid grid-cols-3 gap-3 sm:gap-0 sm:flex sm:flex-col justify-between w-full relative transition-all duration-300 ${isSidebarVisible ? 'mt-3 pt-3' : 'pt-0'}`}
          >
            <GroupLabel
              isVisible={isSidebarVisible}
              label='Cadastro'
              showFixed={false}
            />

            <NavLink
              name='Rotinas'
              icon={
                <OrbitIcon
                  size='size-5'
                  stroke='stroke-[--iconPrimaryColor] group-data-[active=true]:stroke-[--primaryColor]'
                />
              }
              href='/rotinas'
              mobile={false}
            />

            <NavLink
              name='Equipamentos'
              icon={
                <PackageIcon
                  size='size-5'
                  stroke='stroke-[--iconPrimaryColor] group-data-[active=true]:stroke-[--primaryColor]'
                />
              }
              href='/equipamentos'
            />

            <NavLink
              name='Colaboradores'
              icon={
                <UsersIcon
                  size='size-5'
                  stroke='stroke-[--iconPrimaryColor] group-data-[active=true]:stroke-[--primaryColor]'
                />
              }
              href='/colaboradores'
            />

            

            <NavLink
              name='Usuários'
              icon={
                <UserIcon
                  size='size-5'
                  stroke='stroke-[--iconPrimaryColor] group-data-[active=true]:stroke-[--primaryColor]'
                />
              }
              href='/usuarios'
            />
          </div>

          <div
            className={`col-span-1 hidden gap-3 sm:gap-0 sm:flex sm:flex-col justify-between w-full relative transition-all duration-300 ${isSidebarVisible ? 'mt-3 pt-3' : 'pt-0'}`}
          >
            <GroupLabel
              isVisible={isSidebarVisible}
              label='Relatórios'
              showFixed={false}
            />

            <NavLink
              name='Pendências'
              icon={
                <AlertIcon
                  size='size-5'
                  stroke='stroke-[--iconPrimaryColor] group-data-[active=true]:stroke-[--primaryColor]'
                />
              }
              href='/relatorios/pendencias'
            />

            <NavLink
              name='Recursos'
              icon={
                <MoneyIcon
                  size='size-5'
                  stroke='stroke-[--iconPrimaryColor] group-data-[active=true]:stroke-[--primaryColor]'
                />
              }
              href='/relatorios/recursos'
            />
          </div>
        </div>
      </div>
      <div className='col-span-1 sm:px-3'>
        <div
          className={`col-span-1 gap-3 sm:gap-0 justify-center max-sm:h-full max-sm:items-center flex sm:flex-col sm:justify-between w-full relative transition-all duration-300 sm:mb-3`}
        >
          <button
            onClick={handleSettingsClick}
            className={classNames(
              {
                'sm:bg-[--buttonPrimary]': isSidebarVisible && isCardOpen,
                'pl-0.5': !isSidebarVisible,
                'sm:bg-[--buttonSecondary]': isSidebarVisible && !isCardOpen,
              },
              'max-sm:ml-2 overflow-x-hidden sm:w-full flex items-center gap-2 rounded-2xl transition-all p-2 select-none'
            )}
          >
            <div className='flex items-center sm:gap-2 sm:min-w-[152px]'>
              <div className='min-sm:w-8'>
                <ProfilePicture />
              </div>
              <div className='hidden sm:flex flex-col justify-start gap-1 w-full text-left'>
                <span
                  className={classNames(
                    {
                      'opacity-100': isSidebarVisible,
                      'opacity-0': !isSidebarVisible,
                    },
                    'font-medium text-sm capitalize transition-all leading-none'
                  )}
                >
                  {firstName.toLocaleLowerCase()}
                </span>
                <span
                  className={classNames(
                    {
                      'opacity-50': isSidebarVisible,
                      'opacity-0': !isSidebarVisible,
                    },
                    'font-normal text-xs leading-none transition-all capitalize line-clamp-1'
                  )}
                >
                  {userEnterprise.toLocaleLowerCase()}
                </span>
              </div>
              <div className='hidden sm:block w-4'>
                <CaretUpDownIcon
                  size='size-4'
                  stroke='stroke-[--iconPrimaryColor] group-data-[active=true]:stroke-[--primaryColor]'
                />
              </div>
            </div>
          </button>

          <MenuCard
            handleClickOverlay={handleClickOverlay}
            isMenuOpen={isCardOpen === SearchbarCards.Settings}
            position='bottom-full right-0 sm:left-1/2'
            margin='mb-2'
            width='min-w-72'
            zIndex='z-[60]'
            align='bottom'
          >
            <MenuSettings />
          </MenuCard>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
