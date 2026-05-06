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
    
    const [bannerRes, productsRes] = await Promise.allSettled([
      payload.findGlobal({ slug: 'banner', depth: 2 }),
      payload.find({ collection: 'products', limit: 10, depth: 2 })
    ]);

    if (bannerRes.status === 'fulfilled') banner = bannerRes.value;
    if (productsRes.status === 'fulfilled') products = productsRes.value;

  } catch (error) {
    console.error("Payload Sync Error:", error);
  }

  const getFullImageUrl = (img: any) => {
    if (!img) return null;
    
    let path = typeof img === 'string' ? img : (img?.url || img?.image?.url || img?.filename || "");
    if (!path) return null;

    if (path.includes('public.blob.vercel-storage.com')) return path;

    const fileName = path.split('/').pop(); 
    if (!fileName) return null;

    const blobBase = 'https://zjxiyg6t5n64z1cj.public.blob.vercel-storage.com';
    return `${blobBase}/${fileName}`;
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Banner Section - FIXED SLIDESHOW */}
      <section className="relative h-[65vh] md:h-[85vh] bg-black overflow-hidden">
        {banner?.bestProducts?.length > 0 ? (
          <div className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide">
            {banner.bestProducts.map((product: any) => {
              const imgUrl = getFullImageUrl(product?.productImages?.[0]);
              return (
                <Link 
                  key={product?.id} 
                  href={`/products/${product?.id}`} 
                  className="relative min-w-full h-full flex-shrink-0 snap-center group overflow-hidden border-r border-white/5"
                >
                  {imgUrl && (
                    <img
                      src={imgUrl}
                      alt=""
                      crossOrigin="anonymous" 
                      className="block absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-1000"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                  <div className="absolute bottom-12 left-8 md:left-16 text-white">
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-2">
                      {product?.name}
                    </h2>
                    <p className="text-xs uppercase tracking-[0.3em] opacity-60">Featured Collection</p>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full w-full">
            <div className="text-white/20 uppercase tracking-[1em] text-[10px]">Yard Clothing</div>
          </div>
        )}
      </section>

      {/* Product Grid */}
      <section className="container py-16 mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-8 gap-y-12">
          {products.docs.map((product: any) => {
            const imgUrl = getFullImageUrl(product?.productImages?.[0]);
            return (
              <Link key={product.id} href={`/products/${product.id}`} className="group">
                <div className="aspect-[3/4] bg-gray-50 mb-6 overflow-hidden relative">
                  {imgUrl ? (
                    <img 
                      src={imgUrl} 
                      alt={product.name}
                      crossOrigin="anonymous"
                      className="block w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[7px] text-gray-300 uppercase tracking-widest">No Image</div>
                  )}
                </div>
                <h4 className="font-bold uppercase text-[10px] tracking-widest text-black mb-1">{product.name}</h4>
                <p className="text-gray-400 text-[11px]">৳ {product.price}</p>
              </Link>
            )
          })}
        </div>
      </section>
    </main>
  )
}