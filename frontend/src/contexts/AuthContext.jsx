import React, { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing token on app load
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (token && userData) {
      setUser(JSON.parse(userData))
    }
    
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      // For demo purposes, simulate login
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (email === 'admin@opendoors.com' && password === 'password123') {
        const userData = {
          id: 1,
          name: 'Admin User',
          email: 'admin@opendoors.com',
          role: 'administrator'
        }
        const token = 'demo-jwt-token-' + Date.now()
        
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(userData))
        setUser(userData)
        
        return { success: true }
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}