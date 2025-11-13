'use client'

import { useState } from 'react'
import { ChevronUp, X } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface FilterPanelProps {
  filters: {
    category: string
    dateRange: string
    time: string
    location: string
    cost: string
    registration: string
  }
  setFilters: (filters: any) => void
  onClearAll: () => void
  appliedFiltersCount: number
}

const CATEGORIES = ['All Events', 'Sports', 'Academic', 'Social', 'Arts', 'Clubs']
const COSTS = ['All Costs', 'Free', 'Paid', 'Ticketed']
const REGISTRATIONS = ['All Events', 'Registration Required', 'No Registration']

export default function FilterPanel({ filters, setFilters, onClearAll, appliedFiltersCount }: FilterPanelProps) {
  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value })
  }

  return (
    <div className="bg-card border border-input rounded-lg p-4 mb-8">
      <div className="flex items-center gap-2 mb-4 justify-between">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 flex items-center justify-center">
            <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </div>
          <span className="font-semibold text-foreground">Filter Events</span>
          {appliedFiltersCount > 0 && (
            <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
              {appliedFiltersCount}
            </span>
          )}
        </div>
        {appliedFiltersCount > 0 && (
          <button
            onClick={onClearAll}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            <X className="h-4 w-4" />
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Category */}
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Category</label>
          <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
            <SelectTrigger className="bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map(cat => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date Range */}
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Date Range</label>
          <Select value={filters.dateRange} onValueChange={(value) => handleFilterChange('dateRange', value)}>
            <SelectTrigger className="bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Dates">All Dates</SelectItem>
              <SelectItem value="This Week">This Week</SelectItem>
              <SelectItem value="This Month">This Month</SelectItem>
              <SelectItem value="Next Month">Next Month</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Time */}
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Time</label>
          <Select value={filters.time} onValueChange={(value) => handleFilterChange('time', value)}>
            <SelectTrigger className="bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Times">All Times</SelectItem>
              <SelectItem value="Morning">Morning (Before 12pm)</SelectItem>
              <SelectItem value="Afternoon">Afternoon (12pm - 5pm)</SelectItem>
              <SelectItem value="Evening">Evening (After 5pm)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Location */}
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Location</label>
          <Select value={filters.location} onValueChange={(value) => handleFilterChange('location', value)}>
            <SelectTrigger className="bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Locations">All Locations</SelectItem>
              <SelectItem value="University Arena">University Arena</SelectItem>
              <SelectItem value="Student Center">Student Center</SelectItem>
              <SelectItem value="Theater Hall">Theater Hall</SelectItem>
              <SelectItem value="Grand Ballroom">Grand Ballroom</SelectItem>
              <SelectItem value="Science Building">Science Building</SelectItem>
              <SelectItem value="Athletic Fields">Athletic Fields</SelectItem>
              <SelectItem value="Art Gallery">Art Gallery</SelectItem>
              <SelectItem value="Student Lounge">Student Lounge</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Cost */}
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Cost</label>
          <Select value={filters.cost} onValueChange={(value) => handleFilterChange('cost', value)}>
            <SelectTrigger className="bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {COSTS.map(cost => (
                <SelectItem key={cost} value={cost}>
                  {cost}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Registration */}
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Registration</label>
          <Select value={filters.registration} onValueChange={(value) => handleFilterChange('registration', value)}>
            <SelectTrigger className="bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {REGISTRATIONS.map(reg => (
                <SelectItem key={reg} value={reg}>
                  {reg}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
