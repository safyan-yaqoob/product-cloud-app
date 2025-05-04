"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Package,
  ShoppingCart,
  Settings,
  BarChart3,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Building,
  Layers,
  Lock,
  Puzzle,
  RefreshCw
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { Logo } from '@/components/ui/logo'

// Define routes based on user roles
const adminRoutes = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/modules/dashboard' },
  { label: 'Products', icon: Package, href: '/modules/products' },
  { label: 'Customers', icon: Users, href: '/modules/customers' },
  { label: 'Orders', icon: ShoppingCart, href: '/modules/orders' },
  { label: 'Analytics', icon: BarChart3, href: '/modules/analytics' },
  { label: 'Integrations', icon: Puzzle, href: '/modules/integrations' },
  {
    label: 'Settings',
    icon: Settings,
    href: '/modules/settings',
    children: [
      { label: 'Storefront', href: '/modules/settings/storefront' },
      { label: 'Team & Roles', href: '/modules/settings/teams' },
    ],
  },
];

const superadminRoutes = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/modules/dashboard' },
  { label: 'Tenants', icon: Building, href: '/modules/tenants' },
  { label: 'Subscriptions', icon: RefreshCw, href: '/modules/subscriptions' },
  { label: 'Products', icon: Package, href: '/modules/products' },
  { label: 'Plans', icon: Layers, href: '/modules/plans' },
  { label: 'Revenue & Billing', icon: CreditCard, href: '/modules/revenue' },
  {
    label: 'Reports',
    icon: BarChart3,
    href: '/modules/reports',
    children: [
      { label: 'LTV', href: '/modules/reports/ltv' },
      { label: 'Churn', href: '/modules/reports/churn' },
      { label: 'Cohorts', href: '/modules/reports/cohorts' },
    ],
  },
  { label: 'Analytics', icon: BarChart3, href: '/modules/analytics' },
  { label: 'Integrations', icon: Puzzle, href: '/modules/integrations' },
  { label: 'Permissions', icon: Lock, href: '/modules/permissions' },
  {
    label: 'Settings',
    icon: Settings,
    href: '/modules/settings',
    children: [
      { label: 'Global Branding', href: '/modules/settings/branding' },
      { label: 'Feature Flags', href: '/modules/settings/flags' },
      { label: 'Security', href: '/modules/settings/security' },
    ],
  },
];

export function AdminSidebar({ isOpen, onClose }) {
  const pathname = usePathname()
  const { user } = useAuth()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const isSuperAdmin = user?.profile?.role === 'superadmin'
  const routes = isSuperAdmin ? superadminRoutes : adminRoutes

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth > 1024) {
        onClose();
      }
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize)
  }, [onClose])

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  }

  // Render className based on state
  const sidebarClassName = cn(
    'flex flex-col h-screen bg-background dark:bg-gray-900 border-r transition-all duration-300',
    isCollapsed ? 'w-20' : 'w-64',
    isMobile && 'fixed top-0 left-0 z-40',
    isMobile && !isOpen && 'transform -translate-x-full',
    isMobile && isOpen && 'transform translate-x-0'
  )

  return (
    <>
      {/* Dark overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={sidebarClassName}>
        <div className="flex items-center justify-between p-4 border-b">
          {!isCollapsed && (
            <Link href="/modules/dashboard" className="flex items-center">
              <Logo variant="sidebar" />
            </Link>
          )}

          <button
            onClick={isMobile ? onClose : toggleCollapse}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={isMobile ? "Close sidebar" : (isCollapsed ? "Expand sidebar" : "Collapse sidebar")}
          >
            {isMobile ? (
              <ChevronLeft className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            ) : isCollapsed ? (
              <ChevronRight className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            ) : (
              <ChevronLeft className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            )}
          </button>
        </div>


        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-3">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center p-3 rounded-lg transition-colors",
                  isCollapsed ? "justify-center" : "justify-start",
                  pathname === route.href
                    ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/20"
                )}
                onClick={isMobile ? onClose : undefined}
              >
                <route.icon className={cn(
                  "h-5 w-5",
                  isCollapsed ? "mr-0" : "mr-3",
                  pathname === route.href ? "text-primary dark:text-primary-foreground" : "text-muted-foreground"
                )} />
                {!isCollapsed && (
                  <span className="text-sm font-medium">{route.label}</span>
                )}
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t">
          <Link
            href="/help"
            className={cn(
              'flex items-center p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors',
              isCollapsed ? 'justify-center' : 'justify-start',
              pathname === '/help' && 'bg-primary/10 text-primary dark:text-[#0C66E4] dark:bg-[#0C66E4]/10'
            )}
          >
            <HelpCircle className={cn(
              "h-5 w-5",
              isCollapsed ? 'mr-0' : 'mr-3'
            )} />
            {!isCollapsed && (
              <span className="text-sm font-medium">Help & Support</span>
            )}
          </Link>
        </div>
      </aside>
    </>
  )
} 