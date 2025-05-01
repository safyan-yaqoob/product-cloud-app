export type Product = {
  id: string
  name: string
  description: string
  price: number
  status: "active" | "inactive"
  createdAt: string
  sku?: string
  category?: string
  stock?: number
}

export type ProductPlan = {
  id: string
  productId: string
  name: string
  description: string
  price: number
  billingCycle: "monthly" | "yearly" | "lifetime"
  features: string[]
  status: "active" | "inactive"
  createdAt: string
}

export type TenantSubscription = {
  id: string
  tenantId: string
  productId: string
  planId: string
  status: "active" | "inactive" | "cancelled" | "expired"
  startDate: string
  endDate?: string
  createdAt: string
}

export type Tenant = {
  id: string
  name: string
  email: string
  status: "active" | "inactive"
  createdAt: string
  subscriptions?: TenantSubscription[]
} 