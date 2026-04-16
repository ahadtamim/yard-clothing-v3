// This is the magic line that fixes the Vercel 500 Build Error
export const dynamic = 'force-dynamic'

import { getPayload } from 'payload'
import config from '@/payload.config'
import React from 'react'

export default async function HomePage() {
  const payload = await getPayload({ config })

  // 1. Fetch the Banner Data safely
  let banner: any = null
  try {
    banner = await payload.findGlobal({
      slug: 'banner' as any,
    })
  } catch (error) {
    console.error('Banner fetch failed')
  }

  // 2. Fetch the latest Products safely
  let products: any = { docs: [] }
  try {
    products = await payload.find({
      collection: 'products' as any,
      limit: 6,
    })
  } catch (error) {
    console.error('Products fetch failed')
  }

  return (
    <div className="home-page">
      {/* BANNER SECTION */}
      {banner?.title ? (
        <section 
          className="hero" 
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${(banner.bannerImage as any)?.url || ''})`,
            height: '60vh',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            backgroundColor: '#000'
          }}
        >
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', textAlign: 'center' }}>
            {banner.title}
          </h1>
          <p style={{ fontSize: '1.2rem' }}>{banner.subtitle}</p>
        </section>
      ) : (
        <section style={{ height: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111', color: '#fff' }}>
          <h1>Yard Clothing</h1>
        </section>
      )}

      {/* PRODUCTS SECTION */}
      <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>
          {products?.docs?.length > 0 ? "Featured Clothing" : "Store Coming Soon"}
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
          gap: '2rem' 
        }}>
          {products?.docs?.map((product: any) => (
            <div key={product.id} style={{ border: '1px solid #eee', padding: '1rem', borderRadius: '8px' }}>
              <div style={{ width: '100%', height: '300px', backgroundColor: '#f5f5f5', overflow: 'hidden' }}>
                {product.images?.[0]?.image?.url ? (
                  <img 
                    src={product.images[0].image.url} 
                    alt={product.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#ccc' }}>
                    No Image
                  </div>
                )}
              </div>
              <h3 style={{ marginTop: '1rem', fontSize: '1.2rem' }}>{product.title}</h3>
              <p style={{ fontWeight: 'bold' }}>${product.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}