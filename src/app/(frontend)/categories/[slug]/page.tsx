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
  // We use lowercase to ensure 'Men' and 'men' both work
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

  // If no category exists with that slug, show 404
  if (!category) {
    return notFound()
  }

  // 2. Fetch products linked to this category ID
  // depth: 2 is required to reach the 'url' property of the media relationship
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
        <header className="mb-16 text-center">
          <h1 className="text-[10px] uppercase tracking-[0.5em] text-gray-400 font-bold mb-2">
            Collection
          </h1>
          <h2 className="text-3xl font-black uppercase tracking-tighter">
            {category.title}
          </h2>
        </header>

        {products.docs.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {products.docs.map((product: any) => (
              <Link key={product.id} href={`/products/${product.id}`} className="group">
                <div className="aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
                  {/* Using optional chaining to safely access image URL */}
                  {product.productImages?.[0]?.image?.url && (
                    <img
                      src={product.productImages[0].image.url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>
                <h4 className="font-bold text-sm uppercase tracking-tight">{product.name}</h4>
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