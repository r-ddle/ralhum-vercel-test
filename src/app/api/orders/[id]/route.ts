import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config' // ✅ Fixed: Consistent import pattern

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const payload = await getPayload({ config }) // ✅ Fixed: Use config directly

    const order = await payload.findByID({
      collection: 'orders',
      id: parseInt(id),
      depth: 2,
    })

    // ✅ Return the order data directly (not wrapped)
    return NextResponse.json(order)
  } catch (error) {
    console.error('Error fetching order:', error)
    return NextResponse.json(
      {
        errors: [{ message: 'Failed to fetch order' }],
      },
      { status: 500 },
    )
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const payload = await getPayload({ config }) // ✅ Fixed: Use config directly

    let updateData: any = {}

    try {
      const contentType = request.headers.get('content-type')

      if (contentType?.includes('multipart/form-data')) {
        const formData = await request.formData()
        const payloadData = formData.get('_payload')

        if (payloadData && typeof payloadData === 'string') {
          updateData = JSON.parse(payloadData)
        } else {
          return NextResponse.json(
            { success: false, error: 'No payload data found' },
            { status: 400 },
          )
        }
      } else {
        const rawBody = await request.text()
        if (rawBody.trim()) {
          updateData = JSON.parse(rawBody)
        }
      }
    } catch (parseError) {
      console.error('Parse error:', parseError)
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request format',
          details: parseError instanceof Error ? parseError.message : String(parseError),
        },
        { status: 400 },
      )
    }

    const updatedOrder = await payload.update({
      collection: 'orders',
      id: parseInt(id),
      data: updateData,
    })

    // ✅ Return the updated order data directly (not wrapped in success/data)
    // This is what PayloadCMS admin expects
    return NextResponse.json(updatedOrder)
  } catch (error) {
    console.error('Order update error:', error)
    return NextResponse.json(
      {
        errors: [{ message: error instanceof Error ? error.message : 'Failed to update order' }], // ✅ PayloadCMS error format
      },
      { status: 500 },
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const payload = await getPayload({ config }) // ✅ Fixed: Use config directly

    await payload.delete({
      collection: 'orders',
      id: parseInt(id),
    })

    return NextResponse.json({
      success: true,
      message: 'Order deleted successfully',
    })
  } catch (error) {
    console.error('Order deletion error:', error)
    return NextResponse.json({ success: false, error: 'Failed to delete order' }, { status: 500 })
  }
}
