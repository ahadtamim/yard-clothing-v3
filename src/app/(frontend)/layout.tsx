import type { Metadata } from 'next'
import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'
import Link from 'next/link'

import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import Nav from './_components/Nav'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html 
      className={cn(GeistSans.variable, GeistMono.variable)} 
      lang="en" 
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
      </head>
      <body className="bg-white text-black antialiased min-h-screen flex flex-col">
        <Providers>
          <Nav />
          <main className="flex-grow">
            {children}
          </main>
          <footer className="bg-black text-white pt-24 pb-12 px-8 border-t border-white/5">
            <div className="max-w-7xl mx-auto w-full">
              <div className="border-t border-white/10 pt-8 text-center">
                <p className="text-[9px] uppercase tracking-[0.5em] text-gray-600">
                  © 2026 Yard Clothing. All Rights Reserved.
                </p>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  )
}

// Safety: Check if URL exists before creating Metadata object
const serverUrl = getServerSideURL()

export const metadata: Metadata = {
  metadataBase: serverUrl ? new URL(serverUrl) : new URL('https://yard-clothing-v3.vercel.app'),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}