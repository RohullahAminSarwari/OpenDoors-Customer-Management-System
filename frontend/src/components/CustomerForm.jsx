import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ArrowLeft, Save } from 'lucide-react'
import customerAPI from '../services/customerAPI'

const CustomerForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = Boolean(id)
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(isEditing)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm()

  useEffect(() => {
    if (isEditing) {
      fetchCustomer()
    }
  }, [id, isEditing])

  const fetchCustomer = async () => {
    try {
      setInitialLoading(true)
      const response = await customerAPI.getById(id)
      const customer = response.data.data
      
      // Populate form with customer data
      Object.keys(customer).forEach(key => {
        if (key !== 'password') { // Don't populate password field
          setValue(key, customer[key])
        }
      })
    } catch (error) {
      // Fallback to mock data if API is not available
      console.log('API not available, using mock data for edit')
      const mockCustomer = {
        id: parseInt(id),
        name: 'John Doe',
        email: 'john.doe@email.com',
        address: '123 Main Street, City, Country',
        type: 'office',
        passport_number: 'A12345678',
        status: 'active'
      }
      
      // Populate form with mock customer data
      Object.keys(mockCustomer).forEach(key => {
        if (key !== 'password') {
          setValue(key, mockCustomer[key])
        }
      })
      
      toast.info('Using demo data - start backend server for real data')
    } finally {
      setInitialLoading(false)
    }
  }

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      
      if (isEditing) {
        await customerAPI.update(id, data)
        toast.success('Customer updated successfully')
      } else {
        await customerAPI.create(data)
        toast.success('Customer created successfully')
      }
      
      navigate('/customers')
    } catch (error) {
      // Handle API errors or fallback to demo mode
      if (error.code === 'ERR_NETWORK') {
        toast.info('Backend not available - this is demo mode')
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        if (isEditing) {
          toast.success('Customer updated successfully (demo)')
        } else {
          toast.success('Customer created successfully (demo)')
        }
        
        navigate('/customers')
      } else {
        const errorMessage = error.response?.data?.message || 'Failed to save customer'
        toast.error(errorMessage)
        
        // Handle validation errors
        if (error.response?.data?.errors) {
          const errors = error.response.data.errors
          Object.keys(errors).forEach(field => {
            toast.error(`${field}: ${errors[field][0]}`)
          })
        }
      }
    } finally {
      setLoading(false)
    }
  }

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/customers')}
            className="btn-secondary flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Customers
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditing ? 'Edit Customer' : 'Add New Customer'}
            </h1>
            <p className="text-gray-600">
              {isEditing ? 'Update customer information' : 'Enter customer details for scholarship application'}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                {...register('name', { 
                  required: 'Name is required',
                  minLength: { value: 2, message: 'Name must be at least 2 characters' }
                })}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password {!isEditing && '*'}
              </label>
              <input
                type="password"
                id="password"
                className={`form-input ${errors.password ? 'border-red-500' : ''}`}
                {...register('password', { 
                  required: isEditing ? false : 'Password is required',
                  minLength: { value: 8, message: 'Password must be at least 8 characters' }
                })}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
              {isEditing && (
                <p className="mt-1 text-sm text-gray-500">Leave empty to keep current password</p>
              )}
            </div>

            {/* Passport Number */}
            <div>
              <label htmlFor="passport_number" className="block text-sm font-medium text-gray-700 mb-2">
                Passport Number *
              </label>
              <input
                type="text"
                id="passport_number"
                className={`form-input ${errors.passport_number ? 'border-red-500' : ''}`}
                {...register('passport_number', { 
                  required: 'Passport number is required',
                  minLength: { value: 5, message: 'Passport number must be at least 5 characters' }
                })}
              />
              {errors.passport_number && (
                <p className="mt-1 text-sm text-red-600">{errors.passport_number.message}</p>
              )}
            </div>

            {/* Type */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                Application Type *
              </label>
              <select
                id="type"
                className={`form-input ${errors.type ? 'border-red-500' : ''}`}
                {...register('type', { required: 'Application type is required' })}
              >
                <option value="">Select Type</option>
                <option value="office">Office Application</option>
                <option value="online">Online Application</option>
              </select>
              {errors.type && (
                <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
              )}
            </div>

            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                id="status"
                className="form-input"
                {...register('status')}
              >
                <option value="inactive">Inactive</option>
                <option value="active">Active</option>
                <option value="process">Process</option>
                <option value="completed">Completed</option>
                <option value="submitted">Submitted</option>
              </select>
            </div>
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Address *
            </label>
            <textarea
              id="address"
              rows={4}
              className={`form-input ${errors.address ? 'border-red-500' : ''}`}
              {...register('address', { 
                required: 'Address is required',
                minLength: { value: 10, message: 'Address must be at least 10 characters' }
              })}
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/customers')}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex items-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {loading ? 'Saving...' : isEditing ? 'Update Customer' : 'Create Customer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CustomerForm