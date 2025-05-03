"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

// Chart data
const monthlyRevenue = [
  { month: "Jan", revenue: 50000 },
  { month: "Feb", revenue: 65000 },
  { month: "Mar", revenue: 75000 },
  { month: "Apr", revenue: 80000 },
  { month: "May", revenue: 90000 },
  { month: "Jun", revenue: 95000 },
]

const customerGrowth = [
  { month: "Jan", customers: 100 },
  { month: "Feb", customers: 150 },
  { month: "Mar", customers: 200 },
  { month: "Apr", customers: 250 },
  { month: "May", customers: 300 },
  { month: "Jun", customers: 350 },
]

interface Transaction {
  id: string;
  customer: {
    name: string;
    email: string;
    avatar: string;
  };
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  product: string;
  date: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinDate: string;
  status: 'active' | 'inactive';
}

interface Product {
  id: string;
  name: string;
  status: 'active' | 'draft';
  customers: number;
  revenue: number;
}

// Mock data
const mockTransactions: Transaction[] = [
  {
    id: 'TRX-001',
    customer: {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      avatar: '/avatars/alice.jpg',
    },
    amount: 99.99,
    status: 'completed',
    product: 'Premium Plan',
    date: '2024-03-15T10:00:00Z',
  },
  {
    id: 'TRX-002',
    customer: {
      name: 'Bob Smith',
      email: 'bob@example.com',
      avatar: '/avatars/bob.jpg',
    },
    amount: 199.99,
    status: 'pending',
    product: 'Enterprise Plan',
    date: '2024-03-14T15:30:00Z',
  },
  {
    id: 'TRX-003',
    customer: {
      name: 'Carol Davis',
      email: 'carol@example.com',
      avatar: '/avatars/carol.jpg',
    },
    amount: 49.99,
    status: 'failed',
    product: 'Basic Plan',
    date: '2024-03-14T09:15:00Z',
  },
];

const mockRecentCustomers: Customer[] = [
  {
    id: 'CUST-001',
    name: 'Bob Smith',
    email: 'bob@example.com',
    avatar: '/avatars/bob.jpg',
    joinDate: '2024-03-14T15:30:00Z',
    status: 'active',
  },
  {
    id: 'CUST-002',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    avatar: '/avatars/alice.jpg',
    joinDate: '2024-03-13T10:00:00Z',
    status: 'active',
  },
  {
    id: 'CUST-003',
    name: 'Carol Davis',
    email: 'carol@example.com',
    avatar: '/avatars/carol.jpg',
    joinDate: '2024-03-12T14:45:00Z',
    status: 'inactive',
  },
];

const mockRecentProducts: Product[] = [
  {
    id: 'PROD-001',
    name: 'Enterprise Analytics Suite',
    status: 'active',
    customers: 45,
    revenue: 4500,
  },
  {
    id: 'PROD-002',
    name: 'Professional Dashboard',
    status: 'active',
    customers: 78,
    revenue: 3900,
  },
  {
    id: 'PROD-003',
    name: 'Basic Monitoring Tool',
    status: 'draft',
    customers: 0,
    revenue: 0,
  },
];

export default function DashboardPage() {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,500</div>
            <p className="text-xs text-green-500 flex items-center">
              +15% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Active Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-green-500 flex items-center">
              +12 new this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Active Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-gray-500 flex items-center">
              2 drafts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Avg. Revenue per Customer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$157</div>
            <p className="text-xs text-green-500 flex items-center">
              +5% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Growth</CardTitle>
            <CardDescription>Monthly revenue trend</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#2563eb"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Growth</CardTitle>
            <CardDescription>Customer acquisition trend</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={customerGrowth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="customers" fill="#2563eb" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest customer payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-sm font-medium">{transaction.customer.name}</p>
                      <p className="text-xs text-gray-500">{transaction.product}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">${transaction.amount}</p>
                    <Badge variant={
                      transaction.status === 'completed' ? 'success' :
                      transaction.status === 'pending' ? 'default' : 'destructive'
                    }>
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Customers</CardTitle>
            <CardDescription>Latest customer signups</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRecentCustomers.map((customer) => (
                <div key={customer.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-sm font-medium">{customer.name}</p>
                      <p className="text-xs text-gray-500">{customer.email}</p>
                    </div>
                  </div>
                  <Badge variant={customer.status === 'active' ? 'success' : 'secondary'}>
                    {customer.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Products */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Products</CardTitle>
            <CardDescription>Latest product performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {mockRecentProducts.map((product) => (
                <Card key={product.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">{product.name}</h3>
                      <Badge variant={product.status === 'active' ? 'success' : 'secondary'}>
                        {product.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Customers</p>
                        <p className="font-medium">{product.customers}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Revenue</p>
                        <p className="font-medium">${product.revenue}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 