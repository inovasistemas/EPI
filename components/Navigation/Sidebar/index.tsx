'use client'
import {
  ChartDonut,
  Key,
  Shapes,
  SquaresFour,
  Users,
} from '@phosphor-icons/react'
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
              <SquaresFour
                size={20}
                weight='fill'
                className='text-[--textSecondary] group-data-[active=true]:text-[--primaryColor]'
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
              <Shapes
                size={20}
                weight='fill'
                className='text-[--textSecondary] group-data-[active=true]:text-[--primaryColor]'
              />
            }
            href='/equipamentos'
          />

          <NavLink
            name='Colaboradores'
            icon={
              <Users
                size={20}
                weight='fill'
                className='text-[--textSecondary] group-data-[active=true]:text-[--primaryColor]'
              />
            }
            href='/colaboradores'
          />

          <NavLink
            name='Usuários'
            icon={
              <Key
                size={20}
                weight='fill'
                className='text-[--textSecondary] group-data-[active=true]:text-[--primaryColor]'
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
            name='Relatórios'
            icon={
              <ChartDonut
                size={20}
                weight='fill'
                className='text-[--textSecondary] group-data-[active=true]:text-[--primaryColor]'
              />
            }
            href='/relatorios'
          />
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
