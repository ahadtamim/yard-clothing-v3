import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config' 
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  let banner = null;
  let products = { docs: [] };

  try {
    const payload = await getPayloadHMR({ config: configPromise })
    
    // Fetch data but don't let it crash the whole page if it fails
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

  // Improved Image Helper to fix broken icons
  const getFullImageUrl = (img: any) => {
    if (!img) return null
    let url = ''
    if (typeof img === 'string') url = img
    else if (img?.url) url = img.url
    else if (img?.image?.url) url = img.image.url
    
    if (!url) return null
    if (url.startsWith('http')) return url
    
    // Ensure this matches your Vercel Blob domain
    const blobDomain = 'https://zjxiyg6t5n64z1cj.public.blob.vercel-storage.com'
    const path = url.startsWith('/') ? url : `/${url}`
    return `${blobDomain}${path}`
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="relative h-[80vh] bg-black overflow-hidden flex items-center justify-center">
        {(banner as any)?.bestProducts?.length > 0 ? (
          <div className="flex w-full h-full">
            {(banner as any).bestProducts.map((product: any) => {
              const imgUrl = getFullImageUrl(product?.productImages?.[0]);
              return (
                <Link key={product?.id} href={`/products/${product?.id}`} className="relative flex-1 group overflow-hidden border-r border-white/10">
                  {imgUrl && (
                    <img
                      src={imgUrl}
                      alt={product?.name || ''}
                      className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-10 left-10 text-white">
                    <h2 className="text-2xl font-black uppercase tracking-tighter">{product?.name}</h2>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-white opacity-20 text-xs font-bold uppercase tracking-[1em]">Yard Clothing</div>
        )}
      </section>

      <section className="container py-24 mx-auto px-6">
        <h3 className="text-[10px] uppercase tracking-[0.6em] text-gray-400 mb-16 text-center font-black">New Arrivals</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {products?.docs?.map((product: any) => {
            const imgUrl = getFullImageUrl(product?.productImages?.[0]);
            return (
              <Link key={product.id} href={`/products/${product.id}`} className="group">
                <div className="aspect-[3/4] overflow-hidden bg-gray-100 mb-6 relative">
                  {imgUrl ? (
                    <img
                      src={imgUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[8px] uppercase text-gray-400">No Image</div>
                  )}
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-[11px] uppercase tracking-wider text-black">{product?.name}</h4>
                  <p className="text-gray-400 text-[11px] font-medium tracking-tight">৳ {product?.price}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </main>
  )
}