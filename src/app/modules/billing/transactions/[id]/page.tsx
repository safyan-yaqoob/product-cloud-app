"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Transaction } from "@/lib/api/billing"
import { Tenant } from "@/lib/api"

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
  }
]

export default function TransactionDetailsPage() {
  const params = useParams()
  const [transaction] = useState<Transaction | undefined>(
    dummyTransactions.find((t) => t.id === params.id)
  )

  if (!transaction) {
    return <div className="p-6">Transaction not found</div>
  }

  const tenant = dummyTenants.find((t) => t.id === transaction.tenantId)

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
        <h1 className="text-2xl font-bold">Transaction Details</h1>
        <div className="space-x-2">
          <Link href="/modules/billing/transactions">
            <Button variant="outline">Back to Transactions</Button>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Transaction Information</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Amount:</span>{" "}
                {transaction.currency} {transaction.amount}
              </p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                    transaction.status
                  )}`}
                >
                  {transaction.status}
                </span>
              </p>
              <p>
                <span className="font-medium">Payment Method:</span>{" "}
                {transaction.paymentMethod}
              </p>
              <p>
                <span className="font-medium">Date:</span>{" "}
                {new Date(transaction.transactionDate).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Description:</span>{" "}
                {transaction.description}
              </p>
              <p>
                <span className="font-medium">Invoice ID:</span>{" "}
                {transaction.invoiceId || "N/A"}
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Tenant Information</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Name:</span> {tenant?.name}
              </p>
              <p>
                <span className="font-medium">Email:</span> {tenant?.email}
              </p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    tenant?.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {tenant?.status}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 