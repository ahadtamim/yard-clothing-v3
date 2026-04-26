import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config'
import { notFound } from 'next/navigation'

export default async function ProductPage({ params }: { params: { id: string } }) {
  const payload = await getPayloadHMR({ config: configPromise })
  const { id } = params

  // The fix is the "as any" cast below to bypass the 'Property productImages does not exist' error
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
          {/* Optional chaining ensures that even if data is missing, the page won't crash */}
          {product.productImages?.[0]?.image?.url ? (
            <img
              src={product.productImages[0].image.url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 uppercase text-xs tracking-widest bg-gray-50">
              No Image Available
            </div>
          )}
        </div>

        {/* DETAILS SECTION */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold uppercase mb-2 tracking-tighter">
            {product.name}
          </h1>
          <p className="text-2xl text-gray-600 mb-6 font-light">৳ {product.price}</p>
          
          <div className="mb-8">
            <h3 className="text-[10px] uppercase font-bold tracking-[0.3em] mb-3 text-gray-400">
              Available Sizes
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes?.map((size: string) => (
                <span key={size} className="border border-black px-4 py-2 uppercase text-xs cursor-pointer hover:bg-black hover:text-white transition-colors">
                  {size}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-[10px] uppercase font-bold tracking-[0.3em] mb-3 text-gray-400">
              Description
            </h3>
            <p className="text-gray-700 leading-relaxed text-sm">
              {product.description || 'No description available for this item.'}
            </p>
          </div>

          <button className="mt-10 w-full bg-black text-white py-4 text-xs uppercase tracking-widest font-bold hover:bg-gray-800 transition-all">
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  )
}