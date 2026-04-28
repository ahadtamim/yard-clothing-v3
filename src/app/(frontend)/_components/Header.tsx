'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingBag, User } from 'lucide-react'
import { useCart } from '@/store/useCart'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const items = useCart((state: any) => state.items)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <header className="bg-white border-b border-gray-100 text-black py-4 px-8 flex justify-between items-center sticky top-0 z-[100]">
      <div className="flex items-center">
        <Link href="/" className="hover:opacity-70 transition-opacity">
          {/* Logo - ensure it's visible on white */}
          <img 
            src="https://zjxiyg6t5n64z1cj.public.blob.vercel-storage.com/Logo/Black%20and%20White%20Yoga%20Studio%20Logo%20%281%29.jpg.jpeg" 
            alt="Yard" 
            className="h-10 w-auto" 
          />
        </Link>
      </div>

      <nav className="flex gap-8 items-center">
        <Link href="/login" className="flex items-center gap-2 hover:opacity-50 transition-opacity">
          <User size={18} strokeWidth={1.5} />
          <span className="text-[10px] uppercase tracking-widest font-bold hidden sm:inline">Account</span>
        </Link>

        <Link href="/cart" className="relative hover:opacity-50 transition-opacity">
          <ShoppingBag size={18} strokeWidth={1.5} />
          {mounted && items.length > 0 && (
            <span className="absolute -top-1 -right-2 bg-black text-white text-[7px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-black">
              {items.length}
            </span>
          )}
        </Link>

        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-[10px] uppercase tracking-[0.3em] font-bold border-l border-gray-200 pl-8 h-5 flex items-center"
        >
          {isOpen ? 'Close —' : 'Menu +'}
        </button>
      </nav>
    </header>
  )
}