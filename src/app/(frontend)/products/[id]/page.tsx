import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config'
import { notFound } from 'next/navigation'

export default async function ProductPage({ params }: { params: { id: string } }) {
  const payload = await getPayloadHMR({ config: configPromise })
  const { id } = params

  const product = await payload.findByID({
    collection: 'products',
    id,
  })

  if (!product) return notFound()

  return (
    <div className="container mx-auto py-20 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* IMAGE SECTION */}
        <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
          {product.productImages?.length > 0 ? (
            <img
              /* FIXED: Accessing the new array structure */
              src={product.productImages[0].image?.url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image Available
            </div>
          )}
        </div>

        {/* DETAILS SECTION */}
        <div>
          <h1 className="text-3xl font-bold uppercase mb-4">{product.name}</h1>
          <p className="text-2xl text-gray-600 mb-6">৳ {product.price}</p>
          <div className="mb-8">
             <h3 className="text-xs uppercase font-bold tracking-widest mb-3">Sizes</h3>
             <div className="flex gap-2">
               {product.sizes?.map((size: string) => (
                 <span key={size} className="border px-4 py-2 uppercase text-sm">{size}</span>
               ))}
             </div>
          </div>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
        </div>
      </div>
    </div>
  )
}