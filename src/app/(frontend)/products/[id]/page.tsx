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
   * THE ULTIMATE BYPASS HELPER:
   * This helper is designed to fix the 403 Forbidden errors seen in the logs.
   * It forces the browser to fetch from the Public Vercel Blob instead of the 
   * Admin-only Payload API.
   */
  const getFullImageUrl = (img: any) => {
    if (!img) return '/placeholder.jpg'
    
    let url = ''
    if (typeof img === 'string') {
      url = img
    } else {
      // Check every common Payload nesting pattern
      url = img?.url || img?.image?.url || img?.filename || img?.image?.filename || ''
    }

    if (!url) return '/placeholder.jpg'

    // 1. Return immediately if it's already a full public blob link
    if (url.includes('public.blob.vercel-storage.com')) return url
    
    // 2. Ensure standard external links use HTTPS
    if (url.startsWith('http')) return url.replace('http://', 'https://')
    
    /**
     * 3. THE PATH CLEANER:
     * This takes "/api/media/file/image.png" and extracts ONLY "image.png".
     * By throwing away the folders, we bypass the authentication check that 
     * results in the 403 error.
     */
    const fileName = url.split('/').pop()
    if (!fileName) return '/placeholder.jpg'

    // Your verified public base URL
    const blobDomain = 'https://zjxiyg6t5n64z1cj.public.blob.vercel-storage.com'
    
    return `${blobDomain}/${fileName}`
  }

  // Flatten the images into simple, working URL strings
  const formattedProduct = {
    ...product,
    productImages: (product.productImages || [])
      .map((img: any) => getFullImageUrl(img))
      .filter((url: string) => url !== '/placeholder.jpg') // Only send real links
  }

  return <ProductClient product={formattedProduct} />
}