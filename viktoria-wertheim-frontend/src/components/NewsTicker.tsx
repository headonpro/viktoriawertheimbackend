'use client'

import React, { useState, useEffect } from 'react'
import { NewsArtikel } from '@/types/strapi'
import { strapi } from '@/lib/strapi'

interface NewsTickerProps {
  onNewsClick?: (article: NewsArtikel) => void
}

// Mock news data als stabile Konstante außerhalb der Komponente
const mockNewsArticles: NewsArtikel[] = [
  {
    id: 1,
    attributes: {
      titel: "🏆 Derby-Sieg! Viktoria schlägt FC Eichel 3:1",
      inhalt: "Ein spannendes Derby endete mit einem verdienten Sieg...",
      datum: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      kategorie: {
        data: {
          id: 1,
          attributes: { name: "Spielberichte" }
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
      titel: "⚽ Winterpause beendet - Training startet am 15. Januar",
      inhalt: "Nach der wohlverdienten Winterpause beginnt das Training...",
      datum: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      kategorie: {
        data: {
          id: 2,
          attributes: { name: "Training" }
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
      titel: "👨‍💼 Neuer A-Jugend Trainer Marco Schneider verpflichtet",
      inhalt: "Mit Marco Schneider konnte ein erfahrener Trainer gewonnen werden...",
      datum: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      kategorie: {
        data: {
          id: 3,
          attributes: { name: "Vereinsnews" }
        }
      },
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  },
  {
    id: 4,
    attributes: {
      titel: "🎯 Neuzugang: Max Müller verstärkt die Offensive",
      inhalt: "Ein neuer Stürmer verstärkt das Team ab sofort...",
      datum: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      kategorie: {
        data: {
          id: 4,
          attributes: { name: "Transfers" }
        }
      },
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  }
]

export default function NewsTicker({ onNewsClick }: NewsTickerProps) {
  const [newsArticles, setNewsArticles] = useState<NewsArtikel[]>([])
  const [loading, setLoading] = useState(true)
  const [isPaused, setIsPaused] = useState(false)

  // Fetch news from API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        const response = await strapi.get('/news-artikels', {
          params: {
            populate: ['kategorie'],
            sort: ['datum:desc'],
            pagination: {
              limit: 10
            }
          }
        })
        
        const apiNews = response.data.data || []
        console.log('API News:', apiNews) // Debug log
        setNewsArticles(apiNews.length > 0 ? apiNews : mockNewsArticles)
      } catch (err) {
        console.log('News API Error, using mock data:', err)
        setNewsArticles(mockNewsArticles)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  console.log('NewsArticles state:', newsArticles) // Debug log

  if (loading) {
    return (
      <div className="w-full bg-transparent">
        <div className="max-w-6xl mx-auto px-4 py-2">
          <div className="flex items-center">
            <div className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-2 py-1 rounded-md border border-gray-200 mr-4">
              <div className="w-2 h-2 bg-viktoria-yellow rounded-full animate-pulse"></div>
              <span className="text-xs font-medium uppercase tracking-wide">NEWS</span>
            </div>
            <div className="animate-pulse">
              <div className="h-3 bg-gray-300 rounded w-48"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (newsArticles.length === 0) {
    return (
      <div className="w-full bg-transparent">
        <div className="max-w-6xl mx-auto px-4 py-2">
          <div className="flex items-center">
            <div className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-2 py-1 rounded-md border border-gray-200 mr-4">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <span className="text-xs font-medium uppercase tracking-wide">NEWS</span>
            </div>
            <span className="text-gray-500 text-sm">Keine aktuellen Nachrichten verfügbar</span>
          </div>
        </div>
      </div>
    )
  }

  // Kombiniere alle News-Titel zu einem langen String mit Separatoren
  const newsText = newsArticles.map(article => article.attributes.titel).join(' • • • ')
  const fullScrollText = Array(50).fill(newsText).join(' • • • ') + ' • • • '

  return (
    <div 
      className="w-full bg-transparent relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-6xl mx-auto px-4 py-2 md:py-3 relative">
        <div className="flex items-center">
          {/* Kompaktes News Label */}
          <div className="flex items-center space-x-2 flex-shrink-0 mr-4">
            <div className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-2 py-1 rounded-md border border-gray-200">
              <div className="w-2 h-2 bg-viktoria-yellow rounded-full animate-pulse"></div>
              <span className="text-xs font-medium uppercase tracking-wide">NEWS</span>
            </div>
          </div>

          {/* Scrolling News Container */}
          <div className="flex-1 overflow-hidden relative">
            <div 
              className={`whitespace-nowrap ${isPaused ? 'animate-none' : 'animate-scroll-left'} cursor-pointer`}
              onClick={() => onNewsClick?.(newsArticles[0])}
            >
              <span className="text-gray-700 hover:text-viktoria-blue transition-colors duration-300 text-sm font-medium">
                {fullScrollText}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 