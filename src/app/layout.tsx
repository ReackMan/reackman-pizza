'use client'

import { Nunito } from 'next/font/google'

import './globals.css'
import { Header, Providers } from '@/common'
import { ReactNode, Suspense } from 'react'
import { usePathname } from 'next/navigation'

const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
})

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: ReactNode
  modal: ReactNode
}>) {
  const pathname = usePathname()

  const showHeader = !pathname.startsWith('/checkout')

  return (
    <html lang={'en'}>
      <head>
        <link rel={'icon'} type={'image/svg+xml'} href={'/favicon.svg'} />
        <link rel={'alternate icon'} href={'/logo.png'} />
        <title>Reack Pizza</title>
      </head>
      <body className={nunito.className}>
        <Providers>
          <main className={'min-h-screen'}>
            {showHeader && (
              <Suspense>
                <Header />
              </Suspense>
            )}
            {children}
            {modal}
          </main>
        </Providers>
      </body>
    </html>
  )
}
