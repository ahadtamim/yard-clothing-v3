import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const payload = await getPayloadHMR({ config: configPromise })
  const { slug } = await params 

  // 1. Find the category ID that matches the slug (e.g., 'men')
  const categoryReq = await payload.find({
    collection: 'categories',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const category = categoryReq.docs[0]

  if (!category) return notFound()

  // 2. Fetch products where 'category' relationship matches this category's ID
  const products = await payload.find({
    collection: 'products',
    where: {
      category: {
        equals: category.id,
      },
    },
    limit: 100,
  })

  return (
    <main className="min-h-screen bg-white px-8 py-20">
      <h1 className="text-[10px] uppercase tracking-[0.5em] text-gray-400 mb-16 text-center font-bold">
        Collection: {category.title || slug}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
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
            <h4 className="font-bold text-sm uppercase">{product.name}</h4>
            <p className="text-gray-500 text-sm">৳ {product.price}</p>
          </Link>
        ))}
      </div>
      
      {products.docs.length === 0 && (
        <p className="text-center text-gray-400 text-xs uppercase tracking-widest mt-10">
          No products found in this category.
        </p>
      )}
    </main>
  )
}