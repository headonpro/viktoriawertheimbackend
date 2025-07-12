'use client'

import { motion } from 'framer-motion'
import PageLayout from '@/components/PageLayout'
import { Calendar, Clock, MapPin, Trophy, Users, Star } from 'lucide-react'

export default function HomePage() {
  return (
    <PageLayout>
      <div className="space-y-8">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-viktoria-blue to-viktoria-blue/80 text-white py-12 px-4"
        >
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Viktoria Wertheim
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6">
              Tradition • Leidenschaft • Gemeinschaft
            </p>
            <div className="flex items-center justify-center space-x-2 text-viktoria-yellow">
              <Star size={20} fill="currentColor" />
              <span className="font-semibold">Seit 1920</span>
              <Star size={20} fill="currentColor" />
            </div>
          </div>
        </motion.section>

        {/* Next Game Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="px-4"
        >
          <div className="container">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Calendar className="mr-2 text-viktoria-blue" />
              Nächstes Spiel
            </h2>
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-viktoria-blue">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-viktoria-blue rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">V</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Viktoria Wertheim</h3>
                    <p className="text-sm text-gray-600">1. Mannschaft</p>
                  </div>
                </div>
                <div className="text-center font-bold text-lg text-gray-800">
                  VS
                </div>
                <div className="flex items-center space-x-3">
                  <div>
                    <h3 className="font-bold text-gray-800 text-right">FC Gast</h3>
                    <p className="text-sm text-gray-600 text-right">Auswärts</p>
                  </div>
                  <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">G</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Clock size={16} />
                    <span>15:30</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin size={16} />
                    <span>Auswärtsstadion</span>
                  </div>
                </div>
                <div className="font-semibold text-viktoria-blue">
                  Sonntag, 15.12.2024
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Latest News Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="px-4"
        >
          <div className="container">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Trophy className="mr-2 text-viktoria-blue" />
              Neueste Nachrichten
            </h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                  <div className="flex space-x-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0"></div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-2">
                        Viktoria Wertheim gewinnt derby mit 3:1
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Ein spannendes Spiel endete mit einem verdienten Sieg für unsere Mannschaft...
                      </p>
                      <div className="text-xs text-gray-500">
                        vor 2 Stunden
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Recent Results Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="px-4"
        >
          <div className="container">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Users className="mr-2 text-viktoria-blue" />
              Letzte Ergebnisse
            </h2>
            <div className="space-y-3">
              {[
                { home: 'Viktoria Wertheim', away: 'FC Rival', homeScore: 3, awayScore: 1, date: '08.12.2024' },
                { home: 'SV Gegner', away: 'Viktoria Wertheim', homeScore: 0, awayScore: 2, date: '01.12.2024' },
                { home: 'Viktoria Wertheim', away: 'FC Konkurrent', homeScore: 1, awayScore: 1, date: '24.11.2024' },
              ].map((result, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-800">{result.home}</span>
                        <span className="font-bold text-lg text-gray-800">
                          {result.homeScore} : {result.awayScore}
                        </span>
                        <span className="font-medium text-gray-800">{result.away}</span>
                      </div>
                      <div className="text-xs text-gray-500 text-center mt-1">
                        {result.date}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Sponsors Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="px-4 pb-8"
        >
          <div className="container">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Unsere Sponsoren
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-4 flex items-center justify-center">
                  <div className="w-20 h-12 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </PageLayout>
  )
} 