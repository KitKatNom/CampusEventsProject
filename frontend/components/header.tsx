'use client'

import { Settings } from 'lucide-react'
import { useState } from 'react'
import AdminModal from './admin-modal'

export default function Header() {
  const [showAdmin, setShowAdmin] = useState(false)

  return (
    <>
      <header className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-bold">✦</span>
            </div>
            <span className="font-semibold text-foreground">Campus Events</span>
          </div>
          <button 
            onClick={() => setShowAdmin(true)}
            className="flex items-center gap-2 px-4 py-2 hover:bg-muted rounded-lg transition-colors"
          >
            <Settings className="h-5 w-5 text-foreground" />
            <span className="text-foreground text-sm">Admin</span>
          </button>
        </div>
      </header>

      {showAdmin && <AdminModal onClose={() => setShowAdmin(false)} />}
    </>
  )
}
