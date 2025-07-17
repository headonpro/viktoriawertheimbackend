"use client"

import PageLayout from '@/components/PageLayout'
import AnimatedSection from '@/components/AnimatedSection'
import { IconMail, IconPhone, IconMapPin, IconUser, IconBuilding, IconFileText } from '@tabler/icons-react'

export default function ImpressumPage() {
  return (
    <PageLayout>
      <main className="px-4 py-6">
        <div className="container max-w-4xl space-y-6">
          
          {/* Angaben gemäß § 5 TMG */}
          <AnimatedSection delay={0.1}>
            <div className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden shadow-lg">
              <div className="bg-white/30 px-4 py-3 border-b border-white/20">
                <h2 className="text-lg font-bold text-viktoria-blue flex items-center">
                  <IconBuilding className="mr-3 text-viktoria-yellow" size={24} />
                  Angaben gemäß § 5 TMG
                </h2>
              </div>
              <div className="p-6 space-y-4 text-gray-700">
                <div>
                  <h3 className="font-semibold text-viktoria-blue mb-2">Vereinsname:</h3>
                  <p>SV Viktoria Wertheim</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-viktoria-blue mb-2">Anschrift:</h3>
                  <p>
                    Haslocher Weg 85<br/>
                    97877 Wertheim
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Vorstand */}
          <AnimatedSection delay={0.2}>
            <div className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden shadow-lg">
              <div className="bg-white/30 px-4 py-3 border-b border-white/20">
                <h2 className="text-lg font-bold text-viktoria-blue flex items-center">
                  <IconUser className="mr-3 text-viktoria-yellow" size={24} />
                  Vertreten durch die gleichberechtigten Vorsitzenden
                </h2>
              </div>
              <div className="p-6 space-y-4 text-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-viktoria-blue mb-1">1. Vorsitzender:</h3>
                    <p>Fabian Väthröder</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-viktoria-blue mb-1">2. Vorsitzender:</h3>
                    <p>Christian Först</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-viktoria-blue mb-1">Schatzmeister:</h3>
                    <p>Tobias Mittag</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-viktoria-blue mb-1">Spielausschußvorsitzender:</h3>
                    <p>Kevin Niedens</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-viktoria-blue mb-1">Jugendleiter:</h3>
                    <p>Christian Först</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-viktoria-blue mb-1">Schriftführer:</h3>
                    <p>Eduard Helfenstein</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Kontakt */}
          <AnimatedSection delay={0.3}>
            <div className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden shadow-lg">
              <div className="bg-white/30 px-4 py-3 border-b border-white/20">
                <h2 className="text-lg font-bold text-viktoria-blue flex items-center">
                  <IconMail className="mr-3 text-viktoria-yellow" size={24} />
                  Kontakt
                </h2>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-3">
                  <IconMail className="text-viktoria-blue" size={20} />
                  <span className="text-gray-700">E-Mail: 
                    <a href="mailto:info@viktoria-wertheim.de" className="text-viktoria-blue hover:underline ml-1">
                      info@viktoria-wertheim.de
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Vereinsregister */}
          <AnimatedSection delay={0.4}>
            <div className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden shadow-lg">
              <div className="bg-white/30 px-4 py-3 border-b border-white/20">
                <h2 className="text-lg font-bold text-viktoria-blue flex items-center">
                  <IconFileText className="mr-3 text-viktoria-yellow" size={24} />
                  Eintragung im Vereinsregister
                </h2>
              </div>
              <div className="p-6 space-y-3 text-gray-700">
                <div>
                  <span className="font-semibold text-viktoria-blue">Registergericht:</span>
                  <span className="ml-2">Amtsgericht Wertheim</span>
                </div>
                <div>
                  <span className="font-semibold text-viktoria-blue">Registernummer:</span>
                  <span className="ml-2">306</span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Verantwortlich für den Inhalt */}
          <AnimatedSection delay={0.5}>
            <div className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden shadow-lg">
              <div className="bg-white/30 px-4 py-3 border-b border-white/20">
                <h2 className="text-lg font-bold text-viktoria-blue">
                  Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
                </h2>
              </div>
              <div className="p-6 text-gray-700">
                <div>
                  <h3 className="font-semibold text-viktoria-blue mb-2">Spielberichte:</h3>
                  <p>
                    Gregor Scheurich<br/>
                    Lange Str. 44<br/>
                    97877 Wertheim
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Disclaimer */}
          <AnimatedSection delay={0.6}>
            <div className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden shadow-lg">
              <div className="bg-white/30 px-4 py-3 border-b border-white/20">
                <h2 className="text-lg font-bold text-viktoria-blue">Disclaimer</h2>
              </div>
              <div className="p-6 text-gray-700 text-sm leading-relaxed space-y-4">
                <p>
                  Inhalt und Werke dieser Website sind urheberrechtlich geschützt. Trotz höchster Sorgfalt kann nicht für die Richtigkeit der wiedergegebenen Informationen oder die permanente technische Erreichbarkeit garantiert werden.
                </p>
                <p>
                  Es wird keine Haftung für den Inhalt von extern verlinkten Websites übernommen. Auf deren Inhalte haben wir keinen Einfluss und distanzieren uns ausdrücklich.
                </p>
                <p>
                  Sollten Sie dennoch etwas an unseren Seiten zu beanstanden haben, bitten wir um einen einfachen entsprechenden Hinweis, damit wir die Inhalte schnellstmöglich entfernen können.
                </p>
                <p className="text-xs text-gray-500 mt-6 pt-4 border-t border-gray-200">
                  Quelle: Impressum-Generator von anwalt.de speziell für Eingetragener Verein (e.V.).
                </p>
              </div>
            </div>
          </AnimatedSection>

        </div>
      </main>
    </PageLayout>
  )
}