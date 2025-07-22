import Link from 'next/link'

type PrimaryLinkProps = {
  label: string
  icon: React.ReactElement
  href: string
}

export function PrimaryLink({ label, icon, href }: PrimaryLinkProps) {
  return (
    <Link
      href={href}
      type='button'
      className='group z-[55] relative flex justify-center items-center gap-2 bg-[--primaryColor] hover:bg-[--secondaryColor] px-4 pr-5 rounded-xl h-10 text-white active:scale-95 transition-all duration-300 cursor-pointer select-none'
    >
      {icon}
      <span className='font-medium text-sm'>{label}</span>
    </Link>
  )
}
