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

  const getFullImageUrl = (img: any) => {
    if (!img) return null
    
    let url = ''
    if (typeof img === 'string') {
      url = img
    } else {
      url = img?.url || img?.image?.url || img?.filename || img?.image?.filename || ''
    }

    if (!url) return null

    // If it's already a public blob link, we use it directly
    if (url.includes('public.blob.vercel-storage.com')) return url
    
    // Extract filename to bypass the restricted /api/media folder
    const fileName = url.split('/').pop()
    if (!fileName) return null

    return `https://zjxiyg6t5n64z1cj.public.blob.vercel-storage.com/${fileName}`
  }

  const productImages = (product.productImages || [])
    .map((img: any) => getFullImageUrl(img))
    .filter(Boolean)

  // LOGS: This will show up in your Vercel Dashboard -> Logs
  console.log('--- PRODUCT DEBUG ---')
  console.log('Product Name:', product.name)
  console.log('Generated Image URLs:', productImages)

  const formattedProduct = {
    ...product,
    productImages: productImages.length > 0 ? productImages : ['/placeholder.jpg']
  }

  return <ProductClient product={formattedProduct} />
}