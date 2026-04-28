'use client'
import React, { useState, useEffect } from 'react'
import { useCart } from '@/store/useCart'

export default function ProductClient({ product }: { product: any }) {
  // Initialize main image and wait for hydration
  const [mainImage, setMainImage] = useState(product.productImages?.[0]?.url || '')
  
  /**
   * FIX 1: AUTO-SELECT 'UNSTITCHED'
   * If the product has 'UNSTITCHED' in the sizes, or only one size, 
   * we select it by default so the button is active immediately.
   */
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes?.includes('UNSTITCHED') ? 'UNSTITCHED' : (product.sizes?.[0] || null)
  )
  
  const [isMounted, setIsMounted] = useState(false)
  const addItem = useCart((state: any) => state.addItem)

  useEffect(() => {
    setIsMounted(true)
    // Sync main image if product changes
    if (product.productImages?.[0]?.url) {
      setMainImage(product.productImages[0].url)
    }
  }, [product])

  const handleAddToBag = () => {
    // If somehow still no size, prevent action
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
          <div className="aspect-[3/4] bg-gray-100 overflow-hidden rounded-sm border border-gray-100">
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
                  <img src={img.url} className="w-full h-full object-cover" alt={`view ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* CONTENT SECTION */}
        <div className="flex flex-col justify-center">
          {/** * FIX 2: TEXT VISIBILITY
           * Forced text-black and text-gray-900 to ensure visibility on white background.
           */}
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2 text-black leading-none">
            {product.name}
          </h1>
          <p className="text-2xl text-gray-900 mb-8 font-medium">৳ {product.price}</p>

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
                  className={`border px-8 py-3 text-[10px] font-bold uppercase transition-all duration-200 
                    ${selectedSize === size 
                      ? 'bg-black text-white border-black shadow-lg' 
                      : 'bg-white text-black border-gray-200 hover:border-black'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-10 whitespace-pre-line leading-relaxed max-w-md">
            {product.description}
          </p>
          
          {/** * FIX 3: BUTTON AVAILABILITY
           * Removed 'Select a Size' block by ensuring selectedSize defaults to 'UNSTITCHED'.
           */}
          <button 
            type="button"
            onClick={handleAddToBag}
            className="w-full md:w-64 py-5 bg-black text-white text-[10px] uppercase tracking-[0.3em] font-black hover:bg-zinc-800 active:scale-[0.98] transition-all shadow-xl"
          >
            Add to Bag
          </button>

          <div className="mt-6 flex items-center gap-4 text-[9px] uppercase tracking-widest text-gray-400 font-bold">
            <span className="flex items-center gap-1">● Secure Checkout</span>
            <span className="flex items-center gap-1">● Fast Shipping</span>
          </div>
        </div>
      </div>
    </div>
  )
}