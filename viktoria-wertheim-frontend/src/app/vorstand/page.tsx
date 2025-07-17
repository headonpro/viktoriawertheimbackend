'use client'

import PageLayout from '@/components/PageLayout'
import dynamic from 'next/dynamic'
import { IconUser, IconMail, IconPhone, IconUsers, IconTrophy, IconShield, IconCoin } from '@tabler/icons-react'
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

interface BoardMember {
  name: string
  position: string
  description: string
  email?: string
  phone?: string
  icon: any
  color: string
}

export default function BoardPage() {
  const boardMembers: BoardMember[] = [
    {
      name: 'Hans Müller',
      position: '1. Vorsitzender',
      description: 'Leitung des Vereins, Vertretung nach außen, strategische Ausrichtung und Koordination aller Vereinsaktivitäten.',
      email: 'vorsitzender@viktoria-wertheim.de',
      phone: '09342 123-456',
      icon: IconUsers,
      color: 'viktoria-blue'
    },
    {
      name: 'Maria Schmidt',
      position: '2. Vorsitzende',
      description: 'Stellvertretung, Jugendarbeit und Koordination der Nachwuchsmannschaften sowie Organisation von Vereinsveranstaltungen.',
      email: 'stellv.vorsitzende@viktoria-wertheim.de',
      phone: '09342 123-457',
      icon: IconUser,
      color: 'viktoria-yellow'
    },
    {
      name: 'Peter Wagner',
      position: 'Kassenwart',
      description: 'Verwaltung der Vereinsfinanzen, Buchführung, Beitragsverwaltung und finanzielle Planung des Vereins.',
      email: 'kasse@viktoria-wertheim.de',
      phone: '09342 123-458',
      icon: IconCoin,
      color: 'green-600'
    },
    {
      name: 'Andrea Klein',
      position: 'Schriftführerin',
      description: 'Protokollführung bei Versammlungen, Korrespondenz und Verwaltung der Vereinsdokumente.',
      email: 'schriftfuehrung@viktoria-wertheim.de',
      icon: IconShield,
      color: 'purple-600'
    },
    {
      name: 'Michael Bauer',
      position: 'Sportwart',
      description: 'Organisation des Spielbetriebs, Koordination mit dem Verband und Betreuung der Mannschaften.',
      email: 'sport@viktoria-wertheim.de',
      phone: '09342 123-459',
      icon: IconTrophy,
      color: 'orange-600'
    },
    {
      name: 'Sabine Fischer',
      position: 'Jugendleiterin',
      description: 'Leitung der Jugendarbeit, Koordination der Nachwuchstrainer und Organisation von Jugendturnieren.',
      email: 'jugend@viktoria-wertheim.de',
      icon: IconUsers,
      color: 'pink-600'
    }
  ]

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'viktoria-blue': return 'text-viktoria-blue bg-viktoria-blue/10'
      case 'viktoria-yellow': return 'text-viktoria-yellow bg-viktoria-yellow/10'
      case 'green-600': return 'text-green-600 bg-green-100'
      case 'purple-600': return 'text-purple-600 bg-purple-100'
      case 'orange-600': return 'text-orange-600 bg-orange-100'
      case 'pink-600': return 'text-pink-600 bg-pink-100'
      default: return 'text-gray-600 bg-gray-100'
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
                Unser Vorstandsteam
              </h2>
              <p className="text-gray-700 leading-relaxed px-4">
                Die ehrenamtliche Vereinsführung arbeitet mit Leidenschaft und Engagement 
                für den Erfolg und die Weiterentwicklung von Viktoria Wertheim.
              </p>
            </div>
          </AnimatedSection>

          {/* Vorstandsmitglieder */}
          <div className="space-y-4">
            {boardMembers.map((member, index) => (
              <AnimatedDiv 
                key={index} 
                delay={0.3 + index * 0.1}
                className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 p-6 hover:bg-white/50 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  {/* Icon */}
                  <div className={`${getColorClasses(member.color)} p-3 rounded-lg flex-shrink-0`}>
                    <member.icon size={24} />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-bold text-viktoria-blue text-lg mb-1">
                      {member.name}
                    </h3>
                    <div className="text-sm font-semibold text-gray-600 mb-3">
                      {member.position}
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                      {member.description}
                    </p>
                    
                    {/* Kontakt */}
                    <div className="space-y-2">
                      {member.email && (
                        <a 
                          href={`mailto:${member.email}`}
                          className="flex items-center space-x-2 text-sm text-viktoria-blue hover:text-viktoria-blue-light transition-colors"
                        >
                          <IconMail size={16} />
                          <span>{member.email}</span>
                        </a>
                      )}
                      {member.phone && (
                        <a 
                          href={`tel:${member.phone}`}
                          className="flex items-center space-x-2 text-sm text-viktoria-blue hover:text-viktoria-blue-light transition-colors"
                        >
                          <IconPhone size={16} />
                          <span>{member.phone}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </AnimatedDiv>
            ))}
          </div>

          {/* Ehrenamt Info */}
          <AnimatedSection delay={1.0}>
            <div className="bg-gradient-to-r from-viktoria-blue-light to-viktoria-blue rounded-xl p-6 text-white text-center">
              <IconUsers className="text-viktoria-yellow mx-auto mb-4" size={48} />
              <h2 className="text-xl font-bold text-viktoria-yellow mb-4">
                Ehrenamtliches Engagement
              </h2>
              <p className="text-white/90 mb-6 leading-relaxed">
                Unser gesamter Vorstand arbeitet ehrenamtlich und investiert seine Freizeit 
                für den Verein. Wir sind stolz auf das große Engagement und den Zusammenhalt 
                in unserem Vorstandsteam.
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-viktoria-yellow">6</div>
                  <div className="text-xs text-white/80">Vorstandsmitglieder</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-viktoria-yellow">100%</div>
                  <div className="text-xs text-white/80">Ehrenamtlich</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-viktoria-yellow">24/7</div>
                  <div className="text-xs text-white/80">Für den Verein</div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Allgemeine Kontaktinfo */}
          <AnimatedSection delay={1.1}>
            <div className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 p-6">
              <h2 className="text-lg font-bold text-viktoria-blue mb-4 text-center">
                Allgemeine Kontaktinformationen
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-center space-x-2">
                  <IconMail className="text-viktoria-blue" size={20} />
                  <a 
                    href="mailto:info@viktoria-wertheim.de"
                    className="text-viktoria-blue hover:text-viktoria-blue-light transition-colors font-medium"
                  >
                    info@viktoria-wertheim.de
                  </a>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <IconPhone className="text-viktoria-blue" size={20} />
                  <a 
                    href="tel:09342123456"
                    className="text-viktoria-blue hover:text-viktoria-blue-light transition-colors font-medium"
                  >
                    (09342) 123-456
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Interesse am Vorstand */}
          <AnimatedSection delay={1.2}>
            <div className="bg-viktoria-yellow/20 rounded-xl p-6 text-center">
              <h2 className="text-lg font-bold text-viktoria-blue mb-4">
                Interesse am Vorstand?
              </h2>
              <p className="text-gray-700 mb-6 text-sm leading-relaxed">
                Sie möchten sich ehrenamtlich für unseren Verein engagieren? 
                Wir freuen uns immer über neue Mitstreiter im Vorstandsteam!
              </p>
              <a 
                href="/kontakt" 
                className="bg-viktoria-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-viktoria-blue-light transition-colors duration-300 inline-block"
              >
                Jetzt Kontakt aufnehmen
              </a>
            </div>
          </AnimatedSection>

        </div>
      </main>
    </PageLayout>
  )
} 