import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { NextResponse } from 'next/server'
import { Types } from 'mongoose'

export async function POST(req: Request) {
  try {
    const payload = await getPayload({ config: configPromise })
    const data = await req.json()

    console.log('Order Data Received:', JSON.stringify(data, null, 2))

    // Sanitize incoming item references
    const sanitizedItems = (data.items || []).map((item: any) => {
      let productId = item.product || item.id || item

      if (typeof productId === 'object' && productId !== null) {
        productId = productId.id || productId._id || ''
      }

      const finalProductId = String(productId).trim()

      // Ensure that ID is exactly 24 characters and is valid in MongoDB
      if (!/^[0-9a-fA-F]{24}$/.test(finalProductId)) {
        throw new Error(`Invalid Product ID format: ${finalProductId}`)
      }

      return {
        product: new Types.ObjectId(finalProductId),
        quantity: Number(item.quantity) || 1,
        size: item.size || item.selectedSize || 'N/A',
      }
    })

    const payloadData = {
      ...data,
      items: sanitizedItems,
      district: data.district || 'N/A',
      area: data.area || 'N/A',
    }

    // Strip internal nested objects that trigger depth expansion failures
    const cleanData = JSON.parse(JSON.stringify(payloadData))

    const order = await payload.create({
      collection: 'orders',
      data: cleanData,
    })

    return NextResponse.json(order)
  } catch (error: any) {
    console.error('PAYLOAD CREATE ERROR:', error.message)

    return NextResponse.json(
      {
        error: error.message,
        details: error.data,
      },
      { status: 500 }
    )
  }
}