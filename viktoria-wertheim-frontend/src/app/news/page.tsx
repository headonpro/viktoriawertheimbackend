'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import MobileNav from '@/components/MobileNav'
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
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-8 pb-6">
          <AnimatedSection className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-700 mx-auto mb-4"></div>
              <p className="text-gray-600">Nachrichten werden geladen...</p>
            </div>
          </AnimatedSection>
        </main>
        <MobileNav />
      </div>
    )
  }

  // Error state - removed since we use fallback data

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Header Section - direkt unter der Navbar */}
      <div className="pt-[140px] md:pt-[80px]">
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
          {/* Category Filter */}
        <AnimatedSection delay={0.2}>
          <div className="mb-6">
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
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 py-2 z-10">
                    <button
                      onClick={() => {
                        setSelectedCategory('Alle')
                        setIsDropdownOpen(false)
                      }}
                      className={`w-full px-4 py-2 text-left text-sm font-medium hover:bg-white/50 transition-colors ${
                        selectedCategory === 'Alle'
                          ? 'bg-viktoria-yellow/30 text-gray-800'
                          : 'text-gray-700'
                      }`}
                    >
                      Alle
                    </button>
                    
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.attributes.name)
                          setIsDropdownOpen(false)
                        }}
                        className={`w-full px-4 py-2 text-left text-sm font-medium hover:bg-white/50 transition-colors ${
                          selectedCategory === category.attributes.name
                            ? 'bg-viktoria-yellow/30 text-gray-800'
                            : 'text-gray-700'
                        }`}
                      >
                        {category.attributes.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* News Articles Grid */}
        <AnimatedSection delay={0.3}>
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                {selectedCategory === 'Alle' 
                  ? 'Keine News-Artikel gefunden' 
                  : `Keine Artikel in der Kategorie "${selectedCategory}" gefunden`}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div 
                    className="bg-white/40 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden hover:bg-white/50 transition-all duration-300 group-hover:border-viktoria-yellow/50 cursor-pointer"
                    onClick={() => openArticleModal(article.id)}
                  >
                    {/* Image */}
                    <div className="relative h-32 bg-gradient-to-br from-viktoria-blue-light to-viktoria-blue overflow-hidden">
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
                            <div className="w-12 h-12 bg-viktoria-yellow/20 rounded-full flex items-center justify-center mx-auto mb-1">
                              <IconEye className="w-6 h-6 text-viktoria-yellow" />
                            </div>
                            <p className="text-xs text-viktoria-yellow/80">SV Viktoria Wertheim</p>
                          </div>
                        </div>
                      )}
                      
                      {/* Category Badge */}
                      {article.attributes.kategory?.data && (
                        <div className="absolute top-2 left-2">
                          <span className="bg-viktoria-yellow text-gray-800 text-xs px-2 py-1 rounded-full backdrop-blur-sm font-medium">
                            {article.attributes.kategory.data.attributes.name}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-3 space-y-2">
                      {/* Date */}
                      <div className="flex items-center text-xs text-gray-500">
                        <IconClock className="w-3 h-3 mr-1" />
                        <span>
                          {new Date(article.attributes.datum).toLocaleDateString('de-DE', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                          })}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-sm font-bold text-gray-700 group-hover:text-gray-600 transition-colors line-clamp-2 leading-tight">
                        {article.attributes.titel}
                      </h3>

                      {/* Content Preview */}
                      <p className="text-gray-600 line-clamp-2 text-xs leading-relaxed">
                        {typeof article.attributes.inhalt === 'string' 
                          ? article.attributes.inhalt 
                          : 'Artikel ansehen...'}
                      </p>

                      {/* Read More */}
                      <div className="flex items-center text-gray-600 group-hover:text-viktoria-blue transition-colors pt-1">
                        <span className="text-xs font-medium">Weiterlesen</span>
                        <IconArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
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
      
      <MobileNav />
    </div>
  )
} 