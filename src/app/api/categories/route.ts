import { NextRequest, NextResponse } from 'next/server'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config'

export async function GET() {
  try {
    const payload = await getPayloadHMR({ config: configPromise })

    const categories = await payload.find({
      collection: 'categories',
      where: {
        status: { equals: 'active' },
      },
      sort: 'displayOrder',
      populate: ['image'],
    })

    const transformedCategories = categories.docs.map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      image:
        typeof category.image === 'object'
          ? {
              url: category.image?.url || '',
              alt: category.image?.alt || '',
            }
          : null,
      icon: category.icon,
      displayOrder: category.displayOrder,
      productCount: category.productCount,
      isFeature: category.isFeature,
      showInNavigation: category.showInNavigation,
    }))

    return NextResponse.json({
      success: true,
      data: transformedCategories,
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 },
    )
  }
}
