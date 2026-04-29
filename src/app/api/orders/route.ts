import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const payload = await getPayloadHMR({ config: configPromise })
    const data = await req.json()
    
    // DEBUG: See exactly what is arriving at the server
    console.log("Order Data Received:", JSON.stringify(data, null, 2))

    const order = await payload.create({
      collection: 'orders', 
      data: data,
    })

    return NextResponse.json(order)
  } catch (error: any) {
    // This will show up in your Vercel Dashboard -> Logs
    console.error("PAYLOAD CREATE ERROR:", error.message)
    console.error("FULL ERROR DETAILS:", JSON.stringify(error.data, null, 2))
    
    return NextResponse.json({ 
      error: error.message,
      details: error.data 
    }, { status: 500 })
  }
}