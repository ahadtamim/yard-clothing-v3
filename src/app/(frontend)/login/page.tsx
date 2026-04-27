'use client'
import React from 'react'

export default function LoginPage() {
  return (
    <div className="container mx-auto pt-32 pb-20 px-6 max-w-md min-h-screen">
      <h1 className="text-3xl font-bold uppercase tracking-tighter mb-10 text-center">Login</h1>
      <form className="space-y-6">
        <div>
          <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Email Address</label>
          <input 
            type="email" 
            className="w-full border-b border-gray-200 py-3 outline-none focus:border-black transition-colors"
          />
        </div>
        <div>
          <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Password</label>
          <input 
            type="password" 
            className="w-full border-b border-gray-200 py-3 outline-none focus:border-black transition-colors"
          />
        </div>
        <button className="w-full bg-black text-white py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-zinc-800 transition-colors">
          Sign In
        </button>
        <div className="text-center">
          <button type="button" className="text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-black">
            Continue as Guest
          </button>
        </div>
      </form>
    </div>
  )
}