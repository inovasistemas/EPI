'use client'
import { ProfilePicture } from '@/components/Display/Avatar'
import { AlertIcon } from '@/components/Display/Icons/Alert'
import { CalculatorIcon } from '@/components/Display/Icons/Calculator'
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

enum SearchbarCards {
  Settings,
  Notifications,
  Default,
}

const Sidebar: React.FC = () => {
  const isSidebarVisible = useSidebar(state => state.isSidebarVisible)
  const userName = useUser(state => state.user_name)
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
      className='bottom-0 z-50 fixed sm:relative flex flex-col justify-between gap-3 w-full sm:max-w-[200px] h-full font-medium transition-all duration-300'
    >
      <div className='flex flex-col justify-between gap-3 px-3 w-full h-full overflow-x-hidden font-medium transition-all duration-300'>
        <div className='sm:flex sm:flex-col gap-3 sm:gap-0 grid grid-cols-2 w-full transition-all duration-300'>
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
          </div>
          <div
            className={`col-span-1 grid-cols-1 sm:flex sm:flex-col justify-between w-full relative transition-all duration-300 ${isSidebarVisible ? 'mt-3 pt-3' : 'pt-0'}`}
          >
            <GroupLabel
              isVisible={isSidebarVisible}
              label='Cadastro'
              showFixed={false}
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
            className={`col-span-1 grid grid-cols-1 gap-3 sm:gap-0 sm:flex sm:flex-col justify-between w-full relative transition-all duration-300 ${isSidebarVisible ? 'mt-3 pt-3' : 'pt-0'}`}
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
      <div className='px-3'>
        <div
          className={`col-span-1 grid grid-cols-1 gap-3 sm:gap-0 sm:flex sm:flex-col justify-between w-full relative transition-all duration-300 mb-3`}
        >
          <button
            onClick={handleSettingsClick}
            className={classNames(
              {
                'bg-[--buttonPrimary]': isSidebarVisible && isCardOpen,
                'pl-0.5': !isSidebarVisible,
                'bg-[--buttonSecondary]': isSidebarVisible && !isCardOpen,
              },
              'overflow-x-hidden w-full flex items-center gap-2 rounded-2xl transition-all p-2'
            )}
          >
            <div className='flex items-center gap-2 min-w-[152px]'>
              <div className='w-8'>
                <ProfilePicture />
              </div>
              <div className='flex flex-col justify-start gap-1 w-full text-left'>
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
                    'font-normal text-xs leading-none transition-all'
                  )}
                >
                  Inova Sistemas
                </span>
              </div>
              <div className='w-4'>
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
            position='bottom-full left-1/2'
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
