"use client";

import { AdminLayout } from '@/components/admin/AdminLayout'

export default function ModulesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminLayout>{children}</AdminLayout>
} 