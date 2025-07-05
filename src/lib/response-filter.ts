import { AuthContext } from './auth'

/**
 * Sensitive fields that should be removed from public responses
 */
const SENSITIVE_FIELDS = {
  user: [
    'salt',
    'hash',
    'resetPasswordToken',
    'resetPasswordExpiration',
    'loginAttempts',
    'lockUntil',
    'sessions',
    'notes',
  ],
  customer: [
    'notes',
    'createdBy',
    'lastModifiedBy',
    'socialMedia',
    'whatsapp.messageHistory',
    'orderStats.totalSpent',
  ],
  order: ['internalNotes', 'createdBy', 'lastModifiedBy', 'whatsapp.customerResponse'],
  product: ['pricing.costPrice', 'createdBy', 'lastModifiedBy', 'analytics.viewCount'],
}

/**
 * Admin-only fields that should only be visible to admins
 */
const ADMIN_ONLY_FIELDS = {
  customer: ['notes', 'orderStats.totalSpent', 'whatsapp.messageHistory'],
  order: ['internalNotes', 'whatsapp.customerResponse'],
  product: ['pricing.costPrice', 'analytics'],
  user: ['notes', 'loginAttempts'],
}

/**
 * Remove sensitive fields from object based on user permissions
 */
function removeFields(obj: any, fieldsToRemove: string[]): any {
  if (!obj || typeof obj !== 'object') {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => removeFields(item, fieldsToRemove))
  }

  const filtered = { ...obj }

  for (const field of fieldsToRemove) {
    if (field.includes('.')) {
      // Handle nested fields like 'whatsapp.messageHistory'
      const [parent, child] = field.split('.')
      if (filtered[parent] && typeof filtered[parent] === 'object') {
        filtered[parent] = { ...filtered[parent] }
        delete filtered[parent][child]
      }
    } else {
      delete filtered[field]
    }
  }

  return filtered
}

/**
 * Filter user data based on permissions
 */
export function filterUserData(user: any, auth: AuthContext): any {
  if (!user) return user

  const fieldsToRemove = [...SENSITIVE_FIELDS.user]

  // Non-admins can't see admin-only fields
  if (!auth.isAdmin) {
    fieldsToRemove.push(...ADMIN_ONLY_FIELDS.user)
  }

  // Users can only see their own sensitive data
  if (auth.user?.id !== user.id && !auth.isAdmin) {
    fieldsToRemove.push('email', 'phone', 'department')
  }

  return removeFields(user, fieldsToRemove)
}

/**
 * Filter customer data based on permissions
 */
export function filterCustomerData(customer: any, auth: AuthContext): any {
  if (!customer) return customer

  const fieldsToRemove = [...SENSITIVE_FIELDS.customer]

  // Only admins and managers can see customer data
  if (!auth.isAdminOrManager) {
    return null // Hide completely for non-managers
  }

  // Non-admins can't see admin-only fields
  if (!auth.isAdmin) {
    fieldsToRemove.push(...ADMIN_ONLY_FIELDS.customer)
  }

  return removeFields(customer, fieldsToRemove)
}

/**
 * Filter order data based on permissions
 */
export function filterOrderData(order: any, auth: AuthContext, customerEmail?: string): any {
  if (!order) return order

  const fieldsToRemove = [...SENSITIVE_FIELDS.order]

  // Check if user can access this order
  const canAccess =
    auth.isAdminOrManager || (customerEmail && order.customerEmail === customerEmail)

  if (!canAccess) {
    return null // Hide completely
  }

  // Non-admins can't see admin-only fields
  if (!auth.isAdmin) {
    fieldsToRemove.push(...ADMIN_ONLY_FIELDS.order)
  }

  // Customers can only see limited order info
  if (!auth.isAdminOrManager) {
    fieldsToRemove.push(
      'customerSecondaryPhone',
      'whatsapp',
      'shipping.trackingNumber',
      'orderSource',
      'createdBy',
      'lastModifiedBy',
    )
  }

  return removeFields(order, fieldsToRemove)
}

/**
 * Filter product data based on permissions
 */
export function filterProductData(product: any, auth: AuthContext): any {
  if (!product) return product

  const fieldsToRemove = [...SENSITIVE_FIELDS.product]

  // Non-managers can't see admin-only fields
  if (!auth.isAdminOrManager) {
    fieldsToRemove.push(...ADMIN_ONLY_FIELDS.product)
  }

  return removeFields(product, fieldsToRemove)
}

/**
 * Filter array of items based on type and permissions
 */
export function filterArrayData<T>(
  items: T[],
  type: 'user' | 'customer' | 'order' | 'product',
  auth: AuthContext,
  options?: { customerEmail?: string },
): T[] {
  if (!items || !Array.isArray(items)) {
    return items
  }

  return items
    .map((item) => {
      switch (type) {
        case 'user':
          return filterUserData(item, auth)
        case 'customer':
          return filterCustomerData(item, auth)
        case 'order':
          return filterOrderData(item, auth, options?.customerEmail)
        case 'product':
          return filterProductData(item, auth)
        default:
          return item
      }
    })
    .filter((item) => item !== null) // Remove null items (access denied)
}

/**
 * Create filtered response based on user permissions
 */
export function createFilteredResponse(
  data: any,
  auth: AuthContext,
  options?: {
    type?: 'user' | 'customer' | 'order' | 'product'
    customerEmail?: string
  },
) {
  if (!data) {
    return { success: true, data: null }
  }

  let filteredData = data

  if (options?.type) {
    if (Array.isArray(data)) {
      filteredData = filterArrayData(data, options.type, auth, options)
    } else {
      switch (options.type) {
        case 'user':
          filteredData = filterUserData(data, auth)
          break
        case 'customer':
          filteredData = filterCustomerData(data, auth)
          break
        case 'order':
          filteredData = filterOrderData(data, auth, options.customerEmail)
          break
        case 'product':
          filteredData = filterProductData(data, auth)
          break
      }
    }
  }

  return {
    success: true,
    data: filteredData,
  }
}

/**
 * Security headers for API responses
 */
export function getSecurityHeaders(): Record<string, string> {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Content-Security-Policy': "default-src 'self'",
  }
}
