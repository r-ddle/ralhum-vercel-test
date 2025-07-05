import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { withRateLimit, rateLimitConfigs } from '@/lib/rate-limit'
import { getSecurityHeaders } from '@/lib/response-filter'

export const GET = withRateLimit(
  rateLimitConfigs.search, // Special rate limiting for search
  async (request: NextRequest) => {
    try {
      const payload = await getPayload({ config }) // ✅ Fixed: Use getPayload instead of getPayloadHMR
      const { searchParams } = new URL(request.url)

      const query = searchParams.get('query') || ''
      const type = searchParams.get('type') || 'all'
      const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 50) // Max 50 results

      // Validate search query
      if (!query.trim()) {
        return NextResponse.json(
          { success: false, error: 'Search query is required' },
          { status: 400, headers: getSecurityHeaders() },
        )
      }

      // Minimum search length to prevent abuse
      if (query.trim().length < 2) {
        return NextResponse.json(
          { success: false, error: 'Search query must be at least 2 characters' },
          { status: 400, headers: getSecurityHeaders() },
        )
      }

      // Sanitize search query (remove special characters that could cause issues)
      const sanitizedQuery = query.trim().replace(/[<>\"']/g, '')

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
                  { name: { contains: sanitizedQuery } },
                  { tags: { contains: sanitizedQuery } },
                  { sku: { contains: sanitizedQuery } },
                ],
              },
            ],
          },
          limit: type === 'products' ? limit : Math.min(limit, 20),
          depth: 2, // ✅ Fixed: Use depth instead of populate
        })

        // Filter and sanitize product results (remove sensitive fields)
        results.products = productsResponse.docs.map((product) => ({
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          originalPrice: product.pricing?.originalPrice,
          sku: product.sku,
          stock: product.stock > 0 ? 'In Stock' : 'Out of Stock', // Don't expose exact stock numbers
          status: product.status,
          sizes: product.sizes ? product.sizes.split(',').map((s) => s.trim()) : [],
          colors: product.colors ? product.colors.split(',').map((c) => c.trim()) : [],
          images:
            product.images?.slice(0, 2).map((img) => ({
              // Limit to 2 images
              id: img.id,
              url: typeof img.image === 'object' ? img.image.url : '',
              alt: img.altText || typeof img.image === 'object' ? img.image.alt : '',
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
          features: product.features?.slice(0, 3).map((f) => f.feature) || [], // Limit features
          tags: product.tags
            ? product.tags
                .split(',')
                .map((t) => t.trim())
                .slice(0, 5)
            : [], // Limit tags
        }))

        results.totalResults += productsResponse.totalDocs
      }

      if (type === 'all' || type === 'categories') {
        const categoriesResponse = await payload.find({
          collection: 'categories',
          where: {
            and: [
              { status: { equals: 'active' } },
              { showInNavigation: { equals: true } }, // Only show navigable categories
              {
                or: [
                  { name: { contains: sanitizedQuery } },
                  { description: { contains: sanitizedQuery } },
                ],
              },
            ],
          },
          limit: type === 'categories' ? limit : Math.min(limit, 10),
          depth: 1, // ✅ Fixed: Use depth instead of populate
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
                or: [
                  { name: { contains: sanitizedQuery } },
                  { description: { contains: sanitizedQuery } },
                ],
              },
            ],
          },
          limit: type === 'brands' ? limit : Math.min(limit, 10),
          depth: 1, // ✅ Fixed: Use depth instead of populate
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
        }))

        results.totalResults += brandsResponse.totalDocs
      }

      return NextResponse.json({ success: true, data: results }, { headers: getSecurityHeaders() })
    } catch (error) {
      console.error('Search error:', error)
      return NextResponse.json(
        { success: false, error: 'Search failed' },
        { status: 500, headers: getSecurityHeaders() },
      )
    }
  },
)
