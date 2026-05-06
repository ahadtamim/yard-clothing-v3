import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { NextResponse } from 'next/server'
import { Types } from 'mongoose'

export async function POST(req: Request) {
  try {
    const payload = await getPayload({ config: configPromise })
    const data = await req.json()

    console.log('Order Data Received:', JSON.stringify(data, null, 2))

    // Sanitize the items array
    const sanitizedItems = (data.items || []).map((item: any) => {
      let productId = item.product || item.id || item

      if (typeof productId === 'object' && productId !== null) {
        // Extract ID if it's the full nested object
        productId = productId.id || productId._id || ''
      }

      const finalProductId = String(productId).trim()

      if (!Types.ObjectId.isValid(finalProductId)) {
        throw new Error(`Invalid Product ID format: ${finalProductId}`)
      }

      return {
        // Explicitly format as a reference object if required by Payload/Mongoose, or a string
        product: finalProductId, 
        quantity: Number(item.quantity) || 1,
        size: item.size || item.selectedSize || 'N/A',
      }
    })

    const payloadData = {
      ...data,
      items: sanitizedItems,
      // Ensure relations are saved as strings or proper ObjectIds in Payload
      district: data.district || 'N/A',
      area: data.area || 'N/A',
    }

    const order = await payload.create({
      collection: 'orders',
      data: payloadData,
      overrideAccess: true, // Prevents access control rejection
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