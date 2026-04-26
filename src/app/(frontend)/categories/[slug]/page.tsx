import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const payload = await getPayloadHMR({ config: configPromise })
  const { slug } = await params 
  const cleanSlug = slug.toLowerCase()

  // 1. Find the target category (e.g., "men")
  const categoryData = await payload.find({
    collection: 'categories',
    where: { slug: { equals: cleanSlug } },
  })

  const currentCategory = categoryData.docs[0]
  if (!currentCategory) return notFound()

  // 2. Find ALL sub-categories that belong to this category
  const subCategoryData = await payload.find({
    collection: 'categories',
    where: { parent: { equals: currentCategory.id } },
    limit: 100,
  })

  // 3. Combine the IDs: [Men_ID, T-shirt_ID, Panjabi_ID, etc.]
  const allRelatedCategoryIds = [
    currentCategory.id, 
    ...subCategoryData.docs.map((sub) => sub.id)
  ]

  // 4. Fetch products matching ANY of those IDs
  const products = await payload.find({
    collection: 'products',
    where: {
      category: {
        in: allRelatedCategoryIds, 
      },
    },
    limit: 100,
    depth: 2, 
  })

  return (
    <main className="min-h-screen bg-white px-8 py-20">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 text-center">
          <p className="text-[10px] uppercase tracking-[0.8em] text-gray-400 font-bold mb-4">Collection</p>
          <h2 className="text-7xl font-black uppercase tracking-tight text-black leading-none">
            {currentCategory.title}
          </h2>
          <div className="w-12 h-[3px] bg-black mx-auto mt-8"></div>
        </header>

        {products.docs.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {products.docs.map((product: any) => {
              // Get the first image from the relationship array
              const mainImage = product.productImages?.[0]
              
              return (
                <Link key={product.id} href={`/products/${product.id}`} className="group">
                  <div className="aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
                    {mainImage?.url ? (
                      <img
                        src={mainImage.url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-300 uppercase tracking-widest">
                        No Image
                      </div>
                    )}
                  </div>
                  <h4 className="font-bold text-sm uppercase tracking-tight text-black">{product.name}</h4>
                  <p className="text-gray-500 text-sm font-light">৳ {product.price}</p>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="py-20 text-center border border-dashed border-gray-100">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">
              No products found in "{currentCategory.title}" or its sub-collections.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}