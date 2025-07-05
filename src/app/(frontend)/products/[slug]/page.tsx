'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/hooks/use-cart'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { ProductCard } from '@/components/product-card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  ShoppingCart,
  Share2,
  Star,
  Check,
  Truck,
  Shield,
  RefreshCw,
  Plus,
  Minus,
  Zap,
  Award,
  Globe,
  AlertCircle,
  Package,
} from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import { notFound, useRouter } from 'next/navigation'
import { ProductListItem } from '@/types/api'

interface ProductDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

// Product variant interface for frontend
interface ProductVariant {
  id: string
  name: string
  price: number
  size?: string
  color?: string
  inventory: number
}

// Helper functions
const formatLKR = (amount: number): string => {
  return new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 0,
  }).format(amount)
}

const convertUsdToLkr = (usdAmount: number, exchangeRate: number = 315): number => {
  return Math.round(usdAmount * exchangeRate)
}

const getCurrentExchangeRate = async (): Promise<number> => {
  try {
    return 315 // Fixed rate for now
  } catch (error) {
    console.warn('Failed to get exchange rate, using fallback')
    return 315
  }
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const router = useRouter()
  const [product, setProduct] = useState<ProductListItem | null>(null)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [relatedProducts, setRelatedProducts] = useState<ProductListItem[]>([])
  const [exchangeRate, setExchangeRate] = useState(315)
  const [variants, setVariants] = useState<ProductVariant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [resolvedParams, setResolvedParams] = useState<{ slug: string } | null>(null)

  const { addItem } = useCart()

  // Resolve params first
  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params
      setResolvedParams(resolved)
    }
    resolveParams()
  }, [params])

  // Load exchange rate
  useEffect(() => {
    const loadExchangeRate = async () => {
      try {
        const rate = await getCurrentExchangeRate()
        setExchangeRate(rate)
      } catch (error) {
        console.warn('Using fallback exchange rate')
      }
    }
    loadExchangeRate()
  }, [])

  // Fetch product data
  useEffect(() => {
    if (!resolvedParams?.slug) return

    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`/api/products/${resolvedParams.slug}`)
        const data = await response.json()

        if (data.success && data.data) {
          setProduct(data.data)
        } else {
          setError(data.error || 'Product not found')
        }
      } catch (err) {
        setError('Failed to fetch product')
        console.error('Product fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [resolvedParams?.slug])

  // Generate variants from product sizes and colors
  useEffect(() => {
    if (!product) return

    const productVariants: ProductVariant[] = []
    const sizes = product.sizes || []
    const colors = product.colors || []

    // If no sizes or colors, create a single default variant
    if (sizes.length === 0 && colors.length === 0) {
      productVariants.push({
        id: `${product.id}-default`,
        name: product.name,
        price: product.price,
        inventory: product.stock,
      })
    } else if (sizes.length > 0 && colors.length === 0) {
      // Only sizes
      sizes.forEach((size) => {
        productVariants.push({
          id: `${product.id}-${size}`,
          name: `${product.name} - ${size}`,
          price: product.price,
          size,
          inventory: Math.floor(product.stock / sizes.length), // Distribute stock evenly
        })
      })
    } else if (colors.length > 0 && sizes.length === 0) {
      // Only colors
      colors.forEach((color) => {
        productVariants.push({
          id: `${product.id}-${color}`,
          name: `${product.name} - ${color}`,
          price: product.price,
          color,
          inventory: Math.floor(product.stock / colors.length),
        })
      })
    } else {
      // Both sizes and colors
      sizes.forEach((size) => {
        colors.forEach((color) => {
          productVariants.push({
            id: `${product.id}-${size}-${color}`,
            name: `${product.name} - ${size}, ${color}`,
            price: product.price,
            size,
            color,
            inventory: Math.floor(product.stock / (sizes.length * colors.length)),
          })
        })
      })
    }

    setVariants(productVariants)
    setSelectedVariant(productVariants[0] || null)
  }, [product])

  // Fetch related products
  useEffect(() => {
    if (!product?.brand || !resolvedParams?.slug) return

    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch(
          `/api/products?brand=${product.brand!.slug}&limit=4&status=active`,
        )
        const data = await response.json()

        if (data.success) {
          const filtered = data.data.filter((p: ProductListItem) => p.slug !== resolvedParams.slug)
          setRelatedProducts(filtered)
        }
      } catch (error) {
        console.error('Error fetching related products:', error)
      }
    }

    fetchRelatedProducts()
  }, [product, resolvedParams?.slug])

  if (loading) {
    return <ProductDetailSkeleton />
  }

  if (error) {
    return (
      <main className="min-h-screen pt-16">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <div className="mt-4">
            <Button asChild>
              <Link href="/products">← Back to Products</Link>
            </Button>
          </div>
        </div>
      </main>
    )
  }

  if (!product) {
    return (
      <main className="min-h-screen pt-16">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Product not found</AlertDescription>
          </Alert>
          <div className="mt-4">
            <Button asChild>
              <Link href="/products">← Back to Products</Link>
            </Button>
          </div>
        </div>
      </main>
    )
  }

  if (!selectedVariant) {
    return <ProductDetailSkeleton />
  }

  const handleAddToCart = () => {
    if (!selectedVariant || !product) return

    if (selectedVariant.inventory < quantity) {
      toast.error(`Only ${selectedVariant.inventory} items available in stock`)
      return
    }

    // Convert product to cart format
    const cartProduct = {
      id: product.id.toString(),
      title: product.name,
      slug: product.slug,
      images: product.images,
      sku: product.sku,
    }

    const cartVariant = {
      id: selectedVariant.id,
      name: selectedVariant.name,
      price: selectedVariant.price,
      size: selectedVariant.size,
      color: selectedVariant.color,
      inventory: selectedVariant.inventory,
    }

    addItem(cartProduct as any, cartVariant as any, quantity)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description || `Check out this ${product.name} from ${product.brand?.name}`,
          url: window.location.href,
        })
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href)
      toast.success('Product link copied to clipboard!')
    }
  }

  const isOutOfStock = selectedVariant.inventory === 0
  const isLowStock = selectedVariant.inventory > 0 && selectedVariant.inventory <= 5
  const maxQuantity = Math.min(10, selectedVariant.inventory)

  return (
    <main className="min-h-screen pt-16">
      {/* Breadcrumb */}
      <section className="py-4 bg-gray-50 dark:bg-gray-900 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/" className="hover:text-[#003DA5] transition-colors leading-none">
              Home
            </Link>
            <span className="leading-none">/</span>
            <Link href="/products" className="hover:text-[#003DA5] transition-colors leading-none">
              Store
            </Link>
            {product.brand && (
              <>
                <span className="leading-none">/</span>
                <Link
                  href={`/products?brand=${product.brand.slug}`}
                  className="hover:text-[#003DA5] transition-colors leading-none"
                >
                  {product.brand.name}
                </Link>
              </>
            )}
            <span className="leading-none">/</span>
            <span className="text-gray-900 dark:text-white font-medium truncate leading-none">
              {product.name}
            </span>
          </nav>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden group">
                <img
                  src={
                    product.images &&
                    product.images.length > 0 &&
                    product.images[selectedImage]?.url
                      ? product.images[selectedImage].url
                      : 'https://placehold.co/600x400'
                  }
                  alt={
                    product.images &&
                    product.images.length > 0 &&
                    product.images[selectedImage]?.alt
                      ? product.images[selectedImage].alt
                      : product.name
                  }
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = ''
                  }}
                />

                {/* Product Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.originalPrice && product.originalPrice > product.price && (
                    <Badge className="bg-[#FF3D00] text-white font-bold">SALE</Badge>
                  )}
                  {isOutOfStock && (
                    <Badge variant="destructive" className="font-bold">
                      OUT OF STOCK
                    </Badge>
                  )}
                </div>

                {/* Share Button */}
                <div className="absolute top-4 right-4">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={handleShare}
                    className="w-10 h-10 p-0 rounded-full bg-white/90 hover:bg-white"
                  >
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </Button>
                </div>
              </div>

              {/* Thumbnail Images */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={image.id || index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        index === selectedImage
                          ? 'border-[#003DA5] ring-2 ring-[#003DA5]/20'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image.url || 'https://placehold.co/600x400'}
                        alt={image.alt || `${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = ''
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Brand */}
              {product.brand && (
                <div className="flex items-center gap-2">
                  <Link
                    href={`/products?brand=${product.brand.slug}`}
                    className="text-[#003DA5] font-bold text-lg hover:underline"
                  >
                    {product.brand.name}
                  </Link>
                  {product.brand.website && (
                    <Badge variant="outline" className="text-xs">
                      <Award className="w-3 h-3 mr-1" />
                      Official Partner
                    </Badge>
                  )}
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl lg:text-4xl font-black text-gray-900 dark:text-white leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              {product.rating && product.reviewCount && (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating!)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-gray-600 ml-2">({product.rating})</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {product.reviewCount} Reviews
                  </Badge>
                </div>
              )}

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-gray-900 dark:text-white">
                    {formatLKR(convertUsdToLkr(selectedVariant.price, exchangeRate))}
                  </span>
                  {product.originalPrice && product.originalPrice > selectedVariant.price && (
                    <>
                      <span className="text-xl text-gray-500 line-through">
                        {formatLKR(convertUsdToLkr(product.originalPrice, exchangeRate))}
                      </span>
                      <Badge className="bg-[#FF3D00] text-white font-bold">
                        SAVE{' '}
                        {formatLKR(
                          convertUsdToLkr(
                            product.originalPrice - selectedVariant.price,
                            exchangeRate,
                          ),
                        )}
                      </Badge>
                    </>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  Price includes tax. Free shipping on orders over LKR 23,625.
                </p>
              </div>

              {/* SKU */}
              <div className="text-sm text-gray-600">
                <span className="font-medium">SKU:</span> {product.sku}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                {isOutOfStock ? (
                  <Badge variant="destructive" className="font-bold">
                    Out of Stock
                  </Badge>
                ) : isLowStock ? (
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800 font-bold">
                    <Zap className="w-3 h-3 mr-1" />
                    Only {selectedVariant.inventory} left!
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="bg-green-100 text-green-800 font-bold">
                    <Check className="w-3 h-3 mr-1" />
                    In Stock ({selectedVariant.inventory} available)
                  </Badge>
                )}
              </div>

              {/* Variant Selection */}
              <div className="space-y-6">
                {/* Size Selection */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-bold text-gray-900 dark:text-white">Size:</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => {
                        const sizeVariants = variants.filter((v) => v.size === size)
                        const isAvailable = sizeVariants.some((v) => v.inventory > 0)
                        const isSelected = selectedVariant?.size === size

                        return (
                          <button
                            key={size}
                            onClick={() => {
                              // Find the first available variant with this size
                              const availableVariant =
                                sizeVariants.find((v) => v.inventory > 0) || sizeVariants[0]
                              if (availableVariant) {
                                setSelectedVariant(availableVariant)
                                setQuantity(1)
                              }
                            }}
                            disabled={!isAvailable}
                            className={`min-w-[3rem] h-12 px-4 rounded-lg border-2 font-medium transition-all ${
                              isSelected
                                ? 'border-[#003DA5] bg-[#003DA5] text-white'
                                : isAvailable
                                  ? 'border-gray-300 bg-white text-gray-900 hover:border-[#003DA5]'
                                  : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                            }`}
                          >
                            {size}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Color Selection */}
                {product.colors && product.colors.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-bold text-gray-900 dark:text-white">Color:</h3>
                    <div className="flex flex-wrap gap-3">
                      {product.colors.map((color) => {
                        const colorVariants = variants.filter((v) => v.color === color)
                        const isAvailable = colorVariants.some((v) => v.inventory > 0)
                        const isSelected = selectedVariant?.color === color

                        return (
                          <button
                            key={color}
                            onClick={() => {
                              // Find variant that matches current size (if any) and this color
                              let targetVariant = colorVariants.find(
                                (v) =>
                                  v.color === color &&
                                  (!selectedVariant?.size || v.size === selectedVariant.size) &&
                                  v.inventory > 0,
                              )

                              // If no variant found with current size, find any available variant with this color
                              if (!targetVariant) {
                                targetVariant =
                                  colorVariants.find((v) => v.inventory > 0) || colorVariants[0]
                              }

                              if (targetVariant) {
                                setSelectedVariant(targetVariant)
                                setQuantity(1)
                              }
                            }}
                            disabled={!isAvailable}
                            className={`relative h-12 px-4 rounded-lg border-2 font-medium transition-all ${
                              isSelected
                                ? 'border-[#003DA5] bg-[#003DA5] text-white'
                                : isAvailable
                                  ? 'border-gray-300 bg-white text-gray-900 hover:border-[#003DA5]'
                                  : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            <span className="relative z-10">{color}</span>
                            {!isAvailable && (
                              <div className="absolute inset-0 bg-gray-200 opacity-50 rounded-lg" />
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Selected Variant Info */}
                {selectedVariant && variants.length > 1 && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Selected:</p>
                        <p className="text-sm text-gray-600">
                          {selectedVariant.size && selectedVariant.color
                            ? `${selectedVariant.size} - ${selectedVariant.color}`
                            : selectedVariant.size || selectedVariant.color || 'Standard'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#003DA5]">
                          {formatLKR(convertUsdToLkr(selectedVariant.price, exchangeRate))}
                        </p>
                        {selectedVariant.inventory <= 5 && selectedVariant.inventory > 0 && (
                          <p className="text-xs text-orange-600">
                            Only {selectedVariant.inventory} left
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="space-y-2">
                <label htmlFor="quantity" className="font-bold text-gray-900 dark:text-white">
                  Quantity:
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="h-10 w-10 p-0"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-16 text-center font-medium">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
                      disabled={quantity >= maxQuantity || isOutOfStock}
                      className="h-10 w-10 p-0"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <span className="text-sm text-gray-600">{maxQuantity} available</span>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="space-y-3">
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className="w-full bg-[#FF3D00] hover:bg-[#FF3D00]/90 text-white font-bold py-4 text-lg rounded-xl transition-all hover:scale-[1.02]"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full font-bold border-2 border-[#003DA5] text-[#003DA5] hover:bg-[#003DA5] hover:text-white"
                  onClick={() => {
                    handleAddToCart()
                    router.push('/checkout')
                  }}
                  disabled={isOutOfStock}
                >
                  {isOutOfStock ? 'Out of Stock' : 'Buy Now'}
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <Truck className="w-6 h-6 mx-auto text-[#003DA5] mb-2" />
                  <div className="text-xs font-medium">Free Shipping</div>
                  <div className="text-xs text-gray-600">On orders $75+</div>
                </div>
                <div className="text-center">
                  <Shield className="w-6 h-6 mx-auto text-[#003DA5] mb-2" />
                  <div className="text-xs font-medium">Secure Payment</div>
                  <div className="text-xs text-gray-600">SSL Protected</div>
                </div>
                <div className="text-center">
                  <RefreshCw className="w-6 h-6 mx-auto text-[#003DA5] mb-2" />
                  <div className="text-xs font-medium">Easy Returns</div>
                  <div className="text-xs text-gray-600">30-day policy</div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-16">
            <Tabs defaultValue="description" className="w-full">
              {/* Always show all tabs */}
              <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3 mb-8">
                <TabsTrigger value="description" className="font-bold">
                  Description
                </TabsTrigger>
                <TabsTrigger value="specifications" className="font-bold">
                  Specifications
                </TabsTrigger>
                <TabsTrigger value="shipping" className="font-bold">
                  Shipping & Returns
                </TabsTrigger>
              </TabsList>

              {/* Description Tab - Always show */}
              <TabsContent value="description" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Product Description</h3>
                    <div className="prose max-w-none text-gray-700 dark:text-gray-300">
                      {/* Description Section */}
                      <div className="mb-6">
                        {product.description ? (
                          typeof product.description === 'string' ? (
                            <p className="leading-relaxed">{product.description}</p>
                          ) : (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: JSON.stringify(product.description),
                              }}
                            />
                          )
                        ) : (
                          <p className="text-gray-500 italic">No description available</p>
                        )}
                      </div>

                      {/* Features Section */}
                      <div className="mb-6">
                        <h4 className="font-bold mb-3 text-gray-900 dark:text-white">
                          Key Features:
                        </h4>
                        {product.features && product.features.length > 0 ? (
                          <ul className="space-y-2">
                            {product.features.map((feature, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-500 italic">No features listed</p>
                        )}
                      </div>

                      {/* Tags Section */}
                      <div>
                        <h4 className="font-bold mb-3 text-gray-900 dark:text-white">Tags:</h4>
                        {product.tags && product.tags.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {product.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500 italic">No tags available</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Specifications Tab - Always show */}
              <TabsContent value="specifications" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-6">Technical Specifications</h3>

                    {product.specifications && Object.keys(product.specifications).length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                              <th className="text-left py-3 pr-6 font-bold text-gray-900 dark:text-white w-1/3">
                                Property
                              </th>
                              <th className="text-left py-3 font-bold text-gray-900 dark:text-white">
                                Value
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {Object.entries(product.specifications).map(([key, value]) => (
                              <tr
                                key={key}
                                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                              >
                                <td className="py-4 pr-6 font-medium text-gray-600 dark:text-gray-400 capitalize align-top">
                                  {key
                                    .replace(/([A-Z])/g, ' $1')
                                    .replace(/^./, (str) => str.toUpperCase())
                                    .trim()}
                                </td>
                                <td className="py-4 font-semibold text-gray-900 dark:text-white align-top">
                                  {value && value.toString().trim() ? (
                                    <span>{value.toString()}</span>
                                  ) : (
                                    <span className="text-gray-500 italic">N/A</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 italic text-lg">No specifications available</p>
                        <p className="text-gray-400 text-sm mt-2">
                          Technical specifications will be displayed here when available
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Shipping Tab - Always shown (keeping your existing code) */}
              <TabsContent value="shipping" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-6">Shipping & Returns Information</h3>
                    <div className="space-y-6">
                      {/* Shipping Information */}
                      <div>
                        <h4 className="font-bold mb-4 text-gray-900 dark:text-white">
                          Shipping Options
                        </h4>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <Truck className="w-5 h-5 text-[#003DA5] mt-1 flex-shrink-0" />
                            <div>
                              <h5 className="font-semibold">
                                {product.shipping?.freeShipping
                                  ? 'Free Shipping'
                                  : 'Standard Shipping'}
                              </h5>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {product.shipping?.freeShipping
                                  ? 'Free shipping on this item. Delivered in 3-5 business days.'
                                  : 'Free shipping on orders over LKR 23,625. Standard rate applies for smaller orders.'}
                              </p>
                              <p className="text-xs text-gray-500 mt-2">
                                Delivery: 3-5 business days
                              </p>
                            </div>
                          </div>

                          {product.shipping?.islandWideDelivery && (
                            <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                              <Globe className="w-5 h-5 text-[#003DA5] mt-1 flex-shrink-0" />
                              <div>
                                <h5 className="font-semibold">Island-wide Delivery</h5>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                  We deliver across all provinces in Sri Lanka with secure
                                  packaging.
                                </p>
                              </div>
                            </div>
                          )}

                          {product.shipping?.shippingWeight && (
                            <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                              <Package className="w-5 h-5 text-[#003DA5] mt-1 flex-shrink-0" />
                              <div>
                                <h5 className="font-semibold">Package Details</h5>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                  Approximate weight: {product.shipping.shippingWeight}kg
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <Separator />

                      {/* Returns Information */}
                      <div>
                        <h4 className="font-bold mb-4 text-gray-900 dark:text-white">
                          Returns & Exchanges
                        </h4>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <RefreshCw className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                            <div>
                              <h5 className="font-semibold">
                                {product.shipping?.easyReturn
                                  ? '30-Day Easy Returns'
                                  : '30-Day Returns'}
                              </h5>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                Return unused items in original packaging within 30 days for a full
                                refund.
                              </p>
                              <ul className="text-xs text-gray-500 mt-2 space-y-1">
                                <li>• Items must be in original condition</li>
                                <li>• Include all original packaging and tags</li>
                                <li>• Return shipping costs may apply</li>
                              </ul>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <Shield className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                            <div>
                              <h5 className="font-semibold">Quality Guarantee</h5>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                All products come with manufacturer warranty and our quality
                                guarantee.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Contact Information */}
                      <div className="bg-[#003DA5]/5 dark:bg-[#003DA5]/10 rounded-lg p-4">
                        <h4 className="font-bold mb-2 text-[#003DA5]">Need Help?</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          Contact our customer service team for shipping and returns assistance.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button
                            size="sm"
                            className="bg-[#25D366] hover:bg-[#25D366]/90 text-white"
                            onClick={() => {
                              const message = `Hello! I need help with shipping/returns for product: ${product.name} (SKU: ${product.sku})`
                              const whatsappUrl = `https://wa.me/94772350712?text=${encodeURIComponent(message)}`
                              window.open(whatsappUrl, '_blank')
                            }}
                          >
                            WhatsApp Support
                          </Button>
                          <Button size="sm" variant="outline" asChild>
                            <Link href="/contact">Contact Us</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">
                  More from {product.brand?.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Discover other premium products from this brand
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.id}
                    product={relatedProduct}
                    showBrand={false}
                    showCategory={true}
                  />
                ))}
              </div>

              <div className="text-center mt-8">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-[#003DA5] text-[#003DA5] hover:bg-[#003DA5] hover:text-white font-bold"
                  asChild
                >
                  <Link href={`/products?brand=${product.brand?.slug}`}>
                    View All {product.brand?.name} Products
                  </Link>
                </Button>
              </div>
            </section>
          )}
        </div>
      </section>
    </main>
  )
}

function ProductDetailSkeleton() {
  return (
    <main className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-square bg-gray-200 rounded-xl animate-pulse" />
            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="h-8 bg-gray-200 rounded animate-pulse w-1/3" />
            <div className="h-12 bg-gray-200 rounded animate-pulse w-2/3" />
            <div className="h-6 bg-gray-200 rounded animate-pulse w-1/4" />
            <div className="h-8 bg-gray-200 rounded animate-pulse w-1/3" />
            <div className="h-16 bg-gray-200 rounded animate-pulse" />
            <div className="h-12 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </main>
  )
}
