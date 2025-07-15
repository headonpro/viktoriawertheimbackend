'use client'

import { useState } from 'react'
import { createPortal } from 'react-dom'
import { IconClock, IconMapPin, IconCalendar, IconX, IconUser, IconTrophy, IconCards } from '@tabler/icons-react'
import dynamic from 'next/dynamic'

const AnimatedSection = dynamic(
  () => import('@/components/AnimatedSection'),
  { ssr: false }
)

const AnimatedDiv = dynamic(
  () => import('@/components/AnimatedSection').then(mod => ({ default: mod.AnimatedDiv })),
  { ssr: false }
)

interface GameCardProps {
  type: 'last' | 'next'
  homeTeam: string
  awayTeam: string
  homeScore?: number
  awayScore?: number
  date: string
  time: string
  isHome: boolean
  onClick: () => void
}

interface GameDetails {
  type: 'last' | 'next'
  homeTeam: string
  awayTeam: string
  homeScore?: number
  awayScore?: number
  date: string
  time: string
  isHome: boolean
  stadium: string
  referee: string
  goalScorers?: string[]
  yellowCards?: string[]
  redCards?: string[]
  lastMeeting?: {
    date: string
    result: string
    location: string
  }
}

// Funktion zur Bestimmung des Team-Logos basierend auf dem Teamnamen
const getTeamLogo = (teamName: string): string | undefined => {
  const teamLogos: { [key: string]: string } = {
    'SV Viktoria Wertheim': '/viktorialogo.png',
    'Viktoria Wertheim': '/viktorialogo.png',
    'FC Eichel': '/fceichel.png',
    'TSV Assamstadt': '/Assamstadt.png',
    'Türkgücü Wertheim': '/Türkgücü.png',
    'TSV Tauberbischofsheim': '/Tauberbischofsheim.png',
    'SV Brehmbachtal': '/Brehmbachtal.png',
    'SG Pülfringen': '/Pülfringen.png',
    'SV Kreuzwertheim': '/Kreuzwertheim.png',
    'TSV Hundheim': '/Hundheim.png',
    'SV Schwabhausen': '/Scwabhausen.png',
    'SG Umpfertal': '/Umpfertal.png',
    'SV Schönfeld': '/Schönfeld.png',
    'Kickers Würzburg': '/Kickers.png',
    'FC Kickers': '/Kickers.png'
  }
  
  // Exakte Übereinstimmung
  if (teamLogos[teamName]) {
    return teamLogos[teamName]
  }
  
  // Partielle Übereinstimmung für flexiblere Namen
  for (const [key, logo] of Object.entries(teamLogos)) {
    if (teamName.toLowerCase().includes(key.toLowerCase().split(' ')[1]) || 
        key.toLowerCase().includes(teamName.toLowerCase().split(' ')[1])) {
      return logo
    }
  }
  
  return undefined
}

const GameCard = ({ type, homeTeam, awayTeam, homeScore, awayScore, date, time, isHome, onClick }: GameCardProps) => {
  const isViktoria = homeTeam === 'SV Viktoria Wertheim' || awayTeam === 'SV Viktoria Wertheim' || homeTeam === 'Viktoria Wertheim' || awayTeam === 'Viktoria Wertheim'
  
  // Funktion zur Bestimmung der Ergebnisfarbe basierend auf dem Spielausgang
  const getResultColor = () => {
    if (type !== 'last' || homeScore === undefined || awayScore === undefined) {
      return 'text-gray-800'
    }
    
    const isViktoriaHome = homeTeam === 'SV Viktoria Wertheim' || homeTeam === 'Viktoria Wertheim'
    const viktoriaScore = isViktoriaHome ? homeScore : awayScore
    const opponentScore = isViktoriaHome ? awayScore : homeScore
    
    if (viktoriaScore > opponentScore) {
      return 'text-green-600' // Sieg
    } else if (viktoriaScore < opponentScore) {
      return 'text-red-600' // Niederlage
    } else {
      return 'text-gray-600' // Unentschieden
    }
  }
  
  // Logos für Home und Away Teams
  const homeLogo = getTeamLogo(homeTeam)
  const awayLogo = getTeamLogo(awayTeam)
  
  return (
    <div 
      className="bg-white/40 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/20 hover:bg-white/50 transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <div className="text-xs font-normal text-gray-600 uppercase tracking-wide font-permanent-marker">
          {type === 'last' ? 'Letztes Spiel' : 'Nächstes Spiel'}
        </div>
        <div className="text-xs text-gray-500">
          {date}
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <div className="flex items-center justify-center w-12 h-12">
          {homeLogo ? (
            <img 
              src={homeLogo} 
              alt={`${homeTeam} Logo`}
              className="w-12 h-12 object-contain drop-shadow-sm"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">{homeTeam.charAt(0)}</span>
            </div>
          )}
        </div>
        
        <div className="text-center">
          {type === 'last' && homeScore !== undefined && awayScore !== undefined ? (
            <div className={`font-bold text-xl md:text-2xl ${getResultColor()}`} style={{ letterSpacing: '-0.05em' }}>
              {homeScore}:{awayScore}
            </div>
          ) : (
            <div 
              className="font-bold text-viktoria-yellow text-lg font-permanent-marker"
              style={{ 
                WebkitTextStroke: '0.5px #4B5563'
              }}
            >
              VS
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-center w-12 h-12">
          {awayLogo ? (
            <img 
              src={awayLogo} 
              alt={`${awayTeam} Logo`}
              className="w-12 h-12 object-contain drop-shadow-sm"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">{awayTeam.charAt(0)}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-1">
          <IconClock size={12} />
          <span className="text-xs">{time}</span>
        </div>
        <div className="flex items-center space-x-1">
          <IconMapPin size={12} />
          <span className="text-xs">{isHome ? 'Heim' : 'Auswärts'}</span>
        </div>
      </div>
    </div>
  )
}

export default function GameCards() {
  const [selectedGame, setSelectedGame] = useState<GameDetails | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const openGameModal = (game: GameDetails) => {
    setSelectedGame(game)
    setIsModalOpen(true)
  }
  
  const closeGameModal = () => {
    setSelectedGame(null)
    setIsModalOpen(false)
  }
  
  // Funktion zur Bestimmung der Ergebnisfarbe für das letzte Aufeinandertreffen
  const getResultColor = (result: string, location: string) => {
    if (!result || !location) return 'text-gray-600'
    
    const [homeScore, awayScore] = result.split(':').map(Number)
    
    // Validierung der Scores
    if (isNaN(homeScore) || isNaN(awayScore)) return 'text-gray-600'
    
    // Bestimme, ob Viktoria Heim- oder Auswärtsteam war
    const isViktoriaHome = location.toLowerCase() === 'heim'
    const viktoriaScore = isViktoriaHome ? homeScore : awayScore
    const opponentScore = isViktoriaHome ? awayScore : homeScore
    
    if (viktoriaScore > opponentScore) {
      return 'text-green-600' // Sieg
    } else if (viktoriaScore < opponentScore) {
      return 'text-red-600' // Niederlage  
    } else {
      return 'text-gray-600' // Unentschieden
    }
  }
  
  // Funktion zur Bestimmung der Ergebnisfarbe für das Modal
  const getModalResultColor = (game: GameDetails) => {
    if (game.type !== 'last' || game.homeScore === undefined || game.awayScore === undefined) {
      return 'text-viktoria-blue'
    }
    
    const isViktoriaHome = game.homeTeam === 'SV Viktoria Wertheim' || game.homeTeam === 'Viktoria Wertheim'
    const viktoriaScore = isViktoriaHome ? game.homeScore : game.awayScore
    const opponentScore = isViktoriaHome ? game.awayScore : game.homeScore
    
    if (viktoriaScore > opponentScore) {
      return 'text-green-600' // Sieg
    } else if (viktoriaScore < opponentScore) {
      return 'text-red-600' // Niederlage
    } else {
      return 'text-gray-600' // Unentschieden
    }
  }
  
  const lastGameDetails: GameDetails = {
    type: 'last',
    homeTeam: 'SV Viktoria Wertheim',
    awayTeam: 'TSV Assamstadt',
    homeScore: 3,
    awayScore: 0,
    date: '02.08.2025',
    time: '18:00',
    isHome: true,
    stadium: 'Viktoria-Stadion Wertheim',
    referee: 'Schmidt, Michael',
    goalScorers: ['Müller 15\'', 'Wagner 42\'', 'Bauer 78\''],
    yellowCards: ['Neumann 65\'', 'Scholz 89\''],
    redCards: []
  }
  
  const nextGameDetails: GameDetails = {
    type: 'next',
    homeTeam: 'Türkgücü Wertheim',
    awayTeam: 'SV Viktoria Wertheim',
    date: '16.08.2025',
    time: '15:30',
    isHome: false,
    stadium: 'Sportplatz Türkgücü',
    referee: 'Weber, Thomas',
    lastMeeting: {
      date: '12.03.2025',
      result: '0:3', // Heimteam 0 : Viktoria (Auswärts) 3 = Sieg für Viktoria → GRÜN
      location: 'Auswärts'
    }
  }
  
  return (
    <>
      <AnimatedSection className="pt-6 pb-0" delay={0}>
        <div className="px-2 md:px-4 max-w-6xl mx-auto">
          <div className="grid grid-cols-2 gap-2 md:gap-4">
            {/* Letztes Spiel */}
            <GameCard
              type="last"
              homeTeam="SV Viktoria Wertheim"
              awayTeam="TSV Assamstadt"
              homeScore={3}
              awayScore={0}
              date="02.08.2025"
              time="18:00"
              isHome={true}
              onClick={() => openGameModal(lastGameDetails)}
            />
            
            {/* Nächstes Spiel */}
            <GameCard
              type="next"
              homeTeam="Türkgücü Wertheim"
              awayTeam="SV Viktoria Wertheim"
              date="16.08.2025"
              time="15:30"
              isHome={false}
              onClick={() => openGameModal(nextGameDetails)}
            />
          </div>
        </div>
      </AnimatedSection>
      
      {/* Game Modal */}
      {isModalOpen && selectedGame && createPortal(
        <div className="fixed inset-0 bg-black/30 backdrop-blur-md z-50 flex items-center justify-center p-2 md:p-4">
          <AnimatedDiv delay={0} className="bg-white/95 backdrop-blur-sm rounded-xl max-w-lg w-full mx-2 md:mx-0 border border-white/40 shadow-2xl max-h-[95vh] md:max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="relative rounded-t-xl pt-6 px-4 pb-4 md:pt-8 md:px-6 md:pb-6 text-center border-b border-gray-200">
              <button
                onClick={closeGameModal}
                className="absolute top-3 right-3 md:top-4 md:right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <IconX className="text-gray-600" size={18} />
              </button>
              
              {/* Teams */}
              <div className="flex items-center justify-center space-x-2 md:space-x-4 mb-3 md:mb-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mb-1 md:mb-2">
                    {getTeamLogo(selectedGame.homeTeam) ? (
                      <img 
                        src={getTeamLogo(selectedGame.homeTeam)} 
                        alt={`${selectedGame.homeTeam} Logo`}
                        className="w-12 h-12 md:w-16 md:h-16 object-contain drop-shadow-sm"
                      />
                    ) : (
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm md:text-base">{selectedGame.homeTeam.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-800 text-xs md:text-sm font-medium text-center leading-tight max-w-20 md:max-w-none">
                    {selectedGame.homeTeam}
                  </p>
                </div>
                
                <div className="text-center px-2 md:px-4">
                  {selectedGame.type === 'last' && selectedGame.homeScore !== undefined && selectedGame.awayScore !== undefined ? (
                    <div className={`${getModalResultColor(selectedGame)} font-bold text-2xl md:text-3xl`}>
                      {selectedGame.homeScore}:{selectedGame.awayScore}
                    </div>
                  ) : (
                    <div className="text-viktoria-blue font-bold text-xl md:text-2xl font-permanent-marker">
                      VS
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mb-1 md:mb-2">
                    {getTeamLogo(selectedGame.awayTeam) ? (
                      <img 
                        src={getTeamLogo(selectedGame.awayTeam)} 
                        alt={`${selectedGame.awayTeam} Logo`}
                        className="w-12 h-12 md:w-16 md:h-16 object-contain drop-shadow-sm"
                      />
                    ) : (
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm md:text-base">{selectedGame.awayTeam.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-800 text-xs md:text-sm font-medium text-center leading-tight max-w-20 md:max-w-none">
                    {selectedGame.awayTeam}
                  </p>
                </div>
              </div>
              
              {/* Datum und Zeit */}
              <div className="flex items-center justify-center space-x-3 md:space-x-4 text-viktoria-blue">
                <div className="flex items-center space-x-1">
                  <IconCalendar size={14} />
                  <span className="text-xs md:text-sm">{selectedGame.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <IconClock size={14} />
                  <span className="text-xs md:text-sm">{selectedGame.time}</span>
                </div>
              </div>
            </div>
            
            {/* Modal Body */}
            <div className="pt-4 px-4 pb-4 md:pt-6 md:px-6 md:pb-6 space-y-4 md:space-y-6">
              {/* Spiel-Infos */}
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="bg-viktoria-blue/10 rounded-lg p-3 md:p-4 text-center">
                  <IconMapPin className="text-viktoria-blue mx-auto mb-1 md:mb-2" size={18} />
                  <p className="text-xs md:text-sm text-gray-600 mb-1">Stadion</p>
                  <p className="text-xs md:text-sm font-semibold text-viktoria-blue leading-tight">{selectedGame.stadium}</p>
                </div>
                <div className="bg-viktoria-blue/10 rounded-lg p-3 md:p-4 text-center">
                  <IconUser className="text-viktoria-blue mx-auto mb-1 md:mb-2" size={18} />
                  <p className="text-xs md:text-sm text-gray-600 mb-1">Schiedsrichter</p>
                  <p className="text-xs md:text-sm font-semibold text-viktoria-blue leading-tight">{selectedGame.referee}</p>
                </div>
              </div>
              
              {/* Letztes Spiel - Statistiken */}
              {selectedGame.type === 'last' && (
                <>
                  {/* Torschützen */}
                  {selectedGame.goalScorers && selectedGame.goalScorers.length > 0 && (
                    <div className="bg-gradient-to-r from-viktoria-blue to-viktoria-blue-light rounded-lg p-3 md:p-4">
                      <h3 className="text-viktoria-yellow font-semibold mb-2 md:mb-3 text-center text-sm md:text-base flex items-center justify-center">
                        <IconTrophy className="mr-1 md:mr-2" size={18} />
                        Torschützen
                      </h3>
                      <div className="space-y-1 md:space-y-2">
                        {selectedGame.goalScorers.map((scorer, index) => (
                          <div key={index} className="text-center">
                            <p className="text-white font-semibold text-sm md:text-base">{scorer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Karten */}
                  {((selectedGame.yellowCards && selectedGame.yellowCards.length > 0) || 
                    (selectedGame.redCards && selectedGame.redCards.length > 0)) && (
                    <div className="bg-gray-50 rounded-lg p-3 md:p-4">
                      <h3 className="font-semibold mb-2 md:mb-3 text-center text-sm md:text-base flex items-center justify-center">
                        <IconCards className="mr-1 md:mr-2" size={18} />
                        Karten
                      </h3>
                      <div className="grid grid-cols-2 gap-3 md:gap-4">
                        {selectedGame.yellowCards && selectedGame.yellowCards.length > 0 && (
                          <div className="text-center">
                            <p className="text-yellow-600 font-semibold mb-1 md:mb-2 text-xs md:text-sm">Gelbe Karten</p>
                            {selectedGame.yellowCards.map((card, index) => (
                              <p key={index} className="text-xs md:text-sm text-gray-600 leading-tight">{card}</p>
                            ))}
                          </div>
                        )}
                        {selectedGame.redCards && selectedGame.redCards.length > 0 && (
                          <div className="text-center">
                            <p className="text-red-600 font-semibold mb-1 md:mb-2 text-xs md:text-sm">Rote Karten</p>
                            {selectedGame.redCards.map((card, index) => (
                              <p key={index} className="text-xs md:text-sm text-gray-600 leading-tight">{card}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
              
              {/* Nächstes Spiel - Letztes Aufeinandertreffen */}
              {selectedGame.type === 'next' && selectedGame.lastMeeting && (
                <div className="bg-gray-50 rounded-lg p-3 md:p-4">
                  <h3 className="text-gray-800 font-semibold mb-2 md:mb-3 text-center text-sm md:text-base">
                    Letztes Aufeinandertreffen
                  </h3>
                  <div className="text-center">
                    <p className={`text-lg md:text-xl font-bold mb-1 ${getResultColor(selectedGame.lastMeeting.result, selectedGame.lastMeeting.location)}`}>
                      {selectedGame.lastMeeting.result}
                    </p>
                    <p className="text-gray-600 text-xs md:text-sm">
                      {selectedGame.lastMeeting.date} • {selectedGame.lastMeeting.location}
                    </p>
                  </div>
                </div>
              )}
              
              {/* Schließen Button */}
              <button
                onClick={closeGameModal}
                className="w-full bg-viktoria-blue hover:bg-viktoria-blue-light text-white font-semibold py-2.5 md:py-3 rounded-lg transition-colors duration-300 text-sm md:text-base"
              >
                Schließen
              </button>
            </div>
          </AnimatedDiv>
        </div>,
        document.body
      )}
    </>
  )
} 