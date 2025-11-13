'use client'

import { Calendar, Clock, MapPin, Users, DollarSign, X } from 'lucide-react'
import { useState } from 'react'

interface EventModalProps {
  event: {
    id: number
    title: string
    fullDescription: string
    date: string
    time: string
    location: string
    duration: string
    capacity: string
    costBadge: string
    registration: boolean
    image: string
    category: string
    cost: string
  }
  onClose: () => void
}

export default function EventModal({ event, onClose }: EventModalProps) {
  const [checkedItems, setCheckedItems] = useState({
    date: false,
    time: true,
    location: false,
    duration: false
  })

  const toggleCheck = (item: keyof typeof checkedItems) => {
    setCheckedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }))
  }

  const handleAddToCalendar = () => {
    console.log('[v0] Added to calendar:', event.title)
    alert(`${event.title} added to calendar!`)
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image Container with Badges and Close Button */}
          <div className="relative h-56 overflow-hidden bg-gray-200">
            <img
              src={event.image || '/placeholder.svg'}
              alt={event.title}
              className="w-full h-full object-cover"
            />

            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                {event.category}
              </span>
              <span className="bg-emerald-200 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">
                {event.cost === 'free' ? 'free' : event.cost === 'ticketed' ? 'ticketed' : 'paid'}
              </span>
            </div>

            {/* Close button - top right */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white rounded-lg p-2 shadow-lg hover:bg-gray-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5 text-gray-700" />
            </button>
          </div>

          {/* Content Section */}
          <div className="p-6">
            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {event.title}
            </h2>

            {/* About this event */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                About this event
              </h3>
              <p className="text-sm text-gray-600">
                {event.fullDescription}
              </p>
            </div>

            {/* Event Details Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Date */}
              <label className="bg-gray-50 p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-gray-600" />
                  <span className="text-xs font-medium text-gray-600">Date</span>
                </div>
                <p className="text-sm font-medium text-gray-900 mb-2">
                  {event.date}
                </p>
                <input
                  type="checkbox"
                  checked={checkedItems.date}
                  onChange={() => toggleCheck('date')}
                  className="w-4 h-4 cursor-pointer"
                />
              </label>

              {/* Location */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-gray-600" />
                  <span className="text-xs font-medium text-gray-600">Location</span>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {event.location}
                </p>
              </div>

              {/* Time */}
              <label className="bg-gray-50 p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-gray-600" />
                  <span className="text-xs font-medium text-gray-600">Time</span>
                </div>
                <p className="text-sm font-medium text-gray-900 mb-2">
                  {event.time}
                </p>
                <input
                  type="checkbox"
                  checked={checkedItems.time}
                  onChange={() => toggleCheck('time')}
                  className="w-4 h-4 cursor-pointer"
                />
              </label>

              {/* Duration */}
              <label className="bg-gray-50 p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-gray-600" />
                  <span className="text-xs font-medium text-gray-600">Duration</span>
                </div>
                <p className="text-sm font-medium text-gray-900 mb-2">
                  {event.duration}
                </p>
                <input
                  type="checkbox"
                  checked={checkedItems.duration}
                  onChange={() => toggleCheck('duration')}
                  className="w-4 h-4 cursor-pointer"
                />
              </label>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-6" />

            {/* Capacity and Cost */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-gray-600" />
                <span className="text-sm text-gray-700">
                  <span className="font-semibold">Capacity:</span> {event.capacity}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-gray-600" />
                <span className="text-sm text-gray-700">
                  <span className="font-semibold">Cost:</span>
                </span>
                <span className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">
                  {event.costBadge}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCalendar}
                className="flex-1 bg-gray-900 text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Add to Calendar
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-white text-gray-900 font-semibold py-3 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
