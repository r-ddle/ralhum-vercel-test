import { CartItem } from "./cart";

export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    province: string;
  };
  specialInstructions?: string;
}

export interface OrderPricing {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  exchangeRate: number;
  currency: "LKR" | "USD";
}

export interface OrderSummary {
  orderId: string;
  items: CartItem[];
  customer: CustomerInfo;
  pricing: OrderPricing;
  createdAt: string;
  status:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
}

export interface CheckoutState {
  step: "review" | "information" | "confirmation";
  customerInfo: Partial<CustomerInfo>;
  pricing: OrderPricing;
  isSubmitting: boolean;
  errors: Record<string, string>;
  orderId?: string;
}

export interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  street?: string;
  city?: string;
  postalCode?: string;
  province?: string;
}

export interface WhatsAppMessage {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  fullAddress: string;
  productList: string;
  subtotal: string;
  shipping: string;
  tax: string;
  total: string;
  orderId: string;
  currentDate: string;
  specialInstructions: string;
}

export const SRI_LANKAN_PROVINCES = [
  "Western Province",
  "Central Province",
  "Southern Province",
  "Northern Province",
  "Eastern Province",
  "North Western Province",
  "North Central Province",
  "Uva Province",
  "Sabaragamuwa Province",
] as const;

export type Province = (typeof SRI_LANKAN_PROVINCES)[number];
