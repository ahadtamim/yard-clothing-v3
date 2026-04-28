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
    depth: 2, 
  }).catch(() => null)) as any

  if (!product) return notFound()

  // Helper to ensure images use the Vercel Blob domain
  const getFullImageUrl = (img: any) => {
    if (!img?.url) return '/placeholder.jpg'
    if (img.url.startsWith('http')) return img.url
    const blobDomain = 'https://zjxiyg6t5n64z1cj.public.blob.vercel-storage.com'
    const path = img.url.startsWith('/') ? img.url : `/${img.url}`
    return `${blobDomain}${path}`
  }

  // Format product data before sending to Client Component
  const formattedProduct = {
    ...product,
    productImages: (Array.isArray(product.productImages) ? product.productImages : []).map((img: any) => ({
      ...img,
      url: getFullImageUrl(img)
    }))
  }

  return <ProductClient product={formattedProduct} />
}