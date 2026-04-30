import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const payload = await getPayloadHMR({ config: configPromise })
    const data = await req.json()
    
    // DEBUG: See exactly what is arriving at the server
    console.log("Order Data Received:", JSON.stringify(data, null, 2))

    // 1. Defensively map and clean the items array
    const sanitizedItems = data.items.map((item: any) => {
      let productId = item.product || item.id;
      
      // If it's a nested object, extract the ID
      if (typeof productId === 'object' && productId !== null) {
        productId = productId.id || productId._id || productId;
      }

      return {
        product: String(productId).trim(), // 2. Convert to string
        quantity: Number(item.quantity) || 1,
        size: item.size || item.selectedSize || 'N/A',
      };
    });

    // 3. Create the payload data object with sanitized items
    const payloadData = {
      ...data,
      items: sanitizedItems,
    };

    const order = await payload.create({
      collection: 'orders', 
      data: payloadData,
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