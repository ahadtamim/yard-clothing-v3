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
          
          <footer className="bg-black text-white pt-20 pb-10 px-6 sm:px-12 border-t border-white/5">
            <div className="max-w-7xl mx-auto w-full">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
                
                {/* 1. LOCATION / ADDRESS */}
                <div className="space-y-6">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Location</h3>
                  <p className="text-[11px] leading-loose text-gray-400 uppercase tracking-widest max-w-[250px]">
                    House no-64, Dokhingaon,<br />
                    Nodipara Main Road<br />
                    (Beside Masjid-a-Nur)
                  </p>
                </div>

                {/* 2. CONTACT / SOCIALS */}
                <div className="space-y-6">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Contact</h3>
                  <div className="space-y-4">
                    <p className="text-[11px] text-gray-400 uppercase tracking-widest font-bold">
                      +880 1632-235335
                    </p>
                    <div className="flex flex-col gap-3">
                      <a 
                        href="https://www.facebook.com/share/182hyZgeaN/?mibextid=wwXIfr" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[10px] uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors"
                      >
                        Facebook —&gt;
                      </a>
                      <a href="#" className="text-[10px] uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors">
                        Instagram —&gt;
                      </a>
                      <a 
                        href="https://wa.me/8801632235335" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[10px] uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors"
                      >
                        WhatsApp —&gt;
                      </a>
                    </div>
                  </div>
                </div>

                {/* 3. BRAND TAGLINE */}
                <div className="space-y-6">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Yard Clothing</h3>
                  <p className="text-[11px] leading-loose text-gray-500 uppercase tracking-widest">
                    Crafting premium street aesthetics. <br />
                    Designed and built in Dhaka.
                  </p>
                </div>
              </div>

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

// --- METADATA FIXES START HERE ---
export const metadata: Metadata = {
  metadataBase: serverUrl ? new URL(serverUrl) : new URL('https://yard-clothing-v3.vercel.app'),
  title: {
    template: '%s | Yard Clothing',
    default: 'Yard Clothing | Premium Street Aesthetics',
  },
  description: 'Premium streetwear and aesthetics designed and built in Dhaka.',
  openGraph: mergeOpenGraph({
    title: 'Yard Clothing',
    description: 'Premium streetwear and aesthetics designed and built in Dhaka.',
    url: '/',
    siteName: 'Yard Clothing',
  }),
  twitter: {
    card: 'summary_large_image',
    creator: '@yardclothing', // Update this to your handle or remove it
  },
}