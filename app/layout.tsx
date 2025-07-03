import { Ubuntu } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from 'next-themes'

import { pageMetadata } from '@/lib/misc/metadata'

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
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
