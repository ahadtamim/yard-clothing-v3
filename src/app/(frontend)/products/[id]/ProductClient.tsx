'use client'
import React, { useState, useEffect } from 'react'
import { useCart } from '@/store/useCart'

export default function ProductClient({ product }: { product: any }) {
  const [mainImage, setMainImage] = useState(product.productImages?.[0]?.url || '')
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  
  const addItem = useCart((state: any) => state.addItem)

  // Wait for the component to mount to avoid hydration errors
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleAddToBag = () => {
    if (!selectedSize) return

    const itemToAdd = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.productImages?.[0]?.url,
      size: selectedSize,
    }

    addItem(itemToAdd)
    alert(`${product.name} (${selectedSize}) added to bag!`)
  }

  if (!isMounted) return null

  return (
    <div className="container mx-auto py-20 px-4 min-h-screen bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* IMAGE SECTION */}
        <div className="flex flex-col gap-4">
          <div className="aspect-[3/4] bg-gray-100 overflow-hidden rounded-sm">
            {mainImage ? (
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No Image Available
              </div>
            )}
          </div>

          {/* THUMBNAILS */}
          {product.productImages?.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {product.productImages.map((img: any, idx: number) => (
                <button 
                  key={idx}
                  type="button"
                  onClick={() => setMainImage(img.url)}
                  className={`w-20 h-20 flex-shrink-0 border transition-all ${
                    mainImage === img.url ? 'border-black' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} className="w-full h-full object-cover" alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* CONTENT SECTION */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold uppercase tracking-tighter mb-2">{product.name}</h1>
          <p className="text-2xl text-gray-800 mb-8 font-light">৳ {product.price}</p>

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
                  className={`border px-6 py-2 text-xs uppercase transition-all duration-200 
                    ${selectedSize === size 
                      ? 'bg-black text-white border-black' 
                      : 'bg-white text-black border-gray-200 hover:border-black'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-10 whitespace-pre-line leading-relaxed">
            {product.description}
          </p>
          
          <button 
            type="button"
            onClick={handleAddToBag}
            disabled={!selectedSize}
            className={`w-full md:w-64 py-4 text-[10px] uppercase tracking-[0.2em] font-bold transition-all
              ${selectedSize 
                ? 'bg-black text-white hover:bg-zinc-800 active:scale-[0.98]' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
          >
            {selectedSize ? `Add to Bag (${selectedSize})` : 'Select a Size'}
          </button>
        </div>
      </div>
    </div>
  )
}