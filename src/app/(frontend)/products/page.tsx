'use client'

import { useState, useEffect } from 'react'
import { ProductCard } from '@/components/product-card'
import { ProductFilters as FiltersComponent } from '@/components/product-filters'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Grid3X3,
  List,
  Filter,
  Package,
  Star,
  TrendingUp,
  ShoppingBag,
  Zap,
  AlertCircle,
} from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { ProductListItem, Category, Brand } from '@/types/api'

interface ProductFilters {
  categories: Category[]
  brands: Brand[]
  priceRange: { min: number; max: number }
}

interface ProductQueryParams {
  page?: number
  limit?: number
  search?: string
  category?: string
  brand?: string
  sort?: string
  order?: 'asc' | 'desc'
  status?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
}

export default function StorePage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [products, setProducts] = useState<ProductListItem[]>([])
  const [featuredProducts, setFeaturedProducts] = useState<ProductListItem[]>([])
  const [filterOptions, setFilterOptions] = useState<ProductFilters>({
    categories: [],
    brands: [],
    priceRange: { min: 0, max: 0 },
  })
  const [loading, setLoading] = useState(true)
  const [featuredLoading, setFeaturedLoading] = useState(true)
  const [filtersLoading, setFiltersLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    totalPages: 1,
    totalDocs: 0,
    hasNextPage: false,
    hasPrevPage: false,
  })
  const [currentFilters, setCurrentFilters] = useState<ProductQueryParams>({
    page: 1,
    limit: 12,
    sort: 'createdAt',
    order: 'desc',
    status: 'active',
  })

  // Fetch products
  const fetchProducts = async (filters: ProductQueryParams = currentFilters) => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams()
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value.toString())
        }
      })

      const response = await fetch(`/api/products?${params}`)
      const data = await response.json()

      if (data.success) {
        setProducts(data.data)
        setPagination(data.pagination)
      } else {
        setError(data.error || 'Failed to fetch products')
      }
    } catch (err) {
      setError('Failed to fetch products')
      console.error('Products fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch featured products
  const fetchFeaturedProducts = async () => {
    try {
      setFeaturedLoading(true)
      const response = await fetch('/api/products?limit=4&sort=createdAt&order=desc')
      const data = await response.json()

      if (data.success) {
        setFeaturedProducts(data.data.slice(0, 4))
      }
    } catch (err) {
      console.error('Featured products fetch error:', err)
    } finally {
      setFeaturedLoading(false)
    }
  }

  // Fetch filter options
  const fetchFilterOptions = async () => {
    try {
      setFiltersLoading(true)

      const [categoriesRes, brandsRes, productsRes] = await Promise.all([
        fetch('/api/categories'),
        fetch('/api/brands'),
        fetch('/api/products?limit=1000'), // Get all products to calculate price range
      ])

      const [categoriesData, brandsData, productsData] = await Promise.all([
        categoriesRes.json(),
        brandsRes.json(),
        productsRes.json(),
      ])

      const categories = categoriesData.success ? categoriesData.data : []
      const brands = brandsData.success ? brandsData.data : []

      let priceRange = { min: 0, max: 0 }
      if (productsData.success && productsData.data.length > 0) {
        const prices = productsData.data.map((p: ProductListItem) => p.price)
        priceRange = {
          min: Math.min(...prices),
          max: Math.max(...prices),
        }
      }

      setFilterOptions({ categories, brands, priceRange })
    } catch (err) {
      console.error('Filter options fetch error:', err)
    } finally {
      setFiltersLoading(false)
    }
  }

  // Initial data fetch
  useEffect(() => {
    fetchProducts()
    fetchFeaturedProducts()
    fetchFilterOptions()
  }, [])

  const handleFiltersChange = (newFilters: ProductQueryParams) => {
    const updatedFilters = { ...currentFilters, ...newFilters, page: 1 }
    setCurrentFilters(updatedFilters)
    fetchProducts(updatedFilters)
  }

  const handleSortChange = (sortField: string, sortOrder: 'asc' | 'desc') => {
    const updatedFilters = { ...currentFilters, sort: sortField, order: sortOrder, page: 1 }
    setCurrentFilters(updatedFilters)
    fetchProducts(updatedFilters)
  }

  const handleSearchChange = (query: string) => {
    const updatedFilters = { ...currentFilters, search: query, page: 1 }
    setCurrentFilters(updatedFilters)
    fetchProducts(updatedFilters)
  }

  const handleResetFilters = () => {
    const resetFilters = {
      page: 1,
      limit: 12,
      sort: 'createdAt',
      order: 'desc' as const,
      status: 'active',
    }
    setCurrentFilters(resetFilters)
    fetchProducts(resetFilters)
  }

  const handlePageChange = (page: number) => {
    const updatedFilters = { ...currentFilters, page }
    setCurrentFilters(updatedFilters)
    fetchProducts(updatedFilters)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-[#003DA5] to-[#1A1A1A] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-[#FFD700] rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#AEEA00] rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center">
            <Badge className="bg-[#FFD700] text-[#1A1A1A] px-6 py-2 text-sm font-bold mb-4">
              PREMIUM SPORTS STORE
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              PROFESSIONAL
              <span className="block text-[#FF3D00]">SPORTS EQUIPMENT</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Discover hundreds of premium sports products from world-renowned brands. From
              professional athletes to weekend warriors, find everything you need to excel.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                {
                  icon: Package,
                  label: 'Products',
                  value: pagination.totalDocs > 0 ? `${pagination.totalDocs}+` : '500+',
                },
                {
                  icon: Star,
                  label: 'Brands',
                  value:
                    filterOptions.brands.length > 0 ? `${filterOptions.brands.length}+` : '25+',
                },
                {
                  icon: TrendingUp,
                  label: 'Categories',
                  value:
                    filterOptions.categories.length > 0
                      ? `${filterOptions.categories.length}+`
                      : '12+',
                },
                { icon: Zap, label: 'Featured Items', value: '50+' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-[#FFD700]" />
                  <div className="text-2xl font-black">{stat.value}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-[#FF3D00] text-white px-6 py-2 text-sm font-bold mb-4">
              FEATURED COLLECTION
            </Badge>
            <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] mb-4">
              TRENDING
              <span className="block text-[#003DA5]">PRODUCTS</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Handpicked selection of our most popular and highest-rated sports equipment
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <CardContent className="p-0">
                      <Skeleton className="h-64 w-full" />
                      <div className="p-4 space-y-3">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-6 w-1/2" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </CardContent>
                  </Card>
                ))
              : featuredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    showBrand={true}
                    showCategory={false}
                  />
                ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              onClick={() =>
                window.scrollTo({
                  top: document.getElementById('all-products')?.offsetTop || 0,
                  behavior: 'smooth',
                })
              }
              className="bg-[#003DA5] hover:bg-[#003DA5]/90 text-white px-8"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Browse All Products
            </Button>
          </div>
        </div>
      </section>

      {/* All Products Section */}
      <section id="all-products" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-[#AEEA00] text-[#1A1A1A] px-6 py-2 text-sm font-bold mb-4">
              COMPLETE CATALOG
            </Badge>
            <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] mb-4">
              ALL
              <span className="block text-[#FF3D00]">PRODUCTS</span>
            </h2>
          </div>

          {/* Error Display */}
          {error && (
            <Alert className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="sticky top-24">
                <FiltersComponent
                  categories={filterOptions.categories}
                  brands={filterOptions.brands}
                  priceRange={filterOptions.priceRange}
                  currentFilters={currentFilters}
                  onFiltersChange={handleFiltersChange}
                  onSortChange={handleSortChange}
                  onSearchChange={handleSearchChange}
                  onReset={handleResetFilters}
                  isOpen={
                    showFilters || (typeof window !== 'undefined' && window.innerWidth >= 1024)
                  }
                  onToggle={() => setShowFilters(!showFilters)}
                  loading={filtersLoading}
                />
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Toolbar */}
              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      {pagination.totalDocs > 0 && (
                        <p className="text-sm text-gray-600">
                          Showing {(pagination.page - 1) * pagination.limit + 1}-
                          {Math.min(pagination.page * pagination.limit, pagination.totalDocs)} of{' '}
                          {pagination.totalDocs} products
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant={viewMode === 'grid' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('grid')}
                        className={viewMode === 'grid' ? 'bg-[#003DA5] text-white' : ''}
                      >
                        <Grid3X3 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={viewMode === 'list' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('list')}
                        className={viewMode === 'list' ? 'bg-[#003DA5] text-white' : ''}
                      >
                        <List className="w-4 h-4" />
                      </Button>

                      <Separator orientation="vertical" className="h-8 mx-2" />

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowFilters(!showFilters)}
                        className="lg:hidden"
                      >
                        <Filter className="w-4 h-4 mr-2" />
                        Filters
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Products */}
              {loading ? (
                <div
                  className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}
                >
                  {Array.from({ length: 12 }).map((_, i) => (
                    <Card key={i} className="overflow-hidden">
                      <CardContent className="p-0">
                        <Skeleton className="h-64 w-full" />
                        <div className="p-4 space-y-3">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-6 w-1/2" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-full" />
                          <div className="flex gap-2">
                            <Skeleton className="h-8 flex-1" />
                            <Skeleton className="h-8 w-20" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : products.length > 0 ? (
                <>
                  <div
                    className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}
                  >
                    {products.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        variant={viewMode}
                        showBrand={true}
                        showCategory={true}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {pagination.totalPages > 1 && (
                    <div className="mt-12 flex justify-center">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          onClick={() => handlePageChange(pagination.page - 1)}
                          disabled={!pagination.hasPrevPage}
                        >
                          Previous
                        </Button>

                        {Array.from({ length: Math.min(5, pagination.totalPages) }).map((_, i) => {
                          const page = i + Math.max(1, pagination.page - 2)
                          if (page > pagination.totalPages) return null

                          return (
                            <Button
                              key={page}
                              variant={page === pagination.page ? 'default' : 'outline'}
                              onClick={() => handlePageChange(page)}
                              className={page === pagination.page ? 'bg-[#003DA5] text-white' : ''}
                            >
                              {page}
                            </Button>
                          )
                        })}

                        <Button
                          variant="outline"
                          onClick={() => handlePageChange(pagination.page + 1)}
                          disabled={!pagination.hasNextPage}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <Card className="p-12 text-center">
                  <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No Products Found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your filters or search terms to find what you're looking for.
                  </p>
                  <Button
                    onClick={handleResetFilters}
                    className="bg-[#003DA5] hover:bg-[#003DA5]/90 text-white"
                  >
                    Clear All Filters
                  </Button>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#003DA5] to-[#FF3D00] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            NEED HELP FINDING THE RIGHT GEAR?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Our sports equipment experts are here to help you find the perfect products for your
            needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-[#003DA5] hover:bg-gray-100 px-8 py-4 text-lg font-bold rounded-full"
              asChild
            >
              <a href="/contact">Contact Our Experts</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-[#003DA5] px-8 py-4 text-lg font-bold rounded-full bg-transparent"
              asChild
            >
              <a href="/contact">Request Bulk Quote</a>
            </Button>
          </div>

          {/* Product Verification CTA */}
          <div className="mt-12 bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-2">🔍 VERIFY YOUR PRODUCTS</h3>
            <p className="text-sm opacity-90 mb-4">
              Check if your sports equipment is authentic using our verification system.
            </p>
            <Button
              size="sm"
              className="bg-[#FFD700] text-[#1A1A1A] hover:bg-[#FFD700]/90 font-bold"
              asChild
            >
              <a href="/products/verify">Verify Product</a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
