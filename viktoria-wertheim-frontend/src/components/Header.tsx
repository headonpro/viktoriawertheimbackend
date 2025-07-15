'use client'

import { useState } from 'react'
import { IconMenu2, IconX } from '@tabler/icons-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 header-gradient border-b border-gray-700 shadow-lg">
        <div className="container">
                      <div className="grid grid-cols-3 items-center" style={{ height: '70px' }}>
            {/* Logo - Links */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="flex-shrink-0 logo-container">
                  <img 
                    src="/viktorialogo.png" 
                    alt="Viktoria Wertheim Logo"
                    className="object-contain drop-shadow-lg"
                    width={48}
                    height={48}
                    style={{ 
                      filter: 'contrast(1.1) brightness(1.05)',
                      width: '48px',
                      height: '48px'
                    }}
                  />
                </div>
              </Link>
            </div>

            {/* Titel - Mitte */}
            <div className="flex justify-center">
              <Link href="/" className="flex items-center" style={{ gap: '6px' }}>
                <span className="font-bold text-viktoria-yellow text-4xl md:text-5xl font-permanent-marker header-text large-sv">SV</span>
                <div className="flex flex-col justify-center stacked-container">
                  <span className="font-bold text-white text-lg md:text-xl font-permanent-marker header-text stacked-text">VIKTORIA</span>
                  <span className="font-bold text-white text-lg md:text-xl font-permanent-marker header-text stacked-text">WERTHEIM</span>
                </div>
              </Link>
            </div>

            {/* Navigation - Rechts */}
            <div className="flex justify-end">
              {/* Hamburger Menu Button - now for all screen sizes */}
              <button
                onClick={toggleMenu}
                className="touch-target text-white hover:text-viktoria-yellow transition-colors"
                aria-label="Menü öffnen"
              >
                {isMenuOpen ? <IconX size={24} className="text-white hover:text-viktoria-yellow transition-colors" /> : <IconMenu2 size={24} className="text-white hover:text-viktoria-yellow transition-colors" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hamburger Side Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="fixed inset-0 bg-black/50 z-40"
            />

            {/* Side Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-64 bg-white z-40 shadow-lg"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold text-viktoria-blue">Menü</h2>
                  <button
                    onClick={toggleMenu}
                    className="touch-target text-gray-700 hover:text-viktoria-blue transition-colors"
                    aria-label="Menü schließen"
                  >
                    <IconX size={24} className="text-gray-700 hover:text-viktoria-blue transition-colors" />
                  </button>
                </div>

                <nav className="space-y-4">
                  <Link
                    href="/"
                    onClick={toggleMenu}
                    className="block py-2 text-gray-700 hover:text-viktoria-blue transition-colors"
                  >
                    Home
                  </Link>
                  <Link
                    href="/news"
                    onClick={toggleMenu}
                    className="block py-2 text-gray-700 hover:text-viktoria-blue transition-colors"
                  >
                    Nachrichten
                  </Link>
                  <Link
                    href="/teams"
                    onClick={toggleMenu}
                    className="block py-2 text-gray-700 hover:text-viktoria-blue transition-colors"
                  >
                    Mannschaften
                  </Link>
                  <Link
                    href="/shop"
                    onClick={toggleMenu}
                    className="block py-2 text-gray-700 hover:text-viktoria-blue transition-colors"
                  >
                    Shop
                  </Link>
                  <Link
                    href="/kontakt"
                    onClick={toggleMenu}
                    className="block py-2 text-gray-700 hover:text-viktoria-blue transition-colors"
                  >
                    Kontakt
                  </Link>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
} 