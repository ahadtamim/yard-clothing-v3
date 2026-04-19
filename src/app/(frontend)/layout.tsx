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

          {/* --- FIXED PREMIUM NAVBAR --- */}
          <nav className="flex items-center justify-between px-8 py-6 bg-black sticky top-0 z-50">
            <Link href="/">
              <div className="hover:opacity-80 transition-opacity flex items-center min-h-[32px]">
                <img 
                  src="/logo.png" 
                  alt="Yard" 
                  /* 'brightness-0 invert' handles black-to-white conversion.
                    If your logo is already white, you can remove 'brightness-0 invert'.
                  */
                  className="h-7 w-auto block brightness-0 invert" 
                  onError={(e) => {
                    // Fallback to text if the image path is broken or file is missing
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.innerHTML = '<span class="text-white font-bold tracking-tighter text-xl uppercase">Yard</span>';
                    }
                  }}
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

          {/* --- CLEAN FOOTER --- */}
          <footer className="bg-black text-white pt-20 pb-10 px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 max-w-7xl mx-auto">
              <div>
                <h4 className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-6 font-bold">Support</h4>
                <p className="text-sm">WhatsApp / Call:</p>
                <p className="text-xl font-bold tracking-tighter text-white">+880 1XXX-XXXXXX</p>
                <Link href="#" className="text-blue-400 text-xs mt-4 inline-block hover:underline">
                  Follow us on Facebook
                </Link>
              </div>
              
              <div className="md:text-right">
                <h4 className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-6 font-bold">Policies</h4>
                <ul className="space-y-2 text-xs uppercase tracking-widest text-gray-300">
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