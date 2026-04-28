'use client'
import React, { useState, useEffect } from 'react'
import { useCart } from '@/store/useCart'

export default function ProductClient({ product }: { product: any }) {
  // Use the first string in the array as the initial state
  const [mainImage, setMainImage] = useState(product.productImages?.[0] || '')
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes?.includes('UNSTITCHED') ? 'UNSTITCHED' : (product.sizes?.[0] || null)
  )
  const [isMounted, setIsMounted] = useState(false)
  const addItem = useCart((state: any) => state.addItem)

  useEffect(() => {
    setIsMounted(true)
    if (product.productImages?.[0]) {
      setMainImage(product.productImages[0])
    }
  }, [product])

  if (!isMounted) return null

  return (
    <div className="container mx-auto py-20 px-4 min-h-screen bg-white text-black">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* IMAGE SECTION */}
        <div className="flex flex-col gap-4">
          <div className="aspect-[3/4] bg-gray-50 overflow-hidden rounded-sm border border-gray-100">
            {mainImage ? (
              <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
            )}
          </div>

          {/* THUMBNAILS - Now mapping simple strings */}
          {product.productImages?.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {product.productImages.map((url: string, idx: number) => (
                <button 
                  key={idx}
                  type="button"
                  onClick={() => setMainImage(url)}
                  className={`w-20 h-24 flex-shrink-0 border transition-all ${
                    mainImage === url ? 'border-black' : 'border-transparent opacity-60'
                  }`}
                >
                  <img src={url} className="w-full h-full object-cover" alt={`view ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* CONTENT SECTION */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2 leading-none">
            {product.name}
          </h1>
          <p className="text-2xl mb-8 font-medium">৳ {product.price}</p>

          <div className="mb-10">
            <h3 className="text-[10px] uppercase font-bold tracking-[0.3em] mb-4 text-gray-500">
              Select Size
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes?.map((size: string) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`border px-8 py-3 text-[10px] font-bold uppercase transition-all 
                    ${selectedSize === size ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-200'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button 
            type="button"
            onClick={() => {
              if (!selectedSize) return;
              addItem({ id: product.id, name: product.name, price: product.price, image: product.productImages[0], size: selectedSize });
              alert('Added to bag!');
            }}
            className="w-full md:w-64 py-5 bg-black text-white text-[10px] uppercase tracking-[0.3em] font-black"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  )
}