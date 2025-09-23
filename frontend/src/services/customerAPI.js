import api from './api'

const customerAPI = {
  // Get all customers with optional filters
  getAll: (params = {}) => {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== '' && value !== null && value !== undefined)
    )
    return api.get('/customers', { params: cleanParams })
  },

  // Get single customer by ID
  getById: (id) => {
    return api.get(`/customers/${id}`)
  },

  // Create new customer
  create: (data) => {
    return api.post('/customers', data)
  },

  // Update existing customer
  update: (id, data) => {
    return api.put(`/customers/${id}`, data)
  },

  // Delete customer
  delete: (id) => {
    return api.delete(`/customers/${id}`)
  },

  // Update customer status
  updateStatus: (id, data) => {
    return api.patch(`/customers/${id}/status`, data)
  },

  // Get customer options (types and statuses)
  getOptions: () => {
    return api.get('/customers-options')
  },

  // Mock data for development (remove when backend is ready)
  getMockData: () => {
    return Promise.resolve({
      data: {
        data: [
          {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@email.com',
            address: '123 Main Street, City, Country',
            type: 'office',
            passport_number: 'A12345678',
            status: 'active',
            created_at: '2024-01-15T10:30:00Z'
          },
          {
            id: 2,
            name: 'Sarah Smith',
            email: 'sarah.smith@email.com',
            address: '456 Oak Avenue, Town, Country',
            type: 'online',
            passport_number: 'B87654321',
            status: 'process',
            created_at: '2024-01-14T14:20:00Z'
          },
          {
            id: 3,
            name: 'Mike Johnson',
            email: 'mike.johnson@email.com',
            address: '789 Pine Road, Village, Country',
            type: 'office',
            passport_number: 'C11223344',
            status: 'submitted',
            created_at: '2024-01-13T09:15:00Z'
          },
          {
            id: 4,
            name: 'Emily Davis',
            email: 'emily.davis@email.com',
            address: '321 Elm Street, City, Country',
            type: 'online',
            passport_number: 'D55667788',
            status: 'completed',
            created_at: '2024-01-12T16:45:00Z'
          },
          {
            id: 5,
            name: 'Robert Wilson',
            email: 'robert.wilson@email.com',
            address: '654 Maple Drive, Town, Country',
            type: 'office',
            passport_number: 'E99887766',
            status: 'inactive',
            created_at: '2024-01-11T11:30:00Z'
          }
        ],
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 5
      }
    })
  }
}

export default customerAPI