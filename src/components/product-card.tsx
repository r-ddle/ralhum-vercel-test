'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Star, Eye, Heart, Zap, Package, Check, X } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '@/hooks/use-cart'
import { toast } from 'sonner'
import { ProductListItem } from '@/types/api'

interface ProductCardProps {
  product: ProductListItem
  variant?: 'grid' | 'list'
  showBrand?: boolean
  showCategory?: boolean
  className?: string
}

export function ProductCard({
  product,
  variant = 'grid',
  showBrand = true,
  showCategory = true,
  className = '',
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { addItem } = useCart()

  const exchangeRate = 315 // This should ideally come from a context or hook

  // Create a simple variant for cart (since we don't have complex variants in the list view)
  const createDefaultVariant = () => ({
    id: `${product.id}-default`,
    name: product.name,
    price: product.price,
    inventory: product.stock,
    size: product.sizes.length > 0 ? product.sizes[0] : undefined,
    color: product.colors.length > 0 ? product.colors[0] : undefined,
  })

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (product.stock === 0) {
      toast.error('This product is out of stock')
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

    const cartVariant = createDefaultVariant()

    addItem(cartProduct as any, cartVariant as any, 1)
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // This could open a modal or navigate to product page
    window.open(`/products/${product.slug}`, '_blank')
  }

  const isOutOfStock = product.stock === 0
  const isLowStock = product.stock > 0 && product.stock <= 5
  const hasDiscount = product.originalPrice && product.originalPrice > product.price
  const discountPercentage = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0

  const priceInLKR = product.price
  const originalPriceInLKR = product.originalPrice ? product.originalPrice : null

  if (variant === 'list') {
    return (
      <Card className={`overflow-hidden hover:shadow-lg transition-all duration-300 ${className}`}>
        <Link href={`/products/${product.slug}`}>
          <CardContent className="p-0">
            <div className="grid md:grid-cols-3 gap-4 p-4">
              {/* Image Section */}
              <div className="relative aspect-square md:aspect-auto md:h-48 bg-gray-100 rounded-lg overflow-hidden group">
                <img
                  src={product.images[0]?.url || 'https://placehold.co/600x400'}
                  alt={product.images[0]?.alt || product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {hasDiscount && (
                    <Badge className="bg-[#FF3D00] text-white text-xs font-bold">
                      -{discountPercentage}%
                    </Badge>
                  )}
                  {isOutOfStock && (
                    <Badge variant="destructive" className="text-xs font-bold">
                      OUT OF STOCK
                    </Badge>
                  )}
                  {isLowStock && !isOutOfStock && (
                    <Badge className="bg-orange-500 text-white text-xs font-bold">
                      <Zap className="w-3 h-3 mr-1" />
                      LOW STOCK
                    </Badge>
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className="md:col-span-2 space-y-3">
                {/* Brand & Category */}
                <div className="flex items-center gap-2 flex-wrap">
                  {showBrand && product.brand && (
                    <Badge variant="outline" className="text-xs">
                      {product.brand.name}
                    </Badge>
                  )}
                  {showCategory && product.category && (
                    <Badge variant="secondary" className="text-xs">
                      {product.category.name}
                    </Badge>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 line-clamp-2 hover:text-[#003DA5] transition-colors">
                  {product.name}
                </h3>

                {/* Rating */}
                {product.rating && product.reviewCount && (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating!)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-600">({product.rating})</span>
                    </div>
                    <span className="text-xs text-gray-500">{product.reviewCount} reviews</span>
                  </div>
                )}

                {/* Features */}
                {product.features && product.features.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {product.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {product.features.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{product.features.length - 3} more
                      </Badge>
                    )}
                  </div>
                )}

                {/* Price & Stock */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-gray-900">{priceInLKR}</span>
                      {originalPriceInLKR && (
                        <span className="text-sm text-gray-500 line-through">
                          {originalPriceInLKR}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600">SKU: {product.sku}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      {isOutOfStock ? (
                        <div className="flex items-center gap-1 text-red-600">
                          <X className="w-4 h-4" />
                          <span className="text-sm font-medium">Out of Stock</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-green-600">
                          <Check className="w-4 h-4" />
                          <span className="text-sm font-medium">{product.stock} available</span>
                        </div>
                      )}
                    </div>

                    <Button
                      size="sm"
                      onClick={handleAddToCart}
                      disabled={isOutOfStock}
                      className="bg-[#FF3D00] hover:bg-[#FF3D00]/90 text-white"
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Link>
      </Card>
    )
  }

  return (
    <Card
      className={`overflow-hidden hover:shadow-xl transition-all duration-300 card-hover ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.slug}`}>
        <CardContent className="p-0">
          {/* Image Section */}
          <div className="relative aspect-square bg-gray-100 overflow-hidden group">
            <img
              src={product.images[currentImageIndex]?.url || 'https://placehold.co/600x400'}
              alt={product.images[currentImageIndex]?.alt || product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Image Navigation */}
            {product.images.length > 1 && isHovered && (
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setCurrentImageIndex(index)
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {hasDiscount && (
                <Badge className="bg-[#FF3D00] text-white text-xs font-bold">
                  -{discountPercentage}%
                </Badge>
              )}
              {isOutOfStock && (
                <Badge variant="destructive" className="text-xs font-bold">
                  OUT OF STOCK
                </Badge>
              )}
              {isLowStock && !isOutOfStock && (
                <Badge className="bg-orange-500 text-white text-xs font-bold">
                  <Zap className="w-3 h-3 mr-1" />
                  LOW STOCK
                </Badge>
              )}
            </div>

            {/* Quick Actions */}
            <div
              className={`absolute top-2 right-2 flex flex-col gap-1 transition-all duration-300 ${
                isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
              }`}
            >
              <Button
                size="sm"
                variant="secondary"
                onClick={handleQuickView}
                className="w-8 h-8 p-0 rounded-full bg-white/90 hover:bg-white"
              >
                <Eye className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  toast.success('Added to wishlist!')
                }}
                className="w-8 h-8 p-0 rounded-full bg-white/90 hover:bg-white"
              >
                <Heart className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-4 space-y-3">
            {/* Brand & Category */}
            <div className="flex items-center gap-2 flex-wrap">
              {showBrand && product.brand && (
                <Badge variant="outline" className="text-xs">
                  {product.brand.name}
                </Badge>
              )}
              {showCategory && product.category && (
                <Badge variant="secondary" className="text-xs">
                  {product.category.name}
                </Badge>
              )}
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-gray-900 line-clamp-2 hover:text-[#003DA5] transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            {product.rating && product.reviewCount && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating!)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600">({product.rating})</span>
                </div>
                <span className="text-xs text-gray-500">{product.reviewCount} reviews</span>
              </div>
            )}

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="space-y-1">
                <div className="flex flex-wrap gap-1">
                  {product.features.slice(0, 2).map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {product.features.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{product.features.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Sizes & Colors */}
            <div className="flex items-center gap-4 text-xs text-gray-600">
              {product.sizes.length > 0 && (
                <div className="flex items-center gap-1">
                  <Package className="w-3 h-3" />
                  <span>Sizes: {product.sizes.slice(0, 3).join(', ')}</span>
                  {product.sizes.length > 3 && <span>+{product.sizes.length - 3}</span>}
                </div>
              )}
              {product.colors.length > 0 && (
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                  <span>
                    {product.colors.length} color{product.colors.length > 1 ? 's' : ''}
                  </span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-900">{priceInLKR}</span>
                {originalPriceInLKR && (
                  <span className="text-sm text-gray-500 line-through">{originalPriceInLKR}</span>
                )}
              </div>
              <p className="text-xs text-gray-600">SKU: {product.sku}</p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center justify-between">
              <div>
                {isOutOfStock ? (
                  <div className="flex items-center gap-1 text-red-600">
                    <X className="w-4 h-4" />
                    <span className="text-sm font-medium">Out of Stock</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-green-600">
                    <Check className="w-4 h-4" />
                    <span className="text-sm font-medium">{product.stock} available</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Button
                size="sm"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="flex-1 bg-[#FF3D00] hover:bg-[#FF3D00]/90 text-white font-bold transition-all btn-scale"
              >
                <ShoppingCart className="w-4 h-4 mr-1" />
                {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleQuickView}
                className="border-[#003DA5] text-[#003DA5] hover:bg-[#003DA5] hover:text-white"
              >
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
