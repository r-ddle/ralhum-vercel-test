import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrContentEditor } from './Users'

export const News: CollectionConfig = {
  slug: 'news',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'publishDate', 'status'],
    group: 'Content',
    description: 'Manage news articles and blog posts',
    listSearchableFields: ['title', 'excerpt', 'content'],
  },
  access: {
    // Content editors and above can create news
    create: isAdminOrContentEditor,
    // All authenticated users can read news
    read: ({ req }) => Boolean(req.user),
    // Content editors and above can update news
    update: isAdminOrContentEditor,
    // Only admins can delete news
    delete: isAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'News article or blog post title',
        placeholder: 'Enter compelling title for your article',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly version of the title',
        placeholder: 'auto-generated from title',
        readOnly: true,
      },
      hooks: {
        beforeValidate: [
          ({ data, operation }) => {
            if (operation === 'create' || operation === 'update') {
              if (data?.title) {
                // Generate slug from title
                return data.title
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
      name: 'content',
      type: 'richText',
      required: true,
      admin: {
        description: 'Main content of the article with rich formatting',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: {
        description: 'Brief summary or excerpt for article previews',
        placeholder: 'Enter a compelling summary (150-200 characters recommended)',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Main image for the article (recommended: 1200x630px)',
      },
      filterOptions: {
        category: {
          equals: 'news',
        },
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        description: 'Article author',
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
      name: 'publishDate',
      type: 'date',
      required: true,
      defaultValue: () => new Date(),
      admin: {
        description: 'When the article should be published',
        date: {
          displayFormat: 'dd/MM/yyyy HH:mm',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        {
          label: 'Published',
          value: 'published',
        },
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Scheduled',
          value: 'scheduled',
        },
        {
          label: 'Archived',
          value: 'archived',
        },
      ],
      admin: {
        description: 'Publication status of the article',
      },
    },

    // Article Categories and Tags
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        {
          label: 'News',
          value: 'news',
        },
        {
          label: 'Sports Updates',
          value: 'sports-updates',
        },
        {
          label: 'Product Reviews',
          value: 'product-reviews',
        },
        {
          label: 'Training Tips',
          value: 'training-tips',
        },
        {
          label: 'Events',
          value: 'events',
        },
        {
          label: 'Company News',
          value: 'company-news',
        },
        {
          label: 'Industry Insights',
          value: 'industry-insights',
        },
      ],
      admin: {
        description: 'Article category for organization',
      },
    },
    {
      name: 'tags',
      type: 'text',
      admin: {
        description: 'Article tags for search and filtering (comma separated)',
        placeholder: 'sports, equipment, training, fitness, etc.',
      },
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
            description: 'SEO title for the article page',
            placeholder: 'Article Title | Ralhum Sports Blog',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'SEO meta description for the article',
            placeholder: 'Read about article topic on Ralhum Sports blog...',
          },
        },
        {
          name: 'keywords',
          type: 'text',
          admin: {
            description: 'SEO keywords separated by commas',
            placeholder: 'sports, equipment, training, Sri Lanka',
          },
        },
      ],
    },

    // Article Settings
    {
      name: 'settings',
      type: 'group',
      label: 'Article Settings',
      fields: [
        {
          name: 'isFeatured',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Feature this article on homepage',
          },
        },
        {
          name: 'allowComments',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Allow comments on this article',
          },
        },
        {
          name: 'isSticky',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Pin this article to the top of listings',
          },
        },
        {
          name: 'readingTime',
          type: 'number',
          admin: {
            description: 'Estimated reading time in minutes (auto-calculated if empty)',
            step: 1,
          },
        },
      ],
    },

    // Social Media
    {
      name: 'social',
      type: 'group',
      label: 'Social Media',
      fields: [
        {
          name: 'shareTitle',
          type: 'text',
          admin: {
            description: 'Custom title for social media sharing',
            placeholder: 'Defaults to article title if empty',
          },
        },
        {
          name: 'shareDescription',
          type: 'textarea',
          admin: {
            description: 'Custom description for social media sharing',
            placeholder: 'Defaults to excerpt if empty',
          },
        },
        {
          name: 'shareImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Custom image for social media sharing (1200x630px recommended)',
          },
          filterOptions: {
            category: {
              equals: 'news',
            },
          },
        },
      ],
    },

    // Article Analytics
    {
      name: 'analytics',
      type: 'group',
      label: 'Analytics',
      fields: [
        {
          name: 'viewCount',
          type: 'number',
          defaultValue: 0,
          admin: {
            readOnly: true,
            description: 'Number of article views',
          },
        },
        {
          name: 'shareCount',
          type: 'number',
          defaultValue: 0,
          admin: {
            readOnly: true,
            description: 'Number of social media shares',
          },
        },
        {
          name: 'commentCount',
          type: 'number',
          defaultValue: 0,
          admin: {
            readOnly: true,
            description: 'Number of comments',
          },
        },
      ],
    },

    // Related Content
    {
      name: 'relatedArticles',
      type: 'text',
      admin: {
        description: 'Related article IDs (comma separated)',
        placeholder: 'Enter related article IDs',
      },
    },

    // Auto-generated fields
    {
      name: 'lastModifiedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        readOnly: true,
        description: 'User who last modified this article',
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
        // Set author on creation
        if (operation === 'create' && !data.author && req.user) {
          data.author = req.user.id
        }

        // Set last modified by
        if (operation === 'update') {
          data.lastModifiedBy = req.user?.id
        }

        // Auto-calculate reading time if not provided
        if (data.content && !data.settings?.readingTime) {
          // Simple calculation: ~200 words per minute
          const textContent =
            typeof data.content === 'string' ? data.content : JSON.stringify(data.content)
          const wordCount = textContent.split(/\s+/).length
          const readingTime = Math.ceil(wordCount / 200)

          if (!data.settings) data.settings = {}
          data.settings.readingTime = readingTime
        }

        // Auto-set publish date for scheduled articles
        if (data.status === 'scheduled' && !data.publishDate) {
          data.publishDate = new Date()
        }

        return data
      },
    ],
    afterChange: [
      async ({ req, operation, doc }) => {
        // Log article operations
        if (operation === 'create') {
          req.payload.logger.info(`Article created: ${doc.title} by ${req.user?.email}`)
        } else if (operation === 'update') {
          req.payload.logger.info(`Article updated: ${doc.title} by ${req.user?.email}`)
        }

        // Log publishing events
        if (doc.status === 'published') {
          req.payload.logger.info(`Article published: ${doc.title}`)
        }
      },
    ],
    afterDelete: [
      async ({ req, doc }) => {
        // Log article deletion
        req.payload.logger.warn(`Article deleted: ${doc.title} by ${req.user?.email}`)
      },
    ],
  },
}
