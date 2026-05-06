import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const payload = await getPayload({ config: configPromise })
    const data = await req.json()

    // 1. Map items but ensure the product field is treated as a plain string ID
    const sanitizedItems = (data.items || []).map((item: any) => {
      let productId = item.product || item.id || item

      if (typeof productId === 'object' && productId !== null) {
        productId = productId.id || productId._id || ''
      }

      return {
        product: String(productId).trim(), // Convert to primitive string
        quantity: Number(item.quantity) || 1,
        size: item.size || item.selectedSize || 'N/A',
      }
    })

    // 2. Prepare order data
    const payloadData = {
      ...data,
      items: sanitizedItems,
      district: data.district || 'N/A',
      area: data.area || 'N/A',
    }

    // 3. Completely strip out any complex objects
    const cleanData = JSON.parse(JSON.stringify(payloadData))

    // 4. Create the order
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