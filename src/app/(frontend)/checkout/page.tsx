'use client'
import React, { useState, useEffect } from 'react'
import { useCart } from '@/store/useCart'
import { useRouter } from 'next/navigation'

// List of all 64 districts in Bangladesh
const BANGLADESH_DISTRICTS = [
  "Bagerhat", "Bandarban", "Barguna", "Barishal", "Bhola", "Bogra", "Brahmanbaria", "Chandpur", "Chattogram", "Chuadanga", "Cumilla", "Cox's Bazar", "Dhaka", "Dinajpur", "Faridpur", "Feni", "Gaibandha", "Gazipur", "Gopalganj", "Habiganj", "Jamalpur", "Jashore", "Jhalokati", "Jhenaidah", "Joypurhat", "Khagrachari", "Khulna", "Kishoreganj", "Kurigram", "Kushtia", "Lakshmipur", "Lalmonirhat", "Madaripur", "Magura", "Manikganj", "Meherpur", "Moulvibazar", "Munshiganj", "Mymensingh", "Naogaon", "Narail", "Narayanganj", "Narsingdi", "Natore", "Netrokona", "Nilphamari", "Noakhali", "Pabna", "Panchagarh", "Patuakhali", "Pirojpur", "Rajbari", "Rajshahi", "Rangamati", "Rangpur", "Satkhira", "Shariatpur", "Sherpur", "Sirajganj", "Sunamganj", "Sylhet", "Tangail", "Thakurgaon"
].sort();

export default function Checkout() {
  const router = useRouter()
  const { items, clearCart } = useCart()
  const [mounted, setMounted] = useState(false)
  
  const total = items.reduce((acc: number, item: any) => acc + (Number(item.price) * (item.quantity || 1)), 0)

  useEffect(() => {
    setMounted(true)
    if (mounted && items.length === 0) {
      router.push('/')
    }
  }, [items, mounted, router])

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Order Placed Successfully! We will contact you shortly to confirm.')
    clearCart() 
    router.push('/') 
  }

  if (!mounted || items.length === 0) return null

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-5xl mx-auto pt-32 pb-20 px-6 text-black">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* LEFT: SHIPPING DETAILS */}
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter mb-8 text-black">Shipping Details</h1>
            <form onSubmit={handleConfirmOrder} id="checkout-form" className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="text-[9px] uppercase font-bold text-gray-400 tracking-widest mb-1 block">Full Name</label>
                  <input required type="text" placeholder="YOUR NAME" className="w-full border-b border-gray-200 py-3 outline-none text-xs tracking-widest focus:border-black transition-colors bg-white text-black" />
                </div>
                <div className="group">
                  <label className="text-[9px] uppercase font-bold text-gray-400 tracking-widest mb-1 block">Phone Number</label>
                  <input required type="tel" placeholder="01XXXXXXXXX" className="w-full border-b border-gray-200 py-3 outline-none text-xs tracking-widest focus:border-black transition-colors bg-white text-black" />
                </div>
              </div>

              <div className="group">
                <label className="text-[9px] uppercase font-bold text-gray-400 tracking-widest mb-1 block">Email Address</label>
                <input required type="email" placeholder="EMAIL@EXAMPLE.COM" className="w-full border-b border-gray-200 py-3 outline-none text-xs tracking-widest focus:border-black transition-colors bg-white text-black" />
              </div>

              {/* NEW FIELDS: DISTRICT & AREA */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="text-[9px] uppercase font-bold text-gray-400 tracking-widest mb-1 block">District</label>
                  <select required className="w-full border-b border-gray-200 py-3 outline-none text-xs tracking-widest focus:border-black transition-colors bg-white text-black appearance-none cursor-pointer">
                    <option value="">SELECT DISTRICT</option>
                    {BANGLADESH_DISTRICTS.map(dist => (
                      <option key={dist} value={dist}>{dist.toUpperCase()}</option>
                    ))}
                  </select>
                </div>
                <div className="group">
                  <label className="text-[9px] uppercase font-bold text-gray-400 tracking-widest mb-1 block">Area / Thana</label>
                  <input required type="text" placeholder="E.G. BANANI / MIRPUR" className="w-full border-b border-gray-200 py-3 outline-none text-xs tracking-widest focus:border-black transition-colors bg-white text-black" />
                </div>
              </div>

              {/* NEW FIELD: ZIP CODE & ADDRESS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 group">
                  <label className="text-[9px] uppercase font-bold text-gray-400 tracking-widest mb-1 block">Zip Code</label>
                  <input required type="text" placeholder="12XX" className="w-full border-b border-gray-200 py-3 outline-none text-xs tracking-widest focus:border-black transition-colors bg-white text-black" />
                </div>
                <div className="md:col-span-2 group">
                  <label className="text-[9px] uppercase font-bold text-gray-400 tracking-widest mb-1 block">Street Address</label>
                  <input required type="text" placeholder="HOUSE, ROAD, FLAT NO." className="w-full border-b border-gray-200 py-3 outline-none text-xs tracking-widest focus:border-black transition-colors bg-white text-black" />
                </div>
              </div>
            </form>
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <div className="bg-zinc-50 p-8 rounded-sm h-fit border border-gray-100 shadow-sm">
            <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-8 text-gray-400">Your Order</h2>
            
            <div className="space-y-4 mb-8">
              {items.map((item: any, i: number) => (
                <div key={i} className="flex justify-between text-[10px] uppercase tracking-widest text-gray-600 font-medium">
                  <span>{item.name} ({item.size})</span>
                  <span className="text-black">৳ {item.price}</span>
                </div>
              ))}
              
              <div className="border-t border-gray-200 pt-4 flex justify-between text-sm font-black uppercase tracking-tight text-black">
                <span>Total Amount</span>
                <span>৳ {total}</span>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-[9px] uppercase tracking-widest font-black mb-4 text-gray-400">Payment Method</h3>
              <div className="p-4 border-2 border-black bg-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-black rounded-full" />
                  <span className="text-[10px] uppercase font-black tracking-widest text-black">Cash on Delivery</span>
                </div>
                <span className="text-[8px] text-gray-400 font-bold uppercase italic">BD ONLY</span>
              </div>
            </div>

            <button type="submit" form="checkout-form" className="w-full bg-black text-white py-5 text-[10px] uppercase tracking-[0.3em] font-black hover:bg-zinc-800 transition-all active:scale-[0.98]">
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}