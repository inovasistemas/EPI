import { Ubuntu } from 'next/font/google'
import './globals.css'
import { pageMetadata } from '@/lib/misc/metadata'
import Theme from '@/components/Display/Theme'

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
    <html lang='pt-br' suppressHydrationWarning>
      <body className={`${roboto.className} antialiased`}>
        <Theme>{children}</Theme>
      </body>
    </html>
  )
}
