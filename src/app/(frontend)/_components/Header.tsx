'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ShoppingBag, User } from 'lucide-react' // Using lucide for consistency

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-black text-white py-6 px-10 flex justify-between items-center sticky top-0 z-[100]">
      {/* LOGO SECTION */}
      <div className="flex items-center">
        <Link href="/" className="bg-white p-1 hover:opacity-90 transition-opacity">
          <img 
            src="https://zjxiyg6t5n64z1cj.public.blob.vercel-storage.com/Logo/Black%20and%20White%20Yoga%20Studio%20Logo%20%281%29.jpg.jpeg" 
            alt="Yard" 
            className="h-10 w-auto mix-blend-screen" 
          />
        </Link>
      </div>

      {/* NAVIGATION & ICONS */}
      <nav className="flex gap-8 items-center">
        {/* LOGIN / ACCOUNT */}
        <Link href="/login" className="flex items-center gap-2 hover:text-gray-400 transition-colors">
          <User size={18} strokeWidth={1.5} />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold hidden sm:inline">Account</span>
        </Link>

        {/* BAG / CART */}
        <Link href="/cart" className="relative hover:text-gray-400 transition-colors">
          <ShoppingBag size={18} strokeWidth={1.5} />
          <span className="absolute -top-1 -right-2 bg-white text-black text-[7px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-black">
            0
          </span>
        </Link>

        {/* MENU DROPDOWN */}
        <div className="relative border-l border-white/20 pl-8 h-5 flex items-center">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-[10px] uppercase tracking-[0.3em] font-bold flex items-center gap-1 hover:text-gray-400 transition-colors"
          >
            {isOpen ? 'Close —' : 'Menu +'}
          </button>

          {isOpen && (
            <div className="absolute top-10 right-0 bg-white text-black min-w-[200px] shadow-2xl py-4 flex flex-col border border-gray-100 rounded-sm">
              <Link 
                href="/categories/men" 
                className="px-8 py-3 text-[10px] uppercase tracking-widest font-black hover:bg-black hover:text-white transition-all"
                onClick={() => setIsOpen(false)}
              >
                Men
              </Link>
              <Link 
                href="/categories/women" 
                className="px-8 py-3 text-[10px] uppercase tracking-widest font-black hover:bg-black hover:text-white transition-all"
                onClick={() => setIsOpen(false)}
              >
                Women
              </Link>
              <div className="border-t border-gray-100 my-2" />
              <Link 
                href="/cart" 
                className="px-8 py-3 text-[9px] uppercase tracking-widest font-bold text-gray-400 hover:text-black"
                onClick={() => setIsOpen(false)}
              >
                View Bag
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}