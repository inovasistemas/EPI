import { PostIcon } from '@/components/Display/Icons/Post'
import { SecurityIcon } from '@/components/Display/Icons/Security'
import { SubNavLink } from '@/components/Navigation/SubNavLink'
import { UserIcon } from '@/components/Display/Icons/User'
import { UserCircle, ShieldCheck, Article } from '@phosphor-icons/react'
import { useState } from 'react'
import { AccountIcon } from '@/components/Display/Icons/Account'

export function MenuSettings() {
  const [isOn, setIsOn] = useState(false)

  return (
    <ul className='flex flex-col gap-1 p-3 text-sm transition-all duration-150'>
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
          name='Senha e segurança'
          icon={
            <SecurityIcon
              fill='fill-[--textSecondary]'
              height='h-4'
              width='w-4'
            />
          }
          href='/conta/seguranca'
        />
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
