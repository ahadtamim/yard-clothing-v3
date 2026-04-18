import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import { Logo } from '@/components/Logo/Logo'
import { CMSLink } from '@/components/Link'

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()
  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto border-t border-border bg-black text-white">
      <div className="container py-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-white/10 pb-12">
          
          {/* Column 1: Brand & Social */}
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="text-sm text-gray-400">Premium apparel designed for the modern landscape.</p>
            <div className="mt-2">
              <a 
                href="https://facebook.com/yourpage" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
              >
                Follow us on Facebook
              </a>
            </div>
          </div>

          {/* Column 2: Customer Support */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold uppercase tracking-widest text-xs text-gray-500">Support</h4>
            <div className="text-sm text-gray-300">
              <p>WhatsApp / Call:</p>
              <p className="text-white font-bold text-lg">+880 1XXX-XXXXXX</p>
              <p className="text-gray-500 mt-2">Available 10 AM - 10 PM</p>
            </div>
          </div>

          {/* Column 3: Navigation & Policies */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold uppercase tracking-widest text-xs text-gray-500">Policies</h4>
            <nav className="flex flex-col gap-2">
              {/* Dynamic links from Payload Admin */}
              {navItems.map(({ link }, i) => (
                <CMSLink className="text-sm text-gray-400 hover:text-white transition-colors" key={i} {...(link as any)} />
              ))}
              {/* Fallback hardcoded links if not in Admin */}
              <Link href="/privacy-policy" className="text-sm text-gray-400 hover:text-white">Privacy Policy</Link>
              <Link href="/return-policy" className="text-sm text-gray-400 hover:text-white">Return & Refund</Link>
            </nav>
          </div>
        </div>

        {/* Big Brand Text at the Bottom */}
        <div className="pt-8 flex flex-col items-center gap-2">
          <p className="text-4xl md:text-5xl font-extrabold tracking-[0.3em] uppercase text-white">
            Yard Clothing
          </p>
          <div className="h-px w-20 bg-white/20 my-2" />
          <p className="text-[10px] text-gray-600 uppercase tracking-[0.8em] font-medium">
            Genuine Quality • Est. 2026
          </p>
        </div>
      </div>
    </footer>
  )
}