import {
  Product,
  Brand,
  Category,
  ProductsResponse,
  ProductFilters,
  ProductSort,
} from '@/types/product'

// Mock brands data
export const brands: Brand[] = [
  {
    id: '1',
    name: 'Gray-Nicolls',
    slug: 'gray-nicolls',
    description: "World's finest cricket equipment manufacturer since 1855",
    logo: '',
    website: 'https://gray-nicolls.com',
    featured: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Gilbert',
    slug: 'gilbert',
    description: 'Official Rugby World Cup supplier since 1823',
    logo: '',
    website: 'https://gilbert.com',
    featured: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'Molten',
    slug: 'molten',
    description: 'Innovation leader in basketball and volleyball equipment',
    logo: '',
    website: 'https://molten.com',
    featured: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '4',
    name: 'Grays',
    slug: 'grays',
    description: 'Field sports excellence trusted by Olympic athletes',
    logo: '',
    website: 'https://grays.com',
    featured: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '5',
    name: 'Dunlop',
    slug: 'dunlop',
    description: 'Premium racquet sports equipment with global recognition',
    logo: '',
    website: 'https://dunlop.com',
    featured: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '6',
    name: 'Slazenger',
    slug: 'slazenger',
    description: 'Official Wimbledon ball supplier with multi-sport heritage',
    logo: '',
    website: 'https://slazenger.com',
    featured: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
]

// Mock categories data
export const categories: Category[] = [
  {
    id: '1',
    name: 'Cricket',
    slug: 'cricket',
    description: 'Professional cricket equipment and accessories',
    image: '',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Rugby',
    slug: 'rugby',
    description: 'Rugby balls, training equipment, and protective gear',
    image: '',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'Basketball',
    slug: 'basketball',
    description: 'Professional basketball equipment and accessories',
    image: '',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '4',
    name: 'Volleyball',
    slug: 'volleyball',
    description: 'Volleyball equipment for indoor and beach play',
    image: '',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '5',
    name: 'Hockey',
    slug: 'hockey',
    description: 'Field hockey sticks and protective equipment',
    image: '',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '6',
    name: 'Tennis',
    slug: 'tennis',
    description: 'Tennis rackets, balls, and court accessories',
    image: '',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '7',
    name: 'Badminton',
    slug: 'badminton',
    description: 'Badminton rackets, shuttlecocks, and court equipment',
    image: '',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
]

// Mock products data
export const products: Product[] = [
  // Cricket Products
  {
    id: '1',
    title: 'Gray-Nicolls Legend English Willow Cricket Bat',
    slug: 'gray-nicolls-legend-cricket-bat',
    description:
      'Professional-grade English willow cricket bat used by international players. Features traditional blade profile with exceptional pick-up and balance.',
    shortDescription: 'Professional English willow cricket bat with traditional profile',
    brand: brands[0],
    categories: [categories[0]],
    images: [
      {
        id: '1',
        url: '',
        alt: 'Gray-Nicolls Legend Cricket Bat',
        width: 400,
        height: 400,
      },
    ],
    variants: [
      {
        id: '1',
        name: 'Short Handle',
        price: 399.99,
        compareAtPrice: 449.99,
        sku: 'GN-LEG-SH',
        inventory: 15,
        weight: 1200,
        options: { size: 'Short Handle', weight: '2lb 8oz' },
      },
      {
        id: '2',
        name: 'Long Handle',
        price: 399.99,
        compareAtPrice: 449.99,
        sku: 'GN-LEG-LH',
        inventory: 12,
        weight: 1250,
        options: { size: 'Long Handle', weight: '2lb 9oz' },
      },
    ],
    tags: ['cricket', 'bat', 'professional', 'english-willow'],
    featured: true,
    status: 'active',
    seo: {
      title: 'Gray-Nicolls Legend Cricket Bat - Professional English Willow',
      description:
        'Buy the Gray-Nicolls Legend cricket bat used by professional players. English willow construction with perfect balance.',
      keywords: ['cricket bat', 'gray-nicolls', 'english willow', 'professional cricket'],
    },
    specifications: {
      'Blade Material': 'English Willow',
      Handle: 'Cane with rubber grip',
      Profile: 'Traditional',
      'Weight Range': '2lb 7oz - 2lb 10oz',
      'Edge Thickness': '38-40mm',
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '2',
    title: 'Gray-Nicolls Test Opening Cricket Helmet',
    slug: 'gray-nicolls-test-opening-helmet',
    description:
      'ICC approved cricket helmet with titanium grille and superior ventilation. Designed for opening batsmen facing fast bowling.',
    shortDescription: 'ICC approved cricket helmet with titanium grille',
    brand: brands[0],
    categories: [categories[0]],
    images: [
      {
        id: '2',
        url: '',
        alt: 'Gray-Nicolls Test Opening Helmet',
        width: 400,
        height: 400,
      },
    ],
    variants: [
      {
        id: '3',
        name: 'Navy Blue',
        price: 189.99,
        sku: 'GN-TO-NB',
        inventory: 25,
        options: { color: 'Navy Blue', size: 'Adjustable' },
      },
      {
        id: '4',
        name: 'White',
        price: 189.99,
        sku: 'GN-TO-WH',
        inventory: 30,
        options: { color: 'White', size: 'Adjustable' },
      },
    ],
    tags: ['cricket', 'helmet', 'protection', 'ICC-approved'],
    featured: false,
    status: 'active',
    specifications: {
      'Safety Standard': 'ICC Approved',
      'Grille Material': 'Titanium',
      'Shell Material': 'High-impact ABS',
      Weight: '650g',
      Ventilation: '12 air vents',
    },
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-16T00:00:00Z',
  },
  // Rugby Products
  {
    id: '3',
    title: 'Gilbert Match XV Rugby Ball',
    slug: 'gilbert-match-xv-rugby-ball',
    description:
      'Official World Rugby approved match ball used in international competitions. Superior grip and accurate flight characteristics.',
    shortDescription: 'Official World Rugby approved match ball',
    brand: brands[1],
    categories: [categories[1]],
    images: [
      {
        id: '3',
        url: '',
        alt: 'Gilbert Match XV Rugby Ball',
        width: 400,
        height: 400,
      },
    ],
    variants: [
      {
        id: '5',
        name: 'Size 5 (Senior)',
        price: 79.99,
        sku: 'GB-MXV-5',
        inventory: 50,
        options: { size: 'Size 5', level: 'Senior' },
      },
      {
        id: '6',
        name: 'Size 4 (Youth)',
        price: 69.99,
        sku: 'GB-MXV-4',
        inventory: 35,
        options: { size: 'Size 4', level: 'Youth' },
      },
    ],
    tags: ['rugby', 'ball', 'match', 'world-rugby-approved'],
    featured: true,
    status: 'active',
    specifications: {
      Approval: 'World Rugby Approved',
      Construction: 'Hand-stitched',
      Bladder: 'Butyl',
      Panels: '4-panel construction',
      Grip: 'Optimized pimple pattern',
    },
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-17T00:00:00Z',
  },
  // Basketball Products
  {
    id: '4',
    title: 'Molten BG4500 FIBA Approved Basketball',
    slug: 'molten-bg4500-fiba-basketball',
    description:
      'Official FIBA approved basketball used in international competitions. Premium composite leather with 12-panel design.',
    shortDescription: 'Official FIBA approved basketball with premium construction',
    brand: brands[2],
    categories: [categories[2]],
    images: [
      {
        id: '4',
        url: '',
        alt: 'Molten BG4500 Basketball',
        width: 400,
        height: 400,
      },
    ],
    variants: [
      {
        id: '7',
        name: 'Indoor',
        price: 149.99,
        sku: 'MOL-BG4500-IN',
        inventory: 40,
        options: { type: 'Indoor', size: 'Official Size 7' },
      },
      {
        id: '8',
        name: 'Outdoor',
        price: 129.99,
        sku: 'MOL-BG4500-OUT',
        inventory: 35,
        options: { type: 'Outdoor', size: 'Official Size 7' },
      },
    ],
    tags: ['basketball', 'molten', 'fiba-approved', 'professional'],
    featured: true,
    status: 'active',
    specifications: {
      Approval: 'FIBA Approved',
      Material: 'Premium composite leather',
      Construction: '12-panel design',
      Size: 'Official Size 7',
      Weight: '567-650g',
    },
    createdAt: '2024-01-04T00:00:00Z',
    updatedAt: '2024-01-18T00:00:00Z',
  },
  // Hockey Products
  {
    id: '5',
    title: 'Grays GX3000 Ultrabow Hockey Stick',
    slug: 'grays-gx3000-ultrabow-hockey-stick',
    description:
      'Professional field hockey stick with 24mm extreme low bow. Used by Olympic and international players.',
    shortDescription: 'Professional field hockey stick with extreme low bow',
    brand: brands[3],
    categories: [categories[4]],
    images: [
      {
        id: '5',
        url: '',
        alt: 'Grays GX3000 Hockey Stick',
        width: 400,
        height: 400,
      },
    ],
    variants: [
      {
        id: '9',
        name: '36.5 inch',
        price: 299.99,
        sku: 'GR-GX3000-365',
        inventory: 20,
        options: { length: '36.5 inch', weight: 'Light' },
      },
      {
        id: '10',
        name: '37.5 inch',
        price: 299.99,
        sku: 'GR-GX3000-375',
        inventory: 18,
        options: { length: '37.5 inch', weight: 'Medium' },
      },
    ],
    tags: ['hockey', 'stick', 'professional', 'ultrabow'],
    featured: false,
    status: 'active',
    specifications: {
      Bow: '24mm extreme low bow',
      Composition: '70% Carbon, 30% Fiberglass',
      'Head Shape': 'Midi',
      'Balance Point': '40cm from bottom',
      Level: 'Elite/Professional',
    },
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-19T00:00:00Z',
  },
  // Tennis Products
  {
    id: '6',
    title: 'Dunlop ATP Championship Tennis Balls',
    slug: 'dunlop-atp-championship-tennis-balls',
    description:
      'Official ATP Tour tennis balls with HD Pro Core and HD Pro Cloth for consistent performance.',
    shortDescription: 'Official ATP Tour tennis balls with premium construction',
    brand: brands[4],
    categories: [categories[5]],
    images: [
      {
        id: '6',
        url: '',
        alt: 'Dunlop ATP Championship Tennis Balls',
        width: 400,
        height: 400,
      },
    ],
    variants: [
      {
        id: '11',
        name: '4-Ball Can',
        price: 12.99,
        sku: 'DUN-ATP-4B',
        inventory: 100,
        options: { quantity: '4 balls', packaging: 'Pressurized can' },
      },
      {
        id: '12',
        name: '18-Ball Case',
        price: 54.99,
        sku: 'DUN-ATP-18B',
        inventory: 25,
        options: { quantity: '18 balls', packaging: 'Case of 18' },
      },
    ],
    tags: ['tennis', 'balls', 'ATP', 'championship'],
    featured: false,
    status: 'active',
    specifications: {
      Approval: 'ITF Approved',
      Core: 'HD Pro Core',
      Felt: 'HD Pro Cloth',
      Pressure: 'Extra duty',
      Surface: 'All court',
    },
    createdAt: '2024-01-06T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z',
  },
]

// Utility functions for PayloadCMS compatibility
export function getProducts(
  filters: ProductFilters = {},
  sort: ProductSort = { field: 'createdAt', direction: 'desc' },
  page: number = 1,
  limit: number = 12,
): ProductsResponse {
  let filteredProducts = [...products]

  // Apply filters
  if (filters.brands?.length) {
    filteredProducts = filteredProducts.filter((product) =>
      filters.brands!.includes(product.brand.slug),
    )
  }

  if (filters.categories?.length) {
    filteredProducts = filteredProducts.filter((product) =>
      product.categories.some((cat) => filters.categories!.includes(cat.slug)),
    )
  }

  if (filters.featured !== undefined) {
    filteredProducts = filteredProducts.filter((product) => product.featured === filters.featured)
  }

  if (filters.search) {
    const searchTerm = filters.search.toLowerCase()
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.brand.name.toLowerCase().includes(searchTerm) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
    )
  }

  if (filters.priceRange) {
    filteredProducts = filteredProducts.filter((product) => {
      const minPrice = Math.min(...product.variants.map((v) => v.price))
      return minPrice >= filters.priceRange!.min && minPrice <= filters.priceRange!.max
    })
  }

  if (filters.inStock) {
    filteredProducts = filteredProducts.filter((product) =>
      product.variants.some((variant) => variant.inventory > 0),
    )
  }

  // Apply sorting
  filteredProducts.sort((a, b) => {
    let aValue: any, bValue: any

    switch (sort.field) {
      case 'title':
        aValue = a.title
        bValue = b.title
        break
      case 'price':
        aValue = Math.min(...a.variants.map((v) => v.price))
        bValue = Math.min(...b.variants.map((v) => v.price))
        break
      case 'createdAt':
        aValue = new Date(a.createdAt)
        bValue = new Date(b.createdAt)
        break
      case 'updatedAt':
        aValue = new Date(a.updatedAt)
        bValue = new Date(b.updatedAt)
        break
      case 'featured':
        aValue = a.featured ? 1 : 0
        bValue = b.featured ? 1 : 0
        break
      default:
        aValue = a.title
        bValue = b.title
    }

    if (sort.direction === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })

  // Apply pagination
  const totalItems = filteredProducts.length
  const totalPages = Math.ceil(totalItems / limit)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

  return {
    products: paginatedProducts,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems,
      itemsPerPage: limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
    filters,
    appliedSort: sort,
  }
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}

export function getFeaturedProducts(limit: number = 4): Product[] {
  return products.filter((product) => product.featured).slice(0, limit)
}

export function getProductsByBrand(brandSlug: string, limit?: number): Product[] {
  const brandProducts = products.filter((product) => product.brand.slug === brandSlug)
  return limit ? brandProducts.slice(0, limit) : brandProducts
}

export function getProductsByCategory(categorySlug: string, limit?: number): Product[] {
  const categoryProducts = products.filter((product) =>
    product.categories.some((cat) => cat.slug === categorySlug),
  )
  return limit ? categoryProducts.slice(0, limit) : categoryProducts
}

export function getAllBrands(): Brand[] {
  return brands
}

export function getAllCategories(): Category[] {
  return categories
}

// Price utilities
export function getProductPrice(product: Product): {
  min: number
  max: number
} {
  const prices = product.variants.map((v) => v.price)
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  }
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}
