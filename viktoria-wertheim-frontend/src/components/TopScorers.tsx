'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { IconTrophy } from '@tabler/icons-react'
import dynamic from 'next/dynamic'

const AnimatedSection = dynamic(
  () => import('@/components/AnimatedSection'),
  { ssr: false }
)

interface TopScorer {
  position: number
  name: string
  team: string
  goals: number
  games: number
  isOwnPlayer?: boolean
}

const TopScorers = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  
  // Hilfsfunktion zur Aufteiling von Vor- und Nachnamen
  const splitName = (fullName: string) => {
    const parts = fullName.split(' ')
    const lastName = parts[parts.length - 1]
    const firstName = parts.slice(0, -1).join(' ')
    return { firstName, lastName }
  }
  
  const topScorers: TopScorer[] = [
    {
      position: 1,
      name: 'Okan Cirakoglu',
      team: 'Viktoria Wertheim',
      goals: 19,
      games: 16,
      isOwnPlayer: true
    },
    {
      position: 2,
      name: 'Silas Jacob',
      team: 'Viktoria Wertheim',
      goals: 15,
      games: 18,
      isOwnPlayer: true
    },
    {
      position: 3,
      name: 'Justin Schulz',
      team: 'Viktoria Wertheim',
      goals: 12,
      games: 17,
      isOwnPlayer: true
    },
    {
      position: 4,
      name: 'Marco Klein',
      team: 'Viktoria Wertheim',
      goals: 11,
      games: 18,
      isOwnPlayer: true
    },
    {
      position: 5,
      name: 'David Bauer',
      team: 'Viktoria Wertheim',
      goals: 10,
      games: 16,
      isOwnPlayer: true
    },
    {
      position: 6,
      name: 'Alex Schmidt',
      team: 'Viktoria Wertheim',
      goals: 9,
      games: 18,
      isOwnPlayer: true
    }
  ]

  const displayedScorers = isExpanded ? topScorers : topScorers.slice(0, 3)

  return (
    <AnimatedSection className="px-2 pt-0 pb-8" delay={0.2}>
      <div className="container max-w-6xl">
        <h2 className="text-xs font-normal text-gray-600 uppercase tracking-wide mb-4 text-center font-permanent-marker">
          Torschützen König
        </h2>
        
        <div 
          className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden cursor-pointer hover:bg-white/50 transition-all duration-300"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Header */}
          <div className="bg-white/20 px-4 py-3 border-b border-white/20">
            <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-600 uppercase tracking-wide">
              <div className="col-span-1">#</div>
              <div className="col-span-7">Spieler</div>
              <div className="col-span-2 text-center">Spiele</div>
              <div className="col-span-2 text-center font-bold">Tore</div>
            </div>
          </div>

          {/* Top Scorers */}
          <div className="divide-y divide-white/10">
            {displayedScorers.map((scorer, index) => (
              <div
                key={scorer.position}
                className={`px-4 py-3 transition-all duration-300 relative overflow-hidden ${
                  scorer.position === 1 
                    ? 'bg-viktoria-blue-light rounded-lg hover:bg-viktoria-blue hover:shadow-lg hover:shadow-viktoria-blue/20 hover:scale-[1.02] cursor-pointer' 
                    : 'hover:bg-white/30'
                }`}
              >
                {/* Holo-Schimmer-Effekt für Torschützenkönig */}
                {scorer.position === 1 && (
                  <>
                    {/* Prismatische Textur-Basis */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer z-0"></div>
                    
                    {/* Regenbogen-Prisma-Effekt */}
                    <div className="absolute inset-0 animate-shimmer-slow z-0" style={{
                      background: `repeating-linear-gradient(
                        45deg,
                        transparent,
                        transparent 2px,
                        rgba(255, 0, 150, 0.1) 4px,
                        rgba(0, 255, 255, 0.1) 6px,
                        rgba(255, 255, 0, 0.1) 8px,
                        rgba(150, 0, 255, 0.1) 10px,
                        transparent 12px
                      )`
                    }}></div>
                    
                    {/* Zusätzlicher Glanz-Schimmer */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-viktoria-yellow/15 to-transparent animate-shimmer-slow z-0 mix-blend-overlay"></div>
                    
                    {/* Zweiter Schimmer-Streifen für mehr Tiefe */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-shimmer z-0" style={{
                      animationDelay: '1.5s',
                      transform: 'skewX(-15deg)'
                    }}></div>
                    
                    {/* Prismatische Lichtbrechung */}
                    <div className="absolute inset-0 animate-prisma-shift z-0" style={{
                      background: `linear-gradient(
                        45deg,
                        transparent,
                        rgba(255, 0, 100, 0.15) 25%,
                        rgba(0, 255, 255, 0.15) 50%,
                        rgba(255, 255, 0, 0.15) 75%,
                        transparent
                      )`,
                      width: '200%',
                      height: '200%',
                      top: '-50%',
                      left: '-50%'
                    }}></div>
                  </>
                )}
                <div className="grid grid-cols-12 gap-2 items-center relative z-10">
                  {/* Position */}
                  <div className="col-span-1 flex items-center">
                    {scorer.position === 1 ? (
                      <IconTrophy className="text-viktoria-yellow" size={20} />
                    ) : (
                      <span className={`font-bold ${
                        scorer.position === 2 ? 'text-gray-600' :
                        'text-gray-700'
                      }`}>
                        {scorer.position}.
                      </span>
                    )}
                  </div>

                  {/* Player Name */}
                  <div className="col-span-7">
                    {scorer.position === 1 ? (
                      <span className="text-viktoria-yellow font-semibold">
                        <span className="font-light">{splitName(scorer.name).firstName}</span>
                        {' '}
                        <span className="font-bold">{splitName(scorer.name).lastName}</span>
                      </span>
                    ) : (
                      <span className={`${
                        scorer.position === 2 ? 'text-gray-700 font-medium' :
                        'text-gray-700'
                      }`}>
                        <span className="font-light">{splitName(scorer.name).firstName}</span>
                        {' '}
                        <span className="font-semibold">{splitName(scorer.name).lastName}</span>
                      </span>
                    )}
                  </div>

                  {/* Games */}
                  <div className={`col-span-2 text-center text-sm ${
                    scorer.position === 1 ? 'text-viktoria-yellow font-medium' : 'text-gray-600'
                  }`}>
                    {scorer.games}
                  </div>

                  {/* Goals */}
                  <div className="col-span-2 text-center">
                    <span className={`font-bold ${
                      scorer.position === 1 ? 'text-viktoria-yellow text-lg' :
                      scorer.position === 2 ? 'text-gray-600' :
                      'text-gray-800 text-sm'
                    }`}>
                      {scorer.goals}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Expand/Collapse Indicator */}
          <div className="bg-white/30 px-4 py-4 border-t border-white/20 text-center hover:bg-white/40 transition-colors">
            <div className="flex items-center justify-center space-x-2 text-sm font-semibold text-gray-700">
              <span>{isExpanded ? 'Weniger anzeigen' : 'Alle Torschützen anzeigen'}</span>
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

export default TopScorers 