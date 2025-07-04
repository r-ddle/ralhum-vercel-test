"use client";

import { useState, useEffect } from "react";
import { useCart, useCartSummary } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ShoppingCart,
  CreditCard,
  MessageCircle,
  Truck,
  Shield,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Package,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CustomerInfo,
  OrderSummary,
  CheckoutState,
  FormErrors,
  SRI_LANKAN_PROVINCES,
} from "@/types/checkout";
import {
  formatLKR,
  convertUsdToLkr,
  calculateTax,
  calculateShipping,
  getCurrentExchangeRate,
} from "@/lib/currency";
import {
  openWhatsAppOrder,
  generateOrderId,
  validateSriLankanPhone,
  formatSriLankanPhone,
  getWhatsAppButtonText,
} from "@/lib/whatsapp";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const cartSummary = useCartSummary();

  const [checkoutState, setCheckoutState] = useState<CheckoutState>({
    step: "review",
    customerInfo: {},
    pricing: {
      subtotal: 0,
      shipping: 0,
      tax: 0,
      total: 0,
      exchangeRate: 315,
      currency: "LKR",
    },
    isSubmitting: false,
    errors: {},
  });

  const [exchangeRate, setExchangeRate] = useState(315);
  const [isLoadingRate, setIsLoadingRate] = useState(true);

  // Load exchange rate on mount
  useEffect(() => {
    const loadExchangeRate = async () => {
      try {
        const rate = await getCurrentExchangeRate();
        setExchangeRate(rate);
        setCheckoutState((prev) => ({
          ...prev,
          pricing: { ...prev.pricing, exchangeRate: rate },
        }));
      } catch (error) {
        console.warn("Using fallback exchange rate");
      } finally {
        setIsLoadingRate(false);
      }
    };

    loadExchangeRate();
  }, []);

  // Calculate pricing whenever cart or exchange rate changes
  useEffect(() => {
    if (cart.items.length === 0) return;

    const subtotalUSD = cart.items.reduce(
      (sum, item) => sum + item.variant.price * item.quantity,
      0,
    );

    const subtotalLKR = convertUsdToLkr(subtotalUSD, exchangeRate);
    const shipping = calculateShipping(subtotalLKR);
    const tax = calculateTax(subtotalLKR + shipping);
    const total = subtotalLKR + shipping + tax;

    setCheckoutState((prev) => ({
      ...prev,
      pricing: {
        subtotal: subtotalLKR,
        shipping,
        tax,
        total,
        exchangeRate,
        currency: "LKR",
      },
    }));
  }, [cart.items, exchangeRate]);

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.items.length === 0 && !isLoadingRate) {
      router.push("/products");
    }
  }, [cart.items.length, isLoadingRate, router]);

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    const { customerInfo } = checkoutState;

    if (!customerInfo.fullName?.trim()) {
      errors.fullName = "Full name is required";
    }

    if (!customerInfo.email?.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!customerInfo.phone?.trim()) {
      errors.phone = "Phone number is required";
    } else if (!validateSriLankanPhone(customerInfo.phone)) {
      errors.phone = "Please enter a valid Sri Lankan phone number";
    }

    if (!customerInfo.address?.street?.trim()) {
      errors.street = "Street address is required";
    }

    if (!customerInfo.address?.city?.trim()) {
      errors.city = "City is required";
    }

    if (!customerInfo.address?.postalCode?.trim()) {
      errors.postalCode = "Postal code is required";
    }

    if (!customerInfo.address?.province?.trim()) {
      errors.province = "Province is required";
    }

    setCheckoutState((prev) => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setCheckoutState((prev) => ({
      ...prev,
      customerInfo: {
        ...prev.customerInfo,
        ...(field.includes(".")
          ? {
              address: {
                ...prev.customerInfo.address,
                [field.split(".")[1]]: value,
              },
            }
          : { [field]: value }),
      },
      errors: {
        ...prev.errors,
        [field.includes(".") ? field.split(".")[1] : field]: undefined,
      },
    }));
  };

  const handleSubmitOrder = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    setCheckoutState((prev) => ({ ...prev, isSubmitting: true }));

    try {
      const orderId = generateOrderId();

      const order: OrderSummary = {
        orderId,
        items: cart.items,
        customer: {
          fullName: checkoutState.customerInfo.fullName!,
          email: checkoutState.customerInfo.email!,
          phone: formatSriLankanPhone(checkoutState.customerInfo.phone!),
          address: {
            street: checkoutState.customerInfo.address!.street,
            city: checkoutState.customerInfo.address!.city,
            postalCode: checkoutState.customerInfo.address!.postalCode,
            province: checkoutState.customerInfo.address!.province,
          },
          specialInstructions: checkoutState.customerInfo.specialInstructions,
        },
        pricing: checkoutState.pricing,
        createdAt: new Date().toISOString(),
        status: "pending",
      };

      // Store order in localStorage for tracking
      const existingOrders = JSON.parse(
        localStorage.getItem("ralhum-orders") || "[]",
      );
      existingOrders.push(order);
      localStorage.setItem("ralhum-orders", JSON.stringify(existingOrders));

      // Open WhatsApp
      openWhatsAppOrder(order);

      // Clear cart and redirect
      clearCart();
      setCheckoutState((prev) => ({ ...prev, step: "confirmation", orderId }));

      toast.success("Order sent to WhatsApp successfully!");
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("Failed to process order. Please try again.");
    } finally {
      setCheckoutState((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  if (cart.items.length === 0 && !isLoadingRate) {
    return null; // Will redirect
  }

  if (checkoutState.step === "confirmation") {
    return <CheckoutConfirmation orderId={checkoutState.orderId!} />;
  }

  return (
    <main className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/products">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
          <h1 className="text-3xl font-black text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">
            Review your order and complete your purchase
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Customer Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={checkoutState.customerInfo.fullName || ""}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      className={
                        checkoutState.errors.fullName ? "border-red-500" : ""
                      }
                      placeholder="Enter your full name"
                    />
                    {checkoutState.errors.fullName && (
                      <p className="text-sm text-red-600 mt-1">
                        {checkoutState.errors.fullName}
                      </p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={checkoutState.customerInfo.email || ""}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className={
                          checkoutState.errors.email ? "border-red-500" : ""
                        }
                        placeholder="your@email.com"
                      />
                      {checkoutState.errors.email && (
                        <p className="text-sm text-red-600 mt-1">
                          {checkoutState.errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={checkoutState.customerInfo.phone || ""}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className={
                          checkoutState.errors.phone ? "border-red-500" : ""
                        }
                        placeholder="+94 77 123 4567"
                      />
                      {checkoutState.errors.phone && (
                        <p className="text-sm text-red-600 mt-1">
                          {checkoutState.errors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="street">Street Address *</Label>
                  <Input
                    id="street"
                    value={checkoutState.customerInfo.address?.street || ""}
                    onChange={(e) =>
                      handleInputChange("address.street", e.target.value)
                    }
                    className={
                      checkoutState.errors.street ? "border-red-500" : ""
                    }
                    placeholder="Enter your street address"
                  />
                  {checkoutState.errors.street && (
                    <p className="text-sm text-red-600 mt-1">
                      {checkoutState.errors.street}
                    </p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={checkoutState.customerInfo.address?.city || ""}
                      onChange={(e) =>
                        handleInputChange("address.city", e.target.value)
                      }
                      className={
                        checkoutState.errors.city ? "border-red-500" : ""
                      }
                      placeholder="City"
                    />
                    {checkoutState.errors.city && (
                      <p className="text-sm text-red-600 mt-1">
                        {checkoutState.errors.city}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="postalCode">Postal Code *</Label>
                    <Input
                      id="postalCode"
                      value={
                        checkoutState.customerInfo.address?.postalCode || ""
                      }
                      onChange={(e) =>
                        handleInputChange("address.postalCode", e.target.value)
                      }
                      className={
                        checkoutState.errors.postalCode ? "border-red-500" : ""
                      }
                      placeholder="10100"
                    />
                    {checkoutState.errors.postalCode && (
                      <p className="text-sm text-red-600 mt-1">
                        {checkoutState.errors.postalCode}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="province">Province *</Label>
                  <Select
                    value={checkoutState.customerInfo.address?.province || ""}
                    onValueChange={(value) =>
                      handleInputChange("address.province", value)
                    }
                  >
                    <SelectTrigger
                      className={
                        checkoutState.errors.province ? "border-red-500" : ""
                      }
                    >
                      <SelectValue placeholder="Select your province" />
                    </SelectTrigger>
                    <SelectContent>
                      {SRI_LANKAN_PROVINCES.map((province) => (
                        <SelectItem key={province} value={province}>
                          {province}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {checkoutState.errors.province && (
                    <p className="text-sm text-red-600 mt-1">
                      {checkoutState.errors.province}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="specialInstructions">
                    Special Instructions (Optional)
                  </Label>
                  <Textarea
                    id="specialInstructions"
                    value={checkoutState.customerInfo.specialInstructions || ""}
                    onChange={(e) =>
                      handleInputChange("specialInstructions", e.target.value)
                    }
                    placeholder="Any special delivery instructions..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingRate ? (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <Skeleton className="w-16 h-16 rounded" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                        <Skeleton className="h-4 w-20" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.items.map((item) => {
                      const itemTotalUSD = item.variant.price * item.quantity;
                      const itemTotalLKR = convertUsdToLkr(
                        itemTotalUSD,
                        exchangeRate,
                      );

                      return (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 pb-4 border-b last:border-b-0"
                        >
                          <img
                            src={
                              item.product.images[0]?.url || "/placeholder.svg"
                            }
                            alt={item.product.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">
                              {item.product.title}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {item.variant.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">
                              {formatLKR(itemTotalLKR)}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatLKR(
                                convertUsdToLkr(
                                  item.variant.price,
                                  exchangeRate,
                                ),
                              )}{" "}
                              each
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pricing Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingRate ? (
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-6 w-full" />
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>{formatLKR(checkoutState.pricing.subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span>
                        {checkoutState.pricing.shipping === 0 ? (
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-800"
                          >
                            FREE
                          </Badge>
                        ) : (
                          formatLKR(checkoutState.pricing.shipping)
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax (15%)</span>
                      <span>{formatLKR(checkoutState.pricing.tax)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-[#003DA5]">
                        {formatLKR(checkoutState.pricing.total)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 text-center">
                      Exchange rate: 1 USD = {exchangeRate} LKR
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Disabled Online Payment */}
                <div className="relative">
                  <Button
                    disabled
                    className="w-full h-14 bg-gray-100 text-gray-400 cursor-not-allowed"
                    variant="outline"
                  >
                    <CreditCard className="w-5 h-5 mr-3" />
                    Pay Online
                    <Badge className="ml-auto bg-orange-100 text-orange-800">
                      Coming Soon
                    </Badge>
                  </Button>
                </div>

                <div className="text-center text-sm text-gray-500">OR</div>

                {/* WhatsApp Payment */}
                <Button
                  onClick={handleSubmitOrder}
                  disabled={checkoutState.isSubmitting || isLoadingRate}
                  className="w-full h-14 bg-green-600 hover:bg-green-700 text-white font-bold text-lg"
                >
                  {checkoutState.isSubmitting ? (
                    <>
                      <div className="w-5 h-5 mr-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-5 h-5 mr-3" />
                      {getWhatsAppButtonText()}
                    </>
                  )}
                </Button>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    Your order will be sent to WhatsApp for confirmation. Our
                    team will provide payment instructions and process your
                    order.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 text-center text-sm">
              <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg">
                <Truck className="w-6 h-6 text-[#003DA5]" />
                <span className="font-medium">Free Shipping</span>
                <span className="text-gray-600">On orders over LKR 23,625</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg">
                <Shield className="w-6 h-6 text-[#003DA5]" />
                <span className="font-medium">Secure Process</span>
                <span className="text-gray-600">Safe & encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function CheckoutConfirmation({ orderId }: { orderId: string }) {
  return (
    <main className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>

          <h1 className="text-3xl font-black text-gray-900 mb-4">
            Order Sent Successfully!
          </h1>
          <p className="text-gray-600 mb-6">
            Your order has been sent to our WhatsApp. We'll contact you shortly
            to confirm your order and provide payment instructions.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">Order ID</p>
            <p className="text-lg font-bold text-[#003DA5]">#{orderId}</p>
          </div>

          <div className="space-y-3">
            <Button
              asChild
              className="w-full bg-[#003DA5] hover:bg-[#003DA5]/90"
            >
              <Link href="/products">Continue Shopping</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>

          <div className="mt-8 pt-6 border-t text-sm text-gray-600">
            <p className="flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" />
              Questions? Call us at +94 77 235 0712
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
