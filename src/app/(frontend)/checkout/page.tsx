'use client'
import React, { useState, useEffect } from 'react'
import { useCart } from '@/store/useCart'
import { useRouter } from 'next/navigation'

export default function Checkout() {
  const router = useRouter()
  const { items, clearCart } = useCart()
  const [mounted, setMounted] = useState(false)
  
  // Calculate actual total from the bag
  const total = items.reduce((acc: number, item: any) => acc + Number(item.price || 0), 0)

  useEffect(() => {
    setMounted(true)
    // If someone visits /checkout with an empty bag, send them back to shop
    if (items.length === 0 && mounted) {
      router.push('/')
    }
  }, [items, mounted, router])

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send the 'items' and 'total' to your Payload CMS here
    alert('Order Placed Successfully! Thank you for shopping with Yard.')
    clearCart() // Empty the bag
    router.push('/') // Redirect home
  }

  if (!mounted || items.length === 0) return null

  return (
    <div className="max-w-4xl mx-auto pt-32 pb-20 px-6 text-black min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* LEFT: INFO */}
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter mb-8">Guest Checkout</h1>
          <form onSubmit={handleConfirmOrder} id="checkout-form" className="space-y-8">
            <div className="group">
              <label className="text-[9px] uppercase font-bold text-gray-400 tracking-widest mb-1 block">Email</label>
              <input 
                required
                type="email" 
                placeholder="EMAIL FOR ORDER RECEIPT" 
                className="w-full border-b border-gray-200 py-3 outline-none text-xs tracking-widest focus:border-black transition-colors bg-transparent text-black"
              />
            </div>
            
            <div className="group">
              <label className="text-[9px] uppercase font-bold text-gray-400 tracking-widest mb-1 block">Full Name</label>
              <input 
                required
                type="text" 
                placeholder="FULL NAME" 
                className="w-full border-b border-gray-200 py-3 outline-none text-xs tracking-widest focus:border-black transition-colors bg-transparent text-black"
              />
            </div>

            <div className="group">
              <label className="text-[9px] uppercase font-bold text-gray-400 tracking-widest mb-1 block">Address</label>
              <textarea 
                required
                placeholder="SHIPPING ADDRESS (STREET, CITY, ZIP)" 
                rows={3}
                className="w-full border-b border-gray-200 py-3 outline-none text-xs tracking-widest focus:border-black transition-colors bg-transparent text-black resize-none"
              />
            </div>
          </form>
        </div>

        {/* RIGHT: SUMMARY & PAYMENT */}
        <div className="bg-gray-50 p-8 rounded-sm h-fit border border-gray-100">
          <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-8 text-gray-400">Order Summary</h2>
          
          <div className="space-y-4 mb-8">
            {items.map((item: any, i: number) => (
              <div key={i} className="flex justify-between text-[10px] uppercase tracking-widest text-gray-600">
                <span>{item.name} (x1)</span>
                <span>৳ {item.price}</span>
              </div>
            ))}
            
            <div className="border-t border-gray-200 pt-4 flex justify-between text-sm font-black uppercase tracking-tight">
              <span>Total Amount</span>
              <span>৳ {total}</span>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-[9px] uppercase tracking-widest font-black mb-4">Payment Method</h3>
            <div className="p-4 border-2 border-black bg-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-black rounded-full" />
                <span className="text-[10px] uppercase font-black tracking-widest">Cash on Delivery</span>
              </div>
              <span className="text-[8px] text-gray-400 font-bold uppercase italic">BD ONLY</span>
            </div>
          </div>

          <button 
            type="submit"
            form="checkout-form"
            className="w-full bg-black text-white py-5 text-[10px] uppercase tracking-[0.3em] font-black hover:bg-zinc-800 transition-all active:scale-[0.98]"
          >
            Confirm Order
          </button>
          
          <p className="text-[9px] text-center text-gray-400 uppercase tracking-widest mt-6 leading-relaxed">
            Standard delivery within 2-3 business days.
          </p>
        </div>

      </div>
    </div>
  )
}