'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Newspaper, Users, Calendar, Table } from 'lucide-react'

export default function MobileNav() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/news', label: 'News', icon: Newspaper },
    { href: '/teams', label: 'Teams', icon: Users },
    { href: '/fixtures', label: 'Spiele', icon: Calendar },
    { href: '/table', label: 'Tabelle', icon: Table },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-40">
      <div className="flex justify-around items-center py-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                isActive
                  ? 'text-viktoria-blue bg-viktoria-blue/10'
                  : 'text-gray-600 hover:text-viktoria-blue hover:bg-gray-100'
              }`}
            >
              <Icon size={20} className="mb-1" />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
} 