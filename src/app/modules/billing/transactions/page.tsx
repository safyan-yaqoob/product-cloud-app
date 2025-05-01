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
import { Eye } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tenant } from "@/lib/api"
import { Transaction } from "@/lib/api/billing"

// Dummy data with consistent date strings
const currentDate = new Date().toISOString()

const dummyTenants: Tenant[] = [
  {
    id: "1",
    name: "Acme Corporation",
    email: "contact@acme.com",
    status: "active",
    createdAt: currentDate
  }
]

const dummyTransactions: Transaction[] = [
  {
    id: "1",
    tenantId: "1",
    subscriptionId: "1",
    amount: 99.99,
    currency: "USD",
    status: "completed",
    paymentMethod: "Credit Card",
    transactionDate: currentDate,
    description: "Monthly subscription payment",
    invoiceId: "INV-001"
  },
  {
    id: "2",
    tenantId: "1",
    subscriptionId: "1",
    amount: 99.99,
    currency: "USD",
    status: "pending",
    paymentMethod: "Credit Card",
    transactionDate: currentDate,
    description: "Monthly subscription payment",
    invoiceId: "INV-002"
  },
  {
    id: "3",
    tenantId: "1",
    subscriptionId: "1",
    amount: 99.99,
    currency: "USD",
    status: "failed",
    paymentMethod: "Credit Card",
    transactionDate: currentDate,
    description: "Monthly subscription payment",
    invoiceId: "INV-003"
  }
]

export default function TransactionsPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>("")
  const [transactions] = useState<Transaction[]>(dummyTransactions)

  const filteredTransactions = selectedStatus === "all" || !selectedStatus
    ? transactions
    : transactions.filter((t) => t.status === selectedStatus)

  const getStatusColor = (status: Transaction["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "refunded":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <div className="flex items-center space-x-4">
          <Select
            value={selectedStatus}
            onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tenant</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Invoice</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTransactions.map((transaction) => {
            const tenant = dummyTenants.find((t) => t.id === transaction.tenantId)
            return (
              <TableRow key={transaction.id}>
                <TableCell>{tenant?.name || "Unknown Tenant"}</TableCell>
                <TableCell>
                  {transaction.currency} {transaction.amount}
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(transaction.status)}`}>
                    {transaction.status}
                  </span>
                </TableCell>
                <TableCell>{transaction.paymentMethod}</TableCell>
                <TableCell>
                  {new Date(transaction.transactionDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{transaction.invoiceId || "N/A"}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Link href={`/modules/billing/transactions/${transaction.id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </Link>
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