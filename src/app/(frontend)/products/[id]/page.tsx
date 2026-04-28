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

  // Robust helper to find the URL regardless of Payload's nesting
  const getFullImageUrl = (img: any) => {
    const url = typeof img === 'string' ? img : (img?.url || img?.image?.url || img?.image);
    
    if (!url || typeof url !== 'string') return '/placeholder.jpg'
    if (url.startsWith('http')) return url
    
    const blobDomain = 'https://zjxiyg6t5n64z1cj.public.blob.vercel-storage.com'
    const path = url.startsWith('/') ? url : `/${url}`
    return `${blobDomain}${path}`
  }

  // Flatten productImages into a simple array of URL strings
  const formattedProduct = {
    ...product,
    productImages: (product.productImages || []).map((img: any) => getFullImageUrl(img))
  }

  return <ProductClient product={formattedProduct} />
}