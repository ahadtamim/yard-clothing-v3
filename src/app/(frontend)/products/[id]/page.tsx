import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payloadcms/config'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function ProductPage({ params }: { params: { id: string } }) {
  const payload = await getPayloadHMR({ config: configPromise })

  // 1. Fetch the specific product
  const product = await payload.findByID({
    collection: 'products',
    id: params.id,
  })

  if (!product) return notFound()

  return (
    <main className="container py-20 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* LEFT SIDE: Image Gallery (Shows your 5 images) */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {product.images?.map((img: any, index: number) => (
              <div key={index} className="bg-gray-100 overflow-hidden">
                <img
                  src={img.file?.url}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE: Product Details & Purchase */}
        <div className="sticky top-20 h-fit">
          <h1 className="text-4xl font-bold uppercase tracking-tighter mb-2">
            {product.name}
          </h1>
          <p className="text-2xl text-gray-600 mb-8">৳ {product.price}</p>

          <div className="border-t border-b border-gray-100 py-6 mb-8">
            <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4 font-bold">
              Select Size
            </h3>
            <div className="flex gap-3">
              {/* Dynamic Size Selector from your Admin options */}
              {product.sizes?.map((size: string) => (
                <button
                  key={size}
                  className="w-12 h-12 border border-black flex items-center justify-center text-sm font-bold hover:bg-black hover:text-white transition-colors"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4 font-bold">
              Description
            </h3>
            <div className="prose prose-sm text-gray-700">
              {/* This renders the RichText from your Admin panel */}
              {product.details && <div dangerouslySetInnerHTML={{ __html: product.details }} />}
            </div>
          </div>

          <div className="space-y-4">
            <button className="w-full bg-black text-white py-4 uppercase font-bold tracking-widest hover:bg-gray-900 transition-colors">
              Add to Bag
            </button>
            <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest">
              Stock available: {product.inventory} items left
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}