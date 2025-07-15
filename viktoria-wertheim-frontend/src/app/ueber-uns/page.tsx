'use client'

import PageLayout from '@/components/PageLayout'
import dynamic from 'next/dynamic'
import { IconUsers, IconTrophy, IconHeart, IconMapPin, IconCalendar, IconStar } from '@tabler/icons-react'

// Dynamic Import für animierte Komponenten
const AnimatedSection = dynamic(
  () => import('@/components/AnimatedSection'),
  { ssr: false }
)

const AnimatedDiv = dynamic(
  () => import('@/components/AnimatedSection').then(mod => ({ default: mod.AnimatedDiv })),
  { ssr: false }
)

export default function AboutPage() {
  return (
    <PageLayout>
      {/* Header Section - nur Mobile */}
      <div className="pt-[60px] md:pt-[20px] lg:hidden">
        <AnimatedSection delay={0.1}>
          <div className="w-full header-gradient py-6 shadow-lg">
            <div className="container">
              <h1 className="text-3xl md:text-4xl font-permanent-marker text-white text-center news-title">
                <span className="text-viktoria-yellow font-permanent-marker news-title">Ü</span>ber uns
              </h1>
            </div>
          </div>
        </AnimatedSection>
      </div>

      <main className="pt-8 pb-6">
        <div className="container space-y-8">
          
          {/* Vereinslogo und Einleitung */}
          <AnimatedSection delay={0.2}>
            <div className="text-center mb-8">
              <img 
                src="/viktorialogo.png" 
                alt="Viktoria Wertheim Logo"
                className="w-20 h-20 mx-auto mb-4 drop-shadow-lg"
              />
              <h2 className="text-2xl font-bold text-viktoria-blue mb-4">
                SV Viktoria Wertheim
              </h2>
              <div className="flex items-center justify-center space-x-2 text-viktoria-yellow mb-6">
                <IconStar size={20} fill="currentColor" />
                <span className="font-semibold">Seit 1920</span>
                <IconStar size={20} fill="currentColor" />
              </div>
            </div>
          </AnimatedSection>

          {/* Unser Verein */}
          <AnimatedSection delay={0.3}>
            <div className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 p-6 mb-6">
              <h2 className="text-xl font-bold text-viktoria-blue mb-4 flex items-center">
                <IconHeart className="mr-3 text-viktoria-yellow" size={24} />
                Unser Verein
              </h2>
              <div className="space-y-4 text-gray-700">
                <p className="leading-relaxed">
                  Der SV Viktoria Wertheim ist mehr als nur ein Fußballverein – wir sind eine große Familie, 
                  die seit über 100 Jahren die Leidenschaft für den Fußball in Wertheim und Umgebung lebt.
                </p>
                <p className="leading-relaxed">
                  Gegründet im Jahr 1920, stehen wir für Tradition, Gemeinschaft und sportliche Fairness. 
                  Unser Verein ist ein wichtiger Bestandteil des gesellschaftlichen Lebens in Wertheim und 
                  bietet Menschen aller Altersklassen eine sportliche Heimat.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Unsere Werte */}
          <AnimatedSection delay={0.4}>
            <div className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 p-6 mb-6">
              <h2 className="text-xl font-bold text-viktoria-blue mb-6 text-center">
                Unsere Werte
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <AnimatedDiv delay={0.5} className="bg-viktoria-blue/10 rounded-lg p-4 text-center">
                  <IconUsers className="text-viktoria-blue mx-auto mb-2" size={32} />
                  <h3 className="font-semibold text-viktoria-blue mb-2">Gemeinschaft</h3>
                  <p className="text-sm text-gray-600">
                    Zusammenhalt und Teamgeist sind die Grundpfeiler unseres Vereins
                  </p>
                </AnimatedDiv>
                
                <AnimatedDiv delay={0.6} className="bg-viktoria-yellow/10 rounded-lg p-4 text-center">
                  <IconTrophy className="text-viktoria-yellow mx-auto mb-2" size={32} />
                  <h3 className="font-semibold text-viktoria-blue mb-2">Tradition</h3>
                  <p className="text-sm text-gray-600">
                    Über 100 Jahre Vereinsgeschichte und gewachsene Traditionen
                  </p>
                </AnimatedDiv>
                
                <AnimatedDiv delay={0.7} className="bg-green-100 rounded-lg p-4 text-center">
                  <IconHeart className="text-green-600 mx-auto mb-2" size={32} />
                  <h3 className="font-semibold text-viktoria-blue mb-2">Leidenschaft</h3>
                  <p className="text-sm text-gray-600">
                    Liebe zum Fußball und Begeisterung für den Sport
                  </p>
                </AnimatedDiv>
              </div>
            </div>
          </AnimatedSection>

          {/* Zahlen und Fakten */}
          <AnimatedSection delay={0.8}>
            <div className="bg-gradient-to-r from-viktoria-blue-light to-viktoria-blue rounded-xl p-6 text-white">
              <h2 className="text-xl font-bold text-viktoria-yellow mb-6 text-center">
                Viktoria in Zahlen
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-viktoria-yellow">104</div>
                  <div className="text-sm text-white/90">Jahre Geschichte</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-viktoria-yellow">3</div>
                  <div className="text-sm text-white/90">Mannschaften</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-viktoria-yellow">250+</div>
                  <div className="text-sm text-white/90">Mitglieder</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-viktoria-yellow">1</div>
                  <div className="text-sm text-white/90">Sportplatz</div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Vereinsgelände */}
          <AnimatedSection delay={0.9}>
            <div className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 p-6">
              <h2 className="text-xl font-bold text-viktoria-blue mb-4 flex items-center">
                <IconMapPin className="mr-3 text-viktoria-yellow" size={24} />
                Unser Sportplatz
              </h2>
              <div className="space-y-4 text-gray-700">
                <p className="leading-relaxed">
                  Unser Heimatstadion in der Sportstraße 1 ist das Herz von Viktoria Wertheim. 
                  Hier trainieren unsere Mannschaften und hier finden unsere Heimspiele statt.
                </p>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center">
                    <IconMapPin className="mr-2 text-viktoria-blue" size={16} />
                    <span className="text-sm">Sportstraße 1, 97877 Wertheim</span>
                  </div>
                  <div className="flex items-center">
                    <IconCalendar className="mr-2 text-viktoria-blue" size={16} />
                    <span className="text-sm">Trainingszeiten: Mo, Mi, Fr ab 18:00 Uhr</span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Call to Action */}
          <AnimatedSection delay={1.0}>
            <div className="bg-viktoria-yellow/20 rounded-xl p-6 text-center">
              <h2 className="text-xl font-bold text-viktoria-blue mb-4">
                Werde Teil unserer Familie!
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Ob als Spieler, Trainer, Schiedsrichter oder einfach als Fan – 
                bei Viktoria Wertheim ist jeder willkommen.
              </p>
              <div className="grid grid-cols-1 gap-3">
                <a 
                  href="/mitgliedschaft" 
                  className="bg-viktoria-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-viktoria-blue-light transition-colors duration-300"
                >
                  Mitglied werden
                </a>
                <a 
                  href="/kontakt" 
                  className="bg-viktoria-yellow text-viktoria-blue px-6 py-3 rounded-lg font-semibold hover:bg-viktoria-yellow/90 transition-colors duration-300"
                >
                  Kontakt aufnehmen
                </a>
              </div>
            </div>
          </AnimatedSection>

        </div>
      </main>
    </PageLayout>
  )
} 