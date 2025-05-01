"use client"

import { useState } from "react"
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
import { Eye, Download } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tenant } from "@/lib/api"
import { Invoice } from "@/lib/api/billing"

// Dummy data
const dummyTenants: Tenant[] = [
  {
    id: "1",
    name: "Acme Corporation",
    email: "contact@acme.com",
    status: "active",
    createdAt: new Date().toISOString()
  }
]

const dummyInvoices: Invoice[] = [
  {
    id: "INV-001",
    tenantId: "1",
    subscriptionId: "1",
    amount: 99.99,
    currency: "USD",
    status: "paid",
    dueDate: new Date().toISOString(),
    issueDate: new Date(),
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString()
  },
  {
    id: "INV-002",
    tenantId: "1",
    subscriptionId: "1",
    amount: 99.99,
    currency: "USD",
    status: "overdue",
    dueDate: new Date().toISOString(),
    issueDate: new Date(),
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString()
  },
  {
    id: "INV-003",
    tenantId: "1",
    subscriptionId: "1",
    amount: 99.99,
    currency: "USD",
    status: "pending",
    dueDate: new Date().toISOString(),
    issueDate: new Date(),
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString()
  }
]

export default function InvoicesPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>("")
  const [invoices] = useState<Invoice[]>(dummyInvoices)

  const filteredInvoices = selectedStatus
    ? invoices.filter((i) => i.status === selectedStatus)
    : invoices

  const getStatusColor = (status: Invoice["status"]) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleGenerateInvoice = () => {
    // In a real application, this would trigger an API call to generate a new invoice
    console.log("Generating new invoice...")
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Invoices</h1>
        <div className="flex items-center space-x-4">
          <Select
            value={selectedStatus}
            onValueChange={setSelectedStatus}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleGenerateInvoice}>Generate Invoice</Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice ID</TableHead>
            <TableHead>Tenant</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Issue Date</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInvoices.map((invoice) => {
            const tenant = dummyTenants.find((t) => t.id === invoice.tenantId)
            return (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.id}</TableCell>
                <TableCell>{tenant?.name || "Unknown Tenant"}</TableCell>
                <TableCell>
                  {invoice.currency} {invoice.amount}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                      invoice.status
                    )}`}
                  >
                    {invoice.status}
                  </span>
                </TableCell>
                <TableCell>
                  {new Date(invoice.issueDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(invoice.dueDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Link href={`/modules/billing/invoices/${invoice.id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
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