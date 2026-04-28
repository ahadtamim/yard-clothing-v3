import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config' 
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const payload = await getPayloadHMR({ config: configPromise })

  // Fetch with depth: 2 to ensure we get the full image objects
  const banner = await payload.findGlobal({
    slug: 'banner',
    depth: 2, 
  })

  const products = await payload.find({
    collection: 'products',
    limit: 10,
    depth: 2, 
  })

  /**
   * THE ULTIMATE IMAGE HELPER:
   * This handles direct media objects AND nested gallery objects 
   * found in your screenshots (view 2, view 3, etc.)
   */
  const getFullImageUrl = (img: any) => {
    if (!img) return '/placeholder.jpg'
    
    // 1. Try to find the URL in every possible nested location
    let url = ''
    if (typeof img === 'string') {
      url = img
    } else if (img?.url && typeof img.url === 'string') {
      url = img.url
    } else if (img?.image?.url && typeof img.image.url === 'string') {
      url = img.image.url
    } else if (img?.image && typeof img.image === 'string') {
      url = img.image
    }

    // 2. If nothing found, return placeholder
    if (!url) return '/placeholder.jpg'
    
    // 3. If it's already a full URL (like Vercel Blob), return it
    if (url.startsWith('http')) return url
    
    // 4. Otherwise, attach the Vercel Blob domain
    const blobDomain = 'https://zjxiyg6t5n64z1cj.public.blob.vercel-storage.com'
    const path = url.startsWith('/') ? url : `/${url}`
    
    return `${blobDomain}${path}`
  }

  return (
    <main className="min-h-screen bg-white text-black">
      {/* HERO SECTION */}
      <section className="relative h-[80vh] bg-black overflow-hidden flex items-center justify-center">
        {(banner as any)?.bestProducts?.length > 0 ? (
          <div className="flex w-full h-full">
            {(banner as any).bestProducts.map((product: any) => (
              <Link 
                key={product.id} 
                href={`/products/${product.id}`}
                className="relative flex-1 group overflow-hidden border-r border-white/10"
              >
                {/* Use helper for the first image in the array */}
                {product.productImages?.[0] && (
                  <img
                    src={getFullImageUrl(product.productImages[0])}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                    onError={(e) => (e.currentTarget.src = '/placeholder.jpg')}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-10 left-10 text-white">
                  <h2 className="text-2xl font-black uppercase tracking-tighter">{product.name}</h2>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-white opacity-20 text-xs font-bold uppercase tracking-[1em]">Yard Clothing</div>
        )}
      </section>

      {/* NEW ARRIVALS SECTION */}
      <section className="container py-24 mx-auto px-6">
        <h3 className="text-[10px] uppercase tracking-[0.6em] text-gray-400 mb-16 text-center font-black">
          New Arrivals
        </h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {products.docs?.map((product: any) => (
            <Link key={product.id} href={`/products/${product.id}`} className="group">
              <div className="aspect-[3/4] overflow-hidden bg-gray-100 mb-6 relative">
                {product.productImages?.[0] ? (
                  <img
                    src={getFullImageUrl(product.productImages[0])}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => (e.currentTarget.src = '/placeholder.jpg')}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-300">No Image</div>
                )}
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-[11px] uppercase tracking-wider text-black">{product.name}</h4>
                <p className="text-gray-400 text-[11px] font-medium tracking-tight">৳ {product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}