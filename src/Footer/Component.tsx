import Link from 'next/link'
import React from 'react'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-black text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-white/10 pb-12">
          
          {/* Column 1: Social & Logo */}
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="text-sm text-gray-400">Premium apparel for the modern landscape.</p>
            <a 
              href="https://facebook.com/yardclothing" 
              target="_blank" 
              className="text-blue-400 hover:text-blue-300 text-sm font-bold"
            >
              Follow us on Facebook
            </a>
          </div>

          {/* Column 2: Hardcoded Support */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold uppercase tracking-widest text-xs text-gray-500">Support</h4>
            <div className="text-sm text-gray-300">
              <p>WhatsApp / Call:</p>
              <p className="text-white font-bold text-lg">+880 1XXX-XXXXXX</p>
            </div>
          </div>

          {/* Column 3: Hardcoded Policies */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold uppercase tracking-widest text-xs text-gray-500">Policies</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/privacy-policy" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/return-policy" className="text-sm text-gray-400 hover:text-white transition-colors">
                Return & Refund Policy
              </Link>
            </nav>
          </div>
        </div>

        {/* Yard Clothing Text at the very bottom */}
        <div className="pt-8 flex flex-col items-center gap-2">
          <p className="text-4xl md:text-5xl font-extrabold tracking-[0.3em] uppercase text-white">
            Yard Clothing
          </p>
          <p className="text-[10px] text-gray-600 uppercase tracking-[0.8em]">
            Est. 2026 • Genuine Quality
          </p>
        </div>
      </div>
    </footer>
  )
}