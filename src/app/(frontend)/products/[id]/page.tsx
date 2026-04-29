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
   * Strips restricted API paths to prevent 403 Forbidden errors on public/mobile browsers.
   */
  const getFullImageUrl = (img: any) => {
    if (!img) return '/placeholder.jpg'
    
    let url = ''
    if (typeof img === 'string') {
      url = img
    } else {
      // Check every nesting pattern Payload might use
      url = img?.url || img?.image?.url || img?.filename || img?.image?.filename || ''
    }

    if (!url) return '/placeholder.jpg'

    // 1. If it's already a full Blob URL, return it
    if (url.includes('public.blob.vercel-storage.com')) return url
    
    // 2. If it's another external URL (like Cloudinary/S3), return as HTTPS
    if (url.startsWith('http')) return url.replace('http://', 'https://')
    
    /**
     * 3. THE CRITICAL FIX: 
     * Extract JUST the filename (e.g., "shirt.png") 
     * This throws away "/api/media/file/" which is what causes the 403 error 
     * when you aren't logged in as an Admin.
     */
    const fileName = url.split('/').pop()
    if (!fileName) return '/placeholder.jpg'

    const blobDomain = 'https://zjxiyg6t5n64z1cj.public.blob.vercel-storage.com'
    
    // Return the direct, public link
    return `${blobDomain}/${fileName}`
  }

  // Format the product to send CLEAN strings to the Client Component
  const formattedProduct = {
    ...product,
    productImages: (product.productImages || []).map((img: any) => getFullImageUrl(img))
  }

  return <ProductClient product={formattedProduct} />
}