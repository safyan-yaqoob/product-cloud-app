"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface Product {
  id: string
  name: string
  description: string
  features: string[]
  pricing: {
    monthly: number
    annual: number
  }
  status: "active" | "draft"
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Enterprise Analytics Suite",
    description: "Advanced analytics and reporting platform for businesses",
    features: [
      "Real-time data analytics",
      "Custom dashboards",
      "API integration",
      "Team collaboration",
      "Export capabilities",
    ],
    pricing: {
      monthly: 99,
      annual: 990,
    },
    status: "active",
  },
  {
    id: "2",
    name: "Basic Analytics",
    description: "Essential analytics tools for small businesses",
    features: [
      "Basic reporting",
      "Simple dashboards",
      "Email exports",
      "Single user",
    ],
    pricing: {
      monthly: 29,
      annual: 290,
    },
    status: "draft",
  },
]

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Products</CardTitle>
              <CardDescription>
                Manage your product offerings and pricing plans
              </CardDescription>
            </div>
            <Button asChild>
              <Link href="/modules/products/create">Create Product</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-medium">{product.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {product.description}
                      </p>
                    </div>
                    <Badge variant={product.status === "active" ? "success" : "secondary"}>
                      {product.status}
                    </Badge>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pricing</p>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm">
                        Monthly: ${product.pricing.monthly}
                      </p>
                      <p className="text-sm">
                        Annual: ${product.pricing.annual}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end space-x-3">
                    <Button variant="outline" asChild>
                      <Link href={`/store/default/${product.id}`}>View Public Page</Link>
                    </Button>
                    <Button asChild>
                      <Link href={`/modules/products/${product.id}`}>Edit</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 