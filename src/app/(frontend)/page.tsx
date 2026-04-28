import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config' 
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  let products: any = { docs: [] };
  let banner: any = null;

  try {
    const payload = await getPayloadHMR({ config: configPromise })
    
    // Using Promise.allSettled so one failure doesn't kill the whole page
    const [bannerRes, productsRes] = await Promise.allSettled([
      payload.findGlobal({ slug: 'banner', depth: 2 }),
      payload.find({ collection: 'products', limit: 10, depth: 2 })
    ]);

    if (bannerRes.status === 'fulfilled') banner = bannerRes.value;
    if (productsRes.status === 'fulfilled') products = productsRes.value;

  } catch (error) {
    console.error("Critical Server Error:", error);
  }

  const getFullImageUrl = (img: any) => {
    if (!img) return null;
    const path = typeof img === 'string' ? img : (img?.url || img?.image?.url || "");
    if (!path) return null;
    if (path.startsWith('http')) return path.replace('http://', 'https://');
    
    return `https://zjxiyg6t5n64z1cj.public.blob.vercel-storage.com${path.startsWith('/') ? '' : '/'}${path}`;
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="relative h-[70vh] bg-black flex items-center justify-center">
        {banner?.bestProducts?.length > 0 ? (
          <div className="flex w-full h-full">
            {banner.bestProducts.map((product: any) => (
              <Link key={product?.id} href={`/products/${product?.id}`} className="relative flex-1 group overflow-hidden">
                <img
                  src={getFullImageUrl(product?.productImages?.[0]) || ''}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                />
                <div className="absolute bottom-10 left-10 text-white">
                  <h2 className="text-2xl font-bold uppercase">{product?.name}</h2>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-white/20 uppercase tracking-[1em] text-xs">Yard Clothing • Connection Pending</div>
        )}
      </section>

      <section className="container py-20 mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {products.docs.map((product: any) => (
            <Link key={product.id} href={`/products/${product.id}`} className="group">
              <div className="aspect-[3/4] bg-gray-100 mb-4 overflow-hidden">
                <img 
                  src={getFullImageUrl(product?.productImages?.[0]) || ''} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                />
              </div>
              <h4 className="font-bold uppercase text-[11px]">{product.name}</h4>
              <p className="text-gray-400 text-[11px]">৳ {product.price}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}