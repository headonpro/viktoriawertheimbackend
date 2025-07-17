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
    <div className="container max-w-6xl">
      <AnimatedDiv
        className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/50 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
        delay={0.1}
      >
        {/* Kompakte horizontale Anordnung */}
        <div className="px-4 py-3 md:px-6 md:py-4">
          <div className="relative">
            
            {/* Platz - Links mit festem Abstand */}
            <div className="absolute left-0 text-center">
              <div className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
                Platz
              </div>
              <div className="flex items-center justify-center space-x-1">
                <div className="text-xl md:text-2xl font-bold text-viktoria-blue">
                  {teamData.tabellenplatz}
                </div>
                <div className="flex items-center">
                  {getTrendIcon(teamData.platzierungsveraenderung)}
                </div>
              </div>
            </div>

            {/* Form - Absolut zentriert */}
            <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
              <div className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
                Form
              </div>
              <div className="flex space-x-1 justify-center">
                {teamData.formLetzten5.map((result, index) => (
                  <div
                    key={index}
                    className={`w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center text-xs font-bold ${getFormColor(result)} transition-all duration-200 hover:scale-110 shadow-sm`}
                  >
                    {getFormText(result)}
                  </div>
                ))}
              </div>
            </div>

            {/* Liga - Rechts mit festem Abstand */}
            <div className="absolute right-0 text-center">
              <div className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
                Liga
              </div>
              <div className="text-sm md:text-base font-semibold text-viktoria-blue">
                {teamData.liga}
              </div>
            </div>

            {/* Invisible spacer to maintain height */}
            <div className="invisible">
              <div className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
                Platz
              </div>
              <div className="text-xl md:text-2xl font-bold">
                0
              </div>
            </div>
            
          </div>
        </div>
      </AnimatedDiv>
    </div>
  )
} 