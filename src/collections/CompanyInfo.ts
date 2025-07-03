import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrContentEditor } from './Users'

export const CompanyInfo: CollectionConfig = {
  slug: 'company-info',
  admin: {
    useAsTitle: 'sectionName',
    defaultColumns: ['sectionName', 'isPublished', 'displayOrder', 'updatedAt'],
    group: 'Content',
    description: 'Manage company information sections (About Us, Contact, Terms, etc.)',
  },
  access: {
    // Content editors and above can create company info
    create: isAdminOrContentEditor,
    // All authenticated users can read company info
    read: ({ req }) => Boolean(req.user),
    // Content editors and above can update company info
    update: isAdminOrContentEditor,
    // Only admins can delete company info
    delete: isAdmin,
  },
  fields: [
    {
      name: 'sectionName',
      type: 'text',
      required: true,
      admin: {
        description: 'Name of the company information section',
        placeholder: 'About Us, Contact Information, Terms & Conditions, etc.',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly version of the section name',
        placeholder: 'auto-generated from section name',
        readOnly: true,
      },
      hooks: {
        beforeValidate: [
          ({ data, operation }) => {
            if (operation === 'create' || operation === 'update') {
              if (data?.sectionName) {
                // Generate slug from section name
                return data.sectionName
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, '-')
                  .replace(/(^-|-$)/g, '')
              }
            }
          },
        ],
      },
    },
    {
      name: 'sectionContent',
      type: 'richText',
      required: true,
      admin: {
        description: 'Main content for this section with rich formatting',
      },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      admin: {
        description: 'Brief description or summary of this section',
        placeholder: 'Short summary for navigation or previews',
      },
    },

    // Section Images
    {
      name: 'sectionImages',
      type: 'array',
      admin: {
        description: 'Images related to this section',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          filterOptions: {
            category: {
              equals: 'company',
            },
          },
        },
        {
          name: 'caption',
          type: 'text',
          admin: {
            description: 'Image caption or description',
            placeholder: 'Describe this image',
          },
        },
        {
          name: 'altText',
          type: 'text',
          admin: {
            description: 'Alternative text for accessibility',
            placeholder: 'Alt text for screen readers',
          },
        },
      ],
    },

    // Section Configuration
    {
      name: 'sectionType',
      type: 'select',
      required: true,
      defaultValue: 'general',
      options: [
        {
          label: 'About Us',
          value: 'about',
        },
        {
          label: 'Contact Information',
          value: 'contact',
        },
        {
          label: 'Terms & Conditions',
          value: 'terms',
        },
        {
          label: 'Privacy Policy',
          value: 'privacy',
        },
        {
          label: 'Shipping Policy',
          value: 'shipping',
        },
        {
          label: 'Return Policy',
          value: 'returns',
        },
        {
          label: 'FAQ',
          value: 'faq',
        },
        {
          label: 'Our Story',
          value: 'story',
        },
        {
          label: 'Mission & Vision',
          value: 'mission',
        },
        {
          label: 'Team',
          value: 'team',
        },
        {
          label: 'Careers',
          value: 'careers',
        },
        {
          label: 'General Information',
          value: 'general',
        },
      ],
      admin: {
        description: 'Type of company information section',
      },
    },
    {
      name: 'displayOrder',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        description: 'Order for displaying sections (lower numbers appear first)',
        step: 1,
      },
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      required: true,
      defaultValue: true,
      admin: {
        description: 'Make this section visible on the website',
      },
    },
    {
      name: 'showInFooter',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Display link to this section in website footer',
      },
    },
    {
      name: 'showInNavigation',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Display link to this section in main navigation',
      },
    },

    // Contact Specific Fields (for contact sections)
    {
      name: 'contactDetails',
      type: 'group',
      label: 'Contact Details',
      admin: {
        condition: (_, { sectionType }) => sectionType === 'contact',
      },
      fields: [
        {
          name: 'phone',
          type: 'text',
          admin: {
            description: 'Primary phone number',
            placeholder: '+94 XX XXX XXXX',
          },
        },
        {
          name: 'whatsapp',
          type: 'text',
          admin: {
            description: 'WhatsApp number',
            placeholder: '+94 XX XXX XXXX',
          },
        },
        {
          name: 'email',
          type: 'email',
          admin: {
            description: 'Primary email address',
            placeholder: 'info@ralhumsports.com',
          },
        },
        {
          name: 'address',
          type: 'textarea',
          admin: {
            description: 'Physical address',
            placeholder: 'Street, City, Postal Code',
          },
        },
        {
          name: 'businessHours',
          type: 'textarea',
          admin: {
            description: 'Business operating hours',
            placeholder: 'Monday - Friday: 9:00 AM - 6:00 PM',
          },
        },
        {
          name: 'mapEmbedCode',
          type: 'textarea',
          admin: {
            description: 'Google Maps embed code for location',
            placeholder: '<iframe src="https://www.google.com/maps/embed?..."',
          },
        },
      ],
    },

    // Social Media Links (for about/contact sections)
    {
      name: 'socialMedia',
      type: 'group',
      label: 'Social Media Links',
      admin: {
        condition: (_, { sectionType }) => ['about', 'contact', 'story'].includes(sectionType),
      },
      fields: [
        {
          name: 'facebook',
          type: 'text',
          admin: {
            description: 'Facebook page URL',
            placeholder: 'https://facebook.com/ralhumsports',
          },
        },
        {
          name: 'instagram',
          type: 'text',
          admin: {
            description: 'Instagram profile URL',
            placeholder: 'https://instagram.com/ralhumsports',
          },
        },
        {
          name: 'twitter',
          type: 'text',
          admin: {
            description: 'Twitter profile URL',
            placeholder: 'https://twitter.com/ralhumsports',
          },
        },
        {
          name: 'youtube',
          type: 'text',
          admin: {
            description: 'YouTube channel URL',
            placeholder: 'https://youtube.com/ralhumsports',
          },
        },
        {
          name: 'linkedin',
          type: 'text',
          admin: {
            description: 'LinkedIn company page URL',
            placeholder: 'https://linkedin.com/company/ralhumsports',
          },
        },
      ],
    },

    // FAQ Specific Fields
    {
      name: 'faqItems',
      type: 'array',
      admin: {
        description: 'Frequently asked questions',
        condition: (_, { sectionType }) => sectionType === 'faq',
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
          admin: {
            description: 'FAQ question',
            placeholder: 'What is your return policy?',
          },
        },
        {
          name: 'answer',
          type: 'richText',
          required: true,
          admin: {
            description: 'FAQ answer with rich formatting',
          },
        },
        {
          name: 'category',
          type: 'select',
          options: [
            { label: 'General', value: 'general' },
            { label: 'Shipping', value: 'shipping' },
            { label: 'Returns', value: 'returns' },
            { label: 'Payment', value: 'payment' },
            { label: 'Products', value: 'products' },
            { label: 'Orders', value: 'orders' },
          ],
          admin: {
            description: 'FAQ category',
          },
        },
        {
          name: 'displayOrder',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'Order within FAQ list',
            step: 1,
          },
        },
      ],
    },

    // Team Member Fields (for team sections)
    {
      name: 'teamMembers',
      type: 'array',
      admin: {
        description: 'Team member information',
        condition: (_, { sectionType }) => sectionType === 'team',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            description: 'Team member name',
            placeholder: 'John Doe',
          },
        },
        {
          name: 'position',
          type: 'text',
          admin: {
            description: 'Job title or position',
            placeholder: 'Sales Manager, Product Specialist, etc.',
          },
        },
        {
          name: 'bio',
          type: 'textarea',
          admin: {
            description: 'Brief biography or description',
            placeholder: 'Brief description of the team member',
          },
        },
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Team member photo',
          },
          filterOptions: {
            category: {
              equals: 'company',
            },
          },
        },
        {
          name: 'email',
          type: 'email',
          admin: {
            description: 'Contact email (optional)',
            placeholder: 'john@ralhumsports.com',
          },
        },
        {
          name: 'displayOrder',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'Order in team listing',
            step: 1,
          },
        },
      ],
    },

    // SEO Fields
    {
      name: 'seo',
      type: 'group',
      label: 'SEO Settings',
      fields: [
        {
          name: 'title',
          type: 'text',
          admin: {
            description: 'SEO title for this section page',
            placeholder: 'Section Name | Ralhum Sports',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'SEO meta description',
            placeholder: 'Learn more about section topic at Ralhum Sports...',
          },
        },
        {
          name: 'keywords',
          type: 'text',
          admin: {
            description: 'SEO keywords separated by commas',
            placeholder: 'about us, sports equipment, Sri Lanka',
          },
        },
      ],
    },

    // Auto-generated fields
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        readOnly: true,
        description: 'User who created this section',
      },
      hooks: {
        beforeChange: [
          ({ req, operation }) => {
            if (operation === 'create' && req.user) {
              return req.user.id
            }
          },
        ],
      },
    },
    {
      name: 'lastModifiedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        readOnly: true,
        description: 'User who last modified this section',
      },
      hooks: {
        beforeChange: [
          ({ req, operation }) => {
            if (operation === 'update' && req.user) {
              return req.user.id
            }
          },
        ],
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ req, operation, data }) => {
        // Set created/modified by
        if (operation === 'create') {
          data.createdBy = req.user?.id
        }
        if (operation === 'update') {
          data.lastModifiedBy = req.user?.id
        }

        return data
      },
    ],
    afterChange: [
      async ({ req, operation, doc }) => {
        // Log section operations
        if (operation === 'create') {
          req.payload.logger.info(
            `Company section created: ${doc.sectionName} by ${req.user?.email}`,
          )
        } else if (operation === 'update') {
          req.payload.logger.info(
            `Company section updated: ${doc.sectionName} by ${req.user?.email}`,
          )
        }

        // Log publishing changes
        if (doc.isPublished) {
          req.payload.logger.info(`Company section published: ${doc.sectionName}`)
        }
      },
    ],
    afterDelete: [
      async ({ req, doc }) => {
        // Log section deletion
        req.payload.logger.warn(`Company section deleted: ${doc.sectionName} by ${req.user?.email}`)
      },
    ],
  },
}
