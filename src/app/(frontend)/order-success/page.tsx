import React from 'react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function OrderSuccessPage() {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center py-16">
        <div className="mb-8">
          <span className="text-4xl">🎉</span>
        </div>
        <h1 className="text-2xl font-black tracking-tight uppercase text-black mb-4">
          Order Confirmed
        </h1>
        <p className="text-xs text-gray-500 uppercase tracking-wider leading-relaxed mb-8">
          Thank you for shopping with Yard Clothing. Your order has been successfully placed.
        </p>
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="w-full bg-black text-white py-4 text-[10px] font-black tracking-[0.3em] uppercase hover:bg-zinc-800 transition-colors text-center"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
}