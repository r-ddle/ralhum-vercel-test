"use client";

import { Product } from "@/types/product";
import { useCart } from "@/hooks/use-cart";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, Eye } from "lucide-react";
import { getProductPriceDisplay } from "@/lib/products-pricing";
import { formatLKR, convertUsdToLkr } from "@/lib/currency";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  variant?: "grid" | "list";
  showBrand?: boolean;
  showCategory?: boolean;
}

export function ProductCard({
  product,
  variant = "grid",
  showBrand = true,
  showCategory = true,
}: ProductCardProps) {
  const { addItem } = useCart();
  const priceDisplay = getProductPriceDisplay(product);
  const primaryImage = product.images[0];
  const inStock = product.variants.some((v) => v.inventory > 0);

  const handleAddToCart = () => {
    if (product.variants[0] && inStock) {
      addItem(product, product.variants[0], 1);
    }
  };

  if (variant === "list") {
    return (
      <Card className="group hover:shadow-lg transition-all duration-300 bg-white border-gray-200">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="relative md:w-64 h-48 md:h-auto overflow-hidden">
              <img
                src={primaryImage?.url || "/placeholder.svg"}
                alt={primaryImage?.alt || product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {product.featured && (
                  <Badge className="bg-[#FFD700] text-[#1A1A1A] font-bold text-xs">
                    FEATURED
                  </Badge>
                )}
                {!inStock && (
                  <Badge variant="destructive" className="font-bold text-xs">
                    OUT OF STOCK
                  </Badge>
                )}
                {product.variants.some((v) => v.compareAtPrice) && (
                  <Badge className="bg-[#FF3D00] text-white font-bold text-xs">
                    SALE
                  </Badge>
                )}
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-6">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  {showBrand && (
                    <p className="text-sm font-semibold text-[#003DA5] mb-1">
                      {product.brand.name}
                    </p>
                  )}
                  <Link href={`/products/${product.slug}`}>
                    <h3 className="text-lg font-bold text-[#1A1A1A] group-hover:text-[#003DA5] transition-colors mb-2 line-clamp-2">
                      {product.title}
                    </h3>
                  </Link>
                  {showCategory && (
                    <div className="flex gap-1 mb-3">
                      {product.categories.slice(0, 2).map((category) => (
                        <Badge
                          key={category.id}
                          variant="outline"
                          className="text-xs border-gray-300"
                        >
                          {category.name}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="text-right ml-4">
                  <div className="flex items-center gap-1 mb-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < 4
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">(4.2)</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold text-[#1A1A1A]">
                      {priceDisplay.lkrFormatted}
                    </span>
                    {product.variants.some((v) => v.compareAtPrice) && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        {formatLKR(
                          convertUsdToLkr(
                            product.variants.find((v) => v.compareAtPrice)
                              ?.compareAtPrice || 0,
                          ),
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {product.shortDescription || product.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Link href={`/products/${product.slug}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#003DA5] text-[#003DA5] hover:bg-[#003DA5] hover:text-white"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    className="bg-[#FF3D00] hover:bg-[#FF3D00]/90 text-white"
                    disabled={!inStock}
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </div>

                <div className="flex gap-1">
                  {product.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 bg-white border-gray-200 overflow-hidden">
      <CardContent className="p-0">
        {/* Image Section */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={primaryImage?.url || "/placeholder.svg"}
            alt={primaryImage?.alt || product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.featured && (
              <Badge className="bg-[#FFD700] text-[#1A1A1A] font-bold text-xs">
                FEATURED
              </Badge>
            )}
            {!inStock && (
              <Badge variant="destructive" className="font-bold text-xs">
                OUT OF STOCK
              </Badge>
            )}
            {product.variants.some((v) => v.compareAtPrice) && (
              <Badge className="bg-[#FF3D00] text-white font-bold text-xs">
                SALE
              </Badge>
            )}
          </div>

          {/* Quick Actions Overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            <Link href={`/products/${product.slug}`}>
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/90 text-[#1A1A1A] hover:bg-white"
              >
                <Eye className="w-4 h-4 mr-2" />
                Quick View
              </Button>
            </Link>
            <Button
              size="sm"
              className="bg-[#FF3D00] hover:bg-[#FF3D00]/90 text-white"
              disabled={!inStock}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4">
          {showBrand && (
            <p className="text-sm font-semibold text-[#003DA5] mb-1">
              {product.brand.name}
            </p>
          )}

          <Link href={`/products/${product.slug}`}>
            <h3 className="text-lg font-bold text-[#1A1A1A] group-hover:text-[#003DA5] transition-colors mb-2 line-clamp-2">
              {product.title}
            </h3>
          </Link>

          {showCategory && (
            <div className="flex gap-1 mb-3">
              {product.categories.slice(0, 2).map((category) => (
                <Badge
                  key={category.id}
                  variant="outline"
                  className="text-xs border-gray-300"
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          )}

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.shortDescription || product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-sm text-gray-600 ml-1">(4.2)</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xl font-bold text-[#1A1A1A]">
                {priceDisplay.lkrFormatted}
              </span>
              {product.variants.some((v) => v.compareAtPrice) && (
                <span className="text-sm text-gray-500 line-through ml-2">
                  {formatLKR(
                    convertUsdToLkr(
                      product.variants.find((v) => v.compareAtPrice)
                        ?.compareAtPrice || 0,
                    ),
                  )}
                </span>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="flex gap-1 mb-4">
            {product.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Link href={`/products/${product.slug}`} className="flex-1">
              <Button
                variant="outline"
                size="sm"
                className="w-full border-[#003DA5] text-[#003DA5] hover:bg-[#003DA5] hover:text-white"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </Link>
            <Button
              size="sm"
              className="bg-[#FF3D00] hover:bg-[#FF3D00]/90 text-white px-6"
              disabled={!inStock}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
