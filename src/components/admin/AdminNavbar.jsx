"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { 
  Bell, 
  Sun, 
  Moon, 
  User, 
  LogOut, 
  Settings, 
  ChevronDown,
  Menu
} from 'lucide-react'
import { Logo } from '@/components/ui/logo'
import { SearchInput } from '@/components/ui/search-input'

export function AdminNavbar({ toggleSidebar }) {
  const { user, logout } = useAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  
  useEffect(() => {
    // Check system preference for dark mode initially
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    }
    
    // Get user preference from localStorage if it exists
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme) {
      setIsDarkMode(storedTheme === 'dark')
      document.documentElement.classList.toggle('dark', storedTheme === 'dark')
    }
  }, [])
  
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    document.documentElement.classList.toggle('dark', newDarkMode)
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light')
  }
  
  return (
    <nav className="sticky top-0 z-30 w-full border-b bg-background dark:bg-gray-900 shadow-sm">
      <div className="px-4 py-3 flex items-center justify-between">
        
        <div className="hidden md:flex mx-4 flex-1 max-w-md">
          <SearchInput placeholder="Search..." />
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
          
          <button 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={toggleDarkMode}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            ) : (
              <Moon className="h-5 w-5 text-gray-500" />
            )}
          </button>
          
          <div className="relative">
            <button 
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">
                {user?.profile?.name || 'Admin User'}
              </span>
              <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </button>
            
            {isDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700"
                onBlur={() => setIsDropdownOpen(false)}
              >
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{user?.profile?.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.profile?.email}</p>
                </div>
                <Link 
                  href="/modules/profile" 
                  className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <User className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                  Profile
                </Link>
                <Link 
                  href="/modules/settings" 
                  className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <Settings className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                  Settings
                </Link>
                <button 
                  className="w-full flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    setIsDropdownOpen(false)
                    logout()
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2 text-red-500 dark:text-red-400" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 