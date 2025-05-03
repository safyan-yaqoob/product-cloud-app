'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  status: 'active' | 'inactive';
  subscriptionPlan: string;
  joinDate: string;
  avatar: string;
}

// Mock data
const mockCustomers: Customer[] = [
  {
    id: 'CUST-001',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    company: 'Tech Corp',
    status: 'active',
    subscriptionPlan: 'Premium',
    joinDate: '2024-01-15',
    avatar: '',
  },
  {
    id: 'CUST-002',
    name: 'Bob Smith',
    email: 'bob@example.com',
    company: 'Design Co',
    status: 'inactive',
    subscriptionPlan: 'Basic',
    joinDate: '2024-02-20',
    avatar: '',
  },
  // Add more mock customers as needed
];

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filteredCustomers = mockCustomers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Customers</CardTitle>
              <CardDescription>
                A list of all customers including their name, email, company, and subscription status.
              </CardDescription>
            </div>
            <Button>
              Add customer
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Input
              placeholder="Search by name, email, or company"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCustomers.map((customer) => (
              <Card key={customer.id} className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedCustomer(customer)}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="relative h-10 w-10 flex-shrink-0">
                      <Image
                        className="rounded-full"
                        src={customer.avatar}
                        alt=""
                        fill
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">
                        {customer.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {customer.email}
                      </p>
                      <div className="mt-2 flex items-center space-x-2">
                        <Badge variant={customer.status === 'active' ? 'success' : 'secondary'}>
                          {customer.status}
                        </Badge>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {customer.subscriptionPlan}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={selectedCustomer !== null} onOpenChange={(open: boolean) => !open && setSelectedCustomer(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
            <DialogDescription>
              Detailed information about the customer
            </DialogDescription>
          </DialogHeader>
          
          {selectedCustomer && (
            <div className="mt-6">
              <div className="flex justify-center mb-6">
                <div className="relative h-24 w-24">
                  <Image
                    className="rounded-full"
                    src={selectedCustomer.avatar}
                    alt=""
                    fill
                  />
                </div>
              </div>
              
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</dt>
                  <dd className="mt-1 text-sm">{selectedCustomer.name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</dt>
                  <dd className="mt-1 text-sm">{selectedCustomer.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Company</dt>
                  <dd className="mt-1 text-sm">{selectedCustomer.company}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Subscription Plan</dt>
                  <dd className="mt-1 text-sm">{selectedCustomer.subscriptionPlan}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Join Date</dt>
                  <dd className="mt-1 text-sm">
                    {new Date(selectedCustomer.joinDate).toLocaleDateString()}
                  </dd>
                </div>
              </dl>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 