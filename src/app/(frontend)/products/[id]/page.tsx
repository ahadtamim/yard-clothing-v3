import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config'
import { notFound } from 'next/navigation'
import ProductClient from './ProductClient'

export const dynamic = 'force-dynamic'

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const payload = await getPayloadHMR({ config: configPromise })
  const { id } = await params

  const product = (await payload.findByID({
    collection: 'products',
    id,
    // DEPTH IS THE KEY: 
    // depth: 2 ensures Payload returns the full Media object (URL, sizes, etc.)
    // instead of just the ID number.
    depth: 2, 
  }).catch(() => null)) as any

  if (!product) return notFound()

  // Ensure productImages is an array even if empty to prevent frontend errors
  const formattedProduct = {
    ...product,
    productImages: Array.isArray(product.productImages) ? product.productImages : []
  }

  return <ProductClient product={formattedProduct} />
}