'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import dynamic from 'next/dynamic'

const AnimatedSection = dynamic(
  () => import('@/components/AnimatedSection'),
  { ssr: false }
)

interface Team {
  position: number
  name: string
  logo?: string
  games: number
  wins: number
  draws: number
  losses: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
  points: number
}

// Funktion zur Kürzung der Teamnamen (8 Zeichen um Zeilenumbruch zu verhindern)
const shortenTeamName = (name: string): string => {
  if (name.length <= 8) return name;
  return name.substring(0, 8);
}

// Funktion zur automatischen Zuweisung von Logos basierend auf Teamnamen
const getTeamLogo = (teamName: string): string | undefined => {
  const teamLogos: { [key: string]: string } = {
    'SV Viktoria Wertheim': '/viktorialogo.png',
    'Viktoria Wertheim': '/viktorialogo.png',
    'FC Eichel': '/fceichel.png',
    'TSV Assamstadt': '/Assamstadt.png',
    'Türkgücü Wertheim': '/Türkgücü.png',
    'TSV Tauberbischofsheim': '/Tauberbischofsheim.png',
    'FV Brehmbachtal': '/Brehmbachtal.png',
    'SV Brehmbachtal': '/Brehmbachtal.png',
    'SV Pülfringen': '/Pülfringen.png',
    'SG Pülfringen': '/Pülfringen.png',
    'TSV Kreuzwertheim': '/Kreuzwertheim.png',
    'SV Kreuzwertheim': '/Kreuzwertheim.png',
    'FC Hundheim-Steinbach': '/Hundheim.png',
    'TSV Hundheim': '/Hundheim.png',
    'SpG Schwabhausen/Windischbuch': '/Scwabhausen.png',
    'SV Schwabhausen': '/Scwabhausen.png',
    'FC Umpfertal': '/Umpfertal.png',
    'SG Umpfertal': '/Umpfertal.png',
    'SV Schönfeld': '/Schönfeld.png',
    'Kickers DHK Wertheim': '/Kickers.png',
    'Kickers Würzburg': '/Kickers.png',
    'FC Kickers': '/Kickers.png'
  }
  
  // Exakte Übereinstimmung
  if (teamLogos[teamName]) {
    return teamLogos[teamName]
  }
  
  // Partielle Übereinstimmung für flexiblere Namen
  for (const [key, logo] of Object.entries(teamLogos)) {
    const teamWords = teamName.toLowerCase().split(' ')
    const keyWords = key.toLowerCase().split(' ')
    
    // Prüfe ob mindestens ein charakteristisches Wort übereinstimmt
    for (const teamWord of teamWords) {
      for (const keyWord of keyWords) {
        if (teamWord.includes(keyWord) || keyWord.includes(teamWord)) {
          // Zusätzliche Prüfung für gemeinsame Begriffe wie "FC", "SV", etc.
          if (teamWord.length > 2 && keyWord.length > 2) {
            return logo
          }
        }
      }
    }
  }
  
  return undefined
}

const LeagueTable = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const teams: Team[] = [
    {
      position: 1,
      name: 'FC Umpfertal',
      logo: getTeamLogo('FC Umpfertal'),
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0
    },
    {
      position: 2,
      name: 'FC Hundheim-Steinbach',
      logo: getTeamLogo('FC Hundheim-Steinbach'),
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0
    },
    {
      position: 3,
      name: 'FV Brehmbachtal',
      logo: getTeamLogo('FV Brehmbachtal'),
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0
    },
    {
      position: 4,
      name: 'Kickers DHK Wertheim',
      logo: getTeamLogo('Kickers DHK Wertheim'),
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0
    },
    {
      position: 5,
      name: 'SG RaMBo',
      logo: getTeamLogo('SG RaMBo'),
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0
    },
    {
      position: 6,
      name: 'SV Pülfringen',
      logo: getTeamLogo('SV Pülfringen'),
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0
    },
    {
      position: 7,
      name: 'SV Schönfeld',
      logo: getTeamLogo('SV Schönfeld'),
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0
    },
    {
      position: 8,
      name: 'SV Viktoria Wertheim',
      logo: getTeamLogo('SV Viktoria Wertheim'),
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0
    },
    {
      position: 9,
      name: 'SpG Impfingen/Tauberb.heim 2',
      logo: getTeamLogo('SpG Impfingen/Tauberb.heim 2'),
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0
    },
    {
      position: 10,
      name: 'SpG Schwabhausen/Windischbuch',
      logo: getTeamLogo('SpG Schwabhausen/Windischbuch'),
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0
    },
    {
      position: 11,
      name: 'TSV Assamstadt',
      logo: getTeamLogo('TSV Assamstadt'),
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0
    },
    {
      position: 12,
      name: 'TSV Kreuzwertheim',
      logo: getTeamLogo('TSV Kreuzwertheim'),
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0
    },
    {
      position: 13,
      name: 'TuS Großrinderfeld',
      logo: getTeamLogo('TuS Großrinderfeld'),
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0
    },
    {
      position: 14,
      name: 'Türkgücü Wertheim',
      logo: getTeamLogo('Türkgücü Wertheim'),
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0
    },
    {
      position: 15,
      name: 'VfB Reicholzheim',
      logo: getTeamLogo('VfB Reicholzheim'),
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0
    },
    {
      position: 16,
      name: 'VfR Gerlachsheim',
      logo: getTeamLogo('VfR Gerlachsheim'),
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0
    }
  ]

  // Filter teams for compact view: show team above, Viktoria Wertheim, and team below
  const displayedTeams = isExpanded ? teams : teams.filter(team => 
    team.position >= 7 && team.position <= 9
  )

  const toggleExpanded = () => setIsExpanded(!isExpanded)

  return (
    <AnimatedSection className="px-2 pt-0 pb-8" delay={0.1}>
      <div className="container max-w-6xl">
        <h2 className="text-xs font-normal text-gray-600 uppercase tracking-wide mb-4 text-center font-permanent-marker">
          Kreisliga Tauberbischofsheim
        </h2>
        
        <div 
          className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden cursor-pointer hover:bg-white/50 transition-all duration-300"
          onClick={toggleExpanded}
        >
          {/* Header */}
          <div className="bg-white/20 px-4 py-3 border-b border-white/20">
            <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-600 uppercase tracking-wide">
              <div className="col-span-1">#</div>
              <div className="col-span-4">Verein</div>
              <div className="col-span-1 text-center">Sp</div>
              <div className="col-span-1 text-center">S</div>
              <div className="col-span-1 text-center">U</div>
              <div className="col-span-1 text-center">N</div>
              <div className="col-span-1 text-center">T</div>
              <div className="col-span-1 text-center">TD</div>
              <div className="col-span-1 text-center font-bold">Pkt</div>
            </div>
          </div>

          {/* Teams */}
          <div className="divide-y divide-white/10">
            {displayedTeams.map((team, index) => (
              <div
                key={team.position}
                className={`px-4 py-3 transition-all duration-300 ${
                  team.name === 'SV Viktoria Wertheim' 
                    ? 'bg-viktoria-blue-light rounded-lg hover:bg-viktoria-blue hover:shadow-lg hover:shadow-viktoria-blue/20 hover:scale-[1.02] cursor-pointer' 
                    : 'hover:bg-white/20'
                }`}
              >
                <div className="grid grid-cols-12 gap-2 items-center text-sm">
                  {/* Position */}
                  <div className="col-span-1">
                    <span className={`font-semibold ${
                      team.name === 'SV Viktoria Wertheim' ? 'text-white' : 'text-gray-700'
                    }`}>
                      {team.position}.
                    </span>
                  </div>

                  {/* Team Name & Logo */}
                  <div className="col-span-4 flex items-center space-x-2">
                    {team.logo ? (
                      <img 
                        src={team.logo} 
                        alt={`${team.name} Logo`}
                        className="w-6 h-6 object-contain drop-shadow-sm"
                      />
                    ) : (
                      <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">
                          {team.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <span className={`font-medium ${
                      team.name === 'SV Viktoria Wertheim' ? 'text-white' : 'text-gray-700'
                    }`}>
                      {shortenTeamName(team.name)}
                    </span>
                  </div>

                  {/* Games */}
                  <div className={`col-span-1 text-center ${
                    team.name === 'SV Viktoria Wertheim' ? 'text-white' : 'text-gray-600'
                  }`}>
                    {team.games}
                  </div>

                  {/* Wins */}
                  <div className={`col-span-1 text-center ${
                    team.name === 'SV Viktoria Wertheim' ? 'text-white' : 'text-gray-600'
                  }`}>
                    {team.wins}
                  </div>

                  {/* Draws */}
                  <div className={`col-span-1 text-center ${
                    team.name === 'SV Viktoria Wertheim' ? 'text-white' : 'text-gray-600'
                  }`}>
                    {team.draws}
                  </div>

                  {/* Losses */}
                  <div className={`col-span-1 text-center ${
                    team.name === 'SV Viktoria Wertheim' ? 'text-white' : 'text-gray-600'
                  }`}>
                    {team.losses}
                  </div>

                  {/* Goals */}
                  <div className={`col-span-1 text-center text-xs ${
                    team.name === 'SV Viktoria Wertheim' ? 'text-white' : 'text-gray-600'
                  }`}>
                    {team.goalsFor}:{team.goalsAgainst}
                  </div>

                  {/* Goal Difference */}
                  <div className="col-span-1 text-center">
                    <span className={`text-xs ${
                      team.name === 'SV Viktoria Wertheim' ? 'text-white' :
                      team.goalDifference > 0 ? 'text-green-600' : 
                      team.goalDifference < 0 ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {team.goalDifference > 0 ? '+' : ''}{team.goalDifference}
                    </span>
                  </div>

                  {/* Points */}
                  <div className="col-span-1 text-center">
                    <span className={`font-bold text-sm ${
                      team.name === 'SV Viktoria Wertheim' ? 'text-white' : 'text-gray-800'
                    }`}>
                      {team.points}
                    </span>
                  </div>
                </div>
              </div>
                          ))}
          </div>
          
          {/* Expand/Collapse Indicator */}
          <div className="bg-white/30 px-4 py-4 border-t border-white/20 text-center hover:bg-white/40 transition-colors">
            <div className="flex items-center justify-center space-x-2 text-sm font-semibold text-gray-700">
              <span>{isExpanded ? 'Weniger anzeigen' : 'Vollständige Tabelle anzeigen'}</span>
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </div>
        </div>

        {/* Legend - only show when expanded */}
        {isExpanded && (
          <div className="mt-4 text-center">
            <div className="text-xs text-gray-500">
              Sp = Spiele, S = Siege, U = Unentschieden, N = Niederlagen, T = Tore, TD = Tordifferenz, Pkt = Punkte
            </div>
          </div>
        )}
      </div>
    </AnimatedSection>
  )
}

export default LeagueTable 