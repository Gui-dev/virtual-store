import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ptBR } from '@clerk/localizations'

import { Header } from './components/header'
import './globals.css'
import { Hydrate } from './components/hydrate'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Virtual E-Commerce',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="en">
        <body className={`${inter.className} bg-slate-700`}>
          <Hydrate>
            <Header />
            <main className="h-screen">{children}</main>
          </Hydrate>
        </body>
      </html>
    </ClerkProvider>
  )
}
