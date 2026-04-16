import { getPayload } from 'payload'
import config from '@/payload.config'
import React from 'react'

export default async function HomePage() {
  const payload = await getPayload({ config })

  // 1. Fetch the Banner Data from Globals
  // Added 'as any' to the slug to prevent TypeScript from blocking the build
  const banner: any = await payload.findGlobal({
    slug: 'banner' as any,
  })

  // 2. Fetch the latest Products
  // Added 'as any' to the collection name to prevent the "not assignable" error
  const products = await payload.find({
    collection: 'products' as any,
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
            color: 'white',
            backgroundColor: '#000' // Fallback color
          }}
        >
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', textAlign: 'center' }}>
            {banner.title}
          </h1>
          <p style={{ fontSize: '1.2rem' }}>
            {banner.subtitle}
          </p>
        </section>
      )}

      {/* PRODUCTS SECTION */}
      <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>
          Featured Clothing
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
          gap: '2rem' 
        }}>
          {products.docs && products.docs.map((product: any) => (
            <div key={product.id} style={{ border: '1px solid #eee', padding: '1rem', borderRadius: '8px' }}>
              <div style={{ width: '100%', height: '300px', backgroundColor: '#f5f5f5', overflow: 'hidden' }}>
                {product.images?.[0]?.image?.url ? (
                  <img 
                    src={product.images[0].image.url} 
                    alt={product.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    No Image
                  </div>
                )}
              </div>
              <h3 style={{ marginTop: '1rem', fontSize: '1.2rem' }}>{product.title}</h3>
              <p style={{ fontWeight: 'bold', color: '#333', margin: '0.5rem 0' }}>
                ${product.price}
              </p>
              <p style={{ fontSize: '0.85rem', color: product.stock > 0 ? '#27ae60' : '#e74c3c' }}>
                {product.stock > 0 ? `${product.stock} items left` : 'Out of Stock'}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}