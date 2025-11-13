'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface FilterContextType {
  enabledLocations: string[]
  enabledCategories: string[]
  enabledCosts: string[]
  toggleLocation: (location: string) => void
  toggleCategory: (category: string) => void
  toggleCost: (cost: string) => void
  setEnabledLocations: (locations: string[]) => void
  setEnabledCategories: (categories: string[]) => void
  setEnabledCosts: (costs: string[]) => void
  addLocation: (location: string) => void
  addCategory: (category: string) => void
  addCost: (cost: string) => void
  removeLocation: (location: string) => void
  removeCategory: (category: string) => void
  removeCost: (cost: string) => void
  resetToDefaults: () => void
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

const DEFAULT_LOCATIONS = ['University Arena', 'Student Center', 'Theater Hall', 'Grand Ballroom', 'Science Building', 'Athletic Fields', 'Art Gallery', 'Student Lounge']
const DEFAULT_CATEGORIES = ['Sports', 'Academic', 'Social', 'Arts', 'Clubs']
const DEFAULT_COSTS = ['Free', 'Paid', 'Ticketed']

export function FilterProvider({ children }: { children: ReactNode }) {
  const [enabledLocations, setEnabledLocations] = useState(DEFAULT_LOCATIONS)
  const [enabledCategories, setEnabledCategories] = useState(DEFAULT_CATEGORIES)
  const [enabledCosts, setEnabledCosts] = useState(DEFAULT_COSTS)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedLocations = localStorage.getItem('enabledLocations')
    const savedCategories = localStorage.getItem('enabledCategories')
    const savedCosts = localStorage.getItem('enabledCosts')
    
    if (savedLocations) setEnabledLocations(JSON.parse(savedLocations))
    if (savedCategories) setEnabledCategories(JSON.parse(savedCategories))
    if (savedCosts) setEnabledCosts(JSON.parse(savedCosts))
    
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('enabledLocations', JSON.stringify(enabledLocations))
      localStorage.setItem('enabledCategories', JSON.stringify(enabledCategories))
      localStorage.setItem('enabledCosts', JSON.stringify(enabledCosts))
    }
  }, [enabledLocations, enabledCategories, enabledCosts, mounted])

  const toggleLocation = (location: string) => {
    setEnabledLocations(prev => 
      prev.includes(location)
        ? prev.filter(l => l !== location)
        : [...prev, location]
    )
  }

  const toggleCategory = (category: string) => {
    setEnabledCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const toggleCost = (cost: string) => {
    setEnabledCosts(prev => 
      prev.includes(cost)
        ? prev.filter(c => c !== cost)
        : [...prev, cost]
    )
  }

  const addLocation = (location: string) => {
    setEnabledLocations(prev => [...new Set([...prev, location])])
  }

  const addCategory = (category: string) => {
    setEnabledCategories(prev => [...new Set([...prev, category])])
  }

  const addCost = (cost: string) => {
    setEnabledCosts(prev => [...new Set([...prev, cost])])
  }

  const removeLocation = (location: string) => {
    setEnabledLocations(prev => prev.filter(l => l !== location))
  }

  const removeCategory = (category: string) => {
    setEnabledCategories(prev => prev.filter(c => c !== category))
  }

  const removeCost = (cost: string) => {
    setEnabledCosts(prev => prev.filter(c => c !== cost))
  }

  const resetToDefaults = () => {
    setEnabledLocations(DEFAULT_LOCATIONS)
    setEnabledCategories(DEFAULT_CATEGORIES)
    setEnabledCosts(DEFAULT_COSTS)
  }

  return (
    <FilterContext.Provider
      value={{
        enabledLocations,
        enabledCategories,
        enabledCosts,
        toggleLocation,
        toggleCategory,
        toggleCost,
        setEnabledLocations,
        setEnabledCategories,
        setEnabledCosts,
        addLocation,
        addCategory,
        addCost,
        removeLocation,
        removeCategory,
        removeCost,
        resetToDefaults
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export function useFilters() {
  const context = useContext(FilterContext)
  if (context === undefined) {
    throw new Error('useFilters must be used within FilterProvider')
  }
  return context
}
