"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowUpRight, ArrowDownRight, DollarSign, Users, CreditCard, TrendingUp, Loader2 } from "lucide-react"
import { Invoice, Transaction, billingApi } from "@/lib/api/billing"

// Fallback dummy data with consistent date strings
const currentDate = new Date().toISOString()

const dummyInvoices: Invoice[] = [
  {
    id: "INV-001",
    tenantId: "1",
    subscriptionId: "1",
    amount: 99.99,
    currency: "USD",
    status: "paid",
    dueDate: currentDate,
    issueDate: new Date(currentDate),
    updatedAt: currentDate,
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

export default function BillingPage() {
  const [timeRange, setTimeRange] = useState<string>("month")
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadBillingData()
  }, [])

  async function loadBillingData() {
    try {
      setLoading(true)
      // In a real application, you would have separate API endpoints for invoices and transactions
      // For now, we'll use a single endpoint and assume it returns both
      const data = await billingApi.getAll()
      setInvoices(data)
      // In a real app, you might have a separate transactions API
      // For now, we'll use the dummy data
      setTransactions(dummyTransactions)
      setError(null)
    } catch (err) {
      console.error("Failed to load billing data:", err)
      setError("Failed to load billing data. Using fallback data.")
      setInvoices(dummyInvoices)
      setTransactions(dummyTransactions)
    } finally {
      setLoading(false)
    }
  }

  // Calculate metrics
  const totalRevenue = transactions
    .filter(t => t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0)

  const activeSubscriptions = 150
  const subscriptionGrowth = 12.5
  const paymentSuccessRate = 98.5
  const mrr = totalRevenue * 12 // Monthly Recurring Revenue

  if (loading) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin mb-4" />
        <p>Loading billing data...</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Billing Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => setTimeRange("week")}>
            Week
          </Button>
          <Button variant="outline" onClick={() => setTimeRange("month")}>
            Month
          </Button>
          <Button variant="outline" onClick={() => setTimeRange("year")}>
            Year
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-yellow-50 text-yellow-800 p-3 mb-6 rounded border border-yellow-200">
          {error}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last {timeRange}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSubscriptions}</div>
            <p className="text-xs text-muted-foreground">
              +{subscriptionGrowth}% from last {timeRange}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payment Success Rate</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{paymentSuccessRate}%</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last {timeRange}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">MRR</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${mrr.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              +15.3% from last {timeRange}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest payment activities</CardDescription>
            </div>
            <Link href="/modules/billing/transactions">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-10 text-gray-500">
                      No transactions found
                    </TableCell>
                  </TableRow>
                ) : (
                  transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        {new Date(transaction.transactionDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {transaction.currency} {transaction.amount}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            transaction.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : transaction.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
            <CardDescription>Latest invoices issued</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-10 text-gray-500">
                      No invoices found
                    </TableCell>
                  </TableRow>
                ) : (
                  invoices.slice(0, 3).map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>{invoice.id}</TableCell>
                      <TableCell>
                        {invoice.currency} {invoice.amount}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            invoice.status === "paid"
                              ? "bg-green-100 text-green-800"
                              : invoice.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {invoice.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 