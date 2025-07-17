"use client"

import PageLayout from '@/components/PageLayout'
import AnimatedSection from '@/components/AnimatedSection'
import { IconUsers, IconTrophy, IconHeart, IconMapPin, IconCalendar, IconStar, IconHistory, IconGitMerge } from '@tabler/icons-react'
import Image from "next/image"

export default function AboutPage() {
  return (
    <PageLayout>
      <main className="px-4 py-6">
        <div className="container max-w-4xl space-y-6">
          
          {/* Vereinslogo und Einleitung */}
          <AnimatedSection delay={0.1}>
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-viktoria-blue rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <IconTrophy size={32} className="text-viktoria-yellow" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-viktoria-blue mb-4">
                SV Viktoria Wertheim
              </h1>
              <div className="flex items-center justify-center space-x-2 text-viktoria-yellow mb-6">
                <IconStar size={20} fill="currentColor" />
                <span className="font-semibold">Seit 1945</span>
                <IconStar size={20} fill="currentColor" />
              </div>
            </div>
          </AnimatedSection>

          {/* Vereinsgeschichte */}
          <AnimatedSection delay={0.2}>
            <div className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden shadow-lg">
              <div className="bg-white/30 px-4 py-3 border-b border-white/20">
                <h2 className="text-lg font-bold text-viktoria-blue flex items-center">
                  <IconHistory className="mr-3 text-viktoria-yellow" size={24} />
                  Unsere Geschichte
                </h2>
              </div>
              <div className="p-6 space-y-4 text-gray-700 text-sm leading-relaxed">
                <p>
                  Mit einer Genehmigung durch die amerikanische Militärregierung wurde am <strong>15. Oktober 1945</strong> die <strong>SG Wertheim</strong> gegründet, aus der 1951 – durch eine Fusion mit dem SC 46 Eichel und dem SC 48 Wertheim – die <strong>Sportvereinigung (SV) Wertheim</strong> entstand.
                </p>
                <p>
                  Als die Fusion scheiterte, behielt der Fußballverein der Kernstadt Wertheim den Namen SV, während im Stadtteil Bestenheid im Jahre <strong>1952</strong> der <strong>SC Viktoria Wertheim</strong> gegründet wurde.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Sportliche Erfolge */}
          <AnimatedSection delay={0.3}>
            <div className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden shadow-lg">
              <div className="bg-white/30 px-4 py-3 border-b border-white/20">
                <h2 className="text-lg font-bold text-viktoria-blue flex items-center">
                  <IconTrophy className="mr-3 text-viktoria-yellow" size={24} />
                  Sportliche Höhepunkte
                </h2>
              </div>
              <div className="p-6 space-y-4 text-gray-700 text-sm leading-relaxed">
                <div className="bg-viktoria-blue/5 rounded-lg p-4 border border-viktoria-blue/20">
                  <h3 className="font-semibold text-viktoria-blue mb-2">Die goldenen Jahre (1960er)</h3>
                  <p>
                    Der SC Viktoria Wertheim spielte in den Jahren <strong>1964/65 in der 2. Amateurliga Nordbaden</strong> und nach einem Aufstieg <strong>1965/66 für ein Jahr in der 1. Amateurliga Nordbaden</strong>.
                  </p>
                  <p className="mt-2 text-xs text-gray-600">
                    Bis zur Gründung der Oberliga Baden-Württemberg in der Saison 1978/79 war die 1. Amateurliga die oberste Amateurklasse und dritthöchste deutsche Spielklasse.
                  </p>
                </div>
                
                <div className="bg-viktoria-yellow/5 rounded-lg p-4 border border-viktoria-yellow/20">
                  <h3 className="font-semibold text-viktoria-blue mb-2">Moderne Erfolge</h3>
                  <p>
                    Die erste Fußballmannschaft spielte seit der Saison <strong>2013/14 für sechs Spielzeiten in der Landesliga Odenwald</strong>.
                  </p>
                  <p className="mt-2">
                    Am Ende der Saison 2018/19 stieg die SV Viktoria Wertheim als Viertletzter der Landesliga Odenwald in die Kreisliga Tauberbischofsheim ab, woraufhin die <strong>Meisterschaft der Kreisliga Tauberbischofsheim</strong> und somit der <strong>direkte Wiederaufstieg in die Landesliga Odenwald</strong> folgte.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Die Fusion */}
          <AnimatedSection delay={0.4}>
            <div className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden shadow-lg">
              <div className="bg-white/30 px-4 py-3 border-b border-white/20">
                <h2 className="text-lg font-bold text-viktoria-blue flex items-center">
                  <IconGitMerge className="mr-3 text-viktoria-yellow" size={24} />
                  Die Vereinigung im Jahr 2000
                </h2>
              </div>
              <div className="p-6 text-gray-700 text-sm leading-relaxed">
                <div className="bg-gradient-to-r from-viktoria-blue/5 to-viktoria-yellow/5 rounded-lg p-4 border border-viktoria-blue/20">
                  <p className="font-medium text-viktoria-blue mb-2">
                    Ein historischer Moment für den Wertheimer Fußball
                  </p>
                  <p>
                    Die beiden Clubs <strong>SV Wertheim</strong> und <strong>SC Viktoria Wertheim</strong> vereinigten sich im Jahr <strong>2000</strong> zur <strong>SV Viktoria Wertheim</strong>.
                  </p>
                  <p className="mt-3 text-xs text-gray-600">
                    Diese Fusion brachte die Fußballvereine der Kernstadt und des Stadtteils Bestenheid wieder zusammen und schuf die Grundlage für den heutigen Verein.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Tradition und Erfolge */}
          <AnimatedSection delay={0.5}>
            <div className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden shadow-lg">
              <div className="bg-white/30 px-4 py-3 border-b border-white/20">
                <h2 className="text-lg font-bold text-viktoria-blue flex items-center">
                  <IconHeart className="mr-3 text-viktoria-yellow" size={24} />
                  Tradition und Erfolge
                </h2>
              </div>
              <div className="p-6 text-gray-700 text-sm leading-relaxed space-y-4">
                <p>
                  In seiner Vereinsgeschichte kann der Verein schon auf viele gute Zeiten und Erfolge zurückblicken.
                </p>
                <div className="bg-viktoria-yellow/10 rounded-lg p-4 border border-viktoria-yellow/30">
                  <p className="font-medium text-viktoria-blue mb-2">
                    Vollständige Vereinsgeschichte
                  </p>
                  <p>
                    Auf dieser Seite wurden sowohl die Erfolge der <strong>SV Viktoria Wertheim seit ihrer Gründung</strong>, als auch die Erfolge der Vereine <strong>SC Viktoria Wertheim</strong> und <strong>SV Wertheim</strong> vor der Fusion im Jahre 2000 berücksichtigt!
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Zeitstrahl */}
          <AnimatedSection delay={0.6}>
            <div className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden shadow-lg">
              <div className="bg-white/30 px-4 py-3 border-b border-white/20">
                <h2 className="text-lg font-bold text-viktoria-blue">
                  Wichtige Meilensteine
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-viktoria-blue rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      1945
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-viktoria-blue text-sm">Gründung der SG Wertheim</h3>
                      <p className="text-xs text-gray-600">Genehmigung durch amerikanische Militärregierung</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-viktoria-yellow rounded-full flex items-center justify-center text-viktoria-blue font-bold text-sm flex-shrink-0">
                      1952
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-viktoria-blue text-sm">Gründung SC Viktoria Wertheim</h3>
                      <p className="text-xs text-gray-600">Neuer Verein in Bestenheid</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-viktoria-blue rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      1965
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-viktoria-blue text-sm">1. Amateurliga Nordbaden</h3>
                      <p className="text-xs text-gray-600">Höchste Spielklasse erreicht</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-viktoria-yellow rounded-full flex items-center justify-center text-viktoria-blue font-bold text-sm flex-shrink-0">
                      2000
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-viktoria-blue text-sm">Fusion zur SV Viktoria Wertheim</h3>
                      <p className="text-xs text-gray-600">Vereinigung beider Vereine</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Vereinsgelände */}
          <AnimatedSection delay={0.7}>
            <div className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden shadow-lg">
              <div className="bg-white/30 px-4 py-3 border-b border-white/20">
                <h2 className="text-lg font-bold text-viktoria-blue flex items-center">
                  <IconMapPin className="mr-3 text-viktoria-yellow" size={24} />
                  Unser Sportplatz
                </h2>
              </div>
              <div className="p-6 space-y-4 text-gray-700 text-sm">
                <p className="leading-relaxed">
                  Unser Heimatstadion am Haslocher Weg 85 ist das Herz von Viktoria Wertheim. 
                  Hier trainieren unsere Mannschaften und hier finden unsere Heimspiele statt.
                </p>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center">
                    <IconMapPin className="mr-2 text-viktoria-blue" size={16} />
                    <span className="text-sm">Haslocher Weg 85, 97877 Wertheim-Bestenheid</span>
                  </div>
                  <div className="flex items-center">
                    <IconCalendar className="mr-2 text-viktoria-blue" size={16} />
                    <span className="text-sm">Trainingszeiten: Di & Do ab 19:00 Uhr, Sa ab 15:00 Uhr</span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Call to Action */}
          <AnimatedSection delay={0.8}>
            <div className="bg-viktoria-yellow/20 rounded-xl p-6 text-center border border-viktoria-yellow/30">
              <h2 className="text-xl font-bold text-viktoria-blue mb-4">
                Werde Teil unserer Tradition!
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed text-sm">
                Ob als Spieler, Trainer, Schiedsrichter oder einfach als Fan – 
                bei Viktoria Wertheim ist jeder willkommen, der unsere Leidenschaft für den Fußball teilt.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <a 
                  href="/mitgliedschaft" 
                  className="bg-viktoria-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-viktoria-blue-light transition-colors duration-300 text-sm"
                >
                  Mitglied werden
                </a>
                <a 
                  href="/kontakt" 
                  className="bg-viktoria-yellow text-viktoria-blue px-6 py-3 rounded-lg font-semibold hover:bg-viktoria-yellow/90 transition-colors duration-300 text-sm"
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