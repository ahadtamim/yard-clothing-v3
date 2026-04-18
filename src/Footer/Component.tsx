import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
      <div className="container py-12 flex flex-col gap-12">
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          {/* Brand Identity Section */}
          <div className="flex flex-col gap-4">
            <Link className="flex items-center" href="/">
              <Logo />
            </Link>
            <p className="max-w-xs text-sm text-gray-400">
              Premium apparel designed for the modern landscape.
            </p>
          </div>

          {/* Navigation and Theme Section */}
          <div className="flex flex-col-reverse items-start md:flex-row gap-8 md:items-center">
            <ThemeSelector />
            <nav className="flex flex-col md:flex-row gap-4">
              {navItems.map(({ link }, i) => {
                /* FIX: Cast to 'any' to allow 'products' and 'categories' links 
                   until the CMSLink component type is updated globally.
                */
                return <CMSLink className="text-white hover:text-gray-300 transition-colors" key={i} {...(link as any)} />
              })}
            </nav>
          </div>
        </div>

        {/* BOTTOM BRANDING FIX: Large 'Yard Clothing' text at the very bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-2xl font-bold tracking-[0.2em] uppercase">
            Yard Clothing
          </p>
          <p className="text-xs text-gray-500 uppercase tracking-widest">
            © {new Date().getFullYear()} All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  )
}