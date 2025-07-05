import { NextRequest, NextResponse } from 'next/server'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config'

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayloadHMR({ config: configPromise })
    const { searchParams } = new URL(request.url)

    const query = searchParams.get('query') || ''
    const type = searchParams.get('type') || 'all'
    const limit = parseInt(searchParams.get('limit') || '10')

    if (!query.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Search query is required',
        },
        { status: 400 },
      )
    }

    const results = {
      products: [],
      categories: [],
      brands: [],
      totalResults: 0,
    }

    if (type === 'all' || type === 'products') {
      const productsResponse = await payload.find({
        collection: 'products',
        where: {
          and: [
            { status: { equals: 'active' } },
            {
              or: [
                { name: { contains: query } },
                { description: { contains: query } },
                { tags: { contains: query } },
                { sku: { contains: query } },
              ],
            },
          ],
        },
        limit: type === 'products' ? limit : Math.min(limit, 5),
        populate: ['category', 'brand', 'images.image'],
      })

      results.products = productsResponse.docs.map((product) => ({
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
              }
            : null,
        features: product.features?.map((f) => f.feature) || [],
        tags: product.tags ? product.tags.split(',').map((t) => t.trim()) : [],
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      }))

      results.totalResults += productsResponse.totalDocs
    }

    if (type === 'all' || type === 'categories') {
      const categoriesResponse = await payload.find({
        collection: 'categories',
        where: {
          and: [
            { status: { equals: 'active' } },
            {
              or: [{ name: { contains: query } }, { description: { contains: query } }],
            },
          ],
        },
        limit: type === 'categories' ? limit : Math.min(limit, 3),
        populate: ['image'],
      })

      results.categories = categoriesResponse.docs.map((category) => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        image:
          typeof category.image === 'object'
            ? {
                url: category.image.url,
                alt: category.image.alt,
              }
            : null,
        productCount: category.productCount,
        isFeature: category.isFeature,
        showInNavigation: category.showInNavigation,
      }))

      results.totalResults += categoriesResponse.totalDocs
    }

    if (type === 'all' || type === 'brands') {
      const brandsResponse = await payload.find({
        collection: 'brands',
        where: {
          and: [
            { status: { equals: 'active' } },
            {
              or: [{ name: { contains: query } }, { description: { contains: query } }],
            },
          ],
        },
        limit: type === 'brands' ? limit : Math.min(limit, 3),
        populate: ['logo'],
      })

      results.brands = brandsResponse.docs.map((brand) => ({
        id: brand.id,
        name: brand.name,
        slug: brand.slug,
        description: brand.description,
        logo:
          typeof brand.logo === 'object'
            ? {
                url: brand.logo.url,
                alt: brand.logo.alt,
              }
            : null,
        productCount: brand.productCount,
        isFeatured: brand.isFeatured,
        isPremium: brand.isPremium,
      }))

      results.totalResults += brandsResponse.totalDocs
    }

    return NextResponse.json({
      success: true,
      data: results,
    })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({ success: false, error: 'Search failed' }, { status: 500 })
  }
}
