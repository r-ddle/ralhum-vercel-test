import { NextRequest, NextResponse } from 'next/server'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayloadHMR({ config: configPromise })
    const data = await request.json()

    const { orderId, customer, items, pricing, specialInstructions, orderSource = 'website' } = data

    // First, create/update customer
    const customerResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: customer.fullName,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        preferredLanguage: customer.preferredLanguage || 'english',
        marketingOptIn: customer.marketingOptIn !== false,
      }),
    })

    const customerData = await customerResponse.json()

    if (!customerData.success) {
      throw new Error('Failed to create/update customer')
    }

    // Create order items array
    const orderItems = items.map((item: any) => ({
      productId: item.product.id || item.id,
      productName: item.product.title || item.product.name,
      productSku: item.product.sku || item.sku,
      unitPrice: item.variant?.price || item.price,
      quantity: item.quantity,
      selectedSize: item.variant?.size || item.size,
      selectedColor: item.variant?.color || item.color,
      subtotal: (item.variant?.price || item.price) * item.quantity,
    }))

    // Create order
    const order = await payload.create({
      collection: 'orders',
      data: {
        orderNumber: orderId,
        customerName: customer.fullName,
        customerEmail: customer.email,
        customerPhone: customer.phone,
        customerSecondaryPhone: customer.secondaryPhone,
        deliveryAddress: `${customer.address.street}, ${customer.address.city}, ${customer.address.postalCode}, ${customer.address.province}`,
        specialInstructions,
        orderItems,
        orderSubtotal: pricing.subtotal,
        shippingCost: pricing.shipping,
        discount: pricing.discount || 0,
        orderTotal: pricing.total,
        orderStatus: 'pending',
        paymentStatus: 'pending',
        paymentMethod: 'cod', // Default to COD for WhatsApp orders
        whatsapp: {
          messageSent: false,
          messageTemplate: 'order-confirmation',
        },
        orderSource,
      },
    })

    // Update product analytics (order count)
    for (const item of items) {
      try {
        const productId = item.product.id || item.id
        const product = await payload.findByID({
          collection: 'products',
          id: productId,
        })

        if (product) {
          await payload.update({
            collection: 'products',
            id: productId,
            data: {
              analytics: {
                ...product.analytics,
                orderCount: (product.analytics?.orderCount || 0) + item.quantity,
              },
            },
          })
        }
      } catch (error) {
        console.error('Error updating product analytics:', error)
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        orderId: order.orderNumber,
        orderNumber: order.orderNumber,
        customerId: customerData.data.id,
        status: order.orderStatus,
        total: order.orderTotal,
        createdAt: order.createdAt,
      },
    })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json({ success: false, error: 'Failed to create order' }, { status: 500 })
  }
}
