import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config' // ✅ Fixed: Consistent import pattern
import { withRateLimit, rateLimitConfigs } from '@/lib/rate-limit'
import { getSecurityHeaders } from '@/lib/response-filter'

export const POST = withRateLimit(
  rateLimitConfigs.strict, // ✅ Added rate limiting
  async (request: NextRequest) => {
    try {
      const payload = await getPayload({ config }) // ✅ Fixed: Use config directly
      const data = await request.json()

      const {
        name,
        email,
        phone,
        secondaryPhone,
        address,
        preferredLanguage = 'english',
        marketingOptIn = true,
      } = data

      // Check if customer already exists
      const existingCustomers = await payload.find({
        collection: 'customers',
        where: {
          email: { equals: email },
        },
      })

      let customer

      if (existingCustomers.docs.length > 0) {
        // Update existing customer
        customer = existingCustomers.docs[0]

        // Update customer with new info if provided
        const updateData: any = {}

        if (name && name !== customer.name) updateData.name = name
        if (phone && phone !== customer.primaryPhone) updateData.primaryPhone = phone // ✅ Use primaryPhone
        if (secondaryPhone && secondaryPhone !== customer.secondaryPhone)
          updateData.secondaryPhone = secondaryPhone

        // Add new address if provided and not already exists
        if (address) {
          const addresses = customer.addresses || []
          const addressExists = addresses.some(
            (addr: any) =>
              addr.address ===
              `${address.street}, ${address.city}, ${address.postalCode}, ${address.province}`, // ✅ Match the full address format
          )

          if (!addressExists) {
            addresses.push({
              type: 'home',
              address: `${address.street}, ${address.city}, ${address.postalCode}, ${address.province}`,
              isDefault: addresses.length === 0,
            })
            updateData.addresses = addresses
          }
        }

        if (Object.keys(updateData).length > 0) {
          customer = await payload.update({
            collection: 'customers',
            id: customer.id,
            data: updateData,
          })
        }
      } else {
        // Create new customer
        customer = await payload.create({
          collection: 'customers',
          data: {
            name,
            email,
            primaryPhone: phone,
            secondaryPhone,
            addresses: address
              ? [
                  {
                    type: 'home',
                    address: `${address.street}, ${address.city}, ${address.postalCode}, ${address.province}`,
                    isDefault: true,
                  },
                ]
              : [],
            preferences: {
              communicationMethod: 'whatsapp',
              language: preferredLanguage,
              marketingOptIn,
            },
            whatsapp: {
              isVerified: false,
            },
            status: 'active',
            customerType: 'regular',
          },
        })
      }

      return NextResponse.json(
        {
          success: true,
          data: {
            id: customer.id,
            name: customer.name,
            email: customer.email,
            phone: customer.primaryPhone,
            addresses: customer.addresses,
          },
        },
        { headers: getSecurityHeaders() },
      )
    } catch (error) {
      console.error('Error creating/updating customer:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to create/update customer' },
        { status: 500, headers: getSecurityHeaders() },
      )
    }
  },
)
