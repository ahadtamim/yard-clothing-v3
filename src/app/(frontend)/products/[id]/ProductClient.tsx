'use client'
import React, { useState } from 'react'
import { useCart } from '@/store/useCart' // Ensure you created this store file

export default function ProductClient({ product }: { product: any }) {
  // Use the first image as the default starting image
  const [mainImage, setMainImage] = useState(product.productImages?.[0]?.url || '')
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  
  // Get the addItem function from our Zustand store
  const addItem = useCart((state: any) => state.addItem)

  const handleAddToBag = () => {
    if (!selectedSize) return

    // Create the item object to save in the cart
    const itemToAdd = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.productImages?.[0]?.url,
      size: selectedSize,
    }

    addItem(itemToAdd)
    
    // Optional: Visual feedback
    alert(`${product.name} (${selectedSize}) added to bag!`)
  }

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

          {/* MULTI-IMAGE THUMBNAILS */}
          {product.productImages?.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.productImages.map((img: any, idx: number) => (
                <button 
                  key={idx}
                  type="button"
                  onClick={() => setMainImage(img.url)}
                  className={`w-20 h-20 flex-shrink-0 border ${mainImage === img.url ? 'border-black' : 'border-transparent'}`}
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

          <p className="text-gray-600 text-sm mb-10 whitespace-pre-line">{product.description}</p>
          
          <button 
            type="button"
            onClick={handleAddToBag} // TRIGGER THE ACTION HERE
            disabled={!selectedSize}
            className={`w-full md:w-64 py-4 text-xs uppercase tracking-widest font-bold transition-colors
              ${selectedSize 
                ? 'bg-black text-white hover:bg-gray-800' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
          >
            {selectedSize ? `Add to Bag (${selectedSize})` : 'Select a Size'}
          </button>
        </div>
      </div>
    </div>
  )
}