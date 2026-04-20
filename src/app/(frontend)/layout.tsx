import type { Metadata } from 'next'
import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'
import Link from 'next/link'

import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // We keep this line to support preview functionality, but we won't render the AdminBar UI
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
          {/* REMOVAL NOTICE: 
            The <AdminBar /> component has been deleted from here.
            This is what removes the "Dashboard", "New Page", and "Logout" 
            options from the top of your public website.
          */}

          {/* --- PREMIUM NAVBAR --- */}
          <nav className="flex items-center justify-between px-8 py-8 bg-black sticky top-0 z-50">
            <Link href="/" className="hover:opacity-70 transition-opacity">
              {/* STABLE TYPOGRAPHY LOGO: Fixes the broken image issue forever */}
              <span className="text-white font-bold tracking-[0.4em] text-2xl uppercase">
                Yard
              </span>
            </Link>
            
            <div className="flex gap-10">
              <Link href="/" className="text-white text-[10px] uppercase tracking-[0.3em] hover:text-gray-400 transition-colors">
                Home
              </Link>
              <Link href="/categories" className="text-white text-[10px] uppercase tracking-[0.3em] hover:text-gray-400 transition-colors">
                Categories
              </Link>
            </div>
          </nav>

          <main className="min-h-screen">
            {children}
          </main>

          {/* --- CLEAN FOOTER --- */}
          <footer className="bg-black text-white pt-24 pb-12 px-8 border-t border-white/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 max-w-7xl mx-auto">
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.4em] text-gray-500 mb-6 font-bold">Support</h4>
                <p className="text-sm opacity-80">WhatsApp / Call:</p>
                <p className="text-xl font-bold tracking-tighter mt-1">+880 1XXX-XXXXXX</p>
                <Link href="#" className="text-white/40 text-[10px] uppercase tracking-widest mt-6 inline-block hover:text-white transition-colors">
                  Follow us on Facebook
                </Link>
              </div>
              
              <div className="md:text-right">
                <h4 className="text-[10px] uppercase tracking-[0.4em] text-gray-500 mb-6 font-bold">Policies</h4>
                <ul className="space-y-3 text-[10px] uppercase tracking-widest text-gray-400">
                  <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Return & Refund Policy</Link></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8 text-center">
              <p className="text-[9px] uppercase tracking-[0.5em] text-gray-600">
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