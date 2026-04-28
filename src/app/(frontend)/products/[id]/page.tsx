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

  /**
   * FIXED HELPER:
   * Handles both string URLs and nested Media objects from Payload.
   */
  const getFullImageUrl = (img: any) => {
    // Extract URL if img is an object (Payload Media) or use as is if string
    const url = typeof img === 'string' ? img : img?.url;
    
    if (!url) return '/placeholder.jpg'
    if (url.startsWith('http')) return url
    
    const blobDomain = 'https://zjxiyg6t5n64z1cj.public.blob.vercel-storage.com'
    const path = url.startsWith('/') ? url : `/${url}`
    return `${blobDomain}${path}`
  }

  /**
   * FORMATTING LOGIC:
   * We ensure we check all possible image fields (main image and gallery).
   */
  const formattedProduct = {
    ...product,
    // Format the main product image if it exists
    mainImage: product.mainImage ? getFullImageUrl(product.mainImage) : getFullImageUrl(product.productImages?.[0]),
    
    // Format the entire images array for the gallery/thumbnails
    productImages: (Array.isArray(product.productImages) ? product.productImages : []).map((img: any) => {
      // Payload sometimes returns just the ID or the full object depending on depth
      const imageUrl = getFullImageUrl(img);
      return {
        ...img,
        url: imageUrl
      }
    })
  }

  return <ProductClient product={formattedProduct} />
}