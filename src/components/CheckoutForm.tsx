'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export const CheckoutForm = ({ product, selectedSize, user }: any) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    
    const orderData = {
      customerName: formData.get('name'),
      email: formData.get('email') || user?.email,
      phone: formData.get('phone'),
      address: formData.get('address'),
      items: [{
        product: product.id,
        quantity: 1,
        size: selectedSize,
      }],
      totalAmount: product.price,
      status: 'pending', // Default for Cash on Delivery
    }

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      })

      if (res.ok) {
        alert('Order Placed Successfully! (Cash on Delivery)')
        router.push('/order-success')
      }
    } catch (err) {
      alert('Error placing order.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleCheckout} className="space-y-4 mt-8 border-t pt-8">
      <h3 className="text-sm font-bold uppercase tracking-widest">Shipping Details (Cash on Delivery)</h3>
      
      <input 
        name="name" 
        placeholder="Full Name" 
        required 
        className="w-full border p-3 text-sm focus:outline-black" 
      />
      
      {!user && (
        <input 
          name="email" 
          type="email" 
          placeholder="Email Address" 
          required 
          className="w-full border p-3 text-sm focus:outline-black" 
        />
      )}

      <input 
        name="phone" 
        placeholder="Phone Number (+880)" 
        required 
        className="w-full border p-3 text-sm focus:outline-black" 
      />

      <textarea 
        name="address" 
        placeholder="Full Delivery Address" 
        required 
        className="w-full border p-3 text-sm focus:outline-black h-24" 
      />

      <button 
        type="submit" 
        disabled={loading || !selectedSize}
        className="w-full bg-black text-white py-4 uppercase font-bold tracking-widest disabled:bg-gray-400"
      >
        {loading ? 'Processing...' : 'Confirm Order'}
      </button>
    </form>
  )
}