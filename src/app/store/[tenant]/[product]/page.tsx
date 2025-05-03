'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  features: {
    basic: string[];
    premium: string[];
    enterprise: string[];
  };
  pricing: {
    basic: {
      monthly: number;
      annual: number;
    };
    premium: {
      monthly: number;
      annual: number;
    };
    enterprise: {
      monthly: number;
      annual: number;
    };
  };
  tenant: {
    name: string;
    logo: string;
  };
}

interface Props {
  params: {
    tenant: string;
    product: string;
  };
}

// Dummy data - replace with actual API calls
const dummyProduct: Product = {
  id: '1',
  name: 'Enterprise Analytics Suite',
  description: 'Choose the perfect plan for your business needs',
  features: {
    basic: [
      'Up to 5 team members',
      'Basic analytics dashboard',
      'Email support',
      '5GB storage',
      'API access',
    ],
    premium: [
      'Up to 20 team members',
      'Advanced analytics',
      'Priority email support',
      '20GB storage',
      'API access',
      'Custom reports',
      'Team collaboration',
    ],
    enterprise: [
      'Unlimited team members',
      'Enterprise analytics',
      '24/7 phone support',
      'Unlimited storage',
      'API access',
      'Custom reports',
      'Team collaboration',
      'Custom integrations',
      'Dedicated account manager',
    ],
  },
  pricing: {
    basic: {
      monthly: 49,
      annual: 470,
    },
    premium: {
      monthly: 99,
      annual: 990,
    },
    enterprise: {
      monthly: 299,
      annual: 2990,
    },
  },
  tenant: {
    name: 'TechCorp Solutions',
    logo: '/dummy-logo.png',
  },
};

export default function ProductPage({ params }: Props) {
  const [product] = useState<Product>(dummyProduct);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  useEffect(() => {
    console.log('Fetching product data for:', {
      tenant: params.tenant,
      product: params.product
    });
  }, [params.tenant, params.product]);

  const handleSubscribe = async (plan: 'basic' | 'premium' | 'enterprise') => {
    console.log('Subscribing to:', {
      product: product.id,
      plan,
      billingCycle,
      price: billingCycle === 'monthly' ? product.pricing[plan].monthly : product.pricing[plan].annual,
    });
    alert('Redirecting to checkout...');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative h-12 w-12 mr-4">
              <Image
                src={product.tenant.logo}
                alt={product.tenant.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300">{product.description}</p>
        </div>

        <Tabs 
          value={billingCycle} 
          onValueChange={(value) => setBillingCycle(value as 'monthly' | 'annual')}
          className="mb-8"
        >
          <div className="flex justify-center">
            <TabsList className="grid w-full max-w-[400px] grid-cols-2">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="annual">
                Annual
                <span className="ml-2 text-sm text-green-500">Save 20%</span>
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Basic Plan */}
          <Card className="relative">
            <CardHeader>
              <CardTitle>Basic</CardTitle>
              <CardDescription>Perfect for small teams</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">
                  ${billingCycle === 'monthly' ? product.pricing.basic.monthly : product.pricing.basic.annual}
                </span>
                <span className="text-gray-500">/{billingCycle}</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {product.features.basic.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full mt-6" 
                onClick={() => handleSubscribe('basic')}
              >
                Get Started
              </Button>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="relative border-2 border-primary">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 rounded-full text-primary-foreground text-sm">
              Most Popular
            </div>
            <CardHeader>
              <CardTitle>Premium</CardTitle>
              <CardDescription>Best for growing businesses</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">
                  ${billingCycle === 'monthly' ? product.pricing.premium.monthly : product.pricing.premium.annual}
                </span>
                <span className="text-gray-500">/{billingCycle}</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {product.features.premium.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full mt-6" 
                onClick={() => handleSubscribe('premium')}
              >
                Get Started
              </Button>
            </CardContent>
          </Card>

          {/* Enterprise Plan */}
          <Card className="relative">
            <CardHeader>
              <CardTitle>Enterprise</CardTitle>
              <CardDescription>For large organizations</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">
                  ${billingCycle === 'monthly' ? product.pricing.enterprise.monthly : product.pricing.enterprise.annual}
                </span>
                <span className="text-gray-500">/{billingCycle}</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {product.features.enterprise.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full mt-6" 
                onClick={() => handleSubscribe('enterprise')}
              >
                Get Started
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500">
            All plans include unlimited updates and basic support. Need a custom plan?{' '}
            <Button variant="link" className="p-0">Contact us</Button>
          </p>
        </div>
      </div>
    </div>
  );
} 