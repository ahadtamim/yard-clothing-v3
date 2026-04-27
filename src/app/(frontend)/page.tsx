import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config' 
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const payload = await getPayloadHMR({ config: configPromise })

  // 1. Fetch Banner with depth to see image URLs
  const banner = (await payload.findGlobal({
    slug: 'banner',
    depth: 2, 
  })) as any

  // 2. Fetch Products with depth: 2 so productImages are expanded to objects
  const products = (await payload.find({
    collection: 'products',
    limit: 10,
    depth: 2, 
  })) as any

  return (
    <main className="min-h-screen bg-white px-4 md:px-0">
      {/* 1. HERO SLIDESHOW SECTION */}
      <section className="relative h-[70vh] bg-black overflow-hidden flex items-center justify-center">
        {banner?.bestProducts?.length > 0 ? (
          <div className="flex w-full h-full">
            {banner.bestProducts.map((product: any) => (
              <div key={product.id} className="relative flex-1 group overflow-hidden border-r border-white/10">
                {product.productImages?.[0]?.url && (
                  <img
                    /* FIXED: Directly accessing .url from the first image in the array */
                    src={product.productImages[0].url}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                )}
                <div className="absolute bottom-10 left-10 text-white pointer-events-none">
                  <h2 className="text-2xl font-bold uppercase tracking-tighter">{product.name}</h2>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-white uppercase tracking-[1em] opacity-20 text-xs">Yard Clothing Slideshow</div>
        )}
      </section>

      {/* 2. PRODUCT GRID SECTION */}
      <section className="container py-20 mx-auto">
        <h3 className="text-xs uppercase tracking-[0.5em] text-gray-400 mb-12 text-center font-bold">
          New Arrivals
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {products.docs?.map((product: any) => (
            <Link key={product.id} href={`/products/${product.id}`} className="group">
              <div className="aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
                {product.productImages?.[0]?.url ? (
                  <img
                    /* FIXED: Accessing the first image URL directly from the relationship array */
                    src={product.productImages[0].url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">No Image</div>
                )}
              </div>
              <h4 className="font-bold text-sm uppercase">{product.name}</h4>
              <p className="text-gray-500 text-sm">৳ {product.price}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}