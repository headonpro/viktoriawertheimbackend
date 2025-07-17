"use client"

import PageLayout from '@/components/PageLayout'
import AnimatedSection from '@/components/AnimatedSection'
import { IconUsers, IconTrophy, IconHeart, IconCheck, IconMail, IconPhone, IconCalendar, IconMapPin, IconStar } from '@tabler/icons-react'

export default function MitgliedschaftPage() {
  return (
    <PageLayout>
      <main className="px-4 py-6">
        <div className="container max-w-4xl space-y-6">
          
          {/* Einleitung */}
          <AnimatedSection delay={0.1}>
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-viktoria-blue rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <IconUsers size={32} className="text-viktoria-yellow" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-viktoria-blue mb-4">
                Werde Teil der Viktoria-Familie!
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
                Entdecke die Freude am Fußball beim SV Viktoria Wertheim. 
                Als Mitglied unseres Vereins kannst du aktiv mitspielen, trainieren und Teil unserer Gemeinschaft werden.
              </p>
            </div>
          </AnimatedSection>

          {/* Mitgliedschaft Info */}
          <AnimatedSection delay={0.2}>
            <div className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden shadow-lg">
              <div className="bg-white/30 px-4 py-3 border-b border-white/20 text-center">
                <h2 className="text-lg font-bold text-viktoria-blue flex items-center justify-center">
                  <IconTrophy className="mr-3 text-viktoria-yellow" size={24} />
                  Vereinsmitgliedschaft
                </h2>
              </div>
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-viktoria-yellow rounded-xl flex items-center justify-center mx-auto mb-4">
                  <IconUsers className="text-viktoria-blue" size={28} />
                </div>
                <h3 className="text-xl font-bold text-viktoria-blue mb-4">Aktive Mitgliedschaft</h3>
                <p className="text-gray-700 mb-6 text-sm leading-relaxed">
                  Als Mitglied des SV Viktoria Wertheim erhältst du die Möglichkeit, aktiv am Vereinsleben teilzunehmen, 
                  zu trainieren und in unseren Mannschaften zu spielen.
                </p>
                
                <div className="bg-viktoria-blue/5 rounded-lg p-4 border border-viktoria-blue/20 mb-6">
                  <h4 className="font-semibold text-viktoria-blue mb-3">Was bietet dir die Mitgliedschaft?</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <IconCheck className="text-green-500 flex-shrink-0" size={16} />
                      <span className="text-gray-700">Regelmäßiges Training</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <IconCheck className="text-green-500 flex-shrink-0" size={16} />
                      <span className="text-gray-700">Spielberechtigung</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <IconCheck className="text-green-500 flex-shrink-0" size={16} />
                      <span className="text-gray-700">Vereinsgemeinschaft</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <IconCheck className="text-green-500 flex-shrink-0" size={16} />
                      <span className="text-gray-700">Vereinsveranstaltungen</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <IconCheck className="text-green-500 flex-shrink-0" size={16} />
                      <span className="text-gray-700">Professionelle Betreuung</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <IconCheck className="text-green-500 flex-shrink-0" size={16} />
                      <span className="text-gray-700">Sportliche Entwicklung</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Training & Spielbetrieb */}
          <AnimatedSection delay={0.3}>
            <div className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden shadow-lg">
              <div className="bg-white/30 px-4 py-3 border-b border-white/20 text-center">
                <h2 className="text-lg font-bold text-viktoria-blue flex items-center justify-center">
                  <IconCalendar className="mr-3 text-viktoria-yellow" size={24} />
                  Training & Spielbetrieb
                </h2>
              </div>
              <div className="p-6 space-y-4 text-gray-700 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-viktoria-blue/5 rounded-lg p-4 border border-viktoria-blue/20">
                    <h3 className="font-semibold text-viktoria-blue mb-3">Trainingszeiten</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <IconCalendar size={16} className="text-viktoria-blue" />
                        <span>Dienstag: 19:00 - 20:30 Uhr</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <IconCalendar size={16} className="text-viktoria-blue" />
                        <span>Donnerstag: 19:00 - 20:30 Uhr</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <IconCalendar size={16} className="text-viktoria-blue" />
                        <span>Samstag: 15:00 - 16:30 Uhr</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-viktoria-yellow/5 rounded-lg p-4 border border-viktoria-yellow/20">
                    <h3 className="font-semibold text-viktoria-blue mb-3">Unser Sportplatz</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <IconMapPin size={16} className="text-viktoria-blue" />
                        <span>Haslocher Weg 85</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <IconMapPin size={16} className="text-viktoria-blue" />
                        <span>97877 Wertheim-Bestenheid</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-2">
                        Moderner Rasenplatz mit Vereinsheim und Umkleidekabinen
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-viktoria-blue/5 to-viktoria-yellow/5 rounded-lg p-4 border border-viktoria-blue/20">
                  <h3 className="font-semibold text-viktoria-blue mb-2">Für wen ist die Mitgliedschaft geeignet?</h3>
                  <p className="text-sm leading-relaxed">
                    Unsere Mitgliedschaft richtet sich an alle fußballbegeisterten Menschen, die gerne in einer Mannschaft spielen möchten. 
                    Egal ob Anfänger oder erfahrener Spieler – bei uns findest du deinen Platz im Team.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Warum Viktoria Wertheim */}
          <AnimatedSection delay={0.4}>
            <div className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden shadow-lg">
              <div className="bg-white/30 px-4 py-3 border-b border-white/20 text-center">
                <h2 className="text-lg font-bold text-viktoria-blue">
                  Warum SV Viktoria Wertheim?
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-viktoria-blue rounded-full flex items-center justify-center mx-auto mb-3">
                      <IconUsers className="text-viktoria-yellow" size={24} />
                    </div>
                    <h3 className="font-semibold text-viktoria-blue mb-2 text-sm">Gemeinschaft</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Werde Teil einer großen Familie mit über 75 Jahren Vereinstradition
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-viktoria-yellow rounded-full flex items-center justify-center mx-auto mb-3">
                      <IconTrophy className="text-viktoria-blue" size={24} />
                    </div>
                    <h3 className="font-semibold text-viktoria-blue mb-2 text-sm">Erfolg</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Erreiche deine sportlichen Ziele in einem ambitionierten Verein
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <IconHeart className="text-white" size={24} />
                    </div>
                    <h3 className="font-semibold text-viktoria-blue mb-2 text-sm">Leidenschaft</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Lebe deine Begeisterung für den Fußball mit Gleichgesinnten
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Mitglied werden */}
          <AnimatedSection delay={0.5}>
            <div className="bg-viktoria-yellow/20 rounded-xl p-6 text-center border border-viktoria-yellow/30">
              <div className="w-16 h-16 bg-viktoria-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <IconStar className="text-viktoria-yellow" size={28} />
              </div>
              <h2 className="text-xl font-bold text-viktoria-blue mb-4">
                Bereit für den ersten Schritt?
              </h2>
              <p className="text-gray-700 mb-6 text-sm leading-relaxed">
                Komm einfach zu einem unserer Trainings vorbei oder kontaktiere uns für weitere Informationen. 
                Ein Probetraining ist jederzeit möglich!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a 
                  href="mailto:info@viktoria-wertheim.de"
                  className="bg-viktoria-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-viktoria-blue-light transition-colors duration-300 flex items-center justify-center space-x-2 text-sm"
                >
                  <IconMail size={18} />
                  <span>E-Mail senden</span>
                </a>
                <a 
                  href="tel:+4993421234567"
                  className="bg-viktoria-yellow text-viktoria-blue px-6 py-3 rounded-lg font-semibold hover:bg-viktoria-yellow/90 transition-colors duration-300 flex items-center justify-center space-x-2 text-sm"
                >
                  <IconPhone size={18} />
                  <span>Anrufen</span>
                </a>
              </div>
              <p className="text-xs text-gray-600 mt-4">
                Oder komm einfach zu einem Training vorbei – wir freuen uns auf dich!
              </p>
            </div>
          </AnimatedSection>

        </div>
      </main>
    </PageLayout>
  )
}