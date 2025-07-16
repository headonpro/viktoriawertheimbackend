'use client'

import PageLayout from '@/components/PageLayout'
import dynamic from 'next/dynamic'
import { IconUsers, IconHeart, IconTrophy, IconGift, IconMail, IconDownload, IconCheck, IconStar } from '@tabler/icons-react'
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

interface MembershipCategory {
  name: string
  price: string
  description: string
  benefits: string[]
  icon: any
  color: string
  popular?: boolean
}

export default function MembershipPage() {
  const membershipCategories: MembershipCategory[] = [
    {
      name: 'Aktive Mitglieder',
      price: '15€/Monat',
      description: 'Für alle aktiven Spieler und Spielerinnen aller Altersklassen',
      benefits: [
        'Teilnahme am Trainings- und Spielbetrieb',
        'Kostenlose Nutzung der Vereinsanlage',
        'Vereinstrikot und Trainingskleidung',
        'Teilnahme an Vereinsveranstaltungen',
        'Versicherungsschutz über den Verein'
      ],
      icon: IconTrophy,
      color: 'viktoria-blue',
      popular: true
    },
    {
      name: 'Passive Mitglieder',
      price: '8€/Monat',
      description: 'Für Unterstützer und Fans, die den Verein fördern möchten',
      benefits: [
        'Stimmrecht bei Vereinsversammlungen',
        'Ermäßigungen bei Vereinsveranstaltungen',
        'Regelmäßige Vereinsinformationen',
        'Nutzung des Vereinsheims',
        'Teilnahme an Vereinsfeiern'
      ],
      icon: IconHeart,
      color: 'viktoria-yellow'
    },
    {
      name: 'Jugendmitglieder',
      price: '10€/Monat',
      description: 'Für Kinder und Jugendliche bis 18 Jahre',
      benefits: [
        'Altersgerechtes Training und Spiele',
        'Qualifizierte Jugendtrainer',
        'Teilnahme an Jugendturnieren',
        'Vereinskleidung für Jugendliche',
        'Kostenlose Vereinsveranstaltungen'
      ],
      icon: IconUsers,
      color: 'green-600'
    },
    {
      name: 'Ehrenmitglieder',
      price: 'Kostenfrei',
      description: 'Für verdiente Mitglieder mit besonderen Leistungen für den Verein',
      benefits: [
        'Alle Rechte der aktiven Mitgliedschaft',
        'Beitragsbefreiung',
        'Besondere Ehrungen bei Veranstaltungen',
        'Lebenslanges Stimmrecht',
        'Bevorzugter Zugang zu Vereinsveranstaltungen'
      ],
      icon: IconStar,
      color: 'purple-600'
    }
  ]

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'viktoria-blue': return 'text-viktoria-blue bg-viktoria-blue/10 border-viktoria-blue'
      case 'viktoria-yellow': return 'text-viktoria-yellow bg-viktoria-yellow/10 border-viktoria-yellow'
      case 'green-600': return 'text-green-600 bg-green-100 border-green-600'
      case 'purple-600': return 'text-purple-600 bg-purple-100 border-purple-600'
      default: return 'text-gray-600 bg-gray-100 border-gray-600'
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
                Werde Teil der Viktoria-Familie!
              </h2>
              <p className="text-gray-700 leading-relaxed px-4">
                Bei uns findest du mehr als nur Fußball – wir sind eine Gemeinschaft, 
                die zusammenhält und gemeinsam Erfolge feiert. Wähle die Mitgliedschaft, 
                die zu dir passt.
              </p>
            </div>
          </AnimatedSection>

          {/* Mitgliedschaftskategorien */}
          <div className="space-y-4">
            {membershipCategories.map((category, index) => (
              <AnimatedDiv 
                key={index} 
                delay={0.3 + index * 0.1}
                className={`relative bg-white/40 backdrop-blur-sm rounded-xl border-2 border-white/20 p-6 hover:bg-white/50 transition-all duration-300 ${
                  category.popular ? 'ring-2 ring-viktoria-yellow/50' : ''
                }`}
              >
                {category.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-viktoria-yellow text-viktoria-blue text-xs font-bold px-3 py-1 rounded-full">
                      BELIEBT
                    </span>
                  </div>
                )}
                
                <div className="flex items-start space-x-4">
                  {/* Icon & Price */}
                  <div className="flex-shrink-0 text-center">
                    <div className={`${getColorClasses(category.color)} p-3 rounded-lg mb-2`}>
                      <category.icon size={24} />
                    </div>
                    <div className="text-lg font-bold text-viktoria-blue">
                      {category.price}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-bold text-viktoria-blue text-lg mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                      {category.description}
                    </p>
                    
                    {/* Benefits */}
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm mb-2">Vorteile:</h4>
                      <ul className="space-y-1">
                        {category.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-start space-x-2 text-sm text-gray-700">
                            <IconCheck className="text-green-600 mt-0.5 flex-shrink-0" size={14} />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </AnimatedDiv>
            ))}
          </div>

          {/* Beitrittsformular Info */}
          <AnimatedSection delay={0.8}>
            <div className="bg-gradient-to-r from-viktoria-blue-light to-viktoria-blue rounded-xl p-6 text-white text-center">
              <IconGift className="text-viktoria-yellow mx-auto mb-4" size={48} />
              <h2 className="text-xl font-bold text-viktoria-yellow mb-4">
                So einfach geht&apos;s!
              </h2>
              <p className="text-white/90 mb-6 leading-relaxed">
                Der Beitritt zu unserem Verein ist ganz einfach. Fülle das Beitrittsformular aus 
                oder komm einfach bei uns vorbei. Wir freuen uns auf dich!
              </p>
              <div className="grid grid-cols-1 gap-3">
                <a 
                  href="mailto:info@viktoria-wertheim.de?subject=Beitrittsformular%20anfordern"
                  className="bg-viktoria-yellow text-viktoria-blue px-6 py-3 rounded-lg font-semibold hover:bg-viktoria-yellow/90 transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <IconMail size={20} />
                  <span>Beitrittsformular anfordern</span>
                </a>
                <a 
                  href="#"
                  className="bg-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <IconDownload size={20} />
                  <span>Formular herunterladen (PDF)</span>
                </a>
              </div>
            </div>
          </AnimatedSection>

          {/* Warum Mitglied werden */}
          <AnimatedSection delay={0.9}>
            <div className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 p-6">
              <h2 className="text-xl font-bold text-viktoria-blue mb-6 text-center">
                Warum Viktoria Wertheim?
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <AnimatedDiv delay={1.0} className="flex items-center space-x-3">
                  <div className="bg-viktoria-blue/10 p-2 rounded-lg">
                    <IconUsers className="text-viktoria-blue" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm">Starke Gemeinschaft</h3>
                    <p className="text-gray-600 text-xs">Über 250 Mitglieder, die zusammenhalten</p>
                  </div>
                </AnimatedDiv>
                
                <AnimatedDiv delay={1.1} className="flex items-center space-x-3">
                  <div className="bg-viktoria-yellow/10 p-2 rounded-lg">
                    <IconTrophy className="text-viktoria-yellow" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm">Erfolgreiche Tradition</h3>
                    <p className="text-gray-600 text-xs">Über 100 Jahre Vereinsgeschichte</p>
                  </div>
                </AnimatedDiv>
                
                <AnimatedDiv delay={1.2} className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <IconHeart className="text-green-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm">Faire Beiträge</h3>
                    <p className="text-gray-600 text-xs">Transparente und soziale Preisgestaltung</p>
                  </div>
                </AnimatedDiv>
              </div>
            </div>
          </AnimatedSection>

          {/* Kontakt für Fragen */}
          <AnimatedSection delay={1.3}>
            <div className="bg-viktoria-yellow/20 rounded-xl p-6 text-center">
              <h2 className="text-lg font-bold text-viktoria-blue mb-4">
                Noch Fragen?
              </h2>
              <p className="text-gray-700 mb-6 text-sm leading-relaxed">
                Unser Vorstandsteam beantwortet gerne alle deine Fragen zur Mitgliedschaft. 
                Ruf einfach an oder schreib uns eine E-Mail!
              </p>
              <div className="grid grid-cols-1 gap-3">
                <a 
                  href="tel:09342123456"
                  className="bg-viktoria-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-viktoria-blue-light transition-colors duration-300"
                >
                  (09342) 123-456
                </a>
                <a 
                  href="/kontakt"
                  className="bg-viktoria-yellow text-viktoria-blue px-6 py-3 rounded-lg font-semibold hover:bg-viktoria-yellow/90 transition-colors duration-300"
                >
                  Kontaktformular
                </a>
              </div>
            </div>
          </AnimatedSection>

        </div>
      </main>
    </PageLayout>
  )
} 