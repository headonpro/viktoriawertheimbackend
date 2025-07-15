'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import PageLayout from '@/components/PageLayout'
import { IconUsers, IconTrophy, IconMapPin } from '@tabler/icons-react'
import { strapi } from '@/lib/strapi'
import { Mannschaft } from '@/types/strapi'

export default function TeamsPage() {
  const [teams, setTeams] = useState<Mannschaft[]>([])
  const [loading, setLoading] = useState(true)

  // Mock-Daten als Fallback
  const mockTeams: Mannschaft[] = [
    {
      id: 1,
      attributes: {
        name: '1. Mannschaft',
        trainer: 'Max Mustermann',
        liga: 'Kreisliga A',
        teamfoto: undefined,
        publishedAt: '2024-01-01T00:00:00.000Z',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z'
      }
    },
    {
      id: 2,
      attributes: {
        name: '2. Mannschaft',
        trainer: 'John Doe',
        liga: 'Kreisliga B',
        teamfoto: undefined,
        publishedAt: '2024-01-01T00:00:00.000Z',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z'
      }
    },
    {
      id: 3,
      attributes: {
        name: '3. Mannschaft',
        trainer: 'Peter Schmidt',
        liga: 'Kreisliga C',
        teamfoto: undefined,
        publishedAt: '2024-01-01T00:00:00.000Z',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z'
      }
    }
  ]

  // Fetch teams from API
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true)
        const response = await strapi.get('/mannschafts', {
          params: {
            populate: ['teamfoto', 'spielers']
          }
        })
        
        const apiTeams = response.data.data || []
        setTeams(apiTeams.length > 0 ? apiTeams : mockTeams)
      } catch (err) {
        console.error('Error fetching teams, using mock data:', err)
        setTeams(mockTeams)
      } finally {
        setLoading(false)
      }
    }

    fetchTeams()
  }, [])

  // Loading state
  if (loading) {
    return (
      <PageLayout>
        <div className="space-y-6">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full header-gradient py-6 shadow-lg lg:hidden"
          >
            <div className="container">
              <h1 className="text-3xl md:text-4xl font-permanent-marker text-white text-center news-title">
                <span className="text-viktoria-yellow font-permanent-marker news-title">M</span>annschaften
              </h1>
            </div>
          </motion.section>
          
          <div className="px-4 pb-8 pt-8">
            <div className="container">
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-700 mx-auto mb-4"></div>
                  <p className="text-gray-600">Mannschaften werden geladen...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Header Section - nur Mobile */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full header-gradient py-6 shadow-lg lg:hidden"
        >
          <div className="container">
            <h1 className="text-3xl md:text-4xl font-permanent-marker text-white text-center news-title">
              <span className="text-viktoria-yellow font-permanent-marker news-title">M</span>annschaften
            </h1>
          </div>
        </motion.section>

        {/* Desktop Statistics Dashboard - Only visible on desktop */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden lg:block px-4 pt-8"
        >
          <div className="container">
            <div className="bg-white/40 backdrop-blur-sm rounded-2xl border border-white/30 p-6 mb-8 md:shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Vereinsübersicht</h2>
              <div className="grid grid-cols-4 gap-6">
                <div className="text-center p-4 bg-white/60 rounded-xl border border-white/20 md:shadow-sm">
                  <div className="text-2xl font-bold text-viktoria-blue mb-1">{teams.length}</div>
                  <div className="text-sm text-gray-600">Mannschaften</div>
                </div>
                <div className="text-center p-4 bg-white/60 rounded-xl border border-white/20 md:shadow-sm">
                  <div className="text-2xl font-bold text-viktoria-blue mb-1">
                    {teams.reduce((acc, team) => acc + (team.attributes.spielers?.data?.length || 0), 0)}
                  </div>
                  <div className="text-sm text-gray-600">Aktive Spieler</div>
                </div>
                <div className="text-center p-4 bg-white/60 rounded-xl border border-white/20 md:shadow-sm">
                  <div className="text-2xl font-bold text-viktoria-blue mb-1">
                    {Array.from(new Set(teams.map(team => team.attributes.liga))).length}
                  </div>
                  <div className="text-sm text-gray-600">Ligen</div>
                </div>
                <div className="text-center p-4 bg-white/60 rounded-xl border border-white/20 md:shadow-sm">
                  <div className="text-2xl font-bold text-viktoria-blue mb-1">
                    {Array.from(new Set(teams.map(team => team.attributes.trainer))).length}
                  </div>
                  <div className="text-sm text-gray-600">Trainer</div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Mobile Teams List - Only visible on mobile/tablet */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:hidden px-4 pb-8 pt-8"
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
                        {team.attributes.name}
                      </h3>
                      
                      {/* Team Details - Einheitliches Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
                        <div className="flex items-center">
                          <IconUsers size={14} className="mr-2 text-viktoria-yellow flex-shrink-0" />
                          <span className="text-sm text-white font-medium">
                            Trainer: {team.attributes.trainer || 'N/A'}
                          </span>
                        </div>
                        
                        <div className="flex items-center">
                          <IconTrophy size={14} className="mr-2 text-viktoria-yellow flex-shrink-0" />
                          <span className="text-sm text-white font-medium">
                            {team.attributes.liga || 'Unbekannte Liga'}
                          </span>
                        </div>
                        
                        <div className="flex items-center">
                          <IconMapPin size={14} className="mr-2 text-viktoria-yellow flex-shrink-0" />
                          <span className="text-sm text-white font-medium">
                            {team.attributes.spielers?.data?.length || 0} Spieler
                          </span>
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

        {/* Desktop Teams Grid - Only visible on desktop */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden lg:block px-4 pb-8"
        >
          <div className="container">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Unsere Mannschaften</h2>
              <p className="text-gray-600">Entdecken Sie alle Teams von SV Viktoria Wertheim</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {teams.map((team, index) => (
                <motion.div
                  key={team.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="group"
                >
                  <div 
                    onClick={() => {
                      window.location.href = `/teams/${team.id}`
                    }}
                    className="bg-white/40 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden hover:bg-white/50 transition-all duration-300 group-hover:border-viktoria-yellow/50 cursor-pointer h-full flex flex-col md:shadow-lg md:hover:shadow-xl"
                  >
                    {/* Team Header */}
                    <div className="relative h-32 bg-gradient-to-br from-viktoria-blue-light to-viktoria-blue overflow-hidden">
                      {team.attributes.teamfoto?.data ? (
                        <img
                          src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${team.attributes.teamfoto.data.attributes.url}`}
                          alt={team.attributes.teamfoto.data.attributes.alternativeText || team.attributes.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="h-full flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-viktoria-yellow/20 rounded-full flex items-center justify-center mx-auto mb-2">
                              <IconUsers className="w-8 h-8 text-viktoria-yellow" />
                            </div>
                            <p className="text-viktoria-yellow font-semibold text-sm">SV Viktoria Wertheim</p>
                          </div>
                        </div>
                      )}
                      
                      {/* Team Badge */}
                      <div className="absolute top-4 right-4">
                        <div className="bg-viktoria-yellow text-gray-800 text-xs px-2 py-1 rounded-full font-semibold">
                          Team
                        </div>
                      </div>
                    </div>

                    {/* Team Content */}
                    <div className="p-6 flex-grow flex flex-col">
                      {/* Team Name */}
                      <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-viktoria-blue transition-colors">
                        {team.attributes.name}
                      </h3>

                      {/* Team Stats Grid */}
                      <div className="space-y-3 mb-6 flex-grow">
                        <div className="flex items-center justify-between p-3 bg-white/40 rounded-lg border border-white/30 md:shadow-sm">
                          <div className="flex items-center">
                            <IconUsers className="w-4 h-4 text-viktoria-blue mr-2" />
                            <span className="text-sm font-medium text-gray-700">Trainer</span>
                          </div>
                          <span className="text-sm font-semibold text-gray-800">
                            {team.attributes.trainer || 'Nicht verfügbar'}
                          </span>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-white/40 rounded-lg border border-white/30 md:shadow-sm">
                          <div className="flex items-center">
                            <IconTrophy className="w-4 h-4 text-viktoria-blue mr-2" />
                            <span className="text-sm font-medium text-gray-700">Liga</span>
                          </div>
                          <span className="text-sm font-semibold text-gray-800">
                            {team.attributes.liga || 'Unbekannt'}
                          </span>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-white/40 rounded-lg border border-white/30 md:shadow-sm">
                          <div className="flex items-center">
                            <IconMapPin className="w-4 h-4 text-viktoria-blue mr-2" />
                            <span className="text-sm font-medium text-gray-700">Spieler</span>
                          </div>
                          <span className="text-sm font-semibold text-gray-800">
                            {team.attributes.spielers?.data?.length || 0}
                          </span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="pt-4 border-t border-white/20">
                        <div className="flex items-center justify-center text-viktoria-blue font-semibold group-hover:text-viktoria-blue-light transition-colors group/btn">
                          <span className="text-sm">Team anzeigen</span>
                          <div className="ml-2 text-lg group-hover/btn:translate-x-1 transition-transform">
                            →
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Empty State for Desktop */}
            {teams.length === 0 && (
              <div className="text-center py-12">
                <div className="bg-white/40 backdrop-blur-sm rounded-2xl border border-white/20 p-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconUsers className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600 text-lg font-medium">
                    Keine Mannschaften gefunden
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    Die Mannschaftsdaten werden geladen oder sind nicht verfügbar.
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.section>
      </div>
    </PageLayout>
  )
} 