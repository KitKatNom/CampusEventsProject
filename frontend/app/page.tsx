'use client'

import { useState, useMemo, useEffect } from 'react'
import { Search } from 'lucide-react'
import EventCard from '@/components/event-card'
import FilterPanel from '@/components/filter-panel'
import Header from '@/components/header'
import EventModal from '@/components/event-modal'
import { useFilters } from '@/contexts/filter-context'

const EVENTS = [
  {
    id: 1,
    title: 'Basketball Championship Finals',
    description: 'Watch our team compete in the championship finals. Free',
    fullDescription: 'Watch our team compete in the championship finals. Free admission for students.',
    category: 'Sports',
    date: 'Thursday, March 14, 2024',
    time: '7:00 PM',
    location: 'University Arena',
    capacity: '5000 max',
    cost: 'Free',
    registration: false,
    image: '/basketball-hoop-outdoor.jpg',
    duration: '2 hours',
    costBadge: 'Free admission'
  },
  {
    id: 2,
    title: 'Student Government Elections',
    description: 'Vote for your student representatives. Multiple voting',
    fullDescription: 'Vote for your student representatives. Multiple voting stations available.',
    category: 'Academic',
    date: 'Sunday, March 17, 2024',
    time: '9:00 AM - 5:00 PM',
    location: 'Student Center',
    capacity: '2000 max',
    cost: 'Free',
    registration: true,
    image: '/student-center-classroom-learning.jpg',
    duration: '8 hours',
    costBadge: 'Free'
  },
  {
    id: 3,
    title: 'Drama Club: Romeo & Juliet',
    description: "Experience Shakespeare's timeless classic performed by",
    fullDescription: "Experience Shakespeare's timeless classic performed by our talented drama club members.",
    category: 'Clubs',
    date: 'Tuesday, March 19, 2024',
    time: '8:00 PM',
    location: 'Theater Hall',
    capacity: '300 max',
    cost: 'Ticketed',
    registration: true,
    image: '/theater-stage-performance-drama.jpg',
    duration: '2 hours 30 minutes',
    costBadge: 'Ticketed'
  },
  {
    id: 4,
    title: 'Spring Formal Dance',
    description: 'Dress to impress for the annual spring formal. Tickets available',
    fullDescription: 'Dress to impress for the annual spring formal. Tickets are available now.',
    category: 'Social',
    date: 'Thursday, March 21, 2024',
    time: '8:00 PM - 12:00 AM',
    location: 'Grand Ballroom',
    capacity: '400 max',
    cost: 'Paid',
    registration: false,
    image: '/formal-dance-ballroom-elegant.jpg',
    duration: '4 hours',
    costBadge: 'Tickets Available'
  },
  {
    id: 5,
    title: 'Research Symposium',
    description: 'Undergraduate students present their research projects. Open to',
    fullDescription: 'Undergraduate students present their research projects. Open to all campus members.',
    category: 'Academic',
    date: 'Sunday, March 24, 2024',
    time: '10:00 AM - 4:00 PM',
    location: 'Science Building',
    capacity: '150 max',
    cost: 'Free',
    registration: true,
    image: '/research-presentation-university.jpg',
    duration: '6 hours',
    costBadge: 'Free'
  },
  {
    id: 6,
    title: 'Soccer Tournament',
    description: 'Intramural soccer tournament. Teams still needed for',
    fullDescription: 'Intramural soccer tournament. Teams still needed for participation.',
    category: 'Sports',
    date: 'Wednesday, March 27, 2024',
    time: '2:00 PM',
    location: 'Athletic Fields',
    capacity: '200 max',
    cost: 'Free',
    registration: true,
    image: '/soccer-tournament-sports-field.jpg',
    duration: '3 hours',
    costBadge: 'Free'
  },
  {
    id: 7,
    title: 'Photography Club Exhibition',
    description: 'Showcase of student photography from this semester.',
    fullDescription: 'Showcase of student photography from this semester.',
    category: 'Clubs',
    date: 'Friday, March 29, 2024',
    time: '6:00 PM - 9:00 PM',
    location: 'Art Gallery',
    capacity: '80 max',
    cost: 'Free',
    registration: false,
    image: '/photography-gallery-exhibition-art.jpg',
    duration: '3 hours',
    costBadge: 'Free'
  },
  {
    id: 8,
    title: 'Game Night Social',
    description: 'Board games, video games, and snacks. Perfect way to meet new',
    fullDescription: 'Board games, video games, and snacks. Perfect way to meet new friends.',
    category: 'Social',
    date: 'Monday, April 1, 2024',
    time: '7:00 PM - 11:00 PM',
    location: 'Student Lounge',
    capacity: '50 max',
    cost: 'Free',
    registration: false,
    image: '/board-games-game-night-fun.jpg',
    duration: '4 hours',
    costBadge: 'Free'
  }
]

export default function CampusEvents() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const { enabledLocations, enabledCategories, enabledCosts } = useFilters()
  const [mounted, setMounted] = useState(false)
  
  const [filters, setFilters] = useState({
    category: 'All Events',
    dateRange: 'All Dates',
    time: 'All Times',
    location: 'All Locations',
    cost: 'All Costs',
    registration: 'All Events'
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const getTimeCategory = (timeStr: string): string => {
    const timeUpper = timeStr.toUpperCase()
    if (timeUpper.includes('AM') && parseInt(timeUpper) < 12) return 'Morning'
    if (timeUpper.includes('AM') || (parseInt(timeUpper.split(':')[0]) < 12)) return 'Morning'
    if (timeUpper.includes('PM')) {
      const hour = parseInt(timeUpper.split(':')[0])
      if (hour < 5 || (hour === 12)) return 'Afternoon'
      return 'Evening'
    }
    const hour = parseInt(timeUpper.split(':')[0])
    if (hour < 12) return 'Morning'
    if (hour < 17) return 'Afternoon'
    return 'Evening'
  }

  const filteredEvents = useMemo(() => {
    if (!mounted) return []

    return EVENTS.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesLocation = enabledLocations.length === 0 || enabledLocations.includes(event.location)
      const matchesCategory = enabledCategories.length === 0 || enabledCategories.includes(event.category)
      const matchesCost = enabledCosts.length === 0 || enabledCosts.includes(event.cost)

      const matchesFilterCategory = filters.category === 'All Events' || event.category === filters.category
      const matchesFilterLocation = filters.location === 'All Locations' || event.location === filters.location
      const matchesFilterCost = filters.cost === 'All Costs' || event.cost === filters.cost
      const matchesFilterTime = filters.time === 'All Times' || getTimeCategory(event.time) === filters.time
      const matchesFilterRegistration = filters.registration === 'All Events' || 
        (filters.registration === 'Registration Required' && event.registration) ||
        (filters.registration === 'No Registration' && !event.registration)

      return matchesSearch && 
             matchesLocation && 
             matchesCategory && 
             matchesCost && 
             matchesFilterCategory && 
             matchesFilterLocation &&
             matchesFilterCost &&
             matchesFilterTime &&
             matchesFilterRegistration
    })
  }, [searchQuery, filters, enabledLocations, enabledCategories, enabledCosts, mounted])

  const appliedFiltersCount = [
    filters.category !== 'All Events',
    filters.dateRange !== 'All Dates',
    filters.time !== 'All Times',
    filters.location !== 'All Locations',
    filters.cost !== 'All Costs',
    filters.registration !== 'All Events'
  ].filter(Boolean).length

  const handleClearAll = () => {
    setSearchQuery('')
    setFilters({
      category: 'All Events',
      dateRange: 'All Dates',
      time: 'All Times',
      location: 'All Locations',
      cost: 'All Costs',
      registration: 'All Events'
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Title and Subtitle */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold mb-2 text-foreground">Campus Events</h1>
          <p className="text-muted-foreground">
            Discover exciting events happening around campus with advanced filtering
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search events by title, description, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-card border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Filter Panel */}
        <FilterPanel 
          filters={filters} 
          setFilters={setFilters}
          onClearAll={handleClearAll}
          appliedFiltersCount={appliedFiltersCount}
        />

        {/* Event Count */}
        <div className="text-center text-sm text-muted-foreground mb-8">
          Showing {filteredEvents.length} of {EVENTS.length} events
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-8">
          {filteredEvents.map(event => (
            <div
              key={event.id}
              onClick={() => setSelectedEvent(event)}
              className="cursor-pointer"
            >
              <EventCard event={event} />
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No events found matching your filters.</p>
          </div>
        )}
      </main>

      {selectedEvent && (
        <EventModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  )
}
