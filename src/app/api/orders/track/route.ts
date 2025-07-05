import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const orderNumber = searchParams.get('orderNumber')
  const email = searchParams.get('email')
  const phone = searchParams.get('phone')

  if (!orderNumber) {
    return NextResponse.json({ success: false, error: 'Order number is required' }, { status: 400 })
  }

  try {
    const payload = await getPayload({ config })

    // Build query conditions
    const whereConditions: any = {
      orderNumber: {
        equals: orderNumber.trim().toUpperCase(),
      },
    }

    // Add email or phone verification for security
    if (email || phone) {
      const orConditions = []

      if (email) {
        orConditions.push({
          customerEmail: {
            equals: email.trim().toLowerCase(),
          },
        })
      }

      if (phone) {
        orConditions.push({
          customerPhone: {
            contains: phone.trim(),
          },
        })
      }

      whereConditions.or = orConditions
    }

    const result = await payload.find({
      collection: 'orders',
      where: whereConditions,
      limit: 1,
    })

    if (result.docs.length > 0) {
      const order = result.docs[0]

      // Return order details without sensitive information
      return NextResponse.json({
        success: true,
        found: true,
        order: {
          id: order.id,
          orderNumber: order.orderNumber,
          customerName: order.customerName,
          orderStatus: order.orderStatus,
          paymentStatus: order.paymentStatus,
          orderTotal: order.orderTotal,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
          orderItems:
            order.orderItems?.map((item) => ({
              productName: item.productName,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              subtotal: item.subtotal,
              selectedSize: item.selectedSize,
              selectedColor: item.selectedColor,
            })) || [],
          shipping: {
            trackingNumber: order.shipping?.trackingNumber,
            courier: order.shipping?.courier,
            estimatedDelivery: order.shipping?.estimatedDelivery,
            actualDelivery: order.shipping?.actualDelivery,
          },
        },
      })
    } else {
      return NextResponse.json({
        success: true,
        found: false,
        message: 'Order not found or verification failed',
      })
    }
  } catch (error) {
    console.error('Order tracking error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { orderNumber, email, phone } = await request.json()

    if (!orderNumber) {
      return NextResponse.json(
        { success: false, error: 'Order number is required' },
        { status: 400 },
      )
    }

    const payload = await getPayload({ config })

    // Build query conditions
    const whereConditions: any = {
      orderNumber: {
        equals: orderNumber.trim().toUpperCase(),
      },
    }

    // Add email or phone verification for security
    if (email || phone) {
      const orConditions = []

      if (email) {
        orConditions.push({
          customerEmail: {
            equals: email.trim().toLowerCase(),
          },
        })
      }

      if (phone) {
        orConditions.push({
          customerPhone: {
            contains: phone.trim(),
          },
        })
      }

      whereConditions.or = orConditions
    }

    const result = await payload.find({
      collection: 'orders',
      where: whereConditions,
      limit: 1,
    })

    if (result.docs.length > 0) {
      const order = result.docs[0]

      return NextResponse.json({
        success: true,
        found: true,
        order: {
          id: order.id,
          orderNumber: order.orderNumber,
          customerName: order.customerName,
          orderStatus: order.orderStatus,
          paymentStatus: order.paymentStatus,
          orderTotal: order.orderTotal,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
          orderItems:
            order.orderItems?.map((item) => ({
              productName: item.productName,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              subtotal: item.subtotal,
              selectedSize: item.selectedSize,
              selectedColor: item.selectedColor,
            })) || [],
          shipping: {
            trackingNumber: order.shipping?.trackingNumber,
            courier: order.shipping?.courier,
            estimatedDelivery: order.shipping?.estimatedDelivery,
            actualDelivery: order.shipping?.actualDelivery,
          },
        },
      })
    } else {
      return NextResponse.json({
        success: true,
        found: false,
        message: 'Order not found or verification failed',
      })
    }
  } catch (error) {
    console.error('Order tracking error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
