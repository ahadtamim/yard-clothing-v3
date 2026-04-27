'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/store/useCart'
import { Trash2, ArrowRight } from 'lucide-react'

export default function CartPage() {
  const { items, removeItem } = useCart()
  const [total, setTotal] = useState(0)
  const [isClient, setIsClient] = useState(false)

  // 1. Fix the "Hydration" error and Infinite Loop
  useEffect(() => {
    setIsClient(true)
    const newTotal = items.reduce((acc: number, item: any) => acc + Number(item.price || 0), 0)
    setTotal(newTotal)
  }, [items])

  // Prevent rendering until we are sure we are on the client
  if (!isClient) return null

  if (items.length === 0) {
    return (
      <div className="container mx-auto pt-40 pb-20 px-6 text-center min-h-screen">
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Your Bag is Empty</h1>
        <Link href="/" className="inline-block bg-black text-white px-12 py-4 text-[10px] uppercase tracking-[0.3em] font-bold">
          Shop All
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto pt-32 pb-20 px-6 min-h-screen max-w-5xl">
      <h1 className="text-4xl font-black uppercase tracking-tighter mb-12">Your Bag ({items.length})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* LEFT: ITEM LIST */}
        <div className="lg:col-span-2 space-y-8">
          {items.map((item: any, idx: number) => (
            <div key={idx} className="flex gap-6 border-b border-gray-100 pb-8">
              <div className="w-24 h-32 bg-gray-100 overflow-hidden rounded-sm flex-shrink-0">
                <img 
                  src={item.productImages?.[0]?.url || ''} 
                  className="w-full h-full object-cover" 
                  alt={item.name} 
                />
              </div>
              <div className="flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-bold uppercase tracking-tight">{item.name}</h3>
                    <p className="text-sm font-bold">৳ {item.price}</p>
                  </div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">
                    Size: {item.selectedSize}
                  </p>
                </div>
                <button 
                  onClick={() => removeItem(idx)}
                  className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-black flex items-center gap-1 transition-colors"
                >
                  <Trash2 size={12} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: SUMMARY */}
        <div className="bg-gray-50 p-8 rounded-sm h-fit sticky top-32">
          <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400 mb-8">Summary</h2>
          
          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-xs uppercase tracking-widest">
              <span>Subtotal</span>
              <span>৳ {total}</span>
            </div>
            <div className="flex justify-between text-xs uppercase tracking-widest font-bold text-green-600">
              <span>Delivery</span>
              <span>FREE</span>
            </div>
            <div className="border-t border-gray-200 pt-4 flex justify-between text-sm font-black uppercase tracking-tighter">
              <span>Total</span>
              <span>৳ {total}</span>
            </div>
          </div>

          <Link 
            href="/checkout"
            className="w-full bg-black text-white py-5 text-[10px] uppercase tracking-[0.3em] font-bold flex items-center justify-center gap-2"
          >
            Checkout <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}