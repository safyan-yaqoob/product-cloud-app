"use client"

import { useState } from "react"
import { type Product, type ProductPlan } from "@/lib/api"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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

export default function PlansPage() {
  const [selectedProductId, setSelectedProductId] = useState<string>("")
  const [plans] = useState<ProductPlan[]>(dummyPlans)

  const filteredPlans = selectedProductId
    ? plans.filter((plan) => plan.productId === selectedProductId)
    : plans

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Plans</h1>
        <div className="flex items-center space-x-4">
          <Select
            value={selectedProductId}
            onValueChange={setSelectedProductId}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by Product" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Products</SelectItem>
              {dummyProducts.map((product) => (
                <SelectItem key={product.id} value={product.id}>
                  {product.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Link href="/modules/plans/create">
            <Button>Add Plan</Button>
          </Link>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Plan Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Billing Cycle</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPlans.map((plan) => {
            const product = dummyProducts.find((p) => p.id === plan.productId)
            return (
              <TableRow key={plan.id}>
                <TableCell>{product?.name || "Unknown Product"}</TableCell>
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
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
} 