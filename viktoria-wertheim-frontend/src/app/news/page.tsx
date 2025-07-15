'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import PageLayout from '@/components/PageLayout'
import AnimatedSection from '@/components/AnimatedSection'
import NewsModal from '@/components/NewsModal'
import { IconClock, IconTag, IconEye, IconArrowRight, IconFilter, IconChevronDown } from '@tabler/icons-react'
import { strapi } from '@/lib/strapi'
import { NewsArtikel, Kategorie } from '@/types/strapi'
import Image from 'next/image'

// Mock data as fallback (moved outside component for stability)
const mockNewsArticles: NewsArtikel[] = [
    {
      id: 1,
      attributes: {
        titel: 'Viktoria Wertheim gewinnt Derby mit 3:1',
        inhalt: 'Ein spannendes Spiel endete mit einem verdienten Sieg für unsere Mannschaft. Die Tore fielen in der zweiten Halbzeit, als unser Team das Tempo erhöhte und die Kontrolle übernahm.\n\nDie Zuschauer sahen eine kämpferische Leistung und wurden mit einem tollen Fußballabend belohnt. Bereits in der 15. Minute gingen wir durch einen schönen Angriff über die rechte Seite in Führung.\n\nIn der zweiten Halbzeit erhöhten wir das Tempo und konnten durch zwei weitere Treffer den verdienten Sieg einfahren. Die Mannschaft zeigte eine geschlossene Leistung und kämpfte bis zur letzten Minute.',
        datum: '2024-12-08',
        kategory: {
          data: {
            id: 1,
            attributes: {
              name: 'Spielberichte'
            }
          }
        },
        publishedAt: '2024-12-08T10:00:00.000Z',
        createdAt: '2024-12-08T10:00:00.000Z',
        updatedAt: '2024-12-08T10:00:00.000Z'
      }
    },
    {
      id: 2,
      attributes: {
        titel: 'Neuer Trainer für die Jugend',
        inhalt: 'Ab sofort wird unser Jugendbereich von einem erfahrenen Trainer geleitet. Mit seiner langjährigen Erfahrung im Nachwuchsbereich wird er unsere jungen Talente optimal fördern und weiterentwickeln.\n\nDer neue Trainer bringt moderne Trainingsmethoden mit und legt großen Wert auf die individuelle Förderung der Spieler. Wir freuen uns auf die Zusammenarbeit und sind gespannt auf die Entwicklung unserer Nachwuchstalente.',
        datum: '2024-12-05',
        kategory: {
          data: {
            id: 2,
            attributes: {
              name: 'Vereinsnachrichten'
            }
          }
        },
        publishedAt: '2024-12-05T10:00:00.000Z',
        createdAt: '2024-12-05T10:00:00.000Z',
        updatedAt: '2024-12-05T10:00:00.000Z'
      }
    },
    {
      id: 3,
      attributes: {
        titel: 'Saisonrückblick 2024',
        inhalt: 'Die Saison 2024 war geprägt von vielen Höhepunkten und Erfolgen. Unser Team hat sich kontinuierlich verbessert und konnte wichtige Siege einfahren.\n\nBesonders stolz sind wir auf die Entwicklung unserer jungen Spieler, die sich perfekt in die Mannschaft integriert haben. Die Zusammenarbeit zwischen erfahrenen und jungen Spielern funktioniert hervorragend.\n\nWir blicken stolz auf die erreichten Leistungen zurück und freuen uns bereits auf die kommende Saison, in der wir an diese Erfolge anknüpfen möchten.',
        datum: '2024-12-01',
        kategory: {
          data: {
            id: 3,
            attributes: {
              name: 'Allgemein'
            }
          }
        },
        publishedAt: '2024-12-01T10:00:00.000Z',
        createdAt: '2024-12-01T10:00:00.000Z',
        updatedAt: '2024-12-01T10:00:00.000Z'
      }
    }
  ]

// Mock data for detailed articles (with full content)
const mockDetailedArticles: { [key: string]: NewsArtikel } = {
  '1': {
    id: 1,
    attributes: {
      titel: 'Viktoria Wertheim gewinnt Derby mit 3:1',
      inhalt: 'Ein spannendes Spiel endete mit einem verdienten Sieg für unsere Mannschaft. Die Tore fielen in der zweiten Halbzeit, als unser Team das Tempo erhöhte und die Kontrolle übernahm.\n\nDie Zuschauer sahen eine kämpferische Leistung und wurden mit einem tollen Fußballabend belohnt. Bereits in der 15. Minute gingen wir durch einen schönen Angriff über die rechte Seite in Führung.\n\nIn der zweiten Halbzeit erhöhten wir das Tempo und konnten durch zwei weitere Treffer den verdienten Sieg einfahren. Die Mannschaft zeigte eine geschlossene Leistung und kämpfte bis zur letzten Minute.',
      datum: '2024-12-08',
      kategory: {
        data: {
          id: 1,
          attributes: {
            name: 'Spielberichte'
          }
        }
      },
      publishedAt: '2024-12-08T10:00:00.000Z',
      createdAt: '2024-12-08T10:00:00.000Z',
      updatedAt: '2024-12-08T10:00:00.000Z'
    }
  },
  '2': {
    id: 2,
    attributes: {
      titel: 'Neuer Trainer für die Jugend',
      inhalt: 'Ab sofort wird unser Jugendbereich von einem erfahrenen Trainer geleitet. Mit seiner langjährigen Erfahrung im Nachwuchsbereich wird er unsere jungen Talente optimal fördern und weiterentwickeln.\n\nDer neue Trainer bringt moderne Trainingsmethoden mit und legt großen Wert auf die individuelle Förderung der Spieler. Wir freuen uns auf die Zusammenarbeit und sind gespannt auf die Entwicklung unserer Nachwuchstalente.',
      datum: '2024-12-05',
      kategory: {
        data: {
          id: 2,
          attributes: {
            name: 'Vereinsnachrichten'
          }
        }
      },
      publishedAt: '2024-12-05T10:00:00.000Z',
      createdAt: '2024-12-05T10:00:00.000Z',
      updatedAt: '2024-12-05T10:00:00.000Z'
    }
  },
  '3': {
    id: 3,
    attributes: {
      titel: 'Saisonrückblick 2024',
      inhalt: 'Die Saison 2024 war geprägt von vielen Höhepunkten und Erfolgen. Unser Team hat sich kontinuierlich verbessert und konnte wichtige Siege einfahren.\n\nBesonders stolz sind wir auf die Entwicklung unserer jungen Spieler, die sich perfekt in die Mannschaft integriert haben. Die Zusammenarbeit zwischen erfahrenen und jungen Spielern funktioniert hervorragend.\n\nWir blicken stolz auf die erreichten Leistungen zurück und freuen uns bereits auf die kommende Saison, in der wir an diese Erfolge anknüpfen möchten.',
      datum: '2024-12-01',
      kategory: {
        data: {
          id: 3,
          attributes: {
            name: 'Allgemein'
          }
        }
      },
      publishedAt: '2024-12-01T10:00:00.000Z',
      createdAt: '2024-12-01T10:00:00.000Z',
      updatedAt: '2024-12-01T10:00:00.000Z'
    }
  }
}

const mockCategories: Kategorie[] = [
  {
    id: 1,
    attributes: {
      name: 'Spielberichte',
      publishedAt: '2024-12-01T10:00:00.000Z',
      createdAt: '2024-12-01T10:00:00.000Z',
      updatedAt: '2024-12-01T10:00:00.000Z'
    }
  },
  {
    id: 2,
    attributes: {
      name: 'Vereinsnachrichten',
      publishedAt: '2024-12-01T10:00:00.000Z',
      createdAt: '2024-12-01T10:00:00.000Z',
      updatedAt: '2024-12-01T10:00:00.000Z'
    }
  },
  {
    id: 3,
    attributes: {
      name: 'Allgemein',
      publishedAt: '2024-12-01T10:00:00.000Z',
      createdAt: '2024-12-01T10:00:00.000Z',
      updatedAt: '2024-12-01T10:00:00.000Z'
    }
  }
]

export default function NewsPage() {
  const [newsArticles, setNewsArticles] = useState<NewsArtikel[]>([])
  const [categories, setCategories] = useState<Kategorie[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('Alle')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState<NewsArtikel | null>(null)
  const [articleLoading, setArticleLoading] = useState(false)

  // Fetch news articles and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Fetch news articles with category relation
        const [newsResponse, categoriesResponse] = await Promise.all([
          strapi.get('/news-artikels', {
            params: {
              populate: ['titelbild', 'kategory'],
              sort: ['datum:desc']
            }
          }),
          strapi.get('/kategories')
        ])

        // Use API data if available, otherwise use mock data
        const apiNewsArticles = newsResponse.data.data || []
        const apiCategories = categoriesResponse.data.data || []
        
        setNewsArticles(apiNewsArticles.length > 0 ? apiNewsArticles : mockNewsArticles)
        setCategories(apiCategories.length > 0 ? apiCategories : mockCategories)
      } catch (err) {
        console.error('Error fetching news, using mock data:', err)
        // Use mock data as fallback
        setNewsArticles(mockNewsArticles)
        setCategories(mockCategories)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.relative')) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isDropdownOpen])

  // Open article modal
  const openArticleModal = async (articleId: number) => {
    setArticleLoading(true)
    setIsModalOpen(true)
    
    try {
      // Try to fetch full article from API
      const response = await strapi.get(`/news-artikels/${articleId}`, {
        params: {
          populate: ['titelbild', 'kategory']
        }
      })
      
      const apiArticle = response.data.data
      setSelectedArticle(apiArticle || mockDetailedArticles[articleId.toString()] || null)
    } catch (err) {
      console.error('Error fetching article, using mock data:', err)
      // Use mock data as fallback
      setSelectedArticle(mockDetailedArticles[articleId.toString()] || null)
    } finally {
      setArticleLoading(false)
    }
  }

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedArticle(null)
  }

  // Filter articles by category
  const filteredArticles = selectedCategory === 'Alle' 
    ? newsArticles 
    : newsArticles.filter(article => 
        article.attributes.kategory?.data?.attributes.name === selectedCategory
      )

  // Loading state
  if (loading) {
    return (
      <PageLayout>
        <main className="pt-8 pb-6">
          <AnimatedSection className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-700 mx-auto mb-4"></div>
              <p className="text-gray-600">Nachrichten werden geladen...</p>
            </div>
          </AnimatedSection>
        </main>
      </PageLayout>
    )
  }

  // Error state - removed since we use fallback data

  return (
    <PageLayout>
      {/* Header Section - nur Mobile */}
      <div className="pt-[60px] md:pt-[20px] lg:hidden">
        <AnimatedSection delay={0.1}>
          <div className="w-full header-gradient py-6 shadow-lg">
            <div className="container">
              <h1 className="text-3xl md:text-4xl font-permanent-marker text-white text-center news-title">
                <span className="text-viktoria-yellow font-permanent-marker news-title">N</span>achrichten
              </h1>
            </div>
          </div>
        </AnimatedSection>
      </div>

      <main className="pt-8 pb-6">
        <div className="container space-y-8">
          
          {/* Mobile Category Filter - Dropdown (unchanged) */}
        <AnimatedSection delay={0.2}>
          <div className="mb-6 lg:hidden">
            <div className="flex justify-center">
              <div className="relative">
                {/* Dropdown Button */}
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-6 py-3 bg-viktoria-yellow rounded-full text-sm font-medium text-gray-800 hover:bg-viktoria-yellow/90 hover:shadow-md transition-all duration-200"
                >
                  <IconFilter className="w-4 h-4" />
                  <span>{selectedCategory}</span>
                  <IconChevronDown 
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isDropdownOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 min-w-[200px] z-10">
                    <div className="py-2">
                      {['Alle', ...categories.map(cat => cat.attributes.name)].map((category) => (
                        <button
                          key={category}
                          onClick={() => {
                            setSelectedCategory(category)
                            setIsDropdownOpen(false)
                          }}
                          className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                            selectedCategory === category 
                              ? 'text-viktoria-blue font-semibold' 
                              : 'text-gray-700'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Desktop Category Filter - Horizontal Buttons */}
          <div className="hidden lg:block mb-8">
            <div className="bg-white/40 backdrop-blur-sm rounded-2xl border border-white/30 p-6 md:shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">News-Kategorien</h2>
                <div className="text-sm text-gray-600">
                  {filteredArticles.length} {filteredArticles.length === 1 ? 'Artikel' : 'Artikel'}
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                {['Alle', ...categories.map(cat => cat.attributes.name)].map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-viktoria-blue text-white shadow-md'
                        : 'bg-white/60 text-gray-700 hover:bg-viktoria-blue/10 hover:text-viktoria-blue border border-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* News Articles Grid */}
        <AnimatedSection delay={0.3}>
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white/40 backdrop-blur-sm rounded-2xl border border-white/20 p-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconEye className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600 text-lg font-medium">
                  {selectedCategory === 'Alle' 
                    ? 'Keine News-Artikel gefunden' 
                    : `Keine Artikel in der Kategorie "${selectedCategory}" gefunden`}
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Versuchen Sie eine andere Kategorie oder schauen Sie später wieder vorbei.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Featured Article - Desktop Only */}
              {filteredArticles.length > 0 && (
                <div className="hidden lg:block mb-8">
                  <div className="bg-white/40 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden group hover:bg-white/50 transition-all duration-300 md:shadow-lg md:hover:shadow-xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                      {/* Featured Image */}
                      <div className="relative h-64 lg:h-80 bg-gradient-to-br from-viktoria-blue-light to-viktoria-blue overflow-hidden">
                        {filteredArticles[0].attributes.titelbild?.data ? (
                          <Image
                            src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${filteredArticles[0].attributes.titelbild.data.attributes.url}`}
                            alt={filteredArticles[0].attributes.titelbild.data.attributes.alternativeText || filteredArticles[0].attributes.titel}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="h-full flex items-center justify-center">
                            <div className="text-center">
                              <div className="w-20 h-20 bg-viktoria-yellow/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                <IconEye className="w-10 h-10 text-viktoria-yellow" />
                              </div>
                              <p className="text-viktoria-yellow font-semibold">SV Viktoria Wertheim</p>
                            </div>
                          </div>
                        )}
                        
                        {/* Featured Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="bg-viktoria-yellow text-gray-800 text-sm px-3 py-1 rounded-full font-semibold shadow-sm">
                            Featured
                          </span>
                        </div>

                        {/* Category Badge */}
                        {filteredArticles[0].attributes.kategory?.data && (
                          <div className="absolute top-4 right-4">
                            <span className="bg-white/90 text-gray-800 text-sm px-3 py-1 rounded-full font-medium backdrop-blur-sm">
                              {filteredArticles[0].attributes.kategory.data.attributes.name}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Featured Content */}
                      <div className="p-8 flex flex-col justify-center">
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <IconClock className="w-4 h-4 mr-2" />
                          <span>
                            {new Date(filteredArticles[0].attributes.datum).toLocaleDateString('de-DE', {
                              day: '2-digit',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </span>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-viktoria-blue transition-colors">
                          {filteredArticles[0].attributes.titel}
                        </h2>

                        <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                          {typeof filteredArticles[0].attributes.inhalt === 'string' 
                            ? filteredArticles[0].attributes.inhalt 
                            : 'Lesen Sie den vollständigen Artikel für alle Details...'}
                        </p>

                        <button
                          onClick={() => openArticleModal(filteredArticles[0].id)}
                          className="inline-flex items-center text-viktoria-blue font-semibold hover:text-viktoria-blue-light transition-colors group/btn"
                        >
                          <span>Artikel lesen</span>
                          <IconArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(filteredArticles.length > 1 ? filteredArticles.slice(1) : filteredArticles).map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                  >
                    <div 
                      className="bg-white/40 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden hover:bg-white/50 transition-all duration-300 group-hover:border-viktoria-yellow/50 cursor-pointer h-full flex flex-col md:shadow-lg md:hover:shadow-xl"
                      onClick={() => openArticleModal(article.id)}
                    >
                      {/* Image */}
                      <div className="relative h-40 lg:h-48 bg-gradient-to-br from-viktoria-blue-light to-viktoria-blue overflow-hidden flex-shrink-0">
                        {article.attributes.titelbild?.data ? (
                          <Image
                            src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${article.attributes.titelbild.data.attributes.url}`}
                            alt={article.attributes.titelbild.data.attributes.alternativeText || article.attributes.titel}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="h-full flex items-center justify-center">
                            <div className="text-center">
                              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-viktoria-yellow/20 rounded-full flex items-center justify-center mx-auto mb-2">
                                <IconEye className="w-6 h-6 lg:w-8 lg:h-8 text-viktoria-yellow" />
                              </div>
                              <p className="text-xs lg:text-sm text-viktoria-yellow/80">SV Viktoria Wertheim</p>
                            </div>
                          </div>
                        )}
                        
                        {/* Category Badge */}
                        {article.attributes.kategory?.data && (
                          <div className="absolute top-3 left-3">
                            <span className="bg-viktoria-yellow text-gray-800 text-xs lg:text-sm px-2 lg:px-3 py-1 rounded-full backdrop-blur-sm font-medium">
                              {article.attributes.kategory.data.attributes.name}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-4 lg:p-6 space-y-3 lg:space-y-4 flex-grow flex flex-col">
                        {/* Date */}
                        <div className="flex items-center text-xs lg:text-sm text-gray-500">
                          <IconClock className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                          <span>
                            {new Date(article.attributes.datum).toLocaleDateString('de-DE', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                            })}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-sm lg:text-base font-bold text-gray-700 group-hover:text-gray-600 transition-colors line-clamp-2 leading-tight flex-grow">
                          {article.attributes.titel}
                        </h3>

                        {/* Content Preview - Hidden on mobile, shown on desktop */}
                        <p className="hidden lg:block text-gray-600 line-clamp-2 text-sm leading-relaxed">
                          {typeof article.attributes.inhalt === 'string' 
                            ? article.attributes.inhalt 
                            : 'Artikel ansehen...'}
                        </p>

                        {/* Read More */}
                        <div className="flex items-center text-gray-600 group-hover:text-viktoria-blue transition-colors pt-2 mt-auto">
                          <span className="text-xs lg:text-sm font-medium">Weiterlesen</span>
                          <IconArrowRight className="w-3 h-3 lg:w-4 lg:h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </AnimatedSection>
        </div>
      </main>
      
      {/* News Modal */}
      <NewsModal
        article={selectedArticle}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </PageLayout>
  )
} 