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
        <Link href="/" className="text-white text-[10px] uppercase tracking-[0.3em] hover:text-gray-400 transition-colors">
          Home
        </Link>
        
        {/* MODIFIED: Replaced Categories with Menu Toggle */}
        <div className="relative">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-white text-[10px] uppercase tracking-[0.3em] hover:text-gray-400 transition-colors flex items-center gap-2"
          >
            {isOpen ? 'Close —' : 'Menu +'}
          </button>

          {/* EXPANDABLE DROPDOWN */}
          {isOpen && (
            <div className="absolute top-10 right-0 bg-white text-black min-w-[160px] shadow-2xl py-4 flex flex-col border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200">
              <Link 
                href="/categories/men" 
                className="px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-gray-50 border-b border-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Men
              </Link>
              <Link 
                href="/categories/women" 
                className="px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-gray-50"
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