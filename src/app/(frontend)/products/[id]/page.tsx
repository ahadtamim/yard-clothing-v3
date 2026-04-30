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
    let url = typeof img === 'string' ? img : (img?.url || img?.image?.url || img?.filename || '')
    if (!url) return null
    if (url.includes('public.blob.vercel-storage.com')) return url
    const fileName = url.split('/').pop()
    return `https://zjxiyg6t5n64z1cj.public.blob.vercel-storage.com/${fileName}`
  }

  const productImages = (product.productImages || [])
    .map((img: any) => getFullImageUrl(img))
    .filter(Boolean)

  const formattedProduct = {
    ...product,
    productImages: productImages.length > 0 ? productImages : ['/placeholder.jpg'],
    // Ensure the client receives the inventory data
    inventory: product.inventory || [] 
  }

  return <ProductClient product={formattedProduct} />
}