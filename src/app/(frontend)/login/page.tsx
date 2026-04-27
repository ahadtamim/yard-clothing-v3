'use client'
import React, { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Logic for email-only sign-in goes here
    console.log("Signing in with:", email)
    alert(`Magic link sent to ${email} (or signed in as guest)`)
  }

  return (
    <div className="container mx-auto pt-32 pb-20 px-6 max-w-md min-h-screen">
      <h1 className="text-3xl font-bold uppercase tracking-tighter mb-10 text-center">Sign In</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="text-[10px] uppercase font-bold text-gray-500 tracking-[0.3em] mb-2 block">
            Email Address
          </label>
          <input 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ENTER YOUR EMAIL"
            className="w-full border-b border-gray-200 py-4 outline-none text-xs tracking-widest focus:border-black transition-colors bg-transparent"
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-black text-white py-5 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-zinc-800 transition-all active:scale-[0.98]"
        >
          Continue
        </button>

        <p className="text-[9px] text-center uppercase tracking-widest text-gray-400 px-4 leading-relaxed">
          By continuing, you will receive a secure login link or continue your checkout as a guest.
        </p>
      </form>
    </div>
  )
}