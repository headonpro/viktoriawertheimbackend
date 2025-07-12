'use client'

import { motion } from 'framer-motion'
import PageLayout from '@/components/PageLayout'
import { Users, Trophy, MapPin } from 'lucide-react'

export default function TeamsPage() {
  // Beispiel-Daten (später aus Strapi)
  const teams = [
    {
      id: 1,
      name: '1. Mannschaft',
      trainer: 'Max Mustermann',
      ligazugehoerigkeit: 'Kreisliga A',
      teamfoto: null,
      playerCount: 22,
    },
    {
      id: 2,
      name: '2. Mannschaft',
      trainer: 'John Doe',
      ligazugehoerigkeit: 'Kreisliga B',
      teamfoto: null,
      playerCount: 18,
    },
    {
      id: 3,
      name: 'A-Jugend',
      trainer: 'Peter Schmidt',
      ligazugehoerigkeit: 'Kreisliga Jugend A',
      teamfoto: null,
      playerCount: 16,
    },
    {
      id: 4,
      name: 'B-Jugend',
      trainer: 'Lisa Weber',
      ligazugehoerigkeit: 'Kreisliga Jugend B',
      teamfoto: null,
      playerCount: 14,
    },
  ]

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-viktoria-blue text-white py-8 px-4"
        >
          <div className="container">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Unsere Mannschaften
            </h1>
            <p className="text-white/90">
              Lerne unsere Teams und ihre Trainer kennen
            </p>
          </div>
        </motion.section>

        {/* Teams Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="px-4"
        >
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teams.map((team, index) => (
                <motion.div
                  key={team.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                >
                  {/* Team Photo */}
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <Users size={48} className="text-gray-400" />
                  </div>
                  
                  {/* Team Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {team.name}
                    </h3>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Users size={16} className="mr-2 text-viktoria-blue" />
                        <span>Trainer: {team.trainer}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Trophy size={16} className="mr-2 text-viktoria-blue" />
                        <span>{team.ligazugehoerigkeit}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-2 text-viktoria-blue" />
                        <span>{team.playerCount} Spieler</span>
                      </div>
                    </div>
                    
                    <button className="mt-4 w-full bg-viktoria-blue text-white py-2 px-4 rounded-lg hover:bg-viktoria-blue/90 transition-colors">
                      Team ansehen
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </PageLayout>
  )
} 