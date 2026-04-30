'use client'
import React, { useEffect, useState } from 'react'
import { useCart } from '@/store/useCart'
import Link from 'next/link'
import { Trash2, ShoppingBag } from 'lucide-react'

export default function CartPage() {
  const { items, removeItem } = useCart()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const subtotal = items.reduce((acc: number, item: any) => acc + item.price * (item.quantity || 1), 0)

  const getFullImageUrl = (url: string) => {
    if (!url) return '/placeholder.jpg'
    if (url.startsWith('http')) return url
    const blobDomain = 'https://zjxiyg6t5n64z1cj.public.blob.vercel-storage.com'
    const path = url.startsWith('/') ? url : `/${url}`
    return `${blobDomain}${path}`
  }

  const getSafeId = (item: any) => {
    if (typeof item.id === 'object') {
      return item.id.id || item.id._id || item.id;
    }
    return item.id;
  }

  if (!isMounted) return null

  return (
    <div className="container mx-auto py-24 px-6 min-h-screen bg-white">
      <div className="flex items-center gap-4 mb-12">
        <ShoppingBag size={32} className="text-black" />
        <h1 className="text-4xl font-black uppercase tracking-tighter text-black">
          Your Bag ({items.length})
        </h1>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-gray-200">
          <p className="text-gray-400 uppercase tracking-widest text-xs mb-8">Your bag is empty</p>
          <Link href="/" className="bg-black text-white px-12 py-4 text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-zinc-800 transition-all">
            Explore Shop
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-8">
            {items.map((item: any) => (
              <div key={`${getSafeId(item)}-${item.size}`} className="flex gap-6 border-b border-gray-100 pb-8">
                <div className="w-24 h-32 bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-50">
                  <img src={getFullImageUrl(item.image)} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-[11px] uppercase tracking-wider text-black mb-1">{item.name}</h3>
                      <p className="text-sm font-bold text-gray-900">৳ {item.price}</p>
                    </div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-4">
                      Size: <span className="text-black font-bold">{item.size}</span>
                    </p>
                  </div>

                  <button 
                    onClick={() => {
                      const idToRemove = getSafeId(item);
                      removeItem(idToRemove, item.size);
                    }}
                    className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors uppercase text-[9px] font-black tracking-widest w-fit"
                  >
                    <Trash2 size={12} />
                    Remove Item
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-zinc-50 p-8 h-fit sticky top-24 border border-gray-100">
            <h2 className="text-[10px] uppercase font-black tracking-[0.4em] mb-8 text-gray-400">Order Summary</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-[11px] uppercase tracking-widest">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-black font-bold">৳ {subtotal}</span>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between">
                <span className="text-xs font-black uppercase tracking-tighter text-black">Estimated Total</span>
                <span className="text-lg font-black text-black">৳ {subtotal}</span>
              </div>
            </div>

            <Link href="/checkout">
              <button className="w-full bg-black text-white py-5 text-[10px] uppercase font-black tracking-[0.3em] hover:bg-zinc-800 transition-all shadow-xl active:scale-[0.98]">
                Proceed to Checkout →
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}