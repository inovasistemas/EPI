'use client'
import { AlertIcon } from '@/components/Display/Icons/Alert'
import { BarChartIcon } from '@/components/Display/Icons/BarChart'
import { HomeIcon } from '@/components/Display/Icons/Home'
import { PackageIcon } from '@/components/Display/Icons/Package'
import { ReportChartIcon } from '@/components/Display/Icons/ReportChart'
import { UserIcon } from '@/components/Display/Icons/User'
import { UsersIcon } from '@/components/Display/Icons/Users'
import { NavLink } from '@/components/Navigation/NavLink'
import { GroupLabel } from '@/components/Utils/Label/GroupLabel'
import useSidebar from '@/lib/context/global'

const Sidebar: React.FC = () => {
  const isSidebarVisible = useSidebar(state => state.isSidebarVisible)

  return (
    <aside
      data-show={isSidebarVisible}
      className='bottom-0 z-50 fixed sm:relative flex flex-col gap-3 px-3 w-full sm:max-w-[200px] overflow-x-hidden font-medium transition-all duration-300'
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
              <BarChartIcon
                size='size-5'
                stroke='stroke-[--iconPrimaryColor] group-data-[active=true]:stroke-[--primaryColor]'
              />
            }
            href='/relatorios/recursos'
          />
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
