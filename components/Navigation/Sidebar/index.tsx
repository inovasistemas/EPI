'use client'
import useSidebar from '@/lib/context/global'
import { GroupLabel } from '@/components/Utils/Label/GroupLabel'
import { NavLink } from '@/components/Navigation/NavLink'
import { usePathname } from 'next/navigation'
import {
  SignOut,
  Package,
  Storefront,
  SquaresFour,
  Knife,
  HardHat,
  Users,
  IdentificationBadge,
  ClockUser,
  Coins,
  ChartPie,
  Warning,
} from '@phosphor-icons/react'
import { LogOutIcon } from '@/components/Display/Icons/Logout'
import { PanelIcon } from '@/components/Display/Icons/Panel'
import { HomeIcon } from '@/components/Display/Icons/Home'
import { UserIcon } from '@/components/Display/Icons/User'
import { KeyCircle } from '@/components/Display/Icons/KeyCircle'

const Sidebar: React.FC = () => {
  const isSidebarVisible = useSidebar(state => state.isSidebarVisible)
  const pathName = usePathname()

  return (
    <aside
      data-show={isSidebarVisible}
      className='bottom-0 z-50 fixed sm:relative flex flex-col gap-3 px-3 w-full sm:max-w-[186px] overflow-x-hidden font-medium transition-all duration-300'
    >
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
                fill='fill-[--textSecondary] group-data-[active=true]:fill-primary'
                height='h-4'
                width='w-4'
                stroke={'3'}
                active={false}
              />
              // <SquaresFour
              //   size={16}
              //   weight='fill'
              //   className='text-[--textSecondary] group-data-[active=true]:text-primary scale-125 sm:scale-100 transition-all duration-300'
              // />
            }
            href='/painel'
          />
        </div>
        {/* 
        <div
          className={`col-span-2 grid grid-cols-2 gap-3 sm:gap-0 sm:flex sm:flex-col justify-between w-full relative transition-all duration-300 ${isSidebarVisible ? 'mt-3 pt-3' : 'pt-0'}`}
        >
          <GroupLabel
            isVisible={isSidebarVisible}
            label='Cadastro'
            showFixed={false}
          />

          <NavLink
            name='Equipamentos'
            icon={
              <HardHat
                size={16}
                weight='fill'
                className='text-[--textSecondary] group-data-[active=true]:text-primary scale-125 sm:scale-100 transition-all duration-300'
              />
            }
            href='/equipamentos'
          />

          <NavLink
            name='Colaboradores'
            icon={
              <Users
                size={16}
                weight='fill'
                className='text-[--textSecondary] group-data-[active=true]:text-primary scale-125 sm:scale-100 transition-all duration-300'
              />
            }
            href='/colaboradores'
          />
        </div>

        <div
          className={`col-span-1 hidden grid-cols-1 sm:flex sm:flex-col justify-between w-full relative transition-all duration-300 ${isSidebarVisible ? 'mt-3 pt-3' : 'pt-0'}`}
        >
          <GroupLabel
            isVisible={isSidebarVisible}
            label='Relatório'
            showFixed={false}
          />
          <NavLink
            name='Pendências'
            icon={
              <Warning
                size={16}
                weight='fill'
                className='text-[--textSecondary] group-data-[active=true]:text-primary scale-125 sm:scale-100 transition-all duration-300'
              />
            }
            href='/relatorio/pendencias'
          />
          <NavLink
            name='Custos'
            icon={
              <ChartPie
                size={16}
                weight='fill'
                className='text-[--textSecondary] group-data-[active=true]:text-primary scale-125 sm:scale-100 transition-all duration-300'
              />
            }
            href='/relatorio/custos'
          />
        </div> */}

        <div
          className={`col-span-1 grid-cols-1 sm:flex sm:flex-col justify-between w-full relative transition-all duration-300 ${isSidebarVisible ? 'mt-3 pt-3' : 'pt-0'}`}
        >
          <GroupLabel
            isVisible={isSidebarVisible}
            label='Cadastro'
            showFixed={false}
          />
          {/* <NavLink
            name='Permissões'
            icon={
              <KeyCircle
                fill='fill-[--textSecondary] group-data-[active=true]:fill-primary'
                height='h-4'
                width='w-4'
              />
            }
            href='/permissoes'
          /> */}
          <NavLink
            name='Usuários'
            icon={
              <UserIcon
                fill='fill-[--textSecondary] group-data-[active=true]:fill-primary'
                height='h-4'
                width='w-4'
                stroke={'3'}
              />
            }
            href='/usuarios'
          />
        </div>
      </div>
      <div
        className={`hidden sm:block mt-auto relative transition-all duration-300 mb-3`}
      >
        <div
          className={`col-span-3 grid grid-cols-3 sm:flex sm:flex-col justify-between w-full relative transition-all duration-300`}
        >
          <NavLink
            name='Sair'
            icon={
              <LogOutIcon
                fill='fill-[--textSecondary]'
                height='h-4'
                width='w-4'
                stroke={'3'}
              />
            }
            href='/sair'
          />
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
