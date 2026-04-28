import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config' 
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  let banner: any = null;
  let products: any = { docs: [] };

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

  const getFullImageUrl = (img: any) => {
    if (!img) return null
    
    // Safety: Extract URL regardless of how Payload structured the object
    let path = ""
    if (typeof img === 'string') path = img
    else if (img?.url) path = img.url
    else if (img?.image?.url) path = img.image.url
    else if (img?.image) path = img.image
    
    if (!path) return null

    // Fix 1: Protocol Enforcement
    // Mobile browsers strictly block HTTP on HTTPS sites.
    if (path.startsWith('http')) {
      return path.replace('http://', 'https://')
    }
    
    // Fix 2: Absolute URL Construction
    // Ensure the blob domain is prepended correctly without double slashes.
    const blobDomain = 'https://zjxiyg6t5n64z1cj.public.blob.vercel-storage.com'
    const cleanPath = path.startsWith('/') ? path : `/${path}`
    return `${blobDomain}${cleanPath}`
  }

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] bg-black overflow-hidden flex items-center justify-center">
        {banner?.bestProducts?.length > 0 ? (
          <div className="flex w-full h-full">
            {banner.bestProducts.map((product: any) => {
              const imgUrl = getFullImageUrl(product?.productImages?.[0]);
              return (
                <Link key={product?.id} href={`/products/${product?.id}`} className="relative flex-1 group overflow-hidden border-r border-white/10">
                  {imgUrl ? (
                    <img
                      src={imgUrl}
                      alt={product?.name || ''}
                      // Fix 3: Safari Mobile Rendering
                      // Adding 'inset-0' and 'w-full' with 'display: block' prevents 0px height bugs
                      className="block absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                      decoding="async"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-white/20 text-[8px] uppercase tracking-widest">No Media</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white">
                    <h2 className="text-lg md:text-2xl font-black uppercase tracking-tighter leading-tight">{product?.name}</h2>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-white opacity-20 text-xs font-bold uppercase tracking-[1em]">Yard Clothing</div>
        )}
      </section>

      {/* New Arrivals Grid */}
      <section className="container py-12 md:py-24 mx-auto px-6">
        <h3 className="text-[10px] uppercase tracking-[0.6em] text-gray-400 mb-12 text-center font-black">
          New Arrivals
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10 md:gap-y-12">
          {products?.docs?.map((product: any) => {
            const imgUrl = getFullImageUrl(product?.productImages?.[0]);
            return (
              <Link key={product.id} href={`/products/${product.id}`} className="group">
                <div className="aspect-[3/4] overflow-hidden bg-gray-100 mb-4 relative">
                  {imgUrl ? (
                    <img
                      src={imgUrl}
                      alt={product.name}
                      // Standardizing image tags for cross-browser stability
                      className="block w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      decoding="async"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[8px] uppercase text-gray-400">No Image</div>
                  )}
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-[10px] md:text-[11px] uppercase tracking-wider text-black">{product?.name}</h4>
                  <p className="text-gray-400 text-[10px] md:text-[11px] font-medium tracking-tight">৳ {product?.price}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </main>
  )
}