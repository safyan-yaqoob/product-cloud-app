import { toast } from "sonner"
import { getUserManager } from "@/lib/auth"

const API_GATEWAY_URL = 'https://localhost:7168'

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_GATEWAY_URL}${endpoint}`
  
  try {
    // Get the current user and access token
    const userManager = getUserManager()
    const user = await userManager.getUser()
    const headers = new Headers(options.headers || {})
    
    // Set default content type
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json')
    }

    // Add authorization header if user is authenticated
    if (user && user.access_token) {
      headers.set('Authorization', `Bearer ${user.access_token}`)
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'An error occurred' }))
      throw new ApiError(response.status, error.message || 'Something went wrong')
    }

    return response.json()
  } catch (error) {
    if (error instanceof ApiError) {
      toast.error(error.message)
    } else {
      console.error('API error:', error)
      toast.error('An unexpected error occurred')
    }
    throw error
  }
} 