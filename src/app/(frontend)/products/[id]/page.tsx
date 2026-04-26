import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config'
import { notFound } from 'next/navigation'

// 1. FORCE DYNAMIC: This ensures Next.js fetches the product from the 
// database on every click instead of showing a 404 for new items.
export const dynamic = 'force-dynamic'

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const payload = await getPayloadHMR({ config: configPromise })
  
  // 2. AWAIT PARAMS: In newer Next.js versions, params must be awaited.
  const { id } = await params

  // 3. FETCH PRODUCT: Cast 'as any' to match your homepage logic and bypass TypeScript.
  const product = (await payload.findByID({
    collection: 'products',
    id,
  }).catch(() => null)) as any

  if (!product) return notFound()

  return (
    <div className="container mx-auto py-20 px-4 min-h-screen bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* IMAGE SECTION */}
        <div className="aspect-[3/4] bg-gray-100 overflow-hidden rounded-sm">
          {product.productImages?.[0]?.image?.url ? (
            <img
              src={product.productImages[0].image.url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50 uppercase text-xs tracking-widest">
              No Image Found
            </div>
          )}
        </div>

        {/* CONTENT SECTION */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold uppercase tracking-tighter mb-2">
            {product.name}
          </h1>
          
          <p className="text-2xl text-gray-800 mb-8 font-light">
            ৳ {product.price}
          </p>

          <div className="mb-10">
            <h3 className="text-[10px] uppercase font-bold tracking-[0.3em] mb-4 text-gray-500">
              Select Size
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes?.map((size: string) => (
                <div key={size} className="border border-black px-6 py-2 text-xs uppercase hover:bg-black hover:text-white transition-colors cursor-pointer">
                  {size}
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-100 pt-8">
            <p className="text-gray-600 text-sm leading-relaxed max-w-md">
              {product.description || 'No description provided.'}
            </p>
          </div>
          
          <button className="mt-12 w-full md:w-64 bg-black text-white py-4 text-xs uppercase tracking-widest font-bold">
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  )
}