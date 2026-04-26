'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-black sticky top-0 z-50">
      <Link href="/" className="hover:opacity-80 transition-opacity">
        <div className="flex items-center">
          <img 
            src="https://zjxiyg6t5n64z1cj.public.blob.vercel-storage.com/Logo/Black%20and%20White%20Yoga%20Studio%20Logo%20%281%29.jpg.jpeg" 
            alt="Yard" 
            className="h-14 w-auto mix-blend-screen" 
          />
        </div>
      </Link>
      
      <div className="flex gap-10 items-center">
        <Link href="/" className="text-white text-[10px] uppercase tracking-[0.3em] hover:text-gray-400 transition-colors font-bold">
          Home
        </Link>
        
        <div className="relative">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-white text-[10px] uppercase tracking-[0.3em] hover:text-gray-400 transition-colors flex items-center gap-2 font-bold"
          >
            {isOpen ? 'Close —' : 'Menu +'}
          </button>

          {/* HIGH-CONTRAST DROPDOWN */}
          {isOpen && (
            <div className="absolute top-12 right-0 bg-white text-black min-w-[220px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] py-0 flex flex-col border border-gray-200 animate-in fade-in slide-in-from-top-4 duration-300">
              <Link 
                href="/categories/men" 
                className="px-8 py-6 text-base uppercase tracking-[0.3em] font-black hover:bg-black hover:text-white transition-all duration-200 border-b border-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Men
              </Link>
              <Link 
                href="/categories/women" 
                className="px-8 py-6 text-base uppercase tracking-[0.3em] font-black hover:bg-black hover:text-white transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                Women
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}