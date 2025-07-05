import { Product } from "@/types/product";
import { formatProductPrice, getPriceDisplay } from "./currency";

// Update the existing formatPrice function to use LKR
export function formatPrice(
  usdPrice: number,
  showBoth: boolean = false,
): string {
  return formatProductPrice(usdPrice, showBoth);
}

// Get LKR price for calculations
export function getProductPriceLKR(product: Product): {
  min: number;
  max: number;
} {
  const usdPrices = product.variants.map((v) => v.price);
  const minUsd = Math.min(...usdPrices);
  const maxUsd = Math.max(...usdPrices);

  const minDisplay = getPriceDisplay(minUsd);
  const maxDisplay = getPriceDisplay(maxUsd);

  return {
    min: minDisplay.lkr,
    max: maxDisplay.lkr,
  };
}

// Get price display with both currencies
export function getProductPriceDisplay(product: Product) {
  const usdPrices = product.variants.map((v) => v.price);
  const minUsd = Math.min(...usdPrices);
  const maxUsd = Math.max(...usdPrices);

  if (minUsd === maxUsd) {
    return getPriceDisplay(minUsd);
  }

  const minDisplay = getPriceDisplay(minUsd);
  const maxDisplay = getPriceDisplay(maxUsd);

  return {
    lkr: maxDisplay.lkr,
    usd: maxUsd,
    lkrFormatted: `${minDisplay.lkrFormatted} - ${maxDisplay.lkrFormatted}`,
    usdFormatted: `${minDisplay.usdFormatted} - ${maxDisplay.usdFormatted}`,
    bothFormatted: `${minDisplay.lkrFormatted} - ${maxDisplay.lkrFormatted}`,
  };
}
