'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingBag, User } from 'lucide-react'
import { useCart } from '@/store/useCart' // Import your cart store

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeParent, setActiveParent] = useState<string | null>(null)
  const [categories, setCategories] = useState<any[]>([])
  const { items } = useCart() // Get cart items
  const [mounted, setMounted] = useState(false)

  // Ensure cart count only renders on client to prevent hydration errors
  useEffect(() => {
    setMounted(true)
    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories?limit=100')
        const data = await response.json()
        const parents = data.docs.filter((cat: any) => !cat.parent)
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
    /* FIXED: Changed bg-black to bg-white and added a subtle border */
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 sticky top-0 z-50">
      
      {/* LOGO: Removed mix-blend-screen to match the white background */}
      <Link href="/" className="hover:opacity-80 transition-opacity">
        <img 
          src="https://zjxiyg6t5n64z1cj.public.blob.vercel-storage.com/Logo/Black%20and%20White%20Yoga%20Studio%20Logo%20%281%29.jpg.jpeg" 
          alt="Yard" 
          className="h-14 w-auto" 
        />
      </Link>
      
      {/* RIGHT SIDE ACTIONS */}
      <div className="flex gap-8 items-center">
        
        {/* LOGIN / ACCOUNT: Changed text color to text-black */}
        <Link href="/account" className="text-black hover:text-gray-500 transition-colors flex items-center gap-2">
          <User size={18} strokeWidth={1.5} />
          <span className="text-[10px] uppercase tracking-widest font-black hidden sm:inline">Account</span>
        </Link>

        {/* BAG / CART: Changed icon color to text-black and badge to bg-black */}
        <Link href="/cart" className="text-black hover:text-gray-500 transition-colors relative group">
          <ShoppingBag size={18} strokeWidth={1.5} />
          {mounted && items.length > 0 && (
            <span className="absolute -top-1 -right-2 bg-black text-white text-[7px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-black">
              {items.length}
            </span>
          )}
        </Link>

        {/* MENU TOGGLE: Changed text and border color to black */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-black text-[10px] uppercase tracking-[0.3em] font-black border-l border-black/10 pl-8 h-6 flex items-center"
        >
          {isOpen ? 'Close —' : 'Menu +'}
        </button>

        {/* DROPDOWN MENU */}
        {isOpen && (
          <div className="absolute top-full right-0 bg-white text-black min-w-[300px] shadow-2xl flex flex-col border border-gray-100">
            {categories.map((parent) => (
              <div key={parent.id} className="border-b border-gray-50">
                <button 
                  onClick={() => setActiveParent(activeParent === parent.id ? null : parent.id)}
                  className="w-full text-left px-8 py-6 text-xs font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all flex justify-between items-center"
                >
                  {parent.title}
                  <span className="font-light">{activeParent === parent.id ? '−' : '+'}</span>
                </button>
                
                {activeParent === parent.id && (
                  <div className="bg-gray-50 py-4">
                    <Link 
                      href={`/categories/${parent.slug}`}
                      className="block px-12 py-2 text-[9px] font-black uppercase tracking-[0.5em] text-gray-400 hover:text-black transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      View All
                    </Link>
                    
                    {parent.subCategories?.map((sub: any) => (
                      <Link 
                        key={sub.id}
                        href={`/categories/${sub.slug}`}
                        className="block px-12 py-3 text-[11px] font-bold uppercase tracking-widest hover:translate-x-2 transition-transform"
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