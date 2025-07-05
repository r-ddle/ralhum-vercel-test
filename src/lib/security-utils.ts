import { NextRequest, NextResponse } from 'next/server'
import { AuthContext, getAuthContext, requireAdmin } from './auth'
import { rateLimit, rateLimitConfigs, withRateLimit } from './rate-limit'
import { getSecurityHeaders } from './response-filter'
import { boolean } from 'zod'

/**
 * Security configuration for different types of endpoints
 */
export const securityConfigs = {
  // Public endpoints (products, categories, brands)
  public: {
    rateLimit: rateLimitConfigs.lenient,
    requireAuth: false,
    requireAdmin: false,
    allowedMethods: ['GET'],
  },

  // Public write endpoints (orders, customer registration)
  publicWrite: {
    rateLimit: rateLimitConfigs.strict,
    requireAuth: false,
    requireAdmin: false,
    allowedMethods: ['POST'],
  },

  // Protected read endpoints (user profile, own orders)
  protected: {
    rateLimit: rateLimitConfigs.moderate,
    requireAuth: true,
    requireAdmin: true,
    allowedMethods: ['GET'],
  },

  // Protected write endpoints (update profile)
  protectedWrite: {
    rateLimit: rateLimitConfigs.strict,
    requireAuth: true,
    requireAdmin: true,
    allowedMethods: ['POST', 'PUT', 'PATCH'],
  },

  // Admin endpoints (manage orders, customers, products)
  admin: {
    rateLimit: rateLimitConfigs.moderate,
    requireAuth: true,
    requireAdmin: true,
    allowedMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  },

  // Search and expensive operations
  search: {
    rateLimit: rateLimitConfigs.search,
    requireAuth: false,
    allowedMethods: ['GET'],
  },
}

/**
 * Secure API handler wrapper
 */
export function secureAPI(
  config: keyof typeof securityConfigs,
  handler: (request: NextRequest, auth?: AuthContext) => Promise<Response>,
) {
  const secConfig: any = securityConfigs[config]

  return withRateLimit(secConfig.rateLimit, async (request: NextRequest) => {
    try {
      // Check HTTP method
      if (!secConfig.allowedMethods.includes(request.method)) {
        return NextResponse.json(
          { success: false, error: 'Method not allowed' },
          {
            status: 405,
            headers: {
              ...getSecurityHeaders(),
              Allow: secConfig.allowedMethods.join(', '),
            },
          },
        )
      }

      // Get auth context if needed
      let auth: AuthContext | undefined
      if (secConfig.requireAuth || secConfig.requireAdmin) {
        auth = await getAuthContext(request)

        if (!auth.isAuthenticated) {
          return NextResponse.json(
            { success: false, error: 'Authentication required' },
            { status: 401, headers: getSecurityHeaders() },
          )
        }

        if (secConfig.requireAdmin === true && !auth.isAdmin) {
          return NextResponse.json(
            { success: false, error: 'Admin access required' },
            { status: 403, headers: getSecurityHeaders() },
          )
        }
      }

      // Call the actual handler
      const response = await handler(request, auth)

      // Add security headers to response
      const securityHeaders = getSecurityHeaders()
      Object.entries(securityHeaders).forEach(([key, value]) => {
        response.headers.set(key, value)
      })

      return response
    } catch (error) {
      console.error('API error:', error)
      return NextResponse.json(
        { success: false, error: 'Internal server error' },
        { status: 500, headers: getSecurityHeaders() },
      )
    }
  })
}

/**
 * Validate request body size and content type
 */
export function validateRequest(
  request: NextRequest,
  options?: {
    maxSize?: number
    allowedContentTypes?: string[]
  },
): string | null {
  const maxSize = options?.maxSize || 5 * 1024 * 1024 // 5MB default
  const allowedTypes = options?.allowedContentTypes || ['application/json']

  // Check content length
  const contentLength = request.headers.get('content-length')
  if (contentLength && parseInt(contentLength) > maxSize) {
    return 'Request too large'
  }

  // Check content type for POST/PUT/PATCH requests
  if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
    const contentType = request.headers.get('content-type')
    if (!contentType || !allowedTypes.some((type) => contentType.includes(type))) {
      return `Invalid content type. Allowed: ${allowedTypes.join(', ')}`
    }
  }

  return null
}

/**
 * Sanitize input to prevent XSS and injection attacks
 */
export function sanitizeInput(input: any): any {
  if (typeof input === 'string') {
    return input
      .trim()
      .replace(/[<>\"'&]/g, '') // Remove potentially dangerous characters
      .substring(0, 1000) // Limit string length
  }

  if (Array.isArray(input)) {
    return input.slice(0, 100).map(sanitizeInput) // Limit array size
  }

  if (typeof input === 'object' && input !== null) {
    const sanitized: any = {}
    const allowedKeys = Object.keys(input).slice(0, 50) // Limit object keys

    for (const key of allowedKeys) {
      if (typeof key === 'string' && key.length < 100) {
        // Limit key length
        sanitized[key] = sanitizeInput(input[key])
      }
    }

    return sanitized
  }

  return input
}

/**
 * Create error response with security headers
 */
export function createErrorResponse(
  message: string,
  status: number = 500,
  details?: any,
): NextResponse {
  const response = {
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && details && { details }),
  }

  return NextResponse.json(response, {
    status,
    headers: getSecurityHeaders(),
  })
}

/**
 * Create success response with security headers
 */
export function createSuccessResponse(data: any, pagination?: any): NextResponse {
  const response = {
    success: true,
    data,
    ...(pagination && { pagination }),
  }

  return NextResponse.json(response, {
    headers: getSecurityHeaders(),
  })
}

/**
 * Log security events for monitoring
 */
export function logSecurityEvent(
  event: 'AUTH_FAILURE' | 'RATE_LIMIT' | 'SUSPICIOUS_REQUEST' | 'ACCESS_DENIED',
  request: NextRequest,
  details?: any,
) {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'

  const userAgent = request.headers.get('user-agent') || 'unknown'

  console.log(`[SECURITY] ${event}:`, {
    ip,
    method: request.method,
    url: request.nextUrl.pathname,
    userAgent,
    timestamp: new Date().toISOString(),
    ...details,
  })
}

/**
 * Quick security wrapper for simple GET endpoints
 */
export const secureGET = (handler: (request: NextRequest) => Promise<Response>) =>
  secureAPI('public', handler)

/**
 * Quick security wrapper for admin endpoints
 */
export const secureAdmin = (
  handler: (request: NextRequest, auth?: AuthContext) => Promise<Response>,
) => secureAPI('admin', handler)

/**
 * Quick security wrapper for search endpoints
 */
export const secureSearch = (handler: (request: NextRequest) => Promise<Response>) =>
  secureAPI('search', handler)
