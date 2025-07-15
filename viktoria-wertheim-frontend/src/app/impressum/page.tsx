'use client'

import PageLayout from '@/components/PageLayout'
import dynamic from 'next/dynamic'
import { IconMail, IconPhone, IconMapPin, IconUser, IconBuilding } from '@tabler/icons-react'

// Dynamic Import für animierte Komponenten
const AnimatedSection = dynamic(
  () => import('@/components/AnimatedSection'),
  { ssr: false }
)

export default function ImpressumPage() {
  return (
    <PageLayout>
      {/* Header Section - nur Mobile */}
      <div className="pt-[60px] md:pt-[20px] lg:hidden">
        <AnimatedSection delay={0.1}>
          <div className="w-full header-gradient py-6 shadow-lg">
            <div className="container">
              <h1 className="text-3xl md:text-4xl font-permanent-marker text-white text-center news-title">
                <span className="text-viktoria-yellow font-permanent-marker news-title">I</span>mpressum
              </h1>
            </div>
          </div>
        </AnimatedSection>
      </div>

      <main className="pt-8 pb-6">
        <div className="container space-y-8">
          
          {/* Verantwortlich */}
          <AnimatedSection delay={0.2}>
            <div className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 p-6">
              <h2 className="text-xl font-bold text-viktoria-blue mb-4 flex items-center">
                <IconBuilding className="mr-3 text-viktoria-yellow" size={24} />
                Angaben gemäß § 5 TMG
              </h2>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-semibold text-viktoria-blue">Vereinsname:</h3>
                  <p>SV Viktoria Wertheim e.V.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-viktoria-blue">Anschrift:</h3>
                  <p>
                    Sportstraße 1<br/>
                    97877 Wertheim<br/>
                    Deutschland
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-viktoria-blue">Vereinsregister:</h3>
                  <p>
                    Registergericht: Amtsgericht Würzburg<br/>
                    Vereinsregisternummer: VR 123456
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Kontakt */}
          <AnimatedSection delay={0.3}>
            <div className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 p-6">
              <h2 className="text-xl font-bold text-viktoria-blue mb-4 flex items-center">
                <IconMail className="mr-3 text-viktoria-yellow" size={24} />
                Kontakt
              </h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <IconPhone className="text-viktoria-blue" size={20} />
                  <span className="text-gray-700">Telefon: (09342) 123-456</span>
                </div>
                <div className="flex items-center space-x-3">
                  <IconMail className="text-viktoria-blue" size={20} />
                  <span className="text-gray-700">E-Mail: info@viktoria-wertheim.de</span>
                </div>
                <div className="flex items-center space-x-3">
                  <IconMapPin className="text-viktoria-blue" size={20} />
                  <span className="text-gray-700">Website: www.viktoria-wertheim.de</span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Vorstand */}
          <AnimatedSection delay={0.4}>
            <div className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 p-6">
              <h2 className="text-xl font-bold text-viktoria-blue mb-4 flex items-center">
                <IconUser className="mr-3 text-viktoria-yellow" size={24} />
                Vertretungsberechtigte Personen
              </h2>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-semibold text-viktoria-blue">1. Vorsitzender:</h3>
                  <p>Hans Müller</p>
                </div>
                <div>
                  <h3 className="font-semibold text-viktoria-blue">2. Vorsitzende:</h3>
                  <p>Maria Schmidt</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Haftungshinweis */}
          <AnimatedSection delay={0.5}>
            <div className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 p-6">
              <h2 className="text-lg font-bold text-viktoria-blue mb-4">Haftungsausschluss</h2>
              <div className="space-y-4 text-gray-700 text-sm">
                <div>
                  <h3 className="font-semibold text-viktoria-blue mb-2">Haftung für Inhalte</h3>
                  <p>
                    Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, 
                    Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-viktoria-blue mb-2">Haftung für Links</h3>
                  <p>
                    Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir 
                    keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine 
                    Gewähr übernehmen.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-viktoria-blue mb-2">Urheberrecht</h3>
                  <p>
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten 
                    unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, 
                    Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes 
                    bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

        </div>
      </main>
    </PageLayout>
  )
} 