import { NextRequest, NextResponse } from 'next/server'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config'

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const payload = await getPayloadHMR({ config: configPromise })
    const { slug } = params

    const products = await payload.find({
      collection: 'products',
      where: {
        slug: { equals: slug },
        status: { equals: 'active' },
      },
      limit: 1,
      populate: ['category', 'brand', 'images.image'],
    })

    if (products.docs.length === 0) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 })
    }

    const product = products.docs[0]

    // Transform data for frontend
    const transformedProduct = {
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
              description: product.category.description,
            }
          : null,
      brand:
        typeof product.brand === 'object'
          ? {
              id: product.brand.id,
              name: product.brand.name,
              slug: product.brand.slug,
              logo: typeof product.brand.logo === 'object' ? product.brand.logo.url : '',
              description: product.brand.description,
              website: product.brand.website,
            }
          : null,
      description: product.description,
      features: product.features?.map((f) => f.feature) || [],
      specifications: product.specifications,
      shipping: product.shipping,
      seo: product.seo,
      rating: product.analytics?.rating,
      reviewCount: product.analytics?.reviewCount,
      viewCount: product.analytics?.viewCount,
      tags: product.tags ? product.tags.split(',').map((t) => t.trim()) : [],
      relatedProducts: product.relatedProducts
        ? product.relatedProducts.split(',').map((p) => p.trim())
        : [],
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }

    // Update view count
    await payload.update({
      collection: 'products',
      id: product.id,
      data: {
        analytics: {
          ...product.analytics,
          viewCount: (product.analytics?.viewCount || 0) + 1,
        },
      },
    })

    return NextResponse.json({
      success: true,
      data: transformedProduct,
    })
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch product' }, { status: 500 })
  }
}
