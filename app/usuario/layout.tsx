import { MainTemplate } from '@/components/Template/Main'
import { pageMetadata } from '@/lib/misc/metadata'

export const metadata = pageMetadata('Usuário')

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return MainTemplate({ children })
}
