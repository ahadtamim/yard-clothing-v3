import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payloadcms/config'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const payload = await getPayloadHMR({ config: configPromise })

  // 1. Fetch the Banner data (Requirement 5)
  const banner = await payload.findGlobal({
    slug: 'banner',
  })

  // 2. Fetch all Products for the grid
  const products = await payload.find({
    collection: 'products',
    limit: 10,
  })

  return (
    <main className="min-h-screen bg-white">
      {/* 1. HERO SLIDESHOW SECTION */}
      <section className="relative h-[70vh] bg-black overflow-hidden flex items-center justify-center">
        {banner?.bestProducts?.length > 0 ? (
          <div className="flex w-full h-full">
             {/* This maps your 5 famous product images */}
            {banner.bestProducts.map((product: any) => (
              <div key={product.id} className="relative flex-1 group overflow-hidden border-r border-white/10">
                <img
                  src={product.images?.[0]?.file?.url}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute bottom-10 left-10 text-white pointer-events-none">
                  <h2 className="text-2xl font-bold uppercase tracking-tighter">{product.name}</h2>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-white uppercase tracking-[1em] opacity-20">Yard Clothing Slideshow</div>
        )}
      </section>

      {/* 2. PRODUCT GRID SECTION */}
      <section className="container py-20">
        <h3 className="text-xs uppercase tracking-[0.5em] text-gray-400 mb-12 text-center font-bold">
          New Arrivals
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {products.docs.map((product: any) => (
            <Link key={product.id} href={`/products/${product.id}`} className="group">
              <div className="aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
                <img
                  src={product.images?.[0]?.file?.url}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h4 className="font-bold text-sm uppercase">{product.name}</h4>
              <p className="text-gray-500 text-sm">৳ {product.price}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. QUICK ADMIN LINK (Temporary) */}
      <div className="py-10 text-center border-t border-gray-100">
        <Link href="/admin" className="text-[10px] uppercase tracking-widest text-gray-300 hover:text-black">
          Manage Store Access
        </Link>
      </div>
    </main>
  )
}