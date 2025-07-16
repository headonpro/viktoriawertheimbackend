'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { IconTrendingUp, IconTrendingDown, IconMinus } from '@tabler/icons-react'

const AnimatedSection = dynamic(
  () => import('@/components/AnimatedSection'),
  { ssr: false }
)

const AnimatedDiv = dynamic(
  () => import('@/components/AnimatedSection').then(mod => ({ default: mod.AnimatedDiv })),
  { ssr: false }
)

export default function TeamStatus() {
  // Mock team data - 1. Mannschaft (kann später dynamisch werden)
  const teamData = {
    formLetzten5: ['S', 'U', 'S', 'N', 'S'], // S=Sieg, U=Unentschieden, N=Niederlage
    tabellenplatz: 3,
    platzierungsveraenderung: 'S', // S=nach oben, U=gleich, N=nach unten
    liga: 'Kreisliga' // 1. Mannschaft
  }
  
  // Weitere Mannschaften (für später):
  // 2. Mannschaft: { tabellenplatz: 5, liga: 'Kreisliga A', formLetzten5: ['S', 'S', 'U', 'S', 'N'], platzierungsveraenderung: 'U' }
  // 3. Mannschaft: { tabellenplatz: 8, liga: 'Kreisliga B', formLetzten5: ['N', 'S', 'S', 'U', 'S'], platzierungsveraenderung: 'N' }

  const getFormColor = (result: string) => {
    switch (result) {
      case 'S': return 'bg-green-500 text-white'
      case 'U': return 'bg-yellow-500 text-white'
      case 'N': return 'bg-red-500 text-white'
      default: return 'bg-gray-400 text-white'
    }
  }

  const getFormText = (result: string) => {
    switch (result) {
      case 'S': return 'S'
      case 'U': return 'U'
      case 'N': return 'N'
      default: return '?'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'S': return <IconTrendingUp size={16} className="text-green-500" />
      case 'U': return <IconMinus size={16} className="text-gray-400" />
      case 'N': return <IconTrendingDown size={16} className="text-red-500" />
      default: return <IconMinus size={16} className="text-gray-400" />
    }
  }

  return (
    <AnimatedSection className="py-0" delay={0}>
      <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="mb-0">
          <AnimatedDiv
            className="bg-white/40 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 border border-white/20 hover:bg-white/50 transition-all duration-300 md:shadow-lg md:hover:shadow-xl"
            delay={0.1}
          >
            {/* Ultra-Compact: Single Row, 3 Columns */}
            <div className="grid grid-cols-3 gap-4 md:gap-8">
              
              {/* Column 1: Form (Letzte 5 Spiele) */}
              <div className="text-center">
                <div className="mb-2 md:mb-3">
                  <span className="text-xs md:text-sm font-semibold text-gray-700 uppercase tracking-wide">Form</span>
                </div>
                <div className="flex space-x-1.5 md:space-x-2 justify-center">
                  {teamData.formLetzten5.map((result, index) => (
                    <div
                      key={index}
                      className={`w-5 h-5 md:w-7 md:h-7 rounded-full flex items-center justify-center text-xs md:text-sm font-bold ${getFormColor(result)} transition-all duration-200 hover:scale-110 shadow-sm`}
                    >
                      {getFormText(result)}
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Platzierung mit Trend */}
              <div className="text-center">
                <div className="mb-2 md:mb-3">
                  <span className="text-xs md:text-sm font-semibold text-gray-700 uppercase tracking-wide">Platz</span>
                </div>
                <div className="flex items-center justify-center space-x-1.5 md:space-x-2">
                  <div className="text-2xl md:text-3xl font-bold text-viktoria-blue">
                    {teamData.tabellenplatz}
                  </div>
                  <div className="flex items-center">
                    {getTrendIcon(teamData.platzierungsveraenderung)}
                  </div>
                </div>
              </div>

              {/* Column 3: Liga */}
              <div className="text-center">
                <div className="mb-2 md:mb-3">
                  <span className="text-xs md:text-sm font-semibold text-gray-700 uppercase tracking-wide">Liga</span>
                </div>
                <div className="text-sm md:text-base font-bold text-viktoria-blue">
                  {teamData.liga}
                </div>
              </div>
              
            </div>
          </AnimatedDiv>
        </div>
      </div>
    </AnimatedSection>
  )
} 