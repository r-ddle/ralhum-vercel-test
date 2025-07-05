import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(request: NextRequest) {
  try {
    const { sku } = await request.json()

    if (!sku) {
      return NextResponse.json({ success: false, error: 'SKU is required' }, { status: 400 })
    }

    const payload = await getPayload({ config })

    // Search for product by SKU
    const result = await payload.find({
      collection: 'products',
      where: {
        sku: {
          equals: sku.trim().toUpperCase(),
        },
        status: {
          equals: 'active',
        },
      },
      limit: 1,
    })

    if (result.docs.length > 0) {
      const product = result.docs[0]

      return NextResponse.json({
        success: true,
        verified: true,
        product: {
          id: product.id,
          name: product.name,
          sku: product.sku,
          price: product.price,
          stock: product.stock,
          brand: typeof product.brand === 'object' ? product.brand.name : null,
          category: typeof product.category === 'object' ? product.category.name : null,
          images: product.images?.slice(0, 1) || [], // Just first image
        },
      })
    } else {
      return NextResponse.json({
        success: true,
        verified: false,
        message: 'Product not found or inactive',
      })
    }
  } catch (error) {
    console.error('SKU verification error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const sku = searchParams.get('sku')

  if (!sku) {
    return NextResponse.json(
      { success: false, error: 'SKU parameter is required' },
      { status: 400 },
    )
  }

  try {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'products',
      where: {
        sku: {
          equals: sku.trim().toUpperCase(),
        },
        status: {
          equals: 'active',
        },
      },
      limit: 1,
    })

    if (result.docs.length > 0) {
      const product = result.docs[0]

      return NextResponse.json({
        success: true,
        verified: true,
        product: {
          id: product.id,
          name: product.name,
          sku: product.sku,
          price: product.price,
          stock: product.stock,
          brand: typeof product.brand === 'object' ? product.brand.name : null,
          category: typeof product.category === 'object' ? product.category.name : null,
        },
      })
    } else {
      return NextResponse.json({
        success: true,
        verified: false,
        message: 'Product not found or inactive',
      })
    }
  } catch (error) {
    console.error('SKU verification error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
