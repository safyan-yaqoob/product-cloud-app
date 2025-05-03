'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  description: string;
  features: string[];
  pricing: {
    monthly: number;
    annual: number;
  };
  tenant: {
    name: string;
    logo: string;
  };
}

interface Props {
  product: Product;
}

export default function ProductDetails({ product }: Props) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const handleSubscribe = async () => {
    // In a real implementation, this would:
    // 1. Create a subscription session
    // 2. Redirect to Stripe checkout
    console.log('Subscribing to:', {
      product: product.id,
      billingCycle,
      price: billingCycle === 'monthly' ? product.pricing.monthly : product.pricing.annual,
    });
    
    // Mock redirect to checkout
    alert('Redirecting to checkout...');
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
        <div className="flex items-center">
          <div className="relative h-12 w-12 mr-4">
            <Image
              src={product.tenant.logo}
              alt={product.tenant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {product.name}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              by {product.tenant.name}
            </p>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <div className="prose max-w-none">
          <p>{product.description}</p>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="px-4 py-5 sm:px-6">
          <h4 className="text-lg font-medium text-gray-900">Features</h4>
          <ul className="mt-4 space-y-2">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <svg
                  className="h-5 w-5 text-green-500 mr-2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-4 mb-6">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-md ${
                billingCycle === 'monthly'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-md ${
                billingCycle === 'annual'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Annual
            </button>
          </div>

          <div className="text-center mb-6">
            <p className="text-4xl font-bold text-gray-900">
              ${billingCycle === 'monthly' ? product.pricing.monthly : product.pricing.annual}
              <span className="text-lg font-normal text-gray-500">
                /{billingCycle === 'monthly' ? 'month' : 'year'}
              </span>
            </p>
            {billingCycle === 'annual' && (
              <p className="text-sm text-green-600 mt-2">
                Save ${product.pricing.monthly * 12 - product.pricing.annual} per year
              </p>
            )}
          </div>

          <button
            onClick={handleSubscribe}
            className="w-full sm:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  );
} 