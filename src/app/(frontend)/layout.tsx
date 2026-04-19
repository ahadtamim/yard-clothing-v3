import type { Metadata } from 'next'
import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'
import Link from 'next/link'

import { AdminBar } from '@/components/AdminBar'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className="bg-white antialiased">
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          {/* CUSTOM CLEAN HEADER (Requirement Fix) */}
          <nav className="flex items-center justify-between px-8 py-6 bg-black sticky top-0 z-50">
            <Link href="/">
              <div className="hover:opacity-80 transition-opacity">
                <img 
                  src="/logo.png" 
                  alt="Yard" 
                  className="h-8 w-auto brightness-0 invert" 
                />
              </div>
            </Link>
            
            <div className="flex gap-8">
              <Link href="/" className="text-white text-[10px] uppercase tracking-[0.3em] hover:text-gray-400 transition-colors">
                Home
              </Link>
              <Link href="/categories" className="text-white text-[10px] uppercase tracking-[0.3em] hover:text-gray-400 transition-colors">
                Categories
              </Link>
            </div>
          </nav>

          {/* PAGE CONTENT */}
          <div className="min-h-screen">
            {children}
          </div>

          {/* CUSTOM CLEAN FOOTER (Requirement Fix) */}
          <footer className="bg-black text-white pt-20 pb-10 px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 max-w-7xl mx-auto">
              <div>
                <h4 className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-6 font-bold">Support</h4>
                <p className="text-sm">WhatsApp / Call:</p>
                <p className="text-xl font-bold tracking-tighter">+880 1XXX-XXXXXX</p>
                <Link href="#" className="text-blue-400 text-xs mt-4 inline-block hover:underline">
                  Follow us on Facebook
                </Link>
              </div>
              
              <div className="md:text-right">
                <h4 className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-6 font-bold">Policies</h4>
                <ul className="space-y-2 text-xs uppercase tracking-widest text-gray-300">
                  <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
                  <li><Link href="#" className="hover:text-white">Terms of Service</Link></li>
                  <li><Link href="#" className="hover:text-white">Return & Refund Policy</Link></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8 text-center">
              <p className="text-[9px] uppercase tracking-[0.5em] text-gray-500">
                © 2026 Yard Clothing. All Rights Reserved.
              </p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}