import React, { useState, useEffect } from 'react'
import { Users, UserCheck, Clock, CheckCircle, Send } from 'lucide-react'

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    process: 0,
    completed: 0,
    submitted: 0
  })

  // Mock data for demonstration
  useEffect(() => {
    // In a real app, this would fetch from API
    setStats({
      total: 156,
      active: 45,
      process: 32,
      completed: 28,
      submitted: 51
    })
  }, [])

  const StatCard = ({ icon: Icon, title, value, color, bgColor }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center">
        <div className={`${bgColor} p-3 rounded-lg`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to OpenDoors Customer Management System</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard
          icon={Users}
          title="Total Customers"
          value={stats.total}
          color="text-blue-600"
          bgColor="bg-blue-50"
        />
        <StatCard
          icon={UserCheck}
          title="Active"
          value={stats.active}
          color="text-green-600"
          bgColor="bg-green-50"
        />
        <StatCard
          icon={Clock}
          title="In Process"
          value={stats.process}
          color="text-yellow-600"
          bgColor="bg-yellow-50"
        />
        <StatCard
          icon={CheckCircle}
          title="Completed"
          value={stats.completed}
          color="text-purple-600"
          bgColor="bg-purple-50"
        />
        <StatCard
          icon={Send}
          title="Submitted"
          value={stats.submitted}
          color="text-indigo-600"
          bgColor="bg-indigo-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div>
                <p className="text-sm font-medium text-gray-900">New customer registered</p>
                <p className="text-xs text-gray-600">John Doe - Office Application</p>
              </div>
              <span className="text-xs text-gray-500">2 mins ago</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div>
                <p className="text-sm font-medium text-gray-900">Status updated</p>
                <p className="text-xs text-gray-600">Sarah Smith - Moved to Process</p>
              </div>
              <span className="text-xs text-gray-500">5 mins ago</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-900">Application submitted</p>
                <p className="text-xs text-gray-600">Mike Johnson - Online Application</p>
              </div>
              <span className="text-xs text-gray-500">10 mins ago</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full btn-primary">Add New Customer</button>
            <button className="w-full btn-secondary">Export Customer Data</button>
            <button className="w-full btn-secondary">Generate Reports</button>
            <button className="w-full btn-secondary">System Settings</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard