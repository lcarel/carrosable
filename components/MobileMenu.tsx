'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
        aria-label="Menu"
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {open && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50 px-4 py-4 flex flex-col gap-3">
          <a
            href="/"
            onClick={() => setOpen(false)}
            className="text-base font-medium text-gray-700 hover:text-green-700 py-2 border-b border-gray-100"
          >
            Explorer
          </a>
          <a
            href="/#about"
            onClick={() => setOpen(false)}
            className="text-base font-medium text-gray-700 hover:text-green-700 py-2 border-b border-gray-100"
          >
            À propos
          </a>
          <a
            href="/proposer"
            onClick={() => setOpen(false)}
            className="text-base font-semibold text-center px-4 py-3 rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors"
          >
            Proposer une balade
          </a>
        </div>
      )}
    </div>
  )
}
