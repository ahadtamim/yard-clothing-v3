'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/store/useCart' // Import the cart store

export const CheckoutForm = ({ user }: any) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { items, clearCart } = useCart() // Get items and clearCart function

  // Calculate total price from all items in the bag
  const subtotal = items.reduce((acc: number, item: any) => acc + item.price * (item.quantity || 1), 0)

  const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (items.length === 0) {
      alert("Your bag is empty!")
      return
    }

    setLoading(true)

    const formData = new FormData(e.currentTarget)
    
    // Prepare the data to match your Payload CMS 'orders' collection
    const orderData = {
      customerName: formData.get('name'),
      email: formData.get('email') || user?.email,
      phone: formData.get('phone'),
      address: formData.get('address'),
      // Map all items from the cart to the order
      items: items.map((item: any) => ({
        product: item.id, // Linking to Product collection
        quantity: item.quantity || 1,
        size: item.size,
      })),
      totalAmount: subtotal,
      status: 'pending', // Matches your "Create New Order" logic
    }

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      })

      if (res.ok) {
        clearCart() // CRITICAL: Clear the bag after successful checkout
        alert('Order Placed Successfully! (Cash on Delivery)')
        router.push('/order-success')
      } else {
        const errorData = await res.json()
        alert(`Error: ${errorData.error || 'Failed to place order.'}`)
      }
    } catch (err) {
      alert('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleCheckout} className="space-y-4 mt-8 border-t pt-8">
      <h3 className="text-sm font-bold uppercase tracking-widest text-black">
        Shipping Details (Cash on Delivery)
      </h3>
      
      <div className="bg-zinc-50 p-4 mb-4 border border-gray-100">
        <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Order Summary</p>
        <p className="text-sm font-black">Total Amount: ৳ {subtotal}</p>
      </div>

      <input 
        name="name" 
        placeholder="Full Name" 
        required 
        className="w-full border p-3 text-sm focus:outline-black text-black" 
      />
      
      {!user && (
        <input 
          name="email" 
          type="email" 
          placeholder="Email Address" 
          required 
          className="w-full border p-3 text-sm focus:outline-black text-black" 
        />
      )}

      <input 
        name="phone" 
        placeholder="Phone Number (+880)" 
        required 
        className="w-full border p-3 text-sm focus:outline-black text-black" 
      />

      <textarea 
        name="address" 
        placeholder="Full Delivery Address (House, Street, Area, City)" 
        required 
        className="w-full border p-3 text-sm focus:outline-black h-24 text-black" 
      />

      <button 
        type="submit" 
        disabled={loading || items.length === 0}
        className="w-full bg-black text-white py-4 uppercase font-bold tracking-[0.2em] disabled:bg-gray-300 transition-all active:scale-95"
      >
        {loading ? 'Processing...' : 'Confirm Order'}
      </button>

      <p className="text-[9px] text-center text-gray-400 uppercase tracking-widest mt-4">
        By clicking confirm, you agree to our terms of service
      </p>
    </form>
  )
}