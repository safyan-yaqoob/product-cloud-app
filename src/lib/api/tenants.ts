import { fetchApi } from './base'

export interface Tenant {
  id: string
  name: string
  email: string
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
}

export const tenantsApi = {
  getAll: (data?:any) => fetchApi<Tenant[]>('/api/tenants', {
    method:'POST',
    body:JSON.stringify(data)
  }),
  
  getById: (id: string) => fetchApi<Tenant>(`/api/tenants/${id}`),
  
  create: (data: Omit<Tenant, 'id' | 'createdAt' | 'updatedAt'>) =>
    fetchApi<Tenant>('/api/tenants', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  update: (id: string, data: Partial<Tenant>) =>
    fetchApi<Tenant>(`/api/tenants/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  
  delete: (id: string) =>
    fetchApi<void>(`/api/tenants/${id}`, {
      method: 'DELETE',
    }),
} 