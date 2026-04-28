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
    console.error("Critical Connection Error:", error);
  }

  const getFullImageUrl = (img: any) => {
    if (!img) return null;
    
    // 1. Dig deep to find the filename or URL string
    let path = "";
    if (typeof img === 'string') {
      path = img;
    } else {
      // Check every common Payload nesting pattern
      path = img?.url || 
             img?.image?.url || 
             img?.filename || 
             img?.image?.filename || 
             "";
    }

    if (!path) return null;

    // 2. Handle external URLs
    if (path.startsWith('http')) {
      return path.replace('http://', 'https://');
    }
    
    // 3. THE MAGIC FIX: Extract ONLY the filename.
    // This removes "/api/media/file/" or other prefixes that cause 403 errors.
    const fileName = path.split('/').pop(); 
    
    if (!fileName) return null;

    // 4. Map to your working Vercel Blob domain
    const blobDomain = 'https://zjxiyg6t5n64z1cj.public.blob.vercel-storage.com';
    return `${blobDomain}/${fileName}`;
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-black flex items-center justify-center">
        {banner?.bestProducts?.length > 0 ? (
          <div className="flex w-full h-full">
            {banner.bestProducts.map((product: any) => {
              const imgUrl = getFullImageUrl(product?.productImages?.[0]);
              return (
                <Link key={product?.id} href={`/products/${product?.id}`} className="relative flex-1 group overflow-hidden">
                  {imgUrl ? (
                    <img
                      src={imgUrl}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-zinc-900" />
                  )}
                  <div className="absolute bottom-10 left-10 text-white">
                    <h2 className="text-2xl font-bold uppercase tracking-tighter">{product?.name}</h2>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-white/20 uppercase tracking-[1em] text-[10px]">Yard Clothing • Syncing</div>
        )}
      </section>

      {/* New Arrivals Section */}
      <section className="container py-20 mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {products.docs.map((product: any) => {
            const imgUrl = getFullImageUrl(product?.productImages?.[0]);
            return (
              <Link key={product.id} href={`/products/${product.id}`} className="group">
                <div className="aspect-[3/4] bg-gray-50 mb-4 overflow-hidden relative">
                  {imgUrl ? (
                    <img 
                      src={imgUrl} 
                      alt={product.name}
                      className="block w-full h-full object-cover group-hover:scale-105 transition-transform" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[8px] text-gray-300 uppercase tracking-widest">
                      No Image
                    </div>
                  )}
                </div>
                <h4 className="font-bold uppercase text-[10px] tracking-widest text-black">{product.name}</h4>
                <p className="text-gray-400 text-[11px] mt-1">৳ {product.price}</p>
              </Link>
            )
          })}
        </div>
      </section>
    </main>
  )
}