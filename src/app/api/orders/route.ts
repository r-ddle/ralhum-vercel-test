import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { OrderInput } from '@/types/api'

export async function POST(request: NextRequest) {
  try {
    const orderData: OrderInput = await request.json()

    const payload = await getPayload({ config })

    // Create or update customer first
    let customer
    try {
      // Try to find existing customer by email
      const existingCustomer = await payload.find({
        collection: 'customers',
        where: {
          email: {
            equals: orderData.customer.email,
          },
        },
        limit: 1,
      })

      if (existingCustomer.docs.length > 0) {
        // Update existing customer
        customer = await payload.update({
          collection: 'customers',
          id: existingCustomer.docs[0].id,
          data: {
            name: orderData.customer.fullName,
            email: orderData.customer.email,
            primaryPhone: orderData.customer.phone, // ✅ Correct field name
            secondaryPhone: orderData.customer.secondaryPhone,
            addresses: orderData.customer.address
              ? [
                  // ✅ Correct structure (array)
                  {
                    type: 'home',
                    address: `${orderData.customer.address.street}, ${orderData.customer.address.city}, ${orderData.customer.address.postalCode}, ${orderData.customer.address.province}`,
                    isDefault: true,
                  },
                ]
              : [],
            preferences: {
              // ✅ Correct nested structure
              communicationMethod: 'whatsapp',
              marketingOptIn: orderData.customer.marketingOptIn || false,
            },
            whatsapp: {
              isVerified: false,
            },
            status: 'active',
            customerType: 'regular',
          },
        })
      } else {
        // Create new customer
        customer = await payload.create({
          collection: 'customers',
          data: {
            name: orderData.customer.fullName,
            email: orderData.customer.email,
            primaryPhone: orderData.customer.phone, // ✅ Correct field name
            secondaryPhone: orderData.customer.secondaryPhone,
            addresses: orderData.customer.address
              ? [
                  // ✅ Correct structure (array)
                  {
                    type: 'home',
                    address: `${orderData.customer.address.street}, ${orderData.customer.address.city}, ${orderData.customer.address.postalCode}, ${orderData.customer.address.province}`,
                    isDefault: true,
                  },
                ]
              : [],
            preferences: {
              // ✅ Correct nested structure
              communicationMethod: 'whatsapp',
              marketingOptIn: orderData.customer.marketingOptIn || false,
            },
            whatsapp: {
              isVerified: false,
            },
            status: 'active',
            customerType: 'regular',
          },
        })
      }
    } catch (customerError) {
      console.error('Error creating/updating customer:', customerError)
      return NextResponse.json(
        { success: false, error: 'Failed to create customer' },
        { status: 500 },
      )
    }

    // Create order
    try {
      const order = await payload.create({
        collection: 'orders',
        data: {
          // Basic order info
          customerName: orderData.customer.fullName,
          customerEmail: orderData.customer.email,
          customerPhone: orderData.customer.phone,
          customerSecondaryPhone: orderData.customer.secondaryPhone,
          deliveryAddress: `${orderData.customer.address.street}, ${orderData.customer.address.city}, ${orderData.customer.address.postalCode}, ${orderData.customer.address.province}`,
          specialInstructions: orderData.specialInstructions,

          // Order items array
          orderItems: orderData.items.map((item) => ({
            productId: item.product.id || 'unknown',
            productName: item.product.title || item.product.name || 'Unknown Product',
            productSku: item.product.sku || 'unknown',
            unitPrice: item.variant?.price || item.price || 0,
            quantity: item.quantity,
            selectedSize: item.variant?.size || item.size,
            selectedColor: item.variant?.color || item.color,
            subtotal: (item.variant?.price || item.price || 0) * item.quantity,
          })),

          // Pricing totals
          orderSubtotal: orderData.pricing.subtotal,
          shippingCost: orderData.pricing.shipping || 0,
          discount: 0,
          orderTotal: orderData.pricing.total,

          // Status fields
          orderStatus: 'pending',
          paymentStatus: 'pending',
          paymentMethod: 'cod', // Default to cash on delivery

          // Source
          orderSource: orderData.orderSource || 'website',

          // WhatsApp integration
          whatsapp: {
            messageSent: false,
            messageTemplate: 'order-confirmation',
          },
        },
      })

      // Return success response
      return NextResponse.json({
        success: true,
        data: {
          orderNumber: order.orderNumber, // ✅ Use orderNumber field
          id: order.id,
          status: order.orderStatus, // ✅ Use orderStatus field
          total: order.orderTotal, // ✅ Use orderTotal field
          currency: 'LKR', // ✅ Use hardcoded currency or store it separately
          createdAt: order.createdAt,
        },
      })
    } catch (orderError) {
      console.error('Error creating order:', orderError)
      return NextResponse.json({ success: false, error: 'Failed to create order' }, { status: 500 })
    }
  } catch (error) {
    console.error('Orders API error:', error)
    return NextResponse.json({ success: false, error: 'Invalid request data' }, { status: 400 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('orderId')
    const email = searchParams.get('email')
    const phone = searchParams.get('phone')

    if (!orderId) {
      return NextResponse.json({ success: false, error: 'Order ID is required' }, { status: 400 })
    }

    const payload = await getPayload({ config })

    // Build where conditions
    const whereConditions: any = {
      orderId: {
        equals: orderId,
      },
    }

    // Add email or phone verification if provided
    if (email || phone) {
      whereConditions.and = []
      if (email) {
        whereConditions.and.push({
          'customerInfo.email': {
            equals: email,
          },
        })
      }
      if (phone) {
        whereConditions.and.push({
          'customerInfo.phone': {
            equals: phone,
          },
        })
      }
    }

    const result = await payload.find({
      collection: 'orders',
      where: whereConditions,
      limit: 1,
      depth: 2,
    })

    if (result.docs.length === 0) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 })
    }

    const order = result.docs[0]
    return NextResponse.json({
      success: true,
      data: order,
    })
  } catch (error) {
    console.error('Get order error:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch order' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const payload = await getPayload({ config })

    let updateData: any = {}

    // Check content type to handle different data formats
    const contentType = request.headers.get('content-type')

    if (contentType?.includes('application/json')) {
      // Handle JSON data
      try {
        updateData = await request.json()
      } catch (jsonError) {
        console.error('JSON parse error:', jsonError)
        return NextResponse.json({ success: false, error: 'Invalid JSON format' }, { status: 400 })
      }
    } else if (contentType?.includes('multipart/form-data')) {
      // Handle form data (which PayloadCMS often uses)
      try {
        const formData = await request.formData()
        updateData = {}

        for (const [key, value] of formData.entries()) {
          // Handle nested objects (like orderStatus, paymentStatus)
          if (typeof value === 'string') {
            try {
              // Try to parse as JSON if it looks like JSON
              if (value.startsWith('{') || value.startsWith('[')) {
                updateData[key] = JSON.parse(value)
              } else {
                updateData[key] = value
              }
            } catch {
              updateData[key] = value
            }
          } else {
            updateData[key] = value
          }
        }
      } catch (formError) {
        console.error('Form data parse error:', formError)
        return NextResponse.json({ success: false, error: 'Invalid form data' }, { status: 400 })
      }
    } else {
      // Handle raw text or other formats
      try {
        const text = await request.text()
        console.log('Raw request body:', text)

        if (text.trim()) {
          updateData = JSON.parse(text)
        } else {
          updateData = {}
        }
      } catch (textError) {
        console.error('Text parse error:', textError)
        return NextResponse.json(
          { success: false, error: 'Unable to parse request body' },
          { status: 400 },
        )
      }
    }

    console.log('Update data received:', updateData)
    console.log('Content-Type:', contentType)

    // Update the order
    const updatedOrder = await payload.update({
      collection: 'orders',
      id: parseInt(id),
      data: updateData,
    })

    return NextResponse.json({
      success: true,
      data: updatedOrder,
    })
  } catch (error) {
    console.error('Order update error:', error)
    return NextResponse.json({ success: false, error: 'Failed to update order' }, { status: 500 })
  }
}
