import { fetchApi } from './base'

export interface Invoice {
  id: string
  tenantId: string,
  subscriptionId:string,
  currency:string,
  amount: number
  status: 'paid' | 'pending' | 'overdue'
  dueDate: string
  createdAt: string
  updatedAt: string,
  issueDate: Date
}

export interface Transaction {
  id: string
  tenantId: string
  subscriptionId: string
  amount: number
  currency: string
  status: 'completed' | 'pending' | 'failed' | 'refunded'
  paymentMethod: string
  transactionDate: string
  description: string
  invoiceId?: string
}

export const billingApi = {
  getAll: () => fetchApi<Invoice[]>('/api/billing'),
  
  getById: (id: string) => fetchApi<Invoice>(`/api/billing/${id}`),
  
  create: (data: Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'>) =>
    fetchApi<Invoice>('/api/billing', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  update: (id: string, data: Partial<Invoice>) =>
    fetchApi<Invoice>(`/api/billing/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  
  delete: (id: string) =>
    fetchApi<void>(`/api/billing/${id}`, {
      method: 'DELETE',
    }),
} 