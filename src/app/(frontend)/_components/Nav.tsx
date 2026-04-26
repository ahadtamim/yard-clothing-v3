'use client'

import React, { useState } from 'react'
import Link from 'next/link'

// Example structure - in a real app, you might fetch this from Payload
const navigationData = [
  {
    title: 'Men',
    slug: 'men',
    subCategories: [
      { title: 'T-shirts', slug: 't-shirt' },
      { title: 'Panjabi', slug: 'panjabi' },
      { title: 'Pants', slug: 'pants' },
    ],
  },
  {
    title: 'Women',
    slug: 'women',
    subCategories: [
      { title: 'Saree', slug: 'saree' },
      { title: 'Kurtis', slug: 'kurtis' },
    ],
  },
]

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeParent, setActiveParent] = useState<string | null>(null)

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-black sticky top-0 z-50">
      <Link href="/" className="hover:opacity-80 transition-opacity">
        <img 
          src="https://zjxiyg6t5n64z1cj.public.blob.vercel-storage.com/Logo/Black%20and%20White%20Yoga%20Studio%20Logo%20%281%29.jpg.jpeg" 
          alt="Yard" 
          className="h-14 w-auto mix-blend-screen" 
        />
      </Link>
      
      <div className="flex gap-10 items-center">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-white text-[10px] uppercase tracking-[0.3em] font-bold"
        >
          {isOpen ? 'Close —' : 'Menu +'}
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 bg-white text-black min-w-[300px] shadow-2xl flex flex-col border-l border-gray-100 animate-in slide-in-from-right duration-300">
            {navigationData.map((parent) => (
              <div key={parent.slug} className="border-b border-gray-50">
                <button 
                  onMouseEnter={() => setActiveParent(parent.slug)}
                  className="w-full text-left px-8 py-6 text-base font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all flex justify-between items-center"
                >
                  {parent.title}
                  <span>{activeParent === parent.slug ? '−' : '+'}</span>
                </button>
                
                {/* SUB-CATEGORIES SECTION */}
                {activeParent === parent.slug && (
                  <div className="bg-gray-50 py-4">
                    <Link 
                      href={`/categories/${parent.slug}`}
                      className="block px-12 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black"
                      onClick={() => setIsOpen(false)}
                    >
                      View All {parent.title}
                    </Link>
                    {parent.parent_products?.map((sub) => (
                      <Link 
                        key={sub.slug}
                        href={`/categories/${sub.slug}`}
                        className="block px-12 py-3 text-sm font-medium hover:translate-x-2 transition-transform"
                        onClick={() => setIsOpen(false)}
                      >
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}