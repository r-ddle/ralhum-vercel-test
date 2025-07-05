import { CartItem } from './cart'

export interface CheckoutState {
  step: 'review' | 'confirmation'
  customerInfo: CustomerInfo
  pricing: OrderPricing
  isSubmitting: boolean
  errors: FormErrors
  orderId?: string
}

export interface CustomerInfo {
  fullName?: string
  email?: string
  phone?: string
  secondaryPhone?: string
  address?: {
    street: string
    city: string
    postalCode: string
    province: string
  }
  specialInstructions?: string
}

export interface OrderPricing {
  subtotal: number
  shipping: number
  tax: number
  total: number
  exchangeRate: number
  currency: string
}

export interface FormErrors {
  fullName?: string
  email?: string
  phone?: string
  street?: string
  city?: string
  postalCode?: string
  province?: string
  [key: string]: string | undefined
}

export interface OrderSummary {
  orderId: string
  items: any[] // CartItem[]
  customer: {
    fullName: string
    email: string
    phone: string
    address: {
      street: string
      city: string
      postalCode: string
      province: string
    }
    specialInstructions?: string
  }
  pricing: OrderPricing
  createdAt: string
  status: string
}

export const SRI_LANKAN_PROVINCES = [
  'Central Province',
  'Eastern Province',
  'Northern Province',
  'North Central Province',
  'North Western Province',
  'Sabaragamuwa Province',
  'Southern Province',
  'Uva Province',
  'Western Province',
]
export type Province = (typeof SRI_LANKAN_PROVINCES)[number]
