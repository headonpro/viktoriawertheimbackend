'use client'

import Header from '@/components/Header'
import MobileNav from '@/components/MobileNav'
import dynamic from 'next/dynamic'
import { IconMail, IconPhone, IconMapPin, IconClock, IconUsers, IconSend, IconMessageCircle } from '@tabler/icons-react'

// Dynamic Import für animierte Komponenten
const AnimatedSection = dynamic(
  () => import('@/components/AnimatedSection'),
  { ssr: false }
)

const AnimatedDiv = dynamic(
  () => import('@/components/AnimatedSection').then(mod => ({ default: mod.AnimatedDiv })),
  { ssr: false }
)

export default function KontaktPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div>
        {/* Header Section - wie News-Seite */}
        <div className="pt-[140px] md:pt-[80px]">
          <AnimatedSection delay={0.1}>
            <div className="w-full header-gradient py-6 shadow-lg">
              <div className="container">
                <h1 className="text-3xl md:text-4xl font-permanent-marker text-white text-center news-title">
                  <span className="text-viktoria-yellow font-permanent-marker news-title">K</span>ontakt
                </h1>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Beschreibungstext */}
        <AnimatedSection className="px-4 pt-6 pb-4" delay={0.2}>
          <div className="container">
            <div className="text-center">
              <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto">
                Haben Sie Fragen oder möchten Sie Kontakt mit uns aufnehmen? 
                Wir freuen uns auf Ihre Nachricht!
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Schnellkontakt Cards - Kompakt für Mobile */}
        <AnimatedSection className="px-4 py-4" delay={0.3}>
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {/* Adresse */}
              <AnimatedDiv 
                className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/30 hover:bg-white/70 transition-all duration-300 shadow-sm"
                delay={0.4}
              >
                <div className="text-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-viktoria-blue rounded-lg flex items-center justify-center mx-auto mb-3">
                    <IconMapPin size={20} className="text-viktoria-yellow md:text-xl" />
                  </div>
                  <h3 className="text-sm md:text-base font-semibold text-viktoria-blue mb-2">Adresse</h3>
                  <div className="text-gray-600 text-xs md:text-sm space-y-0.5">
                    <p>Sportstraße 1</p>
                    <p>97877 Wertheim</p>
                  </div>
                </div>
              </AnimatedDiv>

              {/* Telefon */}
              <AnimatedDiv 
                className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/30 hover:bg-white/70 transition-all duration-300 shadow-sm"
                delay={0.5}
              >
                <div className="text-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-viktoria-blue rounded-lg flex items-center justify-center mx-auto mb-3">
                    <IconPhone size={20} className="text-viktoria-yellow md:text-xl" />
                  </div>
                  <h3 className="text-sm md:text-base font-semibold text-viktoria-blue mb-2">Telefon</h3>
                  <div className="text-gray-600 text-xs md:text-sm space-y-0.5">
                    <p>(09342) 123-456</p>
                    <p className="text-xs">Mo-Fr: 18-20h</p>
                  </div>
                </div>
              </AnimatedDiv>

              {/* Email */}
              <AnimatedDiv 
                className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/30 hover:bg-white/70 transition-all duration-300 shadow-sm"
                delay={0.6}
              >
                <div className="text-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-viktoria-blue rounded-lg flex items-center justify-center mx-auto mb-3">
                    <IconMail size={20} className="text-viktoria-yellow md:text-xl" />
                  </div>
                  <h3 className="text-sm md:text-base font-semibold text-viktoria-blue mb-2">Email</h3>
                  <div className="text-gray-600 text-xs md:text-sm space-y-0.5">
                    <p className="break-all">info@viktoria-wertheim.de</p>
                  </div>
                </div>
              </AnimatedDiv>

              {/* Training */}
              <AnimatedDiv 
                className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/30 hover:bg-white/70 transition-all duration-300 shadow-sm"
                delay={0.7}
              >
                <div className="text-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-viktoria-blue rounded-lg flex items-center justify-center mx-auto mb-3">
                    <IconClock size={20} className="text-viktoria-yellow md:text-xl" />
                  </div>
                  <h3 className="text-sm md:text-base font-semibold text-viktoria-blue mb-2">Training</h3>
                  <div className="text-gray-600 text-xs md:text-sm space-y-0.5">
                    <p>Di & Do: 19:00h</p>
                    <p className="text-xs">Sa: 15:00h</p>
                  </div>
                </div>
              </AnimatedDiv>
            </div>
          </div>
        </AnimatedSection>

        {/* Detaillierte Kontaktinformationen */}
        <AnimatedSection className="px-4 py-4" delay={0.8}>
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Kontaktdetails */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 border border-white/40 shadow-sm">
                <div className="flex items-center mb-5">
                  <div className="w-10 h-10 bg-viktoria-blue rounded-lg flex items-center justify-center mr-3">
                    <IconMessageCircle className="text-viktoria-yellow" size={20} />
                  </div>
                  <h2 className="text-lg font-semibold text-viktoria-blue">Kontaktdetails</h2>
                </div>
                
                {/* Kompaktes Grid Layout */}
                <div className="space-y-4">
                  {/* Kontaktinfos - Horizontale Liste */}
                  <div className="grid grid-cols-1 gap-3">
                    {/* Adresse */}
                    <div className="flex items-center space-x-3 p-3 bg-white/40 rounded-lg border border-white/30">
                      <div className="w-8 h-8 bg-viktoria-blue rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconMapPin size={16} className="text-viktoria-yellow" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-viktoria-blue">Sportstraße 1, 97877 Wertheim</p>
                      </div>
                    </div>

                    {/* Telefon */}
                    <div className="flex items-center space-x-3 p-3 bg-white/40 rounded-lg border border-white/30">
                      <div className="w-8 h-8 bg-viktoria-blue rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconPhone size={16} className="text-viktoria-yellow" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-viktoria-blue">(09342) 123-456</p>
                        <p className="text-xs text-gray-500">Mo-Fr: 18-20h, Sa: 10-12h</p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-center space-x-3 p-3 bg-white/40 rounded-lg border border-white/30">
                      <div className="w-8 h-8 bg-viktoria-blue rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconMail size={16} className="text-viktoria-yellow" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <a href="mailto:info@viktoria-wertheim.de" className="text-sm font-medium text-viktoria-blue hover:underline break-all">
                          info@viktoria-wertheim.de
                        </a>
                        <p className="text-xs text-gray-500">Hauptkontakt</p>
                      </div>
                    </div>
                  </div>

                  {/* Weitere Kontakte - Kompakt */}
                  <div className="bg-gradient-to-r from-viktoria-blue/5 to-viktoria-yellow/5 rounded-lg p-4 border border-viktoria-blue/20">
                    <h3 className="text-sm font-semibold text-viktoria-blue mb-3">Weitere Kontakte</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="font-medium text-gray-700">Jugend:</span>
                        <a href="mailto:jugend@viktoria-wertheim.de" className="text-viktoria-blue hover:underline ml-1 break-all">
                          jugend@viktoria-wertheim.de
                        </a>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Shop:</span>
                        <a href="mailto:shop@viktoria-wertheim.de" className="text-viktoria-blue hover:underline ml-1 break-all">
                          shop@viktoria-wertheim.de
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Service Info */}
                  <div className="flex items-center space-x-3 p-3 bg-viktoria-yellow/10 rounded-lg border border-viktoria-yellow/30">
                    <div className="w-8 h-8 bg-viktoria-yellow rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconClock size={16} className="text-viktoria-blue" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-600">
                        <span className="font-medium text-viktoria-blue">Schnelle Antwort:</span> Wir melden uns innerhalb von 24h zurück!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Kontaktformular - Kompakter */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30 shadow-sm">
                <div className="flex items-center mb-4">
                  <IconSend className="text-viktoria-blue mr-3" size={24} />
                  <h2 className="text-lg md:text-xl font-semibold text-viktoria-blue">Nachricht senden</h2>
                </div>
                
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Vorname *
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-viktoria-blue-light bg-white/90"
                        placeholder="Ihr Vorname"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Nachname *
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-viktoria-blue-light bg-white/90"
                        placeholder="Ihr Nachname"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-viktoria-blue-light bg-white/90"
                      placeholder="ihre.email@beispiel.de"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Betreff
                    </label>
                    <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-viktoria-blue-light bg-white/90">
                      <option>Allgemeine Anfrage</option>
                      <option>Mitgliedschaft</option>
                      <option>Jugendtraining</option>
                      <option>Sponsoring</option>
                      <option>Sonstiges</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Nachricht *
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-viktoria-blue-light bg-white/90 resize-none"
                      placeholder="Ihre Nachricht..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-viktoria-blue hover:bg-viktoria-blue-light text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <IconSend size={18} />
                    <span>Nachricht senden</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Vorstand - Kompakter */}
        <AnimatedSection className="px-4 py-6" delay={0.9}>
          <div className="container">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30 shadow-sm max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <IconUsers className="text-viktoria-blue mr-3" size={24} />
                <h2 className="text-lg md:text-xl font-semibold text-viktoria-blue">Vorstand</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-white/40 rounded-lg border border-white/20">
                  <h3 className="font-semibold text-viktoria-blue mb-1 text-sm md:text-base">1. Vorsitzender</h3>
                  <p className="text-gray-700 font-medium">Hans Mueller</p>
                  <p className="text-gray-600 text-xs md:text-sm break-all">vorsitzender@viktoria-wertheim.de</p>
                </div>
                <div className="text-center p-4 bg-white/40 rounded-lg border border-white/20">
                  <h3 className="font-semibold text-viktoria-blue mb-1 text-sm md:text-base">Kassenwart</h3>
                  <p className="text-gray-700 font-medium">Maria Schmidt</p>
                  <p className="text-gray-600 text-xs md:text-sm break-all">kasse@viktoria-wertheim.de</p>
                </div>
                <div className="text-center p-4 bg-white/40 rounded-lg border border-white/20">
                  <h3 className="font-semibold text-viktoria-blue mb-1 text-sm md:text-base">Jugendleiter</h3>
                  <p className="text-gray-700 font-medium">Thomas Wagner</p>
                  <p className="text-gray-600 text-xs md:text-sm break-all">jugend@viktoria-wertheim.de</p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
      <MobileNav />
    </div>
  )
} 