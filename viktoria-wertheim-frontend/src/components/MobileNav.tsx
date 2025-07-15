'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IconBallFootball, IconNews, IconUsers, IconShirt, IconMail } from '@tabler/icons-react'

export default function MobileNav() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 70) {
        // Scrolling down - hide navbar
        setIsVisible(false)
      } else {
        // Scrolling up - show navbar
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  const navItems = [
    { href: '/', label: 'HEIM', icon: IconBallFootball },
    { href: '/news', label: 'NEWS', icon: IconNews },
    { href: '/teams', label: 'TEAMS', icon: IconUsers },
    { href: '/shop', label: 'SHOP', icon: IconShirt },
    { href: '/kontakt', label: 'KONTAKT', icon: IconMail },
  ]

  return (
    <nav 
      className={`fixed left-0 right-0 bg-white border-b border-gray-200 md:hidden z-30 shadow-md transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`} 
      style={{ top: '70px' }}
    >
      <div className="flex justify-around items-center py-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg transition-colors ${
                isActive
                  ? ''
                  : 'hover:bg-gray-100'
              }`}
            >
              <Icon 
                size={32} 
                className={`transition-colors mb-1 ${
                  isActive
                    ? 'text-viktoria-yellow'
                    : 'text-gray-600 hover:text-viktoria-blue-light'
                }`}
              />
              <span 
                className={`text-[10px] font-medium transition-colors ${
                  isActive
                    ? 'text-viktoria-yellow'
                    : 'text-gray-600 hover:text-viktoria-blue-light'
                }`}
              >
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
} 