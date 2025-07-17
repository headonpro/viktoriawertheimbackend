'use client'

import PageLayout from '@/components/PageLayout'
import dynamic from 'next/dynamic'
import { IconScale, IconDownload } from '@tabler/icons-react'

const AnimatedSection = dynamic(
  () => import('@/components/AnimatedSection'),
  { ssr: false }
)

export default function SatzungPage() {
  return (
    <PageLayout>
      {/* Header Section - nur Mobile */}
      

      <main className="pt-8 pb-6">
        <div className="container space-y-8">
          
          <AnimatedSection delay={0.2}>
            <div className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 p-6">
              <h2 className="text-xl font-bold text-viktoria-blue mb-4 flex items-center">
                <IconScale className="mr-3 text-viktoria-yellow" size={24} />
                Vereinssatzung
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Die Satzung des SV Viktoria Wertheim e.V. regelt die Grundlagen unseres Vereinslebens, 
                die Mitgliedschaft, die Organe des Vereins und deren Aufgaben.
              </p>
              
              <div className="text-center">
                <a 
                  href="#"
                  className="bg-viktoria-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-viktoria-blue-light transition-colors duration-300 inline-flex items-center space-x-2"
                >
                  <IconDownload size={20} />
                  <span>Satzung herunterladen (PDF)</span>
                </a>
              </div>
            </div>
          </AnimatedSection>

        </div>
      </main>
    </PageLayout>
  )
} 