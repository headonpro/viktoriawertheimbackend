'use client'

import PageLayout from '@/components/PageLayout'
import dynamic from 'next/dynamic'
import { IconMail, IconPhone, IconMapPin, IconClock, IconUsers, IconSend, IconMessageCircle, IconCalendar, IconTrophy, IconMap2, IconBrandFacebook, IconBrandInstagram } from '@tabler/icons-react'

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
    <PageLayout>


      {/* Mobile Description */}
      <AnimatedSection className="px-4 pt-6 pb-4 lg:hidden" delay={0.2}>
        <div className="container">
          <div className="text-center">
            <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto">
              Haben Sie Fragen oder möchten Sie Kontakt mit uns aufnehmen? 
              Wir freuen uns auf Ihre Nachricht!
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Desktop Intro Section */}
      <div className="hidden lg:block pt-8">
        <AnimatedSection delay={0.2}>
          <div className="container text-center">
            <h2 className="text-2xl font-bold text-viktoria-blue mb-4">Ihre Verbindung zu uns</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Ob Fragen zur Mitgliedschaft, Jugendtraining oder allgemeine Anliegen - 
              wir sind für Sie da und freuen uns auf den Kontakt!
            </p>
          </div>
        </AnimatedSection>
      </div>

      {/* Contact Cards */}
      <AnimatedSection className="px-4 py-4" delay={0.3}>
        <div className="container">
          {/* Mobile: 2x2 Grid (unchanged) */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:hidden gap-3 md:gap-4">
            {/* Mobile Adresse */}
            <AnimatedDiv 
              className="bg-white/40 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/50 transition-all duration-300 group"
              delay={0.4}
            >
              <div className="text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-viktoria-blue rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform duration-300">
                  <IconMapPin size={20} className="text-viktoria-yellow md:text-xl" />
                </div>
                <h3 className="text-sm md:text-base font-semibold text-viktoria-blue mb-2">Adresse</h3>
                <div className="text-gray-600 text-xs md:text-sm space-y-0.5">
                  <p>Sportstraße 1</p>
                  <p>97877 Wertheim</p>
                </div>
              </div>
            </AnimatedDiv>

            {/* Mobile Telefon */}
            <AnimatedDiv 
              className="bg-white/40 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/50 transition-all duration-300 group"
              delay={0.5}
            >
              <div className="text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-viktoria-blue rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform duration-300">
                  <IconPhone size={20} className="text-viktoria-yellow md:text-xl" />
                </div>
                <h3 className="text-sm md:text-base font-semibold text-viktoria-blue mb-2">Telefon</h3>
                <div className="text-gray-600 text-xs md:text-sm space-y-0.5">
                  <p>(09342) 123-456</p>
                  <p className="text-xs">Mo-Fr: 18-20h</p>
                </div>
              </div>
            </AnimatedDiv>

            {/* Mobile Email */}
            <AnimatedDiv 
              className="bg-white/40 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/50 transition-all duration-300 group"
              delay={0.6}
            >
              <div className="text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-viktoria-blue rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform duration-300">
                  <IconMail size={20} className="text-viktoria-yellow md:text-xl" />
                </div>
                <h3 className="text-sm md:text-base font-semibold text-viktoria-blue mb-2">Email</h3>
                <div className="text-gray-600 text-xs md:text-sm space-y-0.5">
                  <p className="break-all">info@viktoria-wertheim.de</p>
                </div>
              </div>
            </AnimatedDiv>

            {/* Mobile Training */}
            <AnimatedDiv 
              className="bg-white/40 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/50 transition-all duration-300 group"
              delay={0.7}
            >
              <div className="text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-viktoria-blue rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform duration-300">
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

          {/* Desktop: Enhanced 4-column Grid */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-6">
            {/* Desktop Adresse */}
            <AnimatedDiv 
              className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/40 hover:bg-white/60 transition-all duration-300 group md:shadow-lg md:hover:shadow-xl"
              delay={0.4}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-viktoria-blue to-viktoria-blue-light rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconMapPin size={24} className="text-viktoria-yellow" />
                </div>
                <h3 className="text-lg font-bold text-viktoria-blue mb-3">Vereinsheim</h3>
                <div className="text-gray-600 space-y-1">
                  <p className="font-medium">Sportstraße 1</p>
                  <p className="font-medium">97877 Wertheim</p>
                  <p className="text-sm text-viktoria-blue mt-2">Hauptgebäude</p>
                </div>
                <div className="mt-4 pt-4 border-t border-white/30">
                  <div className="bg-white/40 rounded-lg p-3 border border-white/30">
                    <p className="text-xs text-gray-500 mb-1">Öffnungszeiten:</p>
                    <p className="text-sm text-viktoria-blue font-medium">Mo-Fr: 18-22h</p>
                    <p className="text-sm text-viktoria-blue font-medium">Sa: 10-22h</p>
                  </div>
                </div>
              </div>
            </AnimatedDiv>

            {/* Desktop Telefon */}
            <AnimatedDiv 
              className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/40 hover:bg-white/60 transition-all duration-300 group md:shadow-lg md:hover:shadow-xl"
              delay={0.5}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-viktoria-blue to-viktoria-blue-light rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconPhone size={24} className="text-viktoria-yellow" />
                </div>
                <h3 className="text-lg font-bold text-viktoria-blue mb-3">Telefon</h3>
                <div className="text-gray-600 space-y-1">
                  <a href="tel:+4993421234" className="font-medium text-viktoria-blue hover:underline block text-lg">
                    (09342) 123-456
                  </a>
                  <p className="text-sm">Vereinsleitung</p>
                </div>
                <div className="mt-4 pt-4 border-t border-white/30">
                  <div className="bg-white/40 rounded-lg p-3 border border-white/30">
                    <p className="text-xs text-gray-500 mb-1">Erreichbar:</p>
                    <p className="text-sm text-viktoria-blue font-medium">Mo-Fr: 18-20h</p>
                    <p className="text-sm text-viktoria-blue font-medium">Sa: 10-12h</p>
                  </div>
                </div>
              </div>
            </AnimatedDiv>

            {/* Desktop Email */}
            <AnimatedDiv 
              className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/40 hover:bg-white/60 transition-all duration-300 group md:shadow-lg md:hover:shadow-xl"
              delay={0.6}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-viktoria-blue to-viktoria-blue-light rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconMail size={24} className="text-viktoria-yellow" />
                </div>
                <h3 className="text-lg font-bold text-viktoria-blue mb-3">E-Mail</h3>
                <div className="text-gray-600 space-y-1">
                  <a href="mailto:info@viktoria-wertheim.de" className="font-medium text-viktoria-blue hover:underline block break-all">
                    info@viktoria-wertheim.de
                  </a>
                  <p className="text-sm">Hauptkontakt</p>
                </div>
                <div className="mt-4 pt-4 border-t border-white/30">
                  <div className="bg-white/40 rounded-lg p-3 border border-white/30">
                    <p className="text-xs text-gray-500 mb-1">Antwortzeit:</p>
                    <p className="text-sm text-viktoria-blue font-medium">{"< 24 Stunden"}</p>
                    <p className="text-xs text-gray-500">Garantiert schnell</p>
                  </div>
                </div>
              </div>
            </AnimatedDiv>

            {/* Desktop Training */}
            <AnimatedDiv 
              className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/40 hover:bg-white/60 transition-all duration-300 group md:shadow-lg md:hover:shadow-xl"
              delay={0.7}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-viktoria-blue to-viktoria-blue-light rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconClock size={24} className="text-viktoria-yellow" />
                </div>
                <h3 className="text-lg font-bold text-viktoria-blue mb-3">Training</h3>
                <div className="text-gray-600 space-y-1">
                  <p className="font-medium">Dienstag: 19:00h</p>
                  <p className="font-medium">Donnerstag: 19:00h</p>
                  <p className="font-medium">Samstag: 15:00h</p>
                </div>
                <div className="mt-4 pt-4 border-t border-white/30">
                  <div className="bg-white/40 rounded-lg p-3 border border-white/30">
                    <p className="text-xs text-gray-500 mb-1">Testtraining:</p>
                    <p className="text-sm text-viktoria-blue font-medium">Jederzeit möglich</p>
                    <p className="text-xs text-gray-500">Einfach kommen!</p>
                  </div>
                </div>
              </div>
            </AnimatedDiv>
          </div>
        </div>
      </AnimatedSection>

      {/* Main Content Section */}
      <AnimatedSection className="px-4 py-6" delay={0.8}>
        <div className="container">
          {/* Mobile: 2-column Layout (unchanged) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-4">
            {/* Mobile Kontaktdetails */}
            <div className="bg-white/40 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/50 transition-all duration-300">
              <div className="flex items-center mb-5">
                <div className="w-10 h-10 bg-viktoria-blue rounded-lg flex items-center justify-center mr-3">
                  <IconMessageCircle className="text-viktoria-yellow" size={20} />
                </div>
                <h2 className="text-lg font-semibold text-viktoria-blue">Kontaktdetails</h2>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  {/* Mobile Adresse */}
                  <div className="flex items-center space-x-3 p-3 bg-white/40 rounded-lg border border-white/30">
                    <div className="w-8 h-8 bg-viktoria-blue rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconMapPin size={16} className="text-viktoria-yellow" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-viktoria-blue">Sportstraße 1, 97877 Wertheim</p>
                    </div>
                  </div>

                  {/* Mobile Telefon */}
                  <div className="flex items-center space-x-3 p-3 bg-white/40 rounded-lg border border-white/30">
                    <div className="w-8 h-8 bg-viktoria-blue rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconPhone size={16} className="text-viktoria-yellow" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-viktoria-blue">(09342) 123-456</p>
                      <p className="text-xs text-gray-500">Mo-Fr: 18-20h, Sa: 10-12h</p>
                    </div>
                  </div>

                  {/* Mobile Email */}
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

                {/* Mobile Weitere Kontakte */}
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

                {/* Mobile Service Info */}
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

            {/* Mobile Kontaktformular */}
            <div className="bg-white/40 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/50 transition-all duration-300">
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

          {/* Desktop: Enhanced 3-column Layout */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-8">
            {/* Enhanced Contact Details */}
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-8 border border-white/40 hover:bg-white/60 transition-all duration-300 md:shadow-lg md:hover:shadow-xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-viktoria-blue rounded-xl flex items-center justify-center mr-4">
                  <IconMessageCircle className="text-viktoria-yellow" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-viktoria-blue">Kontakt</h2>
              </div>
              
              <div className="space-y-6">
                {/* Hauptkontakt */}
                <div className="p-4 bg-gradient-to-r from-viktoria-blue/5 to-viktoria-yellow/5 rounded-xl border border-viktoria-blue/20">
                  <h3 className="font-semibold text-viktoria-blue mb-4">Hauptkontakt</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <IconMapPin size={18} className="text-viktoria-blue flex-shrink-0" />
                      <span className="text-gray-700">Sportstraße 1, 97877 Wertheim</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <IconPhone size={18} className="text-viktoria-blue flex-shrink-0" />
                      <a href="tel:+4993421234" className="text-viktoria-blue hover:underline">(09342) 123-456</a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <IconMail size={18} className="text-viktoria-blue flex-shrink-0" />
                      <a href="mailto:info@viktoria-wertheim.de" className="text-viktoria-blue hover:underline break-all">
                        info@viktoria-wertheim.de
                      </a>
                    </div>
                  </div>
                </div>

                {/* Fachbereiche */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-viktoria-blue">Fachbereiche</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-white/40 rounded-lg border border-white/30 hover:bg-white/50 transition-colors md:shadow-sm">
                      <div className="font-medium text-viktoria-blue text-sm">Jugendarbeit</div>
                      <a href="mailto:jugend@viktoria-wertheim.de" className="text-gray-600 text-sm hover:text-viktoria-blue">
                        jugend@viktoria-wertheim.de
                      </a>
                    </div>
                    <div className="p-3 bg-white/40 rounded-lg border border-white/30 hover:bg-white/50 transition-colors md:shadow-sm">
                      <div className="font-medium text-viktoria-blue text-sm">Fanshop & Merchandise</div>
                      <a href="mailto:shop@viktoria-wertheim.de" className="text-gray-600 text-sm hover:text-viktoria-blue">
                        shop@viktoria-wertheim.de
                      </a>
                    </div>
                    <div className="p-3 bg-white/40 rounded-lg border border-white/30 hover:bg-white/50 transition-colors md:shadow-sm">
                      <div className="font-medium text-viktoria-blue text-sm">Sponsoring & Partnerschaft</div>
                      <a href="mailto:sponsoring@viktoria-wertheim.de" className="text-gray-600 text-sm hover:text-viktoria-blue">
                        sponsoring@viktoria-wertheim.de
                      </a>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="p-4 bg-gradient-to-r from-viktoria-yellow/10 to-viktoria-blue/10 rounded-xl border border-viktoria-yellow/30">
                  <h3 className="font-semibold text-viktoria-blue mb-3">Social Media</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="w-10 h-10 bg-viktoria-blue rounded-lg flex items-center justify-center hover:bg-viktoria-blue-light transition-colors group">
                      <IconBrandFacebook size={20} className="text-white group-hover:scale-110 transition-transform" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-viktoria-blue rounded-lg flex items-center justify-center hover:bg-viktoria-blue-light transition-colors group">
                      <IconBrandInstagram size={20} className="text-white group-hover:scale-110 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Contact Form */}
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-8 border border-white/40 hover:bg-white/60 transition-all duration-300 md:shadow-lg md:hover:shadow-xl">
              <div className="flex items-center mb-6">
                <IconSend className="text-viktoria-blue mr-4" size={28} />
                <h2 className="text-2xl font-bold text-viktoria-blue">Nachricht senden</h2>
              </div>
              
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vorname *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-viktoria-blue-light bg-white/90 transition-all duration-200"
                      placeholder="Ihr Vorname"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nachname *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-viktoria-blue-light bg-white/90 transition-all duration-200"
                      placeholder="Ihr Nachname"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-Mail Adresse *
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-viktoria-blue-light bg-white/90 transition-all duration-200"
                    placeholder="ihre.email@beispiel.de"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon (optional)
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-viktoria-blue-light bg-white/90 transition-all duration-200"
                    placeholder="Ihre Telefonnummer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Betreff
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-viktoria-blue-light bg-white/90 transition-all duration-200">
                    <option>Allgemeine Anfrage</option>
                    <option>Mitgliedschaft</option>
                    <option>Jugendtraining</option>
                    <option>Sponsoring</option>
                    <option>Vereinsveranstaltung</option>
                    <option>Sonstiges</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ihre Nachricht *
                  </label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-viktoria-blue-light bg-white/90 resize-none transition-all duration-200"
                    placeholder="Teilen Sie uns Ihr Anliegen mit..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-viktoria-blue hover:bg-viktoria-blue-light text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-3 group"
                >
                  <IconSend size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                  <span>Nachricht senden</span>
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Wir antworten in der Regel innerhalb von 24 Stunden
                </p>
              </form>
            </div>

            {/* Enhanced Map & Additional Info */}
            <div className="space-y-6">
              {/* Map Section */}
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/40 hover:bg-white/60 transition-all duration-300 md:shadow-lg md:hover:shadow-xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-viktoria-blue rounded-xl flex items-center justify-center mr-4">
                    <IconMap2 className="text-viktoria-yellow" size={24} />
                  </div>
                  <h2 className="text-xl font-bold text-viktoria-blue">Standort</h2>
                </div>
                
                <div className="bg-gray-100 rounded-xl h-48 mb-4 flex items-center justify-center border border-gray-200 overflow-hidden">
                  <div className="text-center">
                    <IconMapPin size={48} className="text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">Interaktive Karte</p>
                    <p className="text-sm text-gray-400">Wird in der finalen Version angezeigt</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-gradient-to-r from-viktoria-blue/5 to-viktoria-yellow/5 rounded-lg border border-viktoria-blue/20">
                    <h3 className="font-semibold text-viktoria-blue mb-2">Anfahrt</h3>
                    <p className="text-gray-600 text-sm">
                      Das Vereinsheim ist gut mit dem Auto und öffentlichen Verkehrsmitteln erreichbar. 
                      Kostenlose Parkplätze direkt am Sportplatz.
                    </p>
                  </div>

                  <div className="p-3 bg-gradient-to-r from-viktoria-yellow/5 to-viktoria-blue/5 rounded-lg border border-viktoria-yellow/20">
                    <h3 className="font-semibold text-viktoria-blue mb-2">Öffnungszeiten</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Montag - Freitag:</span>
                        <span className="text-viktoria-blue font-medium">18:00 - 22:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Samstag:</span>
                        <span className="text-viktoria-blue font-medium">10:00 - 22:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sonntag:</span>
                        <span className="text-viktoria-blue font-medium">Nach Absprache</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Facts */}
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/40 hover:bg-white/60 transition-all duration-300 md:shadow-lg md:hover:shadow-xl">
                <h3 className="text-lg font-bold text-viktoria-blue mb-4">Schnelle Fakten</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-viktoria-blue/5 rounded-lg border border-viktoria-blue/20 md:shadow-sm">
                    <div className="text-2xl font-bold text-viktoria-blue">{"< 24h"}</div>
                    <div className="text-xs text-gray-600">Antwortzeit</div>
                  </div>
                  <div className="text-center p-4 bg-viktoria-yellow/5 rounded-lg border border-viktoria-yellow/20 md:shadow-sm">
                    <div className="text-2xl font-bold text-viktoria-blue">365</div>
                    <div className="text-xs text-gray-600">Tage erreichbar</div>
                  </div>
                  <div className="text-center p-4 bg-viktoria-blue/5 rounded-lg border border-viktoria-blue/20 md:shadow-sm">
                    <div className="text-2xl font-bold text-viktoria-blue">5</div>
                    <div className="text-xs text-gray-600">Kontaktkanäle</div>
                  </div>
                  <div className="text-center p-4 bg-viktoria-yellow/5 rounded-lg border border-viktoria-yellow/20 md:shadow-sm">
                    <div className="text-2xl font-bold text-viktoria-blue">8</div>
                    <div className="text-xs text-gray-600">Ansprechpartner</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Board Section */}
      <AnimatedSection className="px-4 py-6" delay={0.9}>
        <div className="container">
          {/* Mobile Board (unchanged) */}
          <div className="bg-white/40 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/50 transition-all duration-300 max-w-4xl mx-auto lg:hidden">
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

          {/* Desktop Board - Enhanced */}
          <div className="hidden lg:block">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-viktoria-blue mb-4">Unser Vorstand</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Unsere engagierten Vorstandsmitglieder stehen Ihnen für alle Fragen zur Verfügung
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {/* 1. Vorsitzender */}
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/40 hover:bg-white/60 transition-all duration-300 text-center group md:shadow-lg md:hover:shadow-xl">
                <div className="w-16 h-16 bg-gradient-to-br from-viktoria-blue to-viktoria-blue-light rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconTrophy size={28} className="text-viktoria-yellow" />
                </div>
                <h3 className="text-xl font-bold text-viktoria-blue mb-2">1. Vorsitzender</h3>
                <p className="text-lg font-semibold text-gray-700 mb-4">Hans Mueller</p>
                <div className="space-y-2 mb-4">
                  <a href="mailto:vorsitzender@viktoria-wertheim.de" className="text-viktoria-blue hover:underline text-sm block">
                    vorsitzender@viktoria-wertheim.de
                  </a>
                  <a href="tel:+4993421234" className="text-viktoria-blue hover:underline text-sm block">
                    (09342) 123-456
                  </a>
                </div>
                <div className="p-3 bg-viktoria-blue/5 rounded-lg border border-viktoria-blue/20">
                  <p className="text-xs text-gray-600">
                    Verantwortlich für die strategische Ausrichtung und Vertretung des Vereins
                  </p>
                </div>
              </div>

              {/* Kassenwart */}
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/40 hover:bg-white/60 transition-all duration-300 text-center group md:shadow-lg md:hover:shadow-xl">
                <div className="w-16 h-16 bg-gradient-to-br from-viktoria-blue to-viktoria-blue-light rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconCalendar size={28} className="text-viktoria-yellow" />
                </div>
                <h3 className="text-xl font-bold text-viktoria-blue mb-2">Kassenwart</h3>
                <p className="text-lg font-semibold text-gray-700 mb-4">Maria Schmidt</p>
                <div className="space-y-2 mb-4">
                  <a href="mailto:kasse@viktoria-wertheim.de" className="text-viktoria-blue hover:underline text-sm block">
                    kasse@viktoria-wertheim.de
                  </a>
                  <a href="tel:+4993421235" className="text-viktoria-blue hover:underline text-sm block">
                    (09342) 123-457
                  </a>
                </div>
                <div className="p-3 bg-viktoria-yellow/5 rounded-lg border border-viktoria-yellow/20">
                  <p className="text-xs text-gray-600">
                    Zuständig für Finanzen, Mitgliedsbeiträge und Buchführung
                  </p>
                </div>
              </div>

              {/* Jugendleiter */}
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/40 hover:bg-white/60 transition-all duration-300 text-center group md:shadow-lg md:hover:shadow-xl">
                <div className="w-16 h-16 bg-gradient-to-br from-viktoria-blue to-viktoria-blue-light rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconUsers size={28} className="text-viktoria-yellow" />
                </div>
                <h3 className="text-xl font-bold text-viktoria-blue mb-2">Jugendleiter</h3>
                <p className="text-lg font-semibold text-gray-700 mb-4">Thomas Wagner</p>
                <div className="space-y-2 mb-4">
                  <a href="mailto:jugend@viktoria-wertheim.de" className="text-viktoria-blue hover:underline text-sm block">
                    jugend@viktoria-wertheim.de
                  </a>
                  <a href="tel:+4993421236" className="text-viktoria-blue hover:underline text-sm block">
                    (09342) 123-458
                  </a>
                </div>
                <div className="p-3 bg-viktoria-blue/5 rounded-lg border border-viktoria-blue/20">
                  <p className="text-xs text-gray-600">
                    Ansprechpartner für Jugendtraining und Nachwuchsförderung
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </PageLayout>
  )
} 