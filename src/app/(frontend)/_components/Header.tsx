'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-black text-white py-6 px-10 flex justify-between items-center relative z-50">
      <div className="flex items-center">
        <Link href="/" className="bg-white p-2">
          <img src="/logo.png" alt="Yard" className="h-6" />
        </Link>
      </div>

      <nav className="flex gap-10 items-center">
        <Link href="/" className="text-[10px] uppercase tracking-[0.3em] font-bold">
          Home
        </Link>

        {/* NEW MENU BUTTON */}
        <div className="relative">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-[10px] uppercase tracking-[0.3em] font-bold flex items-center gap-1"
          >
            {isOpen ? 'Close —' : 'Menu +'}
          </button>

          {/* EXPANDABLE DROPDOWN */}
          {isOpen && (
            <div className="absolute top-10 right-0 bg-white text-black min-w-[150px] shadow-xl py-4 flex flex-col border border-gray-100">
              <Link 
                href="/categories/men" 
                className="px-6 py-2 text-[10px] uppercase tracking-widest font-bold hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Men
              </Link>
              <Link 
                href="/categories/women" 
                className="px-6 py-2 text-[10px] uppercase tracking-widest font-bold hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Women
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}