import { SubNavLink } from '@/components/Navigation/SubNavLink'
import { SubNavLinkAction } from '@/components/Navigation/SubNavLinkAction'

export function MenuNotifications() {
  return (
    <ul className='flex flex-col gap-1 p-3 text-sm transition-all duration-300 select-none'>
      <li className='whitespace-nowrap'>
        <SubNavLink
          name='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
          href='/conta'
          date='25m'
          read={true}
        />
      </li>
      <li className='whitespace-nowrap'>
        <SubNavLink
          name='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
          href='/conta/informacoes'
          date='45m'
          read={true}
        />
      </li>
      <li className='whitespace-nowrap'>
        <SubNavLink
          name='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
          href='/conta/seguranca'
          date='1d'
          read={false}
        />
      </li>
      <li>
        <SubNavLinkAction name='Ver tudo' href='conta/notificacoes' />
      </li>
    </ul>
  )
}
