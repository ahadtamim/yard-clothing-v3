import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const payload = await getPayloadHMR({ config: configPromise })
  const { slug } = await params 

  // 1. Find the category document that matches the slug from the URL
  const categoryData = await payload.find({
    collection: 'categories',
    where: {
      slug: {
        equals: slug.toLowerCase(),
      },
    },
    limit: 1,
  })

  const category = categoryData.docs[0]

  if (!category) {
    return notFound()
  }

  // 2. Fetch products linked to this category ID
  const products = await payload.find({
    collection: 'products',
    where: {
      category: {
        equals: category.id,
      },
    },
    limit: 100,
    depth: 2, 
  })

  return (
    <main className="min-h-screen bg-white px-8 py-20">
      <div className="max-w-7xl mx-auto">
        {/* --- IMPROVED HEADER --- */}
        <header className="mb-20 text-center">
          <p className="text-[10px] uppercase tracking-[0.8em] text-gray-400 font-bold mb-4">
            Collection
          </p>
          <h2 className="text-7xl font-black uppercase tracking-tight text-black leading-none">
            {category.title}
          </h2>
          <div className="w-12 h-[3px] bg-black mx-auto mt-8"></div>
        </header>

        {products.docs.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {products.docs.map((product: any) => (
              <Link key={product.id} href={`/products/${product.id}`} className="group">
                <div className="aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
                  {product.productImages?.[0]?.image?.url && (
                    <img
                      src={product.productImages[0].image.url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>
                <h4 className="font-bold text-sm uppercase tracking-tight text-black">{product.name}</h4>
                <p className="text-gray-500 text-sm font-light">৳ {product.price}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border border-dashed border-gray-100">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
              No products found in "{category.title}" yet.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}