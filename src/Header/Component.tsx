import Link from 'next/link'
import React from 'react'
import { Logo } from '@/components/Logo/Logo'

export async function Header() {
  return (
    <header className="relative z-20 border-b border-border bg-white dark:bg-black">
      <div className="container py-4 flex items-center justify-between">
        {/* Logo on the left */}
        <Link href="/">
          <Logo />
        </Link>

        {/* Hardcoded Navigation in the center/right */}
        <nav className="flex gap-6 items-center">
          <Link href="/" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link href="/categories" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Categories
          </Link>
          {/* Add more links here if needed */}
        </nav>

        {/* Search or Cart icons would go here */}
        <div className="flex items-center gap-4">
          {/* Optional icons */}
        </div>
      </div>
    </header>
  )
}