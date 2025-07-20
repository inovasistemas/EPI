import { Door, GearSix, Moon } from '@phosphor-icons/react'
import { SubMenuSelect } from '@/components/Inputs/Select/SubMenuSelect'
import { SubNavLink } from '@/components/Navigation/SubNavLink'

export function MenuSettings() {
  return (
    <ul className='flex flex-col gap-1 p-3 text-sm transition-all duration-300 select-none'>
      <li className='whitespace-nowrap'>
        <SubNavLink
          name='Configurações'
          icon={
            <GearSix
              size={16}
              weight='fill'
              className='text-[--textSecondary]'
            />
          }
          href='/configuracoes'
        />
        <div className='relative flex flex-row justify-end items-center bg-transparent hover:bg-[--backgroundPrimary] rounded-lg transition-all duration-300'>
          <span className='left-0 absolute flex items-center gap-3 data-[active=true]:bg-[--backgroundPrimary] hover:bg-[--backgroundPrimary] px-3 py-2 rounded-md font-normal whitespace-normal transition-all duration-300 select-none'>
            <span>
              <Moon
                size={16}
                weight='fill'
                className='text-[--textSecondary]'
              />
            </span>
            <span className='font-medium text-[--textSecondary]'>
              Aparência
            </span>
          </span>
          <div className='w-full'>
            <SubMenuSelect
              name='Teste'
              options={[
                { value: 'system', label: 'Sistema' },
                { value: 'dark', label: 'Escuro' },
                { value: 'light', label: 'Claro' },
              ]}
            />
          </div>
        </div>
        <SubNavLink
          name='Sair'
          icon={
            <Door size={16} weight='fill' className='text-[--textSecondary]' />
          }
          href='/sair'
        />
      </li>
    </ul>
  )
}
