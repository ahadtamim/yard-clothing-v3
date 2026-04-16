import { getPayload } from 'payload'
import config from '@/payload.config'
import React from 'react'

export default async function HomePage() {
  const payload = await getPayload({ config })

  // 1. Fetch the Banner Data from Globals
  const banner = await payload.findGlobal({
    slug: 'banner',
  })

  // 2. Fetch the latest Products
  const products = await payload.find({
    collection: 'products',
    limit: 6,
  })

  return (
    <div className="home-page">
      {/* BANNER SECTION */}
      {banner && (
        <section 
          className="hero" 
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${(banner.bannerImage as any)?.url})`,
            height: '60vh',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white'
          }}
        >
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>{banner.title}</h1>
          <p style={{ fontSize: '1.2rem' }}>{banner.subtitle}</p>
        </section>
      )}

      {/* PRODUCTS SECTION */}
      <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Featured Clothing</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
          gap: '2rem' 
        }}>
          {products.docs.map((product: any) => (
            <div key={product.id} style={{ border: '1px solid #eee', padding: '1rem' }}>
              <img 
                src={product.images?.[0]?.image?.url} 
                alt={product.title}
                style={{ width: '100%', height: '300px', objectFit: 'cover' }}
              />
              <h3 style={{ marginTop: '1rem' }}>{product.title}</h3>
              <p style={{ fontWeight: 'bold' }}>${product.price}</p>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>{product.stock} items left</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}