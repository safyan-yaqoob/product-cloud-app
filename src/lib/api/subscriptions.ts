import { fetchApi } from './base'

export interface Subscription {
  id: string
  name: string
  price: number
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
}

export const subscriptionsApi = {
  getAll: () => fetchApi<Subscription[]>('/api/subscription'),
  
  getById: (id: string) => fetchApi<Subscription>(`/api/subscription/${id}`),
  
  create: (data: Omit<Subscription, 'id' | 'createdAt' | 'updatedAt'>) =>
    fetchApi<Subscription>('/api/subscription', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  update: (id: string, data: Partial<Subscription>) =>
    fetchApi<Subscription>(`/api/subscription/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  
  delete: (id: string) =>
    fetchApi<void>(`/api/subscription/${id}`, {
      method: 'DELETE',
    }),
} 