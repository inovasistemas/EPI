import '@/app/globals.css'
import { pageMetadata } from '@/lib/misc/metadata'
import { Ubuntu } from 'next/font/google'

const ubuntu = Ubuntu({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = pageMetadata('Relatório de Auditoria')

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className={`${ubuntu.className} antialiased bg-white text-black p-8 w-full min-h-screen`}>
      {children}
    </main>
  )
}