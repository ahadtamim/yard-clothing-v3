import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config' 
import Link from 'next/link'
import { AutoSlider } from '@/components/AutoSlider'

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

  const slides = (banner?.bestProducts || []).map((product: any) => ({
    id: product?.id,
    name: product?.name,
    imgUrl: getFullImageUrl(product?.productImages?.[0]),
    href: `/products/${product?.id}`
  })).filter((slide: any) => slide.imgUrl !== null);

  return (
    <main className="min-h-screen bg-white">
      {/* Banner Section - Auto Slider Component */}
      <section className="relative h-[65vh] md:h-[85vh] bg-black overflow-hidden">
        {slides.length > 0 ? (
          <AutoSlider slides={slides} />
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

      {/* Footer / Address Section - Fixed Single Location Rendered Only Once */}
      <footer className="bg-black text-white py-12 px-6 border-t border-white/10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xs font-bold tracking-widest uppercase mb-4 text-gray-200">Location</h3>
            <p className="text-xs text-gray-400 uppercase tracking-wider leading-relaxed">
              House No-64, Dokhingaon, <br />
              Nondipara Main Road <br />
              (Beside Masjid-A-Nur)
            </p>
          </div>
          <div>
            <h3 className="text-xs font-bold tracking-widest uppercase mb-4 text-gray-200">Contact</h3>
            <p className="text-xs text-gray-400 tracking-wider mb-2">+880 1632-235335</p>
            <div className="flex flex-col gap-1 mt-4">
              <a href="#" className="text-[10px] uppercase text-gray-500 hover:text-white">Facebook →</a>
              <a href="#" className="text-[10px] uppercase text-gray-500 hover:text-white">Instagram →</a>
              <a href="#" className="text-[10px] uppercase text-gray-500 hover:text-white">WhatsApp →</a>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-bold tracking-widest uppercase mb-2 text-gray-200">Yard Clothing</h3>
            <p className="text-[10px] text-gray-500 leading-relaxed">
              Crafting premium streetwear. <br />
              Designed and built in Bangladesh.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}