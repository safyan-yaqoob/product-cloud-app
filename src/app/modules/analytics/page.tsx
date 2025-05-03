'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AnalyticsData {
  revenue: {
    total: number;
    growth: number;
    data: { month: string; amount: number }[];
  };
  customers: {
    total: number;
    growth: number;
    data: { month: string; count: number }[];
  };
  conversions: {
    rate: number;
    trend: number;
    data: { month: string; rate: number }[];
  };
  engagement: {
    activeUsers: number;
    avgSessionTime: number;
    bounceRate: number;
  };
}

// Mock data
const mockProducts = [
  { id: 'all', name: 'All Products' },
  { id: '1', name: 'Enterprise Analytics Suite' },
  { id: '2', name: 'Basic Analytics' },
];

const mockAnalytics: Record<string, AnalyticsData> = {
  all: {
    revenue: {
      total: 125000,
      growth: 12.5,
      data: [
        { month: 'Jan', amount: 8000 },
        { month: 'Feb', amount: 9500 },
        { month: 'Mar', amount: 11000 },
        { month: 'Apr', amount: 10500 },
        { month: 'May', amount: 12000 },
        { month: 'Jun', amount: 13000 },
      ],
    },
    customers: {
      total: 256,
      growth: 8.3,
      data: [
        { month: 'Jan', count: 180 },
        { month: 'Feb', count: 195 },
        { month: 'Mar', count: 210 },
        { month: 'Apr', count: 225 },
        { month: 'May', count: 240 },
        { month: 'Jun', count: 256 },
      ],
    },
    conversions: {
      rate: 3.2,
      trend: 0.5,
      data: [
        { month: 'Jan', rate: 2.8 },
        { month: 'Feb', rate: 2.9 },
        { month: 'Mar', rate: 3.0 },
        { month: 'Apr', rate: 3.1 },
        { month: 'May', rate: 3.2 },
        { month: 'Jun', rate: 3.2 },
      ],
    },
    engagement: {
      activeUsers: 1200,
      avgSessionTime: 340,
      bounceRate: 45,
    },
  },
  // Add product-specific data here
};

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState('6m');
  const [selectedProduct, setSelectedProduct] = useState('all');
  const data = mockAnalytics[selectedProduct];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Analytics</h1>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            Detailed insights and performance metrics
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-4">
          <Select value={selectedProduct} onValueChange={setSelectedProduct}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select product" />
            </SelectTrigger>
            <SelectContent>
              {mockProducts.map((product) => (
                <SelectItem key={product.id} value={product.id}>
                  {product.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Last Month</SelectItem>
              <SelectItem value="3m">Last 3 Months</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Revenue Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                ${data.revenue.total.toLocaleString()}
              </div>
              <div className={`ml-2 text-sm font-semibold ${
                data.revenue.growth >= 0 
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {data.revenue.growth >= 0 ? '↑' : '↓'}
                {Math.abs(data.revenue.growth)}%
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customers Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                {data.customers.total}
              </div>
              <div className={`ml-2 text-sm font-semibold ${
                data.customers.growth >= 0 
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {data.customers.growth >= 0 ? '↑' : '↓'}
                {Math.abs(data.customers.growth)}%
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conversion Rate Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Conversion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                {data.conversions.rate}%
              </div>
              <div className={`ml-2 text-sm font-semibold ${
                data.conversions.trend >= 0 
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {data.conversions.trend >= 0 ? '↑' : '↓'}
                {Math.abs(data.conversions.trend)}%
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Engagement Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Active Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-gray-900 dark:text-white">
              {data.engagement.activeUsers.toLocaleString()}
            </div>
            <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Avg. session: {Math.round(data.engagement.avgSessionTime / 60)}m
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue growth</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Add revenue chart here */}
            <div className="h-80 w-full">
              {/* Chart placeholder */}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Growth</CardTitle>
            <CardDescription>Monthly customer acquisition</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Add customer growth chart here */}
            <div className="h-80 w-full">
              {/* Chart placeholder */}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Detailed analytics and insights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Conversion Funnel
                </h4>
                {/* Add conversion funnel visualization */}
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  User Engagement
                </h4>
                {/* Add engagement metrics */}
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Revenue Sources
                </h4>
                {/* Add revenue breakdown */}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 