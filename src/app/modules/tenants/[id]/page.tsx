"use client"

import { useState } from "react"
import { type Tenant, type Product, type ProductPlan } from "@/lib/api"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Dummy data
const dummyTenants: Tenant[] = [
  {
    id: "1",
    name: "Acme Corporation",
    email: "contact@acme.com",
    status: "active",
    createdAt: new Date().toISOString(),
    subscriptions: [
      {
        id: "1",
        tenantId: "1",
        productId: "1",
        planId: "1",
        status: "active",
        startDate: new Date().toISOString(),
        createdAt: new Date().toISOString()
      }
    ]
  }
]

const dummyProducts: Product[] = [
  {
    id: "1",
    name: "Premium Widget",
    description: "A high-quality widget with advanced features",
    price: 99.99,
    status: "active",
    createdAt: new Date().toISOString(),
    sku: "WID-001",
    category: "Widgets",
    stock: 100
  }
]

const dummyPlans: ProductPlan[] = [
  {
    id: "1",
    productId: "1",
    name: "Premium Monthly",
    description: "Monthly subscription for Premium Widget",
    price: 9.99,
    billingCycle: "monthly",
    features: ["All Premium Features", "Priority Support", "Monthly Updates"],
    status: "active",
    createdAt: new Date().toISOString()
  }
]

export default function TenantDetailsPage() {
  const params = useParams()
  const [tenant] = useState<Tenant | undefined>(
    dummyTenants.find((t) => t.id === params.id)
  )

  if (!tenant) {
    return <div className="p-6">Tenant not found</div>
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tenant Details</h1>
        <div className="space-x-2">
          <Link href="/modules/tenants">
            <Button variant="outline">Back to Tenants</Button>
          </Link>
          <Link href={`/modules/tenants/${tenant.id}/edit`}>
            <Button>Edit Tenant</Button>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">{tenant.name}</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Email:</span> {tenant.email}</p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    tenant.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {tenant.status}
                </span>
              </p>
              <p><span className="font-medium">Created At:</span> {new Date(tenant.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Subscriptions</h2>
          <Link href={`/modules/tenants/${tenant.id}/subscriptions/create`}>
            <Button>Add Subscription</Button>
          </Link>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tenant.subscriptions?.map((subscription) => {
              const product = dummyProducts.find((p) => p.id === subscription.productId)
              const plan = dummyPlans.find((p) => p.id === subscription.planId)
              return (
                <TableRow key={subscription.id}>
                  <TableCell>{product?.name || "Unknown Product"}</TableCell>
                  <TableCell>{plan?.name || "Unknown Plan"}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        subscription.status === "active"
                          ? "bg-green-100 text-green-800"
                          : subscription.status === "cancelled"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {subscription.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(subscription.startDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {subscription.endDate
                      ? new Date(subscription.endDate).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 