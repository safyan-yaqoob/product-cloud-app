"use client"

import { useEffect, useState } from "react"
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
import { Eye, Loader2 } from "lucide-react"
import { Subscription, subscriptionsApi } from "@/lib/api/subscriptions"
import { Tenant, tenantsApi } from "@/lib/api/tenants"

// Fallback dummy data
const dummySubscriptions: Subscription[] = [
  {
    id: "1",
    name: "Enterprise Plan",
    price: 99.99,
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "2",
    name: "Business Plan",
    price: 49.99,
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "3",
    name: "Starter Plan",
    price: 19.99,
    status: "inactive",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      setLoading(true)
      // Load both subscriptions and tenants in parallel
      const [subscriptionsData, tenantsData] = await Promise.all([
        subscriptionsApi.getAll(),
        tenantsApi.getAll()
      ])
      
      setSubscriptions(subscriptionsData)
      setTenants(tenantsData)
      setError(null)
    } catch (err) {
      console.error("Failed to load data:", err)
      setError("Failed to load data. Using fallback data.")
      setSubscriptions(dummySubscriptions)
    } finally {
      setLoading(false)
    }
  }
  
  const getStatusColor = (status: 'active' | 'inactive') => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Subscriptions</h1>
        <Link href="/modules/subscriptions/create">
          <Button>Add Subscription</Button>
        </Link>
      </div>

      {error && (
        <div className="bg-yellow-50 text-yellow-800 p-3 mb-6 rounded border border-yellow-200">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          <span>Loading subscriptions...</span>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscriptions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-gray-500">
                  No subscriptions found
                </TableCell>
              </TableRow>
            ) : (
              subscriptions.map((subscription) => (
                <TableRow key={subscription.id}>
                  <TableCell>{subscription.name}</TableCell>
                  <TableCell>${subscription.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(subscription.status)}`}>
                      {subscription.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(subscription.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Link href={`/modules/subscriptions/${subscription.id}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
    </div>
  )
}