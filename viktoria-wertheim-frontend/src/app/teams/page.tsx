'use client'

import { motion } from 'framer-motion'
import PageLayout from '@/components/PageLayout'
import { IconUsers, IconTrophy, IconMapPin } from '@tabler/icons-react'

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
      name: '3. Mannschaft',
      trainer: 'Peter Schmidt',
      ligazugehoerigkeit: 'Kreisliga C',
      teamfoto: null,
      playerCount: 16,
    },
  ]

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Header Section - direkt unter der Navbar */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full header-gradient py-6 shadow-lg"
        >
          <div className="container">
            <h1 className="text-3xl md:text-4xl font-permanent-marker text-white text-center news-title">
              <span className="text-viktoria-yellow font-permanent-marker news-title">M</span>annschaften
            </h1>
          </div>
        </motion.section>

        {/* Teams Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="px-4 pb-8 pt-8"
        >
          <div className="container">
            <div className="space-y-4">
              {teams.map((team, index) => (
                <motion.button
                  key={team.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  onClick={() => {
                    // Navigation zur Team-Detail-Seite
                    window.location.href = `/teams/${team.id}`
                  }}
                  className="w-full relative rounded-lg overflow-hidden hover:shadow-xl hover:scale-[1.01] transition-all duration-300 cursor-pointer aspect-[21/9] group text-left"
                >
                  {/* Team Photo Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-viktoria-blue-light to-viktoria-blue-light group-hover:from-viktoria-blue-light group-hover:to-viktoria-blue-light transition-all duration-300"></div>
                  <div className="absolute inset-0 backdrop-blur-sm bg-black/20"></div>
                  
                  {/* Team Info Overlay */}
                  <div className="relative z-10 h-full flex items-center justify-between p-4 md:p-6">
                    <div className="flex-1">
                      {/* Team Name */}
                      <h3 className="text-lg md:text-xl font-bold text-viktoria-yellow mb-3 group-hover:text-white transition-colors duration-300">
                        {team.name}
                      </h3>
                      
                      {/* Team Details - Einheitliches Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
                        <div className="flex items-center">
                          <IconUsers size={14} className="mr-2 text-viktoria-yellow flex-shrink-0" />
                          <span className="text-sm text-white font-medium">Trainer: {team.trainer}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <IconTrophy size={14} className="mr-2 text-viktoria-yellow flex-shrink-0" />
                          <span className="text-sm text-white font-medium">{team.ligazugehoerigkeit}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <IconMapPin size={14} className="mr-2 text-viktoria-yellow flex-shrink-0" />
                          <span className="text-sm text-white font-medium">{team.playerCount} Spieler</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Click Indicator */}
                    <div className="ml-4 text-right">
                      <div className="text-viktoria-yellow text-2xl group-hover:scale-110 transition-transform duration-300">
                        →
                      </div>
                      <div className="text-xs text-white/80 mt-1">
                        Klicken
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </PageLayout>
  )
} 