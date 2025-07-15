import Link from 'next/link'

type SubNavLinkActionProps = {
  name: string
  href: string
}

export function SubNavLinkAction({ name, href }: SubNavLinkActionProps) {
  return (
    <Link
      href={href}
      className='relative flex justify-center items-center gap-3 data-[active=true]:bg-[--primaryColor] hover:bg-[--primaryColor] p-2 rounded-lg font-medium text-[--textSecondary] hover:text-white text-sm text-center whitespace-normal transition-all duration-300'
    >
      {name}
    </Link>
  )
}
