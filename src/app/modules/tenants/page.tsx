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
import { Switch } from "@/components/ui/switch"
import { Eye, Loader2 } from "lucide-react"
import { Tenant, tenantsApi } from "@/lib/api/tenants"

// Fallback dummy tenants data
const dummyTenants: Tenant[] = [
  {
    id: "1",
    name: "Acme Corporation",
    email: "contact@acme.com",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "2",
    name: "Tech Solutions Inc",
    email: "info@techsolutions.com",
    status: "inactive",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "3",
    name: "Global Enterprises",
    email: "support@global.com",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

export default function TenantsPage() {
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadTenants()
  }, [])

  async function loadTenants() {
    try {
      setLoading(true)
      const data = await tenantsApi.getAll({})
      setTenants(data)
      setError(null)
    } catch (err) {
      console.error("Failed to load tenants:", err)
      setError("Failed to load tenants. Using fallback data.")
      setTenants(dummyTenants)
    } finally {
      setLoading(false)
    }
  }

  const toggleTenantStatus = async (tenantId: string, currentStatus: 'active' | 'inactive') => {
    const newStatus = currentStatus === "active" ? "inactive" : "active"
    
    try {
      // Update UI optimistically
      setTenants((prevTenants) =>
        prevTenants.map((tenant) =>
          tenant.id === tenantId
            ? { ...tenant, status: newStatus }
            : tenant
        )
      )
      
      // Send API request to update status
      await tenantsApi.update(tenantId, { status: newStatus })
    } catch (err) {
      console.error("Failed to update tenant status:", err)
      // Revert the change if the API call fails
      setTenants((prevTenants) =>
        prevTenants.map((tenant) =>
          tenant.id === tenantId
            ? { ...tenant, status: currentStatus }
            : tenant
        )
      )
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tenants</h1>
        <Link href="/modules/tenants/create">
          <Button>Add Tenant</Button>
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
          <span>Loading tenants...</span>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tenants.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-gray-500">
                  No tenants found
                </TableCell>
              </TableRow>
            ) : (
              tenants.map((tenant) => (
                <TableRow key={tenant.id}>
                  <TableCell>{tenant.name}</TableCell>
                  <TableCell>{tenant.email}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={tenant.status === "active"}
                        onCheckedChange={() => toggleTenantStatus(tenant.id, tenant.status)}
                      />
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          tenant.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {tenant.status}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(tenant.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Link href={`/modules/tenants/${tenant.id}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
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