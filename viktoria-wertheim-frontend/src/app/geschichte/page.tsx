'use client'

import PageLayout from '@/components/PageLayout'
import dynamic from 'next/dynamic'
import { IconCalendar, IconTrophy, IconUsers, IconFlag, IconStar } from '@tabler/icons-react'
import Image from "next/image";

// Dynamic Import für animierte Komponenten
const AnimatedSection = dynamic(
  () => import('@/components/AnimatedSection'),
  { ssr: false }
)

const AnimatedDiv = dynamic(
  () => import('@/components/AnimatedSection').then(mod => ({ default: mod.AnimatedDiv })),
  { ssr: false }
)

interface HistoryEvent {
  year: string
  title: string
  description: string
  icon: any
  type: 'founding' | 'success' | 'milestone' | 'expansion'
}

export default function HistoryPage() {
  const historyEvents: HistoryEvent[] = [
    {
      year: '1920',
      title: 'Vereinsgründung',
      description: 'Gründung des SV Viktoria Wertheim durch eine Gruppe fußballbegeisterter Wertheimer Bürger. Der Grundstein für über 100 Jahre Vereinsgeschichte wird gelegt.',
      icon: IconFlag,
      type: 'founding'
    },
    {
      year: '1925',
      title: 'Erster eigener Platz',
      description: 'Der Verein erhält seinen ersten eigenen Sportplatz in der heutigen Sportstraße. Dies markiert den Beginn der Heimspiele in Wertheim.',
      icon: IconUsers,
      type: 'milestone'
    },
    {
      year: '1952',
      title: 'Aufstieg in die Bezirksliga',
      description: 'Erster großer sportlicher Erfolg mit dem Aufstieg in die Bezirksliga. Das Team zeigt hervorragende Leistungen und etabliert sich regional.',
      icon: IconTrophy,
      type: 'success'
    },
    {
      year: '1965',
      title: 'Bau des Vereinsheims',
      description: 'Errichtung des ersten Vereinsheims durch Eigenleistung der Mitglieder. Das Vereinsheim wird zum gesellschaftlichen Mittelpunkt des Vereins.',
      icon: IconUsers,
      type: 'milestone'
    },
    {
      year: '1978',
      title: 'Gründung der Jugendarbeit',
      description: 'Systematischer Aufbau der Jugendmannschaften. Die Nachwuchsarbeit wird zu einem wichtigen Standbein des Vereins.',
      icon: IconStar,
      type: 'expansion'
    },
    {
      year: '1985',
      title: 'Goldenes Jubiläum',
      description: '65-jähriges Vereinsjubiläum mit großem Fest und Ehrung langjähriger Mitglieder. Der Verein ist fest in der Wertheimer Gesellschaft verwurzelt.',
      icon: IconTrophy,
      type: 'milestone'
    },
    {
      year: '1990',
      title: 'Modernisierung der Anlage',
      description: 'Umfassende Renovierung der Sportanlage mit neuen Umkleiden und verbesserter Infrastruktur für Spieler und Zuschauer.',
      icon: IconUsers,
      type: 'milestone'
    },
    {
      year: '2000',
      title: 'Millennium-Team',
      description: 'Aufstellung einer starken Mannschaft zum Jahrtausendwechsel. Mehrere erfolgreiche Saisons mit Spitzenplätzen in der Liga.',
      icon: IconTrophy,
      type: 'success'
    },
    {
      year: '2010',
      title: '90 Jahre Viktoria',
      description: 'Großes Jubiläumsfest mit ehemaligen Spielern und Würdigung der Vereinsgeschichte. Über 300 Gäste feiern mit.',
      icon: IconCalendar,
      type: 'milestone'
    },
    {
      year: '2020',
      title: 'Jahrhundert-Jubiläum',
      description: '100 Jahre SV Viktoria Wertheim! Ein Jahrhundert voller Leidenschaft, Erfolge und Gemeinschaft. Der Verein blickt stolz auf seine Geschichte zurück.',
      icon: IconStar,
      type: 'milestone'
    }
  ]

  const getEventColor = (type: string) => {
    switch (type) {
      case 'founding': return 'bg-viktoria-yellow/20 border-viktoria-yellow'
      case 'success': return 'bg-green-100 border-green-500'
      case 'milestone': return 'bg-viktoria-blue/20 border-viktoria-blue'
      case 'expansion': return 'bg-purple-100 border-purple-500'
      default: return 'bg-gray-100 border-gray-400'
    }
  }

  const getIconColor = (type: string) => {
    switch (type) {
      case 'founding': return 'text-viktoria-yellow'
      case 'success': return 'text-green-600'
      case 'milestone': return 'text-viktoria-blue'
      case 'expansion': return 'text-purple-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <PageLayout>
      {/* Header Section - nur Mobile */}
      

      <main className="pt-8 pb-6">
        <div className="container space-y-8">
          
          {/* Einleitung */}
          <AnimatedSection delay={0.2}>
            <div className="text-center mb-8">
              <Image 
                src="/viktorialogo.png" 
                alt="Viktoria Wertheim Logo"
                width={64}
                height={64}
                className="w-16 h-16 mx-auto mb-4 drop-shadow-lg"
                priority
              />
              <h2 className="text-xl font-bold text-viktoria-blue mb-4">
                Über 100 Jahre Vereinsgeschichte
              </h2>
              <p className="text-gray-700 leading-relaxed px-4">
                Von der Gründung 1920 bis heute – eine Zeitreise durch die bewegte Geschichte 
                des SV Viktoria Wertheim mit allen wichtigen Meilensteinen und Erfolgen.
              </p>
            </div>
          </AnimatedSection>

          {/* Timeline */}
          <AnimatedSection delay={0.3}>
            <div className="relative">
              {/* Vertikale Linie */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-viktoria-blue/30"></div>
              
              <div className="space-y-6">
                {historyEvents.map((event, index) => (
                  <AnimatedDiv 
                    key={index} 
                    delay={0.4 + index * 0.1}
                    className="relative"
                  >
                    {/* Timeline Punkt */}
                    <div className="absolute left-6 w-4 h-4 bg-viktoria-blue rounded-full border-2 border-white shadow-md"></div>
                    
                    {/* Event Card */}
                    <div className="ml-16 bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 p-4 hover:bg-white/50 transition-all duration-300">
                      <div className="flex items-start space-x-3">
                        {/* Jahr */}
                        <div className="flex-shrink-0">
                          <div className="bg-viktoria-blue text-white text-xs font-bold px-2 py-1 rounded">
                            {event.year}
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <event.icon 
                              className={`${getIconColor(event.type)} flex-shrink-0`} 
                              size={20} 
                            />
                            <h3 className="font-semibold text-viktoria-blue text-sm">
                              {event.title}
                            </h3>
                          </div>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </AnimatedDiv>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Heute */}
          <AnimatedSection delay={1.5}>
            <div className="bg-gradient-to-r from-viktoria-blue-light to-viktoria-blue rounded-xl p-6 text-white text-center">
              <IconStar className="text-viktoria-yellow mx-auto mb-4" size={48} />
              <h2 className="text-xl font-bold text-viktoria-yellow mb-4">
                Viktoria heute
              </h2>
              <p className="text-white/90 mb-6 leading-relaxed">
                Nach über 100 Jahren blicken wir stolz auf unsere Geschichte zurück und 
                freuen uns auf die Zukunft. Mit drei aktiven Mannschaften, über 250 Mitgliedern 
                und einem starken Zusammenhalt schreiben wir weiterhin Vereinsgeschichte.
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-viktoria-yellow">104</div>
                  <div className="text-xs text-white/80">Jahre</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-viktoria-yellow">250+</div>
                  <div className="text-xs text-white/80">Mitglieder</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-viktoria-yellow">3</div>
                  <div className="text-xs text-white/80">Teams</div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Call to Action */}
          <AnimatedSection delay={1.6}>
            <div className="bg-viktoria-yellow/20 rounded-xl p-6 text-center">
              <h2 className="text-lg font-bold text-viktoria-blue mb-4">
                Schreibe mit uns Geschichte!
              </h2>
              <p className="text-gray-700 mb-6 text-sm leading-relaxed">
                Werde Teil der nächsten Kapitel in der Geschichte von Viktoria Wertheim.
              </p>
              <a 
                href="/mitgliedschaft" 
                className="bg-viktoria-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-viktoria-blue-light transition-colors duration-300 inline-block"
              >
                Jetzt Mitglied werden
              </a>
            </div>
          </AnimatedSection>

        </div>
      </main>
    </PageLayout>
  )
} 