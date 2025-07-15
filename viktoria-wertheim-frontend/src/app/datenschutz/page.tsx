'use client'

import PageLayout from '@/components/PageLayout'
import dynamic from 'next/dynamic'
import { IconShield, IconEye, IconLock, IconMail } from '@tabler/icons-react'

// Dynamic Import für animierte Komponenten
const AnimatedSection = dynamic(
  () => import('@/components/AnimatedSection'),
  { ssr: false }
)

export default function DatenschutzPage() {
  return (
    <PageLayout>
      {/* Header Section - nur Mobile */}
      <div className="pt-[60px] md:pt-[20px] lg:hidden">
        <AnimatedSection delay={0.1}>
          <div className="w-full header-gradient py-6 shadow-lg">
            <div className="container">
              <h1 className="text-3xl md:text-4xl font-permanent-marker text-white text-center news-title">
                <span className="text-viktoria-yellow font-permanent-marker news-title">D</span>atenschutz
              </h1>
            </div>
          </div>
        </AnimatedSection>
      </div>

      <main className="pt-8 pb-6">
        <div className="container space-y-8">
          
          {/* Einleitung */}
          <AnimatedSection delay={0.2}>
            <div className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 p-6">
              <h2 className="text-xl font-bold text-viktoria-blue mb-4 flex items-center">
                <IconShield className="mr-3 text-viktoria-yellow" size={24} />
                Datenschutzerklärung
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. 
                Wir verarbeiten Ihre Daten daher ausschließlich auf Grundlage der 
                gesetzlichen Bestimmungen (DSGVO, TKG 2003).
              </p>
            </div>
          </AnimatedSection>

          {/* Datenerfassung */}
          <AnimatedSection delay={0.3}>
            <div className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 p-6">
              <h2 className="text-lg font-bold text-viktoria-blue mb-4 flex items-center">
                <IconEye className="mr-3 text-viktoria-yellow" size={20} />
                Welche Daten erfassen wir?
              </h2>
              <div className="space-y-4 text-gray-700 text-sm">
                <div>
                  <h3 className="font-semibold text-viktoria-blue mb-2">Automatisch erfasste Daten</h3>
                  <p>
                    Beim Besuch unserer Website werden automatisch folgende Daten erfasst:
                  </p>
                  <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>IP-Adresse</li>
                    <li>Datum und Uhrzeit des Zugriffs</li>
                    <li>Verwendeter Browser und Betriebssystem</li>
                    <li>Aufgerufene Seiten</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-viktoria-blue mb-2">Freiwillig angegebene Daten</h3>
                  <p>
                    Bei der Kontaktaufnahme über unser Kontaktformular oder per E-Mail 
                    werden die von Ihnen mitgeteilten Daten (Name, E-Mail-Adresse, Nachricht) 
                    gespeichert, um Ihre Anfrage zu bearbeiten.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Verwendung der Daten */}
          <AnimatedSection delay={0.4}>
            <div className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 p-6">
              <h2 className="text-lg font-bold text-viktoria-blue mb-4 flex items-center">
                <IconLock className="mr-3 text-viktoria-yellow" size={20} />
                Wie verwenden wir Ihre Daten?
              </h2>
              <div className="space-y-4 text-gray-700 text-sm">
                <div>
                  <h3 className="font-semibold text-viktoria-blue mb-2">Zweck der Datenverarbeitung</h3>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Bereitstellung und Verbesserung unserer Website</li>
                    <li>Beantwortung von Anfragen</li>
                    <li>Vereinsorganisation (nur bei Mitgliedern)</li>
                    <li>Sicherstellung der IT-Sicherheit</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-viktoria-blue mb-2">Rechtsgrundlage</h3>
                  <p>
                    Die Verarbeitung erfolgt auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) 
                    oder zur Erfüllung unserer berechtigten Interessen (Art. 6 Abs. 1 lit. f DSGVO).
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Ihre Rechte */}
          <AnimatedSection delay={0.5}>
            <div className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 p-6">
              <h2 className="text-lg font-bold text-viktoria-blue mb-4">Ihre Rechte</h2>
              <div className="space-y-4 text-gray-700 text-sm">
                <p>Sie haben folgende Rechte bezüglich Ihrer persönlichen Daten:</p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Recht auf Auskunft über Ihre gespeicherten Daten</li>
                  <li>Recht auf Berichtigung unrichtiger Daten</li>
                  <li>Recht auf Löschung Ihrer Daten</li>
                  <li>Recht auf Einschränkung der Verarbeitung</li>
                  <li>Recht auf Datenübertragbarkeit</li>
                  <li>Widerspruchsrecht gegen die Verarbeitung</li>
                  <li>Recht auf Beschwerde bei der Aufsichtsbehörde</li>
                </ul>
              </div>
            </div>
          </AnimatedSection>

          {/* Kontakt */}
          <AnimatedSection delay={0.6}>
            <div className="bg-viktoria-yellow/20 rounded-xl p-6 text-center">
              <h2 className="text-lg font-bold text-viktoria-blue mb-4 flex items-center justify-center">
                <IconMail className="mr-2" size={20} />
                Fragen zum Datenschutz?
              </h2>
              <p className="text-gray-700 mb-6 text-sm leading-relaxed">
                Bei Fragen zur Verarbeitung Ihrer persönlichen Daten wenden Sie sich gerne an uns:
              </p>
              <a 
                href="mailto:datenschutz@viktoria-wertheim.de"
                className="bg-viktoria-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-viktoria-blue-light transition-colors duration-300 inline-block"
              >
                datenschutz@viktoria-wertheim.de
              </a>
            </div>
          </AnimatedSection>

        </div>
      </main>
    </PageLayout>
  )
} 