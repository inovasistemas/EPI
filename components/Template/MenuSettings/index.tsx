import {
  Article,
  CircleHalf,
  ShieldCheck,
  UserCircle,
} from '@phosphor-icons/react'
import { useState } from 'react'
import { AccountIcon } from '@/components/Display/Icons/Account'
import { CircleHalfIcon } from '@/components/Display/Icons/CircleHalf'
import { PostIcon } from '@/components/Display/Icons/Post'
import { SecurityIcon } from '@/components/Display/Icons/Security'
import { UserIcon } from '@/components/Display/Icons/User'
import { SmallSelect } from '@/components/Inputs/Select/SmallSelect'
import { SubMenuSelect } from '@/components/Inputs/Select/SubMenuSelect'
import { SubNavLink } from '@/components/Navigation/SubNavLink'

export function MenuSettings() {
  const [isOn, setIsOn] = useState(false)

  return (
    <ul className='flex flex-col gap-1 p-3 text-sm transition-all duration-300'>
      <li className='whitespace-nowrap'>
        <SubNavLink
          name='Minha conta'
          icon={
            <AccountIcon
              fill='fill-[--textSecondary]'
              height='h-4'
              width='w-4'
            />
          }
          href='/conta'
        />
        <SubNavLink
          name='Informações e permissões'
          icon={
            <PostIcon fill='fill-[--textSecondary]' height='h-4' width='w-4' />
          }
          href='/conta/informacoes'
        />
        <SubNavLink
          name='Usuários e permissões'
          icon={
            <SecurityIcon
              fill='fill-[--textSecondary]'
              height='h-4'
              width='w-4'
            />
          }
          href='/usuario'
        />
        <div className='relative flex flex-row justify-end items-center bg-transparent hover:bg-[--backgroundPrimary] rounded-lg transition-all duration-300'>
          <span className='left-0 absolute flex items-center gap-3 data-[active=true]:bg-[--backgroundPrimary] hover:bg-[--backgroundPrimary] px-3 py-2 rounded-md font-normal whitespace-normal transition-all duration-300 select-none'>
            <span>
              <CircleHalfIcon
                fill='fill-[--textSecondary]'
                height='h-4'
                width='w-4'
              />
            </span>
            <span className='text-[--textSecondary]'>Aparência</span>
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
        {/* <div className='flex justify-between items-center px-3 py-2'>
          <div>
            <span className='text-[--textSecondary] text-sm line-clamp-2'>
              Visualização otimizada
            </span>
          </div>
          <div
            onClick={() => setIsOn(!isOn)}
            className={`w-10 h-5 flex items-center bg-[#29292E] rounded-full p-1 cursor-pointer transition-colors ${
              isOn ? '!bg-primary' : ''
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                isOn ? 'translate-x-[17px]' : '-translate-x-[1px]'
              }`}
            ></div>
          </div>
        </div> */}
      </li>
    </ul>
  )
}
