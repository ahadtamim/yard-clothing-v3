import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config' 
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  let banner: any = null
  let products: any = { docs: [] }

  try {
    const payload = await getPayloadHMR({ config: configPromise })
    
    banner = await payload.findGlobal({
      slug: 'banner',
      depth: 2, 
    }).catch(() => null)

    products = await payload.find({
      collection: 'products',
      limit: 10,
      depth: 2, 
    }).catch(() => ({ docs: [] }))
  } catch (error) {
    console.error("Payload initialization failed:", error)
  }

  // HARDENED IMAGE HELPER: Specifically for Mobile Stability
  const getFullImageUrl = (img: any) => {
    if (!img) return null
    
    let path = ""
    if (typeof img === 'string') path = img
    else if (img?.url) path = img.url
    else if (img?.image?.url) path = img.image.url
    else if (img?.image) path = img.image
    
    if (!path) return null

    // Force HTTPS for mobile browsers
    if (path.startsWith('http')) {
      return path.replace('http://', 'https://')
    }
    
    // Ensure the blob domain is joined without double-slashes
    const blobDomain = 'https://zjxiyg6t5n64z1cj.public.blob.vercel-storage.com'
    const cleanPath = path.startsWith('/') ? path : `/${path}`
    return `${blobDomain}${cleanPath}`
  }

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <section className="relative h-[65vh] md:h-[85vh] bg-black overflow-hidden flex items-center justify-center">
        {banner?.bestProducts?.length > 0 ? (
          <div className="flex w-full h-full">
            {banner.bestProducts.map((product: any) => {
              const imgUrl = getFullImageUrl(product?.productImages?.[0]);
              return (
                <Link key={product?.id} href={`/products/${product?.id}`} className="relative flex-1 group overflow-hidden border-r border-white/5">
                  {imgUrl && (
                    <img
                      src={imgUrl}
                      alt={product?.name || ''}
                      // Fix: Added explicit dimensions and block display for mobile engines
                      className="block absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
                      loading="eager"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 text-white">
                    <h2 className="text-xl md:text-3xl font-black uppercase tracking-tighter leading-none mb-2">{product?.name}</h2>
                    <span className="text-[10px] uppercase tracking-[0.3em] opacity-50">View Collection</span>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-white opacity-20 text-[10px] font-black uppercase tracking-[2em] animate-pulse">Yard Clothing</div>
        )}
      </section>

      {/* New Arrivals Grid */}
      <section className="container py-16 md:py-32 mx-auto px-6">
        <header className="flex flex-col items-center mb-20">
          <h3 className="text-[10px] uppercase tracking-[0.8em] text-gray-400 font-black mb-4">New Arrivals</h3>
          <div className="h-px w-12 bg-black/10" />
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-12 md:gap-y-20">
          {products?.docs?.map((product: any) => {
            const imgUrl = getFullImageUrl(product?.productImages?.[0]);
            return (
              <Link key={product.id} href={`/products/${product.id}`} className="group flex flex-col">
                <div className="aspect-[3/4] overflow-hidden bg-gray-50 mb-6 relative">
                  {imgUrl ? (
                    <img
                      src={imgUrl}
                      alt={product.name}
                      className="block w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[7px] uppercase tracking-widest text-gray-300">Image Missing</div>
                  )}
                </div>
                <div className="flex flex-col items-center text-center">
                  <h4 className="font-bold text-[10px] md:text-[11px] uppercase tracking-wider text-black mb-1">{product?.name}</h4>
                  <p className="text-gray-400 text-[10px] md:text-[11px] font-medium italic">৳ {product?.price}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </main>
  )
}