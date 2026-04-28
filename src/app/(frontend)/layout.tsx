'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/store/useCart'
import { ShoppingBag, User } from 'lucide-react'

export default function Nav() {
  const { items } = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    /**
     * FIXED: Changed background to bg-white.
     * Added border-b for subtle definition against the white page.
     */
    <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO AREA: Blends perfectly with your white logo background */}
        <Link href="/" className="flex-shrink-0">
          <img 
            src="/logo.png" 
            alt="YARD" 
            className="h-10 w-auto object-contain" 
          />
        </Link>

        {/* NAVIGATION LINKS: Changed text to black for high contrast */}
        <div className="hidden md:flex items-center gap-12">
          <Link href="/shop" className="text-[10px] font-black uppercase tracking-[0.4em] text-black hover:text-gray-400 transition-colors">
            Shop
          </Link>
          <Link href="/new-arrivals" className="text-[10px] font-black uppercase tracking-[0.4em] text-black hover:text-gray-400 transition-colors">
            New Arrivals
          </Link>
        </div>

        {/* UTILITY ICONS: Changed to text-black */}
        <div className="flex items-center gap-8 text-black">
          <Link href="/account" className="flex items-center gap-2 hover:opacity-60 transition-opacity">
            <User size={18} strokeWidth={2.5} />
            <span className="text-[9px] font-black uppercase tracking-widest hidden lg:block">Account</span>
          </Link>
          
          <Link href="/cart" className="relative flex items-center gap-2 hover:opacity-60 transition-opacity">
            <div className="relative">
              <ShoppingBag size={18} strokeWidth={2.5} />
              {mounted && items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest hidden lg:block">
              Bag ({mounted ? items.length : 0})
            </span>
          </Link>
        </div>

      </div>
    </nav>
  )
}