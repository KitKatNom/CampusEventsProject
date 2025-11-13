import { Calendar, Clock, MapPin, Users } from 'lucide-react'

interface EventCardProps {
  event: {
    id: number
    title: string
    description: string
    category: string
    date: string
    time: string
    location: string
    capacity: string
    cost: string
    registration: boolean
    image: string
  }
}

const CATEGORY_COLORS = {
  sports: { bg: 'bg-blue-100', text: 'text-blue-700' },
  academic: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  clubs: { bg: 'bg-pink-100', text: 'text-pink-700' },
  social: { bg: 'bg-amber-100', text: 'text-amber-700' }
}

const COST_COLORS = {
  free: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  paid: { bg: 'bg-amber-100', text: 'text-amber-700' },
  ticketed: { bg: 'bg-rose-100', text: 'text-rose-700' }
}

export default function EventCard({ event }: EventCardProps) {
  const categoryColor = CATEGORY_COLORS[event.category.toLowerCase() as keyof typeof CATEGORY_COLORS]
  const costColor = COST_COLORS[event.cost.toLowerCase() as keyof typeof COST_COLORS]

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-muted">
        <img 
          src={event.image || "/placeholder.svg"} 
          alt={event.title}
          className="w-full h-full object-cover"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <span className={`${categoryColor.bg} ${categoryColor.text} text-xs font-semibold px-2 py-1 rounded`}>
            {event.category}
          </span>
          <span className={`${costColor.bg} ${costColor.text} text-xs font-semibold px-2 py-1 rounded`}>
            {event.cost}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-2 text-sm line-clamp-2">
          {event.title}
        </h3>

        <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
          {event.description}
        </p>

        {/* Info Items */}
        <div className="space-y-2 text-xs text-muted-foreground">
          {/* Date */}
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span>{event.date}</span>
          </div>

          {/* Time */}
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 flex-shrink-0" />
            <span>{event.time}</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span>{event.location}</span>
          </div>

          {/* Capacity & Registration */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 flex-shrink-0" />
              <span>{event.capacity}</span>
            </div>
            {event.registration && (
              <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
