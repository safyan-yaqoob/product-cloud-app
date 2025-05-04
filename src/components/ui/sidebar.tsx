"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  CreditCard,
  Package,
  Settings,
  Users,
  LayoutDashboard,
} from 'lucide-react'

const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/modules/dashboard',
  },
  {
    label: 'Products',
    icon: Package,
    href: '/modules/products',
  },
  {
    label: 'Subscriptions',
    icon: CreditCard,
    href: '/modules/subscriptions',
  },
  {
    label: 'Tenants',
    icon: Users,
    href: '/modules/tenants',
  },
  {
    label: 'Billing',
    icon: CreditCard,
    href: '/modules/billing',
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 border-r bg-background dark:bg-gray-900 fixed h-screen top-16">
      <div className="space-y-4 py-4 overflow-y-auto h-full">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition',
                  pathname === route.href
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground dark:text-gray-300'
                )}
              >
                <div className="flex items-center flex-1">
                  <route.icon className="h-5 w-5 mr-3" />
                  {route.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 