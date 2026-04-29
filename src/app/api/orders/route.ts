import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const payload = await getPayloadHMR({ config: configPromise })
    const body = await req.json()

    const order = await payload.create({
      collection: 'orders', // Make sure this matches your collection slug in payload.config
      data: {
        ...body,
        status: 'pending',
      },
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error("Order Sync Error:", error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}