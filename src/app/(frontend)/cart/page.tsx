'use client'
import React from 'react'
import Link from 'next/link'

export default function CartPage() {
  return (
    <div className="container mx-auto pt-32 pb-20 px-6 min-h-screen">
      <h1 className="text-4xl font-bold uppercase tracking-tighter mb-8">Your Bag</h1>
      
      {/* This is a placeholder until we connect the actual cart state */}
      <div className="border-t border-gray-100 py-20 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-8">Your bag is currently empty.</p>
        <Link href="/" className="bg-black text-white px-10 py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-zinc-800 transition-colors">
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}