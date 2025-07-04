"use client";

import { useState, useEffect } from "react";
import { Product, ProductVariant } from "@/types/product";
import { getProductBySlug, getProductsByBrand } from "@/lib/products";
import { formatLKR, convertUsdToLkr, getPriceDisplay } from "@/lib/currency";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/product-card";
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
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";

interface ProductDetailPageProps {
  params: {
    slug: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null,
  );
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  const { addItem } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const foundProduct = getProductBySlug(params.slug);

      if (!foundProduct) {
        notFound();
      }

      setProduct(foundProduct);
      setSelectedVariant(foundProduct.variants[0]);

      // Get related products from same brand
      const related = getProductsByBrand(foundProduct.brand.slug, 4).filter(
        (p) => p.id !== foundProduct.id,
      );
      setRelatedProducts(related);

      setLoading(false);
    };

    fetchProduct();
  }, [params.slug]);

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (!product || !selectedVariant) {
    notFound();
  }

  const handleAddToCart = () => {
    if (selectedVariant.inventory < quantity) {
      toast.error(`Only ${selectedVariant.inventory} items available in stock`);
      return;
    }

    addItem(product, selectedVariant, quantity);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: product.shortDescription,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      toast.success("Product link copied to clipboard!");
    }
  };

  const isOutOfStock = selectedVariant.inventory === 0;
  const isLowStock =
    selectedVariant.inventory > 0 && selectedVariant.inventory <= 5;
  const maxQuantity = Math.min(10, selectedVariant.inventory);

  return (
    <main className="min-h-screen pt-16">
      {/* Breadcrumb */}
      <section className="py-4 bg-gray-50 dark:bg-gray-900 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Link
              href="/"
              className="hover:text-[#003DA5] transition-colors leading-none"
            >
              Home
            </Link>
            <span className="leading-none">/</span>
            <Link
              href="/products"
              className="hover:text-[#003DA5] transition-colors leading-none"
            >
              Store
            </Link>
            <span className="leading-none">/</span>
            <Link
              href={`/products?brands=${product.brand.slug}`}
              className="hover:text-[#003DA5] transition-colors leading-none"
            >
              {product.brand.name}
            </Link>
            <span className="leading-none">/</span>
            <span className="text-gray-900 dark:text-white font-medium truncate leading-none">
              {product.title}
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
                  src={product.images[selectedImage]?.url || "/placeholder.svg"}
                  alt={product.images[selectedImage]?.alt || product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Product Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.featured && (
                    <Badge className="bg-[#FFD700] text-[#1A1A1A] font-bold">
                      FEATURED
                    </Badge>
                  )}
                  {selectedVariant.compareAtPrice &&
                    selectedVariant.compareAtPrice > selectedVariant.price && (
                      <Badge className="bg-[#FF3D00] text-white font-bold">
                        SALE
                      </Badge>
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
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        index === selectedImage
                          ? "border-[#003DA5] ring-2 ring-[#003DA5]/20"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Brand */}
              <div className="flex items-center gap-2">
                <Link
                  href={`/products?brands=${product.brand.slug}`}
                  className="text-[#003DA5] font-bold text-lg hover:underline"
                >
                  {product.brand.name}
                </Link>
                {product.brand.featured && (
                  <Badge variant="outline" className="text-xs">
                    <Award className="w-3 h-3 mr-1" />
                    Official Partner
                  </Badge>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl lg:text-4xl font-black text-gray-900 dark:text-white leading-tight">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < 4
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-gray-600 ml-2">(4.2)</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  24 Reviews
                </Badge>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-gray-900 dark:text-white">
                    {formatLKR(convertUsdToLkr(selectedVariant.price))}
                  </span>
                  {selectedVariant.compareAtPrice &&
                    selectedVariant.compareAtPrice > selectedVariant.price && (
                      <>
                        <span className="text-xl text-gray-500 line-through">
                          {formatLKR(
                            convertUsdToLkr(selectedVariant.compareAtPrice),
                          )}
                        </span>
                        <Badge className="bg-[#FF3D00] text-white font-bold">
                          SAVE{" "}
                          {formatLKR(
                            convertUsdToLkr(
                              selectedVariant.compareAtPrice -
                                selectedVariant.price,
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

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                {isOutOfStock ? (
                  <Badge variant="destructive" className="font-bold">
                    Out of Stock
                  </Badge>
                ) : isLowStock ? (
                  <Badge
                    variant="secondary"
                    className="bg-orange-100 text-orange-800 font-bold"
                  >
                    <Zap className="w-3 h-3 mr-1" />
                    Only {selectedVariant.inventory} left!
                  </Badge>
                ) : (
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 font-bold"
                  >
                    <Check className="w-3 h-3 mr-1" />
                    In Stock
                  </Badge>
                )}
              </div>

              {/* Short Description */}
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Variant Selection */}
              {product.variants.length > 1 && (
                <div className="space-y-3">
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    Select Options:
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {product.variants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => {
                          setSelectedVariant(variant);
                          setQuantity(1);
                        }}
                        className={`p-3 rounded-lg border-2 text-left transition-all ${
                          selectedVariant.id === variant.id
                            ? "border-[#003DA5] bg-[#003DA5]/5 ring-2 ring-[#003DA5]/20"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="font-medium">{variant.name}</div>
                        <div className="text-sm text-gray-600">
                          {formatLKR(convertUsdToLkr(variant.price))}
                          {variant.inventory <= 5 && variant.inventory > 0 && (
                            <span className="text-orange-600 ml-2">
                              • Low stock
                            </span>
                          )}
                          {variant.inventory === 0 && (
                            <span className="text-red-600 ml-2">
                              • Out of stock
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="space-y-2">
                <label
                  htmlFor="quantity"
                  className="font-bold text-gray-900 dark:text-white"
                >
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
                    <span className="w-16 text-center font-medium">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setQuantity(Math.min(maxQuantity, quantity + 1))
                      }
                      disabled={quantity >= maxQuantity || isOutOfStock}
                      className="h-10 w-10 p-0"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <span className="text-sm text-gray-600">
                    {maxQuantity} available
                  </span>
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
                  {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full font-bold border-2 border-[#003DA5] text-[#003DA5] hover:bg-[#003DA5] hover:text-white"
                  onClick={() => {
                    handleAddToCart();
                    router.push("/checkout");
                  }}
                  disabled={isOutOfStock}
                >
                  {isOutOfStock ? "Out of Stock" : "Buy Now"}
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
              <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4 mb-8">
                <TabsTrigger value="description" className="font-bold">
                  Description
                </TabsTrigger>
                <TabsTrigger value="specifications" className="font-bold">
                  Specifications
                </TabsTrigger>
                <TabsTrigger value="reviews" className="font-bold">
                  Reviews
                </TabsTrigger>
                <TabsTrigger value="shipping" className="font-bold">
                  Shipping
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">
                      Product Description
                    </h3>
                    <div className="prose max-w-none text-gray-700 dark:text-gray-300">
                      <p className="leading-relaxed">{product.description}</p>

                      {product.tags.length > 0 && (
                        <div className="mt-6">
                          <h4 className="font-bold mb-2">Tags:</h4>
                          <div className="flex flex-wrap gap-2">
                            {product.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="specifications" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">
                      Technical Specifications
                    </h3>
                    {product.specifications ? (
                      <div className="grid md:grid-cols-2 gap-4">
                        {Object.entries(product.specifications).map(
                          ([key, value]) => (
                            <div
                              key={key}
                              className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700"
                            >
                              <span className="font-medium text-gray-600 dark:text-gray-400">
                                {key}:
                              </span>
                              <span className="font-bold text-gray-900 dark:text-white">
                                {value}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-400">
                        No specifications available.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
                    <div className="text-center py-8 text-gray-600 dark:text-gray-400">
                      <Star className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>Reviews coming soon!</p>
                      <p className="text-sm mt-2">
                        Be the first to review this product.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="shipping" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">
                      Shipping Information
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Truck className="w-5 h-5 text-[#003DA5] mt-1" />
                        <div>
                          <h4 className="font-bold">Free Standard Shipping</h4>
                          <p className="text-sm text-gray-600">
                            On orders over $75. Delivered in 3-5 business days.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Globe className="w-5 h-5 text-[#003DA5] mt-1" />
                        <div>
                          <h4 className="font-bold">Island-wide Delivery</h4>
                          <p className="text-sm text-gray-600">
                            We deliver across Sri Lanka with secure packaging.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <RefreshCw className="w-5 h-5 text-[#003DA5] mt-1" />
                        <div>
                          <h4 className="font-bold">Easy Returns</h4>
                          <p className="text-sm text-gray-600">
                            30-day return policy for unused items in original
                            packaging.
                          </p>
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
                  More from {product.brand.name}
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
                  <Link href={`/products?brands=${product.brand.slug}`}>
                    View All {product.brand.name} Products
                  </Link>
                </Button>
              </div>
            </section>
          )}
        </div>
      </section>
    </main>
  );
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
                <div
                  key={i}
                  className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse"
                />
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
  );
}
