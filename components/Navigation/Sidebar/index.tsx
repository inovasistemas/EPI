'use client'
import { Keyhole, SquaresFour, Users } from '@phosphor-icons/react'
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
                size={18}
                weight='fill'
                className='text-[--textSecondary] group-data-[active=true]:text-primary'
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
            name='Colaborador'
            icon={
              <Users
                size={18}
                weight='fill'
                className='text-[--textSecondary] group-data-[active=true]:text-primary'
              />
            }
            href='/colaborador'
          />

          <NavLink
            name='Usuário'
            icon={
              <Keyhole
                size={18}
                weight='fill'
                className='text-[--textSecondary] group-data-[active=true]:text-primary'
              />
            }
            href='/usuario'
          />
        </div>
      </div>
      {/* <div
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
      </div> */}
    </aside>
  )
}

export default Sidebar
