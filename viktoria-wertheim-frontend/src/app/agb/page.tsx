'use client'

import PageLayout from '@/components/PageLayout'
import dynamic from 'next/dynamic'
import { IconFileText, IconCheck, IconX } from '@tabler/icons-react'

const AnimatedSection = dynamic(
  () => import('@/components/AnimatedSection'),
  { ssr: false }
)

export default function AGBPage() {
  return (
    <PageLayout>
      {/* Header Section - nur Mobile */}
      <div className="pt-[60px] md:pt-[20px] lg:hidden">
        <AnimatedSection delay={0.1}>
          <div className="w-full header-gradient py-6 shadow-lg">
            <div className="container">
              <h1 className="text-3xl md:text-4xl font-permanent-marker text-white text-center news-title">
                <span className="text-viktoria-yellow font-permanent-marker news-title">A</span>GB
              </h1>
            </div>
          </div>
        </AnimatedSection>
      </div>

      <main className="pt-8 pb-6">
        <div className="container space-y-8">
          
          <AnimatedSection delay={0.2}>
            <div className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 p-6">
              <h2 className="text-xl font-bold text-viktoria-blue mb-4 flex items-center">
                <IconFileText className="mr-3 text-viktoria-yellow" size={24} />
                Allgemeine Geschäftsbedingungen
              </h2>
              <div className="space-y-4 text-gray-700 text-sm">
                <div>
                  <h3 className="font-semibold text-viktoria-blue mb-2">§ 1 Geltungsbereich</h3>
                  <p>
                    Diese Allgemeinen Geschäftsbedingungen gelten für alle Leistungen des 
                    SV Viktoria Wertheim e.V. einschließlich Mitgliedschaften, Veranstaltungen 
                    und weiteren Vereinsangeboten.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-viktoria-blue mb-2">§ 2 Mitgliedschaft</h3>
                  <p>
                    Die Mitgliedschaft im Verein richtet sich nach der aktuellen Vereinssatzung. 
                    Mitgliedsbeiträge werden gemäß der jeweils gültigen Beitragsordnung erhoben.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-viktoria-blue mb-2">§ 3 Haftung</h3>
                  <p>
                    Der Verein haftet nur bei Vorsatz und grober Fahrlässigkeit. 
                    Die Teilnahme an Vereinsaktivitäten erfolgt auf eigene Gefahr.
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