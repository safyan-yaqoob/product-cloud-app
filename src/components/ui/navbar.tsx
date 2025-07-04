"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Logo } from '@/components/ui/logo'

export function Navbar() {
  const { user, logout } = useAuth()
  const router = useRouter()

  return (
    <nav className="border-b bg-background dark:bg-gray-900 fixed top-0 w-full z-50 h-16">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center">
            <Logo variant="navbar" />
          </Link>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground dark:text-gray-300">
                {user.profile.email}
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => logout()}
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          ) : (
            <Button 
              onClick={() => router.push('/')}
              variant="ghost"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
            >
              Back to Home
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
} 