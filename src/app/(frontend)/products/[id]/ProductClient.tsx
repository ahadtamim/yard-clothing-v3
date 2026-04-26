'use client'
import React, { useState } from 'react'

export default function ProductClient({ product }: { product: any }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
    <div className="container mx-auto py-20 px-4 min-h-screen bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* IMAGE SECTION */}
        <div className="aspect-[3/4] bg-gray-100 overflow-hidden rounded-sm">
          {product.productImages?.[0]?.image?.url && (
            <img
              src={product.productImages[0].image.url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
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

          <p className="text-gray-600 text-sm mb-10">{product.description}</p>
          
          <button className="w-full md:w-64 bg-black text-white py-4 text-xs uppercase tracking-widest font-bold hover:bg-gray-800">
            Add to Bag {selectedSize ? `(${selectedSize})` : ''}
          </button>
        </div>
      </div>
    </div>
  )
}