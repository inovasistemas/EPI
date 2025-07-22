import Link from 'next/link'

type SubNavLinkActionProps = {
  name: string
  href: string
}

export function SubNavLinkAction({ name, href }: SubNavLinkActionProps) {
  return (
    <Link
      href={href}
      className='relative flex justify-center items-center gap-3 bg-[--primaryColor] hover:bg-[--secondaryColor] p-2 rounded-xl font-medium text-white text-sm text-center whitespace-normal active:scale-95 transition-all duration-300'
    >
      {name}
    </Link>
  )
}
