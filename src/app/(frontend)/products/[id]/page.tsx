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
   * Strips the internal "/api/media/" path which requires an admin login.
   * Forces the browser to fetch directly from the public Vercel Blob URL.
   */
  const getFullImageUrl = (img: any) => {
    if (!img) return '/placeholder.jpg'
    
    let url = ''
    // Check all possible metadata shapes Payload might return
    if (typeof img === 'string') {
      url = img
    } else {
      url = img?.url || img?.image?.url || img?.filename || img?.image?.filename || ''
    }

    if (!url) return '/placeholder.jpg'

    // 1. If it's already a full public Blob URL, use it
    if (url.includes('public.blob.vercel-storage.com')) return url
    
    // 2. Clean up any standard external links
    if (url.startsWith('http')) return url.replace('http://', 'https://')
    
    /**
     * 3. THE CRITICAL BYPASS:
     * We split the path to get only the filename (e.g., "shirt.png").
     * This avoids the "/api/media/file/..." path seen in your 403 error logs.
     */
    const fileName = url.split('/').pop()
    if (!fileName) return '/placeholder.jpg'

    // Your verified public base URL
    const blobDomain = 'https://zjxiyg6t5n64z1cj.public.blob.vercel-storage.com'
    
    // Return the absolute public path
    return `${blobDomain}/${fileName}`
  }

  // Format the product to ensure ProductClient handles simple image strings
  const formattedProduct = {
    ...product,
    productImages: (product.productImages || [])
      .map((img: any) => getFullImageUrl(img))
      .filter(Boolean) // Remove any nulls
  }

  return <ProductClient product={formattedProduct} />
}