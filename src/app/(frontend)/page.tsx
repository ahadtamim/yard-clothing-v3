// Force dynamic ensures Vercel doesn't crash trying to pre-render with an empty DB
export const dynamic = 'force-dynamic'
export const revalidate = 0

import { getPayload } from 'payload'
import config from '@/payload.config'
import React from 'react'

export default async function HomePage() {
  const payload = await getPayload({ config })

  // 1. Fetch Banner with 'as any' to bypass stale type definitions
  let banner: any = null
  try {
    banner = await payload.findGlobal({
      slug: 'banner' as any,
    })
  } catch (error) {
    console.error('Banner fetch failed or not seeded')
  }

  // 2. Fetch Products with 'as any' to avoid build-time collection errors
  let products: any = { docs: [] }
  try {
    products = await payload.find({
      collection: 'products' as any,
      limit: 6,
    })
  } catch (error) {
    console.error('Products collection fetch failed')
  }

  return (
    <div className="home-page" style={{ fontFamily: 'sans-serif', color: '#333' }}>
      {/* BANNER SECTION */}
      {banner?.title ? (
        <section 
          className="hero" 
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${(banner.bannerImage as any)?.url || ''})`,
            height: '60vh',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            backgroundColor: '#111'
          }}
        >
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', textAlign: 'center', textTransform: 'uppercase' }}>
            {banner.title}
          </h1>
          <p style={{ fontSize: '1.2rem', letterSpacing: '1px' }}>{banner.subtitle}</p>
        </section>
      ) : (
        <section style={{ height: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f4f4f4' }}>
          <h1 style={{ letterSpacing: '2px', textTransform: 'uppercase' }}>Yard Clothing</h1>
        </section>
      )}

      {/* PRODUCTS SECTION */}
      <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2rem', textTransform: 'uppercase' }}>
          {products?.docs?.length > 0 ? "Featured Collection" : "New Arrivals Coming Soon"}
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '2.5rem' 
        }}>
          {products?.docs?.map((product: any) => (
            <div key={product.id} style={{ transition: 'transform 0.2s' }}>
              <div style={{ width: '100%', height: '350px', backgroundColor: '#f9f9f9', overflow: 'hidden', borderRadius: '4px' }}>
                {product.images?.[0]?.image?.url ? (
                  <img 
                    src={product.images[0].image.url} 
                    alt={product.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#999' }}>
                    No Preview
                  </div>
                )}
              </div>
              <h3 style={{ marginTop: '1.2rem', fontSize: '1.1rem', fontWeight: '600' }}>{product.title}</h3>
              <p style={{ color: '#666', marginTop: '0.5rem', fontSize: '1rem' }}>${product.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}