'use client'
import React, { useState, useEffect } from 'react'
import { useCart } from '@/store/useCart'

export default function ProductClient({ product }: { product: any }) {
  const [mainImage, setMainImage] = useState(product.productImages?.[0] || '')
  
  // FIXED: Look for size inside the new 'inventory' array instead of 'sizes'
  const [selectedSize, setSelectedSize] = useState<string | null>(() => {
    const inventory = product.inventory || [];
    const unstitched = inventory.find((i: any) => i.size.toLowerCase() === 'unstitched');
    // Default to Unstitched if it's in stock, otherwise the first available size
    if (unstitched && unstitched.stock > 0) return unstitched.size;
    return inventory.find((i: any) => i.stock > 0)?.size || null;
  })

  const [isMounted, setIsMounted] = useState(false)
  const addItem = useCart((state: any) => state.addItem)

  useEffect(() => {
    setIsMounted(true)
    if (product.productImages?.[0]) {
      setMainImage(product.productImages[0])
    }
  }, [product])

  if (!isMounted) return null

  // Helper to find stock for current selection
  const selectedInventory = product.inventory?.find((i: any) => i.size === selectedSize);
  const isOutOfStock = !selectedInventory || selectedInventory.stock <= 0;

  return (
    <div className="container mx-auto py-20 px-4 min-h-screen bg-white text-black">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* IMAGE SECTION */}
        <div className="flex flex-col gap-4">
          <div className="aspect-[3/4] bg-gray-50 overflow-hidden rounded-sm border border-gray-100">
            {mainImage ? (
              <img 
                src={mainImage} 
                alt={product.name} 
                crossOrigin="anonymous"
                className="w-full h-full object-cover"
                onError={(e) => (e.currentTarget.src = '/placeholder.jpg')}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
            )}
          </div>

          {/* THUMBNAILS */}
          {product.productImages?.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {product.productImages.map((url: string, idx: number) => (
                <button 
                  key={idx}
                  type="button"
                  onClick={() => setMainImage(url)}
                  className={`w-20 h-24 flex-shrink-0 border transition-all ${
                    mainImage === url ? 'border-black' : 'border-gray-100 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img 
                    src={url} 
                    crossOrigin="anonymous"
                    className="w-full h-full object-cover" 
                    alt={`view ${idx + 1}`} 
                    onError={(e) => (e.currentTarget.src = '/placeholder.jpg')}
                  />
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
              {/* FIXED: Mapping through 'inventory' array instead of 'sizes' */}
              {product.inventory?.map((item: any) => {
                const outOfStock = item.stock <= 0;
                return (
                  <button
                    key={item.size}
                    type="button"
                    disabled={outOfStock}
                    onClick={() => setSelectedSize(item.size)}
                    className={`border px-8 py-3 text-[10px] font-bold uppercase transition-all 
                      ${selectedSize === item.size 
                        ? 'bg-black text-white border-black' 
                        : 'bg-white text-black border-gray-200 hover:border-black'
                      } ${outOfStock ? 'opacity-30 cursor-not-allowed line-through border-dashed' : ''}`}
                  >
                    {item.size} {outOfStock && "(Sold Out)"}
                  </button>
                )
              })}
            </div>
          </div>

          <button 
            type="button"
            // Button is disabled if no size is picked OR if the pick is out of stock
            disabled={!selectedSize || isOutOfStock}
            onClick={() => {
              if (!selectedSize || isOutOfStock) return;
              addItem({ 
                id: product.id, 
                name: product.name, 
                price: product.price, 
                image: product.productImages[0],
                size: selectedSize 
              });
              alert(`${product.name} (${selectedSize}) added to bag!`);
            }}
            className="w-full md:w-64 py-5 bg-black text-white text-[10px] uppercase tracking-[0.3em] font-black disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isOutOfStock ? 'Out of Stock' : (selectedSize ? 'Add to Bag' : 'Select a Size')}
          </button>
        </div>
      </div>
    </div>
  )
}