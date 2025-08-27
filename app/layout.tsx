import { Ubuntu } from 'next/font/google'
import './globals.css'
import Theme from '@/components/Display/Theme'
import { pageMetadata } from '@/lib/misc/metadata'
import { Toaster } from 'sonner'

const roboto = Ubuntu({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = pageMetadata('Início')

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='pt-BR' suppressHydrationWarning>
      <body className={`${roboto.className} antialiased`}>
        <Theme>{children}</Theme>
        <Toaster
          position='top-right'
          toastOptions={{
            duration: 7000,
            style: {
              borderRadius: '1rem',
              fontFamily: 'Ubuntu',
            },
          }}
        />
      </body>
    </html>
  )
}
