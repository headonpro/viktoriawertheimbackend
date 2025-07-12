'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-viktoria-blue rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <span className="font-bold text-viktoria-blue text-lg">Viktoria Wertheim</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-viktoria-blue transition-colors">
                Home
              </Link>
              <Link href="/news" className="text-gray-700 hover:text-viktoria-blue transition-colors">
                News
              </Link>
              <Link href="/teams" className="text-gray-700 hover:text-viktoria-blue transition-colors">
                Mannschaften
              </Link>
              <Link href="/fixtures" className="text-gray-700 hover:text-viktoria-blue transition-colors">
                Spiele
              </Link>
              <Link href="/table" className="text-gray-700 hover:text-viktoria-blue transition-colors">
                Tabelle
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden touch-target text-gray-700 hover:text-viktoria-blue transition-colors"
              aria-label="Menü öffnen"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Side Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />

            {/* Side Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-64 bg-white z-50 shadow-lg md:hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold text-viktoria-blue">Menü</h2>
                  <button
                    onClick={toggleMenu}
                    className="touch-target text-gray-700 hover:text-viktoria-blue transition-colors"
                    aria-label="Menü schließen"
                  >
                    <X size={24} />
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
                    News
                  </Link>
                  <Link
                    href="/teams"
                    onClick={toggleMenu}
                    className="block py-2 text-gray-700 hover:text-viktoria-blue transition-colors"
                  >
                    Mannschaften
                  </Link>
                  <Link
                    href="/fixtures"
                    onClick={toggleMenu}
                    className="block py-2 text-gray-700 hover:text-viktoria-blue transition-colors"
                  >
                    Spiele
                  </Link>
                  <Link
                    href="/table"
                    onClick={toggleMenu}
                    className="block py-2 text-gray-700 hover:text-viktoria-blue transition-colors"
                  >
                    Tabelle
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