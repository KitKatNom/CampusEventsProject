'use client'

import { Settings, X, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useFilters } from '@/contexts/filter-context'

interface AdminModalProps {
  onClose: () => void
  eventCount?: number
  registrations?: number
  mostPopularCategory?: string
  avgAttendance?: number
}

export default function AdminModal({ 
  onClose, 
  eventCount = 156, 
  registrations = 892,
  mostPopularCategory = 'Social Events',
  avgAttendance = 67
}: AdminModalProps) {
  const { enabledLocations, enabledCategories, enabledCosts, toggleLocation, toggleCategory, toggleCost, setEnabledLocations, setEnabledCategories, setEnabledCosts, addLocation, addCategory, addCost } = useFilters()
  
  const allLocations = ['University Arena', 'Student Center', 'Theater Hall', 'Grand Ballroom', 'Science Building', 'Athletic Fields', 'Art Gallery', 'Student Lounge']
  const allCategories = ['Sports', 'Academic', 'Arts', 'Social', 'Clubs']
  const allCosts = ['Free', 'Paid', 'Ticketed']

  const [settings, setSettings] = useState({
    emailNotifications: true,
    requireRegistration: false,
    autoApproveEvents: false,
    maxCapacity: 5000
  })

  const [savedMessage, setSavedMessage] = useState(false)
  const [newLocation, setNewLocation] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [newCost, setNewCost] = useState('')

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleCapacityChange = (value: string) => {
    const numValue = parseInt(value) || 0
    setSettings(prev => ({
      ...prev,
      maxCapacity: numValue
    }))
  }

  const removeLocation = (location: string) => {
    setEnabledLocations(enabledLocations.filter(l => l !== location))
  }

  const removeCategory = (category: string) => {
    setEnabledCategories(enabledCategories.filter(c => c !== category))
  }

  const removeCost = (cost: string) => {
    setEnabledCosts(enabledCosts.filter(c => c !== cost))
  }

  const handleAddLocation = () => {
    if (newLocation.trim()) {
      addLocation(newLocation.trim())
      setNewLocation('')
    }
  }

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      addCategory(newCategory.trim())
      setNewCategory('')
    }
  }

  const handleAddCost = () => {
    if (newCost.trim()) {
      addCost(newCost.trim())
      setNewCost('')
    }
  }

  const handleSave = () => {
    setSavedMessage(true)
    setTimeout(() => setSavedMessage(false), 2000)
  }

  const handleReset = () => {
    if (confirm('Are you sure you want to reset to defaults?')) {
      setSettings({
        emailNotifications: true,
        requireRegistration: false,
        autoApproveEvents: false,
        maxCapacity: 5000
      })
    }
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings className="h-6 w-6 text-gray-900" />
              <h2 className="text-2xl font-bold text-gray-900">Admin Panel</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="h-6 w-6 text-gray-700" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Analytics Overview */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">📊</span>
                Analytics Overview
              </h3>
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-gray-900">{eventCount}</p>
                  <p className="text-xs text-gray-600 mt-1">Total Events</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-gray-900">{registrations}</p>
                  <p className="text-xs text-gray-600 mt-1">Registrations</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-gray-900">{mostPopularCategory}</p>
                  <p className="text-xs text-gray-600 mt-1">Most Popular</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-gray-900">{avgAttendance}%</p>
                  <p className="text-xs text-gray-600 mt-1">Avg Attendance</p>
                </div>
              </div>
            </div>

            {/* Filter Management */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Management</h3>

              {/* Locations */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">Locations</h4>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddLocation()}
                      placeholder="New location"
                      className="text-sm px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                      onClick={handleAddLocation}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium whitespace-nowrap"
                    >
                      + Add
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {enabledLocations.map((location) => (
                    <div
                      key={location}
                      onClick={() => toggleLocation(location)}
                      className={`cursor-pointer px-3 py-1.5 rounded-full flex items-center gap-2 text-sm transition-all ${
                        enabledLocations.includes(location)
                          ? 'bg-gray-100 text-gray-900 border border-gray-400'
                          : 'bg-gray-50 text-gray-500 border border-gray-200 opacity-50'
                      }`}
                    >
                      {location}
                      {enabledLocations.includes(location) && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            removeLocation(location)
                          }}
                          className="hover:text-gray-600 transition-colors"
                          aria-label={`Remove ${location}`}
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">Categories</h4>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                      placeholder="New category"
                      className="text-sm px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                      onClick={handleAddCategory}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium whitespace-nowrap"
                    >
                      + Add
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {enabledCategories.map((category) => (
                    <div
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={`cursor-pointer px-3 py-1.5 rounded-full flex items-center gap-2 text-sm transition-all ${
                        enabledCategories.includes(category)
                          ? 'bg-gray-100 text-gray-900 border border-gray-400'
                          : 'bg-gray-50 text-gray-500 border border-gray-200 opacity-50'
                      }`}
                    >
                      {category}
                      {enabledCategories.includes(category) && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            removeCategory(category)
                          }}
                          className="hover:text-gray-600 transition-colors"
                          aria-label={`Remove ${category}`}
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Cost Types */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">Cost Types</h4>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newCost}
                      onChange={(e) => setNewCost(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddCost()}
                      placeholder="New cost type"
                      className="text-sm px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                      onClick={handleAddCost}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium whitespace-nowrap"
                    >
                      + Add
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {enabledCosts.map((cost) => (
                    <div
                      key={cost}
                      onClick={() => toggleCost(cost)}
                      className={`cursor-pointer px-3 py-1.5 rounded-full flex items-center gap-2 text-sm transition-all ${
                        enabledCosts.includes(cost)
                          ? 'bg-gray-100 text-gray-900 border border-gray-400'
                          : 'bg-gray-50 text-gray-500 border border-gray-200 opacity-50'
                      }`}
                    >
                      {cost}
                      {enabledCosts.includes(cost) && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            removeCost(cost)
                          }}
                          className="hover:text-gray-600 transition-colors"
                          aria-label={`Remove ${cost}`}
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* System Settings */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Settings</h3>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={() => handleToggle('emailNotifications')}
                    className="w-5 h-5 rounded cursor-pointer"
                  />
                  <span className="text-gray-900 font-medium">Enable email notifications</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.requireRegistration}
                    onChange={() => handleToggle('requireRegistration')}
                    className="w-5 h-5 rounded cursor-pointer"
                  />
                  <span className="text-gray-900 font-medium">Require event registration</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.autoApproveEvents}
                    onChange={() => handleToggle('autoApproveEvents')}
                    className="w-5 h-5 rounded cursor-pointer"
                  />
                  <span className="text-gray-900 font-medium">Auto-approve events</span>
                </label>
                <div className="flex items-center gap-3 pt-2">
                  <label className="text-gray-900 font-medium">Max event capacity:</label>
                  <input
                    type="number"
                    value={settings.maxCapacity}
                    onChange={(e) => handleCapacityChange(e.target.value)}
                    className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Success Message */}
            {savedMessage && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm font-medium">
                ✓ Settings saved successfully!
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-between gap-3">
            <button
              onClick={handleReset}
              className="text-gray-600 hover:text-gray-900 font-medium text-sm"
            >
              Reset to Defaults
            </button>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Close
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
