'use client'
import React, { useState } from 'react'

export default function Checkout() {
  const [method, setMethod] = useState('cod')

  return (
    <div className="max-w-4xl mx-auto pt-32 pb-20 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* LEFT: INFO */}
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-tighter mb-8">Guest Checkout</h1>
          <div className="space-y-6">
            <input 
              type="email" 
              placeholder="EMAIL FOR ORDER RECEIPT" 
              className="w-full border-b border-gray-200 py-3 outline-none text-xs tracking-widest focus:border-black transition-colors"
            />
            <input 
              type="text" 
              placeholder="FULL NAME" 
              className="w-full border-b border-gray-200 py-3 outline-none text-xs tracking-widest focus:border-black transition-colors"
            />
            <textarea 
              placeholder="SHIPPING ADDRESS" 
              rows={3}
              className="w-full border-b border-gray-200 py-3 outline-none text-xs tracking-widest focus:border-black transition-colors"
            />
          </div>
        </div>

        {/* RIGHT: PAYMENT */}
        <div className="bg-gray-50 p-8 rounded-sm">
          <h2 className="text-xs uppercase tracking-[0.3em] font-bold mb-6 text-gray-500">Order Summary</h2>
          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
              <span>Total</span>
              <span>৳ 1000</span>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-[10px] uppercase tracking-widest font-bold mb-4">Payment Method</h3>
            <div className="p-4 border border-black bg-white flex items-center gap-3">
              <div className="w-2 h-2 bg-black rounded-full" />
              <span className="text-[10px] uppercase font-bold tracking-widest">Cash on Delivery</span>
            </div>
          </div>

          <button className="w-full bg-black text-white py-4 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-zinc-800 transition-colors">
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  )
}