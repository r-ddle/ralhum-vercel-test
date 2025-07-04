import { NextRequest, NextResponse } from 'next/server'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config'

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayloadHMR({ config: configPromise })
    const { searchParams } = new URL(request.url)

    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const category = searchParams.get('category')
    const brand = searchParams.get('brand')
    const search = searchParams.get('search')
    const sort = searchParams.get('sort') || 'createdAt'
    const order = searchParams.get('order') || 'desc'
    const status = searchParams.get('status') || 'active'

    // Build where conditions
    const where: any = {
      status: { equals: status },
    }

    if (category) {
      where.category = { equals: category }
    }

    if (brand) {
      where.brand = { equals: brand }
    }

    if (search) {
      where.or = [
        { name: { contains: search } },
        { description: { contains: search } },
        { tags: { contains: search } },
      ]
    }

    const products = await payload.find({
      collection: 'products',
      where,
      limit,
      page,
      sort: `${order === 'desc' ? '-' : ''}${sort}`,
      populate: ['category', 'brand', 'images.image'],
    })

    // Transform data for frontend
    const transformedProducts = products.docs.map((product) => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      originalPrice: product.pricing?.originalPrice,
      sku: product.sku,
      stock: product.stock,
      status: product.status,
      sizes: product.sizes ? product.sizes.split(',').map((s) => s.trim()) : [],
      colors: product.colors ? product.colors.split(',').map((c) => c.trim()) : [],
      images:
        product.images?.map((img) => ({
          id: img.id,
          url: typeof img.image === 'object' ? img.image.url : '',
          alt: img.altText || typeof img.image === 'object' ? img.image.alt : '',
          filename: typeof img.image === 'object' ? img.image.filename : '',
        })) || [],
      category:
        typeof product.category === 'object'
          ? {
              id: product.category.id,
              name: product.category.name,
              slug: product.category.slug,
            }
          : null,
      brand:
        typeof product.brand === 'object'
          ? {
              id: product.brand.id,
              name: product.brand.name,
              slug: product.brand.slug,
              logo: typeof product.brand.logo === 'object' ? product.brand.logo.url : '',
            }
          : null,
      description: product.description,
      features: product.features?.map((f) => f.feature) || [],
      specifications: product.specifications,
      shipping: product.shipping,
      seo: product.seo,
      rating: product.analytics?.rating,
      reviewCount: product.analytics?.reviewCount,
      tags: product.tags ? product.tags.split(',').map((t) => t.trim()) : [],
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }))

    return NextResponse.json({
      success: true,
      data: transformedProducts,
      pagination: {
        page: products.page,
        limit: products.limit,
        totalPages: products.totalPages,
        totalDocs: products.totalDocs,
        hasNextPage: products.hasNextPage,
        hasPrevPage: products.hasPrevPage,
      },
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch products' }, { status: 500 })
  }
}
