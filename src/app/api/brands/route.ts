import { NextRequest, NextResponse } from 'next/server'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config'

export async function GET() {
  try {
    const payload = await getPayloadHMR({ config: configPromise })

    const brands = await payload.find({
      collection: 'brands',
      where: {
        status: { equals: 'active' },
      },
      sort: 'name',
    })

    const transformedBrands = brands.docs.map((brand) => ({
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
      website: brand.website,
      countryOfOrigin: brand.countryOfOrigin,
      isFeatured: brand.isFeatured,
      isPremium: brand.isPremium,
      priceRange: brand.priceRange,
      productCount: brand.productCount,
    }))

    return NextResponse.json({
      success: true,
      data: transformedBrands,
    })
  } catch (error) {
    console.error('Error fetching brands:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch brands' }, { status: 500 })
  }
}
