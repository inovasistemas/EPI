import { LogoutIcon } from '@/components/Display/Icons/Logout'
import { MoonIcon } from '@/components/Display/Icons/Moon'
import { SettingsIcon } from '@/components/Display/Icons/Settings'
import { SubMenuSelect } from '@/components/Inputs/Select/SubMenuSelect'
import { SubNavLink } from '@/components/Navigation/SubNavLink'

export function MenuSettings() {
  return (
    <ul className='flex flex-col gap-1 p-3 text-sm transition-all duration-300 select-none'>
      <li className='whitespace-nowrap'>
        <SubNavLink
          name='Configurações'
          icon={
            <SettingsIcon size='size-5' stroke='stroke-[--textSecondary]' />
          }
          href='/configuracoes'
        />
        <div className='relative flex flex-row justify-end items-center bg-transparent hover:bg-[--buttonHover] rounded-xl transition-all duration-300'>
          <span className='left-0 absolute flex items-center gap-3 data-[active=true]:bg-[--backgroundPrimary] hover:bg-[--backgroundPrimary] px-3 py-2 rounded-xl font-normal whitespace-normal transition-all duration-300 select-none'>
            <span>
              <MoonIcon size='size-5' stroke='stroke-[--textSecondary]' />
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
          icon={<LogoutIcon size='size-5' stroke='stroke-[--textSecondary]' />}
          href='/sair'
        />
      </li>
    </ul>
  )
}
