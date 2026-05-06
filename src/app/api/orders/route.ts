import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { NextResponse } from 'next/server'
import { Types } from 'mongoose'

export async function POST(req: Request) {
  try {
    const payload = await getPayload({ config: configPromise })
    const data = await req.json()

    // DEBUG: See exactly what is arriving at the server
    console.log('Order Data Received:', JSON.stringify(data, null, 2))

    // 1. Defensively map and clean the items array
    const sanitizedItems = (data.items || []).map((item: any) => {
      let productId = item.product || item.id || item

      // If it's a nested object, extract its ID
      if (typeof productId === 'object' && productId !== null) {
        productId = productId.id || productId._id || productId._value || ''
      }

      const finalProductId = String(productId).trim()

      // Validate ObjectId
      if (!Types.ObjectId.isValid(finalProductId)) {
        throw new Error(
          `Invalid Product ID found in cart items: "${finalProductId}". Must be a valid ObjectId.`
        )
      }

      return {
        // Pass the string directly or instantiate a new Types.ObjectId
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
      {
        error: error.message,
        details: error.data,
      },
      { status: 500 }
    )
  }
}