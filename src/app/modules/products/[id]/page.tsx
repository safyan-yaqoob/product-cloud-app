"use client"

import { useState } from "react"
import { type Product, type ProductPlan } from "@/lib/api"
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

// Dummy products data
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
  },
  {
    id: "2",
    name: "Basic Widget",
    description: "A simple widget for everyday use",
    price: 49.99,
    status: "active",
    createdAt: new Date().toISOString(),
    sku: "WID-002",
    category: "Widgets",
    stock: 50
  },
  {
    id: "3",
    name: "Deluxe Widget",
    description: "A premium widget with luxury features",
    price: 199.99,
    status: "inactive",
    createdAt: new Date().toISOString(),
    sku: "WID-003",
    category: "Widgets",
    stock: 25
  }
]

// Dummy plans data
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
  },
  {
    id: "2",
    productId: "1",
    name: "Premium Yearly",
    description: "Yearly subscription for Premium Widget",
    price: 99.99,
    billingCycle: "yearly",
    features: ["All Premium Features", "Priority Support", "Yearly Updates", "2 Months Free"],
    status: "active",
    createdAt: new Date().toISOString()
  },
  {
    id: "3",
    productId: "2",
    name: "Basic Monthly",
    description: "Monthly subscription for Basic Widget",
    price: 4.99,
    billingCycle: "monthly",
    features: ["Basic Features", "Email Support", "Monthly Updates"],
    status: "active",
    createdAt: new Date().toISOString()
  }
]

export default function ProductDetailsPage() {
  const params = useParams()
  const [product] = useState<Product | undefined>(
    dummyProducts.find((p) => p.id === params.id)
  )
  const [plans] = useState<ProductPlan[]>(
    dummyPlans.filter((plan) => plan.productId === params.id)
  )

  if (!product) {
    return <div className="p-6">Product not found</div>
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Details</h1>
        <div className="space-x-2">
          <Link href="/modules/products">
            <Button variant="outline">Back to Products</Button>
          </Link>
          <Link href={`/modules/products/${product.id}/edit`}>
            <Button>Edit Product</Button>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="space-y-2">
              <p><span className="font-medium">Price:</span> ${product.price}</p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    product.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.status}
                </span>
              </p>
              <p><span className="font-medium">Created At:</span> {new Date(product.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="border-l pl-6">
            <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
            <div className="space-y-2">
              <p><span className="font-medium">SKU:</span> {product.sku || "N/A"}</p>
              <p><span className="font-medium">Category:</span> {product.category || "Uncategorized"}</p>
              <p><span className="font-medium">Stock:</span> {product.stock || 0} units</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Product Plans</h2>
          <Link href={`/modules/plans/create?productId=${product.id}`}>
            <Button>Add Plan</Button>
          </Link>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Plan Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Billing Cycle</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plans.map((plan) => (
              <TableRow key={plan.id}>
                <TableCell>{plan.name}</TableCell>
                <TableCell>{plan.description}</TableCell>
                <TableCell>${plan.price}</TableCell>
                <TableCell className="capitalize">{plan.billingCycle}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      plan.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {plan.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Link href={`/modules/plans/${plan.id}`}>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 