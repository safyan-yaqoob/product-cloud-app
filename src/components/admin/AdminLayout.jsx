"use client"

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { AdminNavbar } from './AdminNavbar'
import { AdminSidebar } from './AdminSidebar'
import { useRouter } from 'next/navigation'

export function AdminLayout({ children }) {
  const { user, loading, login } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter();
  
  // useEffect(() => {
  //   if (!loading && !user) {
  //     router.push('/');
  //   }
  // }, [user, loading, router])
  
  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center h-screen w-full bg-background dark:bg-gray-900">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  //     </div>
  //   )
  // }
  
  // if (!user) {
  //   return null;
  // }
  
  return (
    <div className="flex h-screen bg-background dark:bg-gray-900 overflow-hidden">
      <AdminSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
      />
      
      <div className="flex flex-col flex-1 h-screen overflow-y-auto">
        <AdminNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
} 