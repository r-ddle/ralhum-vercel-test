import { NextRequest, NextResponse } from 'next/server'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const payload = await getPayloadHMR({ config: configPromise })
    const { id } = params

    const orders = await payload.find({
      collection: 'orders',
      where: {
        orderNumber: { equals: id },
      },
      limit: 1,
    })

    if (orders.docs.length === 0) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 })
    }

    const order = orders.docs[0]

    return NextResponse.json({
      success: true,
      data: {
        id: order.id,
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        customerPhone: order.customerPhone,
        deliveryAddress: order.deliveryAddress,
        orderItems: order.orderItems,
        orderSubtotal: order.orderSubtotal,
        shippingCost: order.shippingCost,
        discount: order.discount,
        orderTotal: order.orderTotal,
        orderStatus: order.orderStatus,
        paymentStatus: order.paymentStatus,
        paymentMethod: order.paymentMethod,
        specialInstructions: order.specialInstructions,
        shipping: order.shipping,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      },
    })
  } catch (error) {
    console.error('Error fetching order:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch order' }, { status: 500 })
  }
}
