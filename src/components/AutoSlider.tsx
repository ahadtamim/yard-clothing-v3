'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

export function AutoSlider({ slides }: { slides: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (slides.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      )
    }, 3000) // Explicitly slides every 3 seconds

    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <div 
      className="flex w-full h-full transition-transform duration-1000 ease-in-out"
      style={{ transform: `translateX(-${currentIndex * 100}%)` }}
    >
      {slides.map((slide: any) => (
        <Link 
          key={slide.id} 
          href={slide.href} 
          className="relative min-w-full h-full flex-shrink-0 group overflow-hidden"
        >
          <img
            src={slide.imgUrl}
            alt=""
            crossOrigin="anonymous" 
            className="block absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
          <div className="absolute bottom-12 left-8 md:left-16 text-white">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-2">
              {slide.name}
            </h2>
            <p className="text-xs uppercase tracking-[0.3em] opacity-60">Featured Collection</p>
          </div>
        </Link>
      ))}
    </div>
  )
}