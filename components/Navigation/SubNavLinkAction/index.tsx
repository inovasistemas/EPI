import Link from 'next/link'

type SubNavLinkActionProps = {
  name: string
  href: string
}

export function SubNavLinkAction({ name, href }: SubNavLinkActionProps) {
  return (
    <Link
      href={href}
      className='relative flex justify-center items-center gap-3 data-[active=true]:bg-primary hover:bg-primary p-2 rounded-lg font-medium text-sm text-center whitespace-normal transition-all duration-300'
    >
      {name}
    </Link>
  )
}
