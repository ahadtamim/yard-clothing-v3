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
   * Uses an exhaustive check to find the URL string.
   * Checks img, img.url, img.image.url, and img.image.
   */
  const getFullImageUrl = (img: any) => {
    if (!img) return '/placeholder.jpg'
    
    // Check all possible locations Payload stores the URL string
    let url = ''
    if (typeof img === 'string') {
      url = img
    } else if (img?.url && typeof img.url === 'string') {
      url = img.url
    } else if (img?.image?.url && typeof img.image.url === 'string') {
      url = img.image.url
    } else if (img?.image && typeof img.image === 'string') {
      url = img.image
    }

    if (!url) return '/placeholder.jpg'
    if (url.startsWith('http')) return url
    
    const blobDomain = 'https://zjxiyg6t5n64z1cj.public.blob.vercel-storage.com'
    const path = url.startsWith('/') ? url : `/${url}`
    return `${blobDomain}${path}`
  }

  // Format the product to send CLEAN strings to the Client Component
  const formattedProduct = {
    ...product,
    // Flattening the array here ensures ProductClient only deals with strings
    productImages: (product.productImages || []).map((img: any) => getFullImageUrl(img))
  }

  return <ProductClient product={formattedProduct} />
}