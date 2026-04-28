'use client'
import React, { useState, useEffect } from 'react'
import { getFullImageUrl } from '@/utilities/getURL'

export default function ProductClient({ product }: { product: any }) {
  // 1. Properly initialize with the first image
  const firstImageUrl = product.productImages?.[0] 
    ? getFullImageUrl(product.productImages[0]) 
    : '';

  const [mainImage, setMainImage] = useState(firstImageUrl)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    if (firstImageUrl) setMainImage(firstImageUrl)
  }, [firstImageUrl])

  if (!isMounted) return null

  return (
    <div className="container mx-auto py-20 px-4 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col gap-4">
          {/* MAIN IMAGE */}
          <div className="aspect-[3/4] bg-gray-50 overflow-hidden border border-gray-100">
            <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* THUMBNAILS - CRITICAL FIX */}
          <div className="flex gap-2">
            {product.productImages?.map((img: any, idx: number) => {
              const currentThumbUrl = getFullImageUrl(img); // Extract full URL
              return (
                <button 
                  key={idx}
                  onClick={() => setMainImage(currentThumbUrl)} // This must update the main view
                  className={`w-20 h-24 border ${mainImage === currentThumbUrl ? 'border-black' : 'border-gray-200'}`}
                >
                  <img 
                    src={currentThumbUrl} 
                    className="w-full h-full object-cover" 
                    alt={`view ${idx + 1}`} 
                    onError={(e) => (e.currentTarget.src = '/placeholder.jpg')}
                  />
                </button>
              )
            })}
          </div>
        </div>
        {/* ... Rest of content */}
      </div>
    </div>
  )
}