import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Plus, Edit2, Trash2, Filter, MoreVertical } from 'lucide-react'
import { toast } from 'react-toastify'
import customerAPI from '../services/customerAPI'

const CustomerList = () => {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchCustomers()
  }, [currentPage, searchTerm, statusFilter, typeFilter])

  const fetchCustomers = async () => {
    try {
      setLoading(true)
      const params = {
        page: currentPage,
        search: searchTerm,
        status: statusFilter,
        type: typeFilter
      }
      const response = await customerAPI.getAll(params)
      setCustomers(response.data.data)
      setTotalPages(response.data.last_page || 1)
    } catch (error) {
      // Fallback to mock data if API is not available
      console.log('API not available, using mock data')
      const response = await customerAPI.getMockData()
      let filteredData = response.data.data
      
      // Apply filters to mock data
      if (searchTerm) {
        filteredData = filteredData.filter(customer => 
          customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }
      if (statusFilter) {
        filteredData = filteredData.filter(customer => customer.status === statusFilter)
      }
      if (typeFilter) {
        filteredData = filteredData.filter(customer => customer.type === typeFilter)
      }
      
      setCustomers(filteredData)
      setTotalPages(1)
      toast.info('Using demo data - start backend server for real data')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await customerAPI.delete(id)
        toast.success('Customer deleted successfully')
        fetchCustomers()
      } catch (error) {
        toast.error('Failed to delete customer')
        console.error(error)
      }
    }
  }

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await customerAPI.updateStatus(id, { status: newStatus })
      toast.success('Status updated successfully')
      fetchCustomers()
    } catch (error) {
      toast.error('Failed to update status')
      console.error(error)
    }
  }

  const getStatusBadge = (status) => {
    const statusClasses = {
      inactive: 'status-badge status-inactive',
      active: 'status-badge status-active',
      process: 'status-badge status-process',
      completed: 'status-badge status-completed',
      submitted: 'status-badge status-submitted'
    }
    return statusClasses[status] || 'status-badge status-inactive'
  }

  const getTypeBadge = (type) => {
    return type === 'office' ? 
      'bg-blue-100 text-blue-800 px-2 py-1 text-xs font-medium rounded-full' :
      'bg-green-100 text-green-800 px-2 py-1 text-xs font-medium rounded-full'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600">Manage scholarship applicants and their information</p>
        </div>
        <Link to="/customers/new" className="btn-primary flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Add Customer
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers..."
              className="form-input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="form-input"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="inactive">Inactive</option>
            <option value="active">Active</option>
            <option value="process">Process</option>
            <option value="completed">Completed</option>
            <option value="submitted">Submitted</option>
          </select>
          <select
            className="form-input"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="office">Office</option>
            <option value="online">Online</option>
          </select>
          <button
            onClick={() => {
              setSearchTerm('')
              setStatusFilter('')
              setTypeFilter('')
            }}
            className="btn-secondary"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Passport
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                      <div className="text-sm text-gray-500">{customer.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getTypeBadge(customer.type)}>
                      {customer.type.charAt(0).toUpperCase() + customer.type.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.passport_number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={customer.status}
                      onChange={(e) => handleStatusUpdate(customer.id, e.target.value)}
                      className="text-sm border-none bg-transparent focus:ring-0"
                    >
                      <option value="inactive">Inactive</option>
                      <option value="active">Active</option>
                      <option value="process">Process</option>
                      <option value="completed">Completed</option>
                      <option value="submitted">Submitted</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/customers/edit/${customer.id}`}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(customer.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="btn-secondary"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="btn-secondary"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Page <span className="font-medium">{currentPage}</span> of{' '}
                    <span className="font-medium">{totalPages}</span>
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="btn-secondary rounded-r-none"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="btn-secondary rounded-l-none"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CustomerList