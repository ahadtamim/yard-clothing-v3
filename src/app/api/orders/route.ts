import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config'
import { NextResponse } from 'next/server'
import { Types } from 'mongoose'

export async function POST(req: Request) {
  try {
    const payload = await getPayloadHMR({ config: configPromise })
    const data = await req.json()

    const sanitizedItems = (data.items || []).map((item: any) => {
      let productId = item.product || item.id || item

      if (typeof productId === 'object' && productId !== null) {
        productId = productId.id || productId._id || productId.value || ''
      }

      const finalProductId = String(productId).trim()

      if (finalProductId.length !== 24 || !Types.ObjectId.isValid(finalProductId)) {
        throw new Error(
          `Invalid Product ID found in cart items: "${finalProductId}". Must be a 24-character hex string.`
        )
      }

      return {
        product: finalProductId,
        quantity: Number(item.quantity) || 1,
        size: item.size || item.selectedSize || 'N/A',
      }
    })

    const payloadData = {
      ...data,
      district: data.district || 'N/A',
      area: data.area || 'N/A',
      items: sanitizedItems,
    }

    const order = await payload.create({
      collection: 'orders',
      data: payloadData,
    })

    return NextResponse.json(order)
  } catch (error: any) {
    console.error('PAYLOAD CREATE ERROR:', error.message)
    return NextResponse.json(
      { error: error.message, details: error.data },
      { status: 500 }
    )
  }
}