'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeParent, setActiveParent] = useState<string | null>(null)
  const [categories, setCategories] = useState<any[]>([])

  // Fetch categories dynamically from Payload API
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories?limit=100')
        const data = await response.json()
        
        // Filter for main categories (those with no parent)
        const parents = data.docs.filter((cat: any) => !cat.parent)
        
        // Attach sub-categories to their respective parents
        const organized = parents.map((parent: any) => ({
          ...parent,
          subCategories: data.docs.filter((sub: any) => sub.parent?.id === parent.id)
        }))
        
        setCategories(organized)
      } catch (error) {
        console.error("Failed to fetch categories:", error)
      }
    }
    fetchCategories()
  }, [])

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
          <div className="absolute top-full right-0 bg-white text-black min-w-[300px] shadow-2xl flex flex-col border-l border-gray-100">
            {categories.map((parent) => (
              <div key={parent.id} className="border-b border-gray-50">
                <button 
                  onClick={() => setActiveParent(activeParent === parent.id ? null : parent.id)}
                  className="w-full text-left px-8 py-6 text-base font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all flex justify-between items-center"
                >
                  {parent.title}
                  <span>{activeParent === parent.id ? '−' : '+'}</span>
                </button>
                
                {activeParent === parent.id && (
                  <div className="bg-gray-50 py-4">
                    <Link 
                      href={`/categories/${parent.slug}`}
                      className="block px-12 py-2 text-[10px] font-bold uppercase tracking-[0.8em] text-gray-400 hover:text-black"
                      onClick={() => setIsOpen(false)}
                    >
                      View All {parent.title}
                    </Link>
                    
                    {parent.subCategories?.map((sub: any) => (
                      <Link 
                        key={sub.id}
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