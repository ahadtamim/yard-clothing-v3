'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import type { Header, SiteSetting } from '@/payload-types' // Ensure SiteSetting type is generated

import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
  settings?: SiteSetting // Added settings prop to receive the logo
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, settings }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
  }, [pathname, setHeaderTheme])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
  }, [headerTheme, theme])

  // Logic to determine what to show for the Logo
  const logoUrl = typeof settings?.logo === 'object' ? settings?.logo?.url : null
  const siteName = settings?.siteName || 'Yard Clothing'

  return (
    <header className="container relative z-20" {...(theme ? { 'data-theme': theme } : {})}>
      <div className="py-8 flex justify-between items-center">
        <Link href="/">
          {logoUrl ? (
            /* If logo exists in Admin -> Site Settings, show it */
            <Image
              src={logoUrl}
              alt={siteName}
              width={160}
              height={50}
              priority
              className="object-contain max-h-12 w-auto"
            />
          ) : (
            /* Fallback to text if no logo is uploaded yet */
            <span className="text-2xl font-bold tracking-tight">{siteName}</span>
          )}
        </Link>
        <HeaderNav data={data} />
      </div>
    </header>
  )
}