'use client'

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import PageLayout from '@/components/PageLayout'
import GameCards from '@/components/GameCards'
import LeagueTable from '@/components/LeagueTable'
import NewsModal from '@/components/NewsModal'
import NewsTicker from '@/components/NewsTicker'
import TeamStatus from '@/components/TeamStatus'
import { IconCalendar, IconClock, IconMapPin, IconTrophy, IconUsers } from '@tabler/icons-react'
import { NewsArtikel, Spieler } from '@/types/strapi'
import { strapi } from '@/lib/strapi'

// Dynamic Import für animierte Komponenten - löst SSR-Probleme
const AnimatedSection = dynamic(
  () => import('@/components/AnimatedSection'),
  { ssr: false }
)

const AnimatedDiv = dynamic(
  () => import('@/components/AnimatedSection').then(mod => ({ default: mod.AnimatedDiv })),
  { ssr: false }
)

// Mock data als stabile Konstanten außerhalb der Komponente
const mockTopScorers: Spieler[] = [
  {
    id: 1,
    attributes: {
      vorname: 'Okan',
      nachname: 'Cirakoglu',
      position: 'Sturm',
      rueckennummer: 9,
      tore: 19,
      spiele: 16,
      publishedAt: '2024-01-01T00:00:00.000Z',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z'
    }
  },
  {
    id: 2,
    attributes: {
      vorname: 'Silas',
      nachname: 'Jacob',
      position: 'Sturm',
      rueckennummer: 11,
      tore: 15,
      spiele: 18,
      publishedAt: '2024-01-01T00:00:00.000Z',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z'
    }
  },
  {
    id: 3,
    attributes: {
      vorname: 'Justin',
      nachname: 'Schulz',
      position: 'Mittelfeld',
      rueckennummer: 8,
      tore: 12,
      spiele: 17,
      publishedAt: '2024-01-01T00:00:00.000Z',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z'
    }
  },
  {
    id: 4,
    attributes: {
      vorname: 'Marco',
      nachname: 'Klein',
      position: 'Sturm',
      rueckennummer: 10,
      tore: 11,
      spiele: 18,
      publishedAt: '2024-01-01T00:00:00.000Z',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z'
    }
  },
  {
    id: 5,
    attributes: {
      vorname: 'David',
      nachname: 'Bauer',
      position: 'Mittelfeld',
      rueckennummer: 7,
      tore: 10,
      spiele: 16,
      publishedAt: '2024-01-01T00:00:00.000Z',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z'
    }
  }
]

const mockNewsArticles: NewsArtikel[] = [
  {
    id: 1,
    attributes: {
      titel: "Viktoria Wertheim gewinnt Derby mit 3:1",
      inhalt: "Ein spannendes Spiel endete mit einem verdienten Sieg für unsere Mannschaft gegen FC Eichel. Die Tore fielen durch Okan Cirakoglu (2x) und Marco Schneider. Das Team zeigte eine starke Leistung vor heimischem Publikum.\n\nBereits in der 15. Minute ging Viktoria Wertheim durch einen Treffer von Okan Cirakoglu in Führung. Der Stürmer nutzte eine Flanke von der rechten Seite perfekt aus. FC Eichel kam zwar zum Ausgleich, aber die Antwort ließ nicht lange auf sich warten.\n\nIn der zweiten Halbzeit dominierte Viktoria das Spiel und belohnte sich mit zwei weiteren Treffern. Besonders die Defensive stand sicher und ließ kaum Chancen zu.",
      datum: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      kategory: {
        data: {
          id: 1,
          attributes: {
            name: "Spielberichte"
          }
        }
      },
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  },
  {
    id: 2,
    attributes: {
      titel: "Neuer Trainer für die Jugend verpflichtet",
      inhalt: "Mit Marco Schneider konnte ein erfahrener Trainer für unsere A-Jugend gewonnen werden. Der 42-jährige bringt jahrelange Erfahrung im Nachwuchsbereich mit.\n\nSchneider war zuletzt beim TSV Tauberbischofsheim tätig und führte dort die A-Jugend zum Aufstieg in die Bezirksliga. Seine Philosophie: 'Jeder Spieler soll individuell gefördert werden, aber der Teamgedanke steht immer im Vordergrund.'\n\nDie erste Trainingseinheit ist für den 15. Januar geplant. Alle Spieler der A-Jugend sind herzlich eingeladen.",
      datum: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      kategory: {
        data: {
          id: 2,
          attributes: {
            name: "Vereinsnews"
          }
        }
      },
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  },
  {
    id: 3,
    attributes: {
      titel: "Winterpause: Training startet am 15. Januar",
      inhalt: "Nach der wohlverdienten Winterpause beginnt das Training für alle Mannschaften wieder am 15. Januar. Die Vorbereitung auf die Rückrunde startet mit einem Fitnesstest.\n\nTrainer Hans Müller hat bereits einen detaillierten Trainingsplan erstellt: 'Wir werden sowohl an der Kondition als auch an der Taktik arbeiten. Die Winterpause war wichtig, aber jetzt geht es wieder richtig los.'\n\nDas erste Testspiel ist für den 25. Januar gegen den SV Königshofen geplant. Alle Fans sind herzlich eingeladen.",
      datum: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      kategory: {
        data: {
          id: 3,
          attributes: {
            name: "Training"
          }
        }
      },
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  }
]

export default function HomePage() {
  const [selectedArticle, setSelectedArticle] = useState<NewsArtikel | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [topScorers, setTopScorers] = useState<Spieler[]>([])
  const [newsArticles, setNewsArticles] = useState<NewsArtikel[]>([])
  const [loading, setLoading] = useState(true)

  // Mock data wurde als stabile Konstanten außerhalb der Komponente definiert

  // Mock data wurde als stabile Konstanten außerhalb der Komponente definiert

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Fetch top scorers (sorted by goals)
        const [playersResponse, newsResponse] = await Promise.all([
          strapi.get('/spielers', {
            params: {
              populate: ['foto', 'mannschaft'],
              sort: ['tore:desc'],
              pagination: {
                limit: 5
              }
            }
          }),
          strapi.get('/news-artikels', {
            params: {
              populate: ['titelbild', 'kategory'],
              sort: ['datum:desc'],
              pagination: {
                limit: 3
              }
            }
          })
        ])

        // Use API data if available, otherwise use mock data
        const apiPlayers = playersResponse.data.data || []
        const apiNews = newsResponse.data.data || []
        
        setTopScorers(apiPlayers.length > 0 ? apiPlayers : mockTopScorers)
        setNewsArticles(apiNews.length > 0 ? apiNews : mockNewsArticles)
      } catch (err) {
        console.error('Error fetching homepage data, using mock data:', err)
        // Use mock data as fallback
        setTopScorers(mockTopScorers)
        setNewsArticles(mockNewsArticles)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const openModal = (article: NewsArtikel) => {
    setSelectedArticle(article)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedArticle(null)
  }

  return (
    <PageLayout>
      <div className="space-y-3 md:space-y-4">
        {/* News Ticker Section */}
        <div className="mt-2 md:mt-0">
          <NewsTicker onNewsClick={openModal} />
        </div>
        
        {/* Team Status Section */}
        <AnimatedSection className="px-4 md:px-6 py-2 md:py-3" delay={0.1}>
          <TeamStatus />
        </AnimatedSection>
        {/* Game Cards Section */}
        <AnimatedSection className="px-4 md:px-6 py-2 md:py-3" delay={0.15}>
          <GameCards />
        </AnimatedSection>
        {/* League Table Section */}
        <AnimatedSection className="px-4 md:px-6 py-2 md:py-3" delay={0.18}>
          <LeagueTable />
        </AnimatedSection>
        {/* Top Scorers & News Section - 2 Column Layout on Desktop */}
        <AnimatedSection className="px-4 md:px-6 py-2 md:py-3" delay={0.2}>
          <div className="container max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              {/* Top Scorers Column */}
              <div className="space-y-3 md:space-y-4">
                                  <h2 className="text-sm md:text-lg font-semibold text-gray-600 uppercase tracking-wide mb-2 md:mb-3 text-center">
                    Torschützen König
                  </h2>
                <div 
                  className="bg-white/40 backdrop-blur-sm rounded-xl md:rounded-2xl border border-white/20 overflow-hidden cursor-pointer hover:bg-white/50 transition-all duration-300 md:shadow-lg md:hover:shadow-xl"
                >
                  {/* Header */}
                  <div className="bg-white/20 px-4 md:px-6 py-3 border-b border-white/20">
                    <div className="grid grid-cols-12 gap-2 md:gap-4 text-xs md:text-sm font-medium text-gray-600 uppercase tracking-wide">
                      <div className="col-span-1">#</div>
                      <div className="col-span-7">Spieler</div>
                      <div className="col-span-2 text-center">Spiele</div>
                      <div className="col-span-2 text-center font-bold">Tore</div>
                    </div>
                  </div>
                  {/* Top Scorers Content */}
                  <div className="divide-y divide-white/10 py-2 md:py-3">
                    {/* Torschützenkönig - Modernes Design mit Hintergrundbild */}
                    <div className="relative overflow-hidden rounded-xl md:rounded-2xl transition-all duration-300 hover:shadow-xl md:hover:shadow-2xl cursor-pointer group h-full flex flex-col shadow-lg mb-2 md:mb-4">
                      {/* Overlay für Lesbarkeit - Header-Hintergrund */}
                      <div className="absolute inset-0 backdrop-blur-[0.5px] z-0 header-gradient"></div>
                      
                      {/* Leichter Glow um den Spieler */}
                      <div className="absolute inset-0 z-5" style={{background: 'radial-gradient(circle at center, rgba(254, 240, 138, 0.05) 0%, transparent 60%)'}}></div>
                      
                      {/* Subtile Holo-Effekte */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-viktoria-yellow/8 to-transparent animate-shimmer-slow z-0"></div>
                      
                      {/* Hintergrundbild */}
                      <div 
                        className="absolute inset-0 bg-contain bg-center bg-no-repeat z-10"
                        style={{
                          backgroundImage: "url('/Okan_normal.png')",
                          filter: 'drop-shadow(4px 4px 12px rgba(0,0,0,0.6))'
                        }}
                      ></div>
                      
                      <div className="relative z-20 px-4 md:px-6 py-4 md:py-6 flex-1 flex flex-col justify-center">
                        <div className="grid grid-cols-12 gap-2 md:gap-4 items-center mb-6 md:mb-8">
                          {/* Spieler Name */}
                          <div className="col-span-8">
                            <span className="text-white font-semibold text-2xl md:text-4xl leading-tight drop-shadow-2xl" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.8)'}}>
                              <span className="font-light">{topScorers[0]?.attributes.vorname || 'Okan'}</span><br/>
                              <span className="font-bold">{topScorers[0]?.attributes.nachname || 'Cirakoglu'}</span>
                            </span>
                          </div>

                          {/* Spiele */}
                          <div className="col-span-2 text-center text-base md:text-lg text-viktoria-yellow font-medium drop-shadow">
                            {topScorers[0]?.attributes.spiele || 16}
                          </div>

                          {/* Tore */}
                          <div className="col-span-2 text-center">
                            <span className="font-bold text-viktoria-yellow text-xl md:text-2xl drop-shadow-lg">
                              {topScorers[0]?.attributes.tore || 19}
                            </span>
                          </div>
        </div>

                        {/* Zusätzliche Stats - erweitert */}
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-6">
                          <div className="text-center">
                            <div className="text-viktoria-yellow font-bold text-base md:text-lg drop-shadow">
                              {topScorers[0] ? (topScorers[0].attributes.tore / topScorers[0].attributes.spiele).toFixed(2) : '1.19'}
                            </div>
                            <div className="text-white/90 text-sm md:text-base drop-shadow">Tore/Spiel</div>
                          </div>
                          <div className="text-center">
                            <div className="text-viktoria-yellow font-bold text-base md:text-lg drop-shadow">
                              {topScorers[0]?.attributes.rueckennummer || 9}
                            </div>
                            <div className="text-white/90 text-sm md:text-base drop-shadow">
                              {topScorers[0]?.attributes.position || 'Stürmer'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Plätze 2-5 */}
                    {topScorers.slice(1).map((player, index) => (
                      <div key={player.id} className="px-4 md:px-6 py-2.5 md:py-3 transition-all duration-300 hover:bg-white/30 mb-2 md:mb-4">
                        <div className="grid grid-cols-12 gap-2 md:gap-4 items-center">
                          <div className="col-span-1 flex items-center">
                            <span className="font-bold text-sm md:text-lg text-gray-600">{index + 2}.</span>
                          </div>
                          <div className="col-span-7">
                            <span className="text-sm md:text-base text-gray-700 font-medium">
                              <span className="font-light">{player.attributes.vorname}</span>{' '}
                              <span className="font-semibold">{player.attributes.nachname}</span>
                            </span>
                          </div>
                          <div className="col-span-2 text-center text-sm md:text-base text-gray-600">
                            {player.attributes.spiele}
                          </div>
                          <div className="col-span-2 text-center">
                            <span className="font-bold text-sm md:text-base text-gray-600">
                              {player.attributes.tore}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Latest News Column */}
                              <div className="space-y-3 md:space-y-4">
                                  <h2 className="text-sm md:text-lg font-semibold text-gray-600 uppercase tracking-wide mb-2 md:mb-3 text-center">
                    Neueste Nachrichten
                  </h2>
                <div className="space-y-3 md:space-y-4">
                  {newsArticles.slice(0, 3).map((article, index) => {
                    const timeAgo = new Date(article.attributes.datum).toLocaleDateString('de-DE')
                    const icon = index === 0 ? IconTrophy : index === 1 ? IconUsers : IconCalendar
                    
                    return (
                      <AnimatedDiv 
                        key={article.id}
                        className="bg-white/40 backdrop-blur-sm rounded-lg md:rounded-xl border border-white/20 p-3 md:p-6 cursor-pointer hover:bg-white/50 transition-all duration-300 md:shadow-lg md:hover:shadow-xl mb-2 md:mb-4"
                        direction="left"
                        delay={0.4 + index * 0.1}
                      >
                        <div className="flex items-center justify-between" onClick={() => openModal(article)}>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-800 text-sm md:text-base mb-1 md:mb-2">
                              {article.attributes.titel}
                            </h3>
                            <p className="text-xs md:text-sm text-gray-600 line-clamp-2 mb-1 md:mb-2">
                              {typeof article.attributes.inhalt === 'string' 
                                ? article.attributes.inhalt.substring(0, 100) + '...'
                                : 'Artikel ansehen...'}
                            </p>
                            <div className="text-xs md:text-sm text-gray-500">
                              {timeAgo}
                            </div>
                          </div>
                          <div className="w-12 h-12 md:w-16 md:h-16 bg-viktoria-blue-light rounded-lg md:rounded-xl flex-shrink-0 ml-3 md:ml-6 flex items-center justify-center">
                            {React.createElement(icon, { size: 20, className: "md:w-8 md:h-8 text-viktoria-yellow" })}
                          </div>
                        </div>
                      </AnimatedDiv>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
        {/* Sponsors Section */}
        <AnimatedSection className="px-4 md:px-6 py-2 md:py-3" delay={0.5}>
          <div className="container max-w-6xl">
                          <h2 className="text-sm md:text-lg font-semibold text-gray-600 uppercase tracking-wide mb-2 md:mb-3 text-center">
                Unsere Sponsoren
              </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {[1, 2, 3, 4].map((i) => (
                <AnimatedDiv 
                  key={i} 
                  className="bg-white/40 backdrop-blur-sm rounded-lg md:rounded-xl border border-white/20 p-4 md:p-6 flex items-center justify-center cursor-pointer hover:bg-white/50 transition-all duration-300 md:shadow-lg md:hover:shadow-xl min-h-[80px] md:min-h-[120px]"
                  delay={0.6 + i * 0.1}
                >
                  <div className="w-20 h-12 md:w-28 md:h-16 bg-gray-200 rounded md:rounded-lg"></div>
                </AnimatedDiv>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
      {/* News Modal */}
      <NewsModal 
        article={selectedArticle}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </PageLayout>
  )
} 