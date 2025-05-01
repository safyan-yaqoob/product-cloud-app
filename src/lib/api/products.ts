import { fetchApi } from './base'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
}

export const productsApi = {
  getAll: (data?:any) => fetchApi<Product[]>('/api/products', {
    method:'POST',
    body:JSON.stringify(data)
  }),
  
  getById: (id: string) => fetchApi<Product>(`/api/products/${id}`),
  
  create: (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) =>
    fetchApi<Product>('/api/products', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  update: (id: string, data: Partial<Product>) =>
    fetchApi<Product>(`/api/products/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  
  delete: (id: string) =>
    fetchApi<void>(`/api/products/${id}`, {
      method: 'DELETE',
    }),
} 