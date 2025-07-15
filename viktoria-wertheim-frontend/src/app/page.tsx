'use client'

import dynamic from 'next/dynamic'
import PageLayout from '@/components/PageLayout'
import GameCards from '@/components/GameCards'
import LeagueTable from '@/components/LeagueTable'
import TopScorers from '@/components/TopScorers'
import { IconCalendar, IconClock, IconMapPin, IconTrophy, IconUsers, IconStar } from '@tabler/icons-react'

// Dynamic Import für animierte Komponenten - löst SSR-Probleme
const AnimatedSection = dynamic(
  () => import('@/components/AnimatedSection'),
  { ssr: false }
)

const AnimatedDiv = dynamic(
  () => import('@/components/AnimatedSection').then(mod => ({ default: mod.AnimatedDiv })),
  { ssr: false }
)

export default function HomePage() {
  return (
    <PageLayout>
      <div className="space-y-8">
        {/* Game Cards Section */}
        <GameCards />

        {/* League Table Section - with reduced spacing */}
        <div className="-mt-24">
          <LeagueTable />
        </div>

        {/* Top Scorers Section */}
        <div className="-mt-20">
          <TopScorers />
        </div>

        {/* Latest News Section */}
        <AnimatedSection className="px-4" delay={0.3}>
          <div className="container">
            <h2 className="text-xs font-normal text-gray-600 uppercase tracking-wide mb-4 text-center font-permanent-marker">
              Neueste Nachrichten
            </h2>
            <div className="space-y-2">
              <AnimatedDiv 
                className="bg-white/40 backdrop-blur-sm rounded-lg border border-white/20 p-3 cursor-pointer hover:bg-white/50 transition-all duration-300"
                direction="left"
                delay={0.4}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 text-sm mb-1">
                      Viktoria Wertheim gewinnt Derby mit 3:1
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2 mb-1">
                      Ein spannendes Spiel endete mit einem verdienten Sieg für unsere Mannschaft gegen FC Eichel...
                    </p>
                    <div className="text-xs text-gray-500">
                      vor 2 Stunden
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-viktoria-blue-light rounded-lg flex-shrink-0 ml-3 flex items-center justify-center">
                    <IconTrophy size={16} className="text-viktoria-yellow" />
                  </div>
                </div>
              </AnimatedDiv>

              <AnimatedDiv 
                className="bg-white/40 backdrop-blur-sm rounded-lg border border-white/20 p-3 cursor-pointer hover:bg-white/50 transition-all duration-300"
                direction="left"
                delay={0.5}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 text-sm mb-1">
                      Neuer Trainer für die Jugend verpflichtet
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2 mb-1">
                      Mit Marco Schneider konnte ein erfahrener Trainer für unsere A-Jugend gewonnen werden...
                    </p>
                    <div className="text-xs text-gray-500">
                      vor 1 Tag
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-viktoria-blue-light rounded-lg flex-shrink-0 ml-3 flex items-center justify-center">
                    <IconUsers size={16} className="text-viktoria-yellow" />
                  </div>
                </div>
              </AnimatedDiv>

              <AnimatedDiv 
                className="bg-white/40 backdrop-blur-sm rounded-lg border border-white/20 p-3 cursor-pointer hover:bg-white/50 transition-all duration-300"
                direction="left"
                delay={0.6}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 text-sm mb-1">
                      Winterpause: Training startet am 15. Januar
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2 mb-1">
                      Nach der wohlverdienten Winterpause beginnt das Training für alle Mannschaften wieder am 15. Januar...
                    </p>
                    <div className="text-xs text-gray-500">
                      vor 3 Tagen
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-viktoria-blue-light rounded-lg flex-shrink-0 ml-3 flex items-center justify-center">
                    <IconCalendar size={16} className="text-viktoria-yellow" />
                  </div>
                </div>
              </AnimatedDiv>
            </div>
          </div>
        </AnimatedSection>

        {/* Sponsors Section */}
        <AnimatedSection className="px-4 pb-8" delay={0.5}>
          <div className="container">
            <h2 className="text-xs font-normal text-gray-600 uppercase tracking-wide mb-4 text-center font-permanent-marker">
              Unsere Sponsoren
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <AnimatedDiv 
                  key={i} 
                  className="bg-white/40 backdrop-blur-sm rounded-lg border border-white/20 p-4 flex items-center justify-center cursor-pointer hover:bg-white/50 transition-all duration-300"
                  delay={0.6 + i * 0.1}
                >
                  <div className="w-20 h-12 bg-gray-200 rounded"></div>
                </AnimatedDiv>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Footer */}
        <AnimatedSection
          className="bg-gradient-to-r from-viktoria-blue-light to-viktoria-blue text-white py-12 px-4 mt-12"
          delay={0.7}
        >
          <div className="container">
            <div className="text-center mb-8">
              <img 
                src="/viktorialogo.png" 
                alt="Viktoria Wertheim Logo"
                className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 drop-shadow-lg"
              />
              <h1 className="text-2xl md:text-3xl font-bold mb-2 font-permanent-marker">
                SV Viktoria Wertheim
              </h1>
              <div className="flex items-center justify-center space-x-2 text-viktoria-yellow mb-6">
                <IconStar size={20} fill="currentColor" />
                <span className="font-semibold">Seit 1920</span>
                <IconStar size={20} fill="currentColor" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* Kontakt */}
              <div className="text-center md:text-left">
                <h3 className="text-lg font-semibold mb-4 text-viktoria-yellow">
                  Kontakt
                </h3>
                <div className="space-y-2 text-sm text-white/90">
                  <p>Sportplatz Wertheim</p>
                  <p>Sportstraße 1</p>
                  <p>97877 Wertheim</p>
                  <p>Tel: (09342) 123-456</p>
                  <p>Email: info@viktoria-wertheim.de</p>
                </div>
              </div>

              {/* Verein */}
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-4 text-viktoria-yellow">
                  Verein
                </h3>
                <div className="space-y-2 text-sm text-white/90">
                  <p>Über uns</p>
                  <p>Geschichte</p>
                  <p>Vorstand</p>
                  <p>Mitgliedschaft</p>
                  <p>Sponsoren</p>
                </div>
              </div>

              {/* Rechtliches */}
              <div className="text-center md:text-right">
                <h3 className="text-lg font-semibold mb-4 text-viktoria-yellow">
                  Rechtliches
                </h3>
                <div className="space-y-2 text-sm text-white/90">
                  <p>Impressum</p>
                  <p>Datenschutz</p>
                  <p>AGB</p>
                  <p>Satzung</p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/20 pt-6 text-center">
              <p className="text-sm text-white/80">
                © 2024 SV Viktoria Wertheim. Alle Rechte vorbehalten.
              </p>
              <p className="text-xs text-white/60 mt-2">
                Tradition • Leidenschaft • Gemeinschaft
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </PageLayout>
  )
} 