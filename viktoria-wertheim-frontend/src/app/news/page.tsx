'use client'

import { motion } from 'framer-motion'
import PageLayout from '@/components/PageLayout'
import { Clock, Tag } from 'lucide-react'

export default function NewsPage() {
  // Beispiel-Daten (später aus Strapi)
  const newsArticles = [
    {
      id: 1,
      titel: 'Viktoria Wertheim gewinnt Derby mit 3:1',
      inhalt: 'Ein spannendes Spiel endete mit einem verdienten Sieg für unsere Mannschaft...',
      datum: '2024-12-08',
      kategorie: 'Spielberichte',
      titelbild: null,
    },
    {
      id: 2,
      titel: 'Neuer Trainer für die Jugend',
      inhalt: 'Ab sofort wird unser Jugendbereich von einem erfahrenen Trainer geleitet...',
      datum: '2024-12-05',
      kategorie: 'Vereinsnachrichten',
      titelbild: null,
    },
    {
      id: 3,
      titel: 'Saisonrückblick 2024',
      inhalt: 'Die Saison 2024 war geprägt von vielen Höhepunkten und Erfolgen...',
      datum: '2024-12-01',
      kategorie: 'Allgemein',
      titelbild: null,
    },
  ]

  const categories = ['Alle', 'Spielberichte', 'Vereinsnachrichten', 'Allgemein']

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-viktoria-blue text-white py-8 px-4"
        >
          <div className="container">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              News & Aktuelles
            </h1>
            <p className="text-white/90">
              Bleib auf dem Laufenden über alles rund um Viktoria Wertheim
            </p>
          </div>
        </motion.section>

        {/* Category Filter */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="px-4"
        >
          <div className="container">
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 rounded-full bg-white border-2 border-viktoria-blue text-viktoria-blue hover:bg-viktoria-blue hover:text-white transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </motion.section>

        {/* News Articles */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="px-4"
        >
          <div className="container">
            <div className="space-y-6">
              {newsArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="md:flex">
                    {/* Image placeholder */}
                    <div className="md:w-1/3">
                      <div className="h-48 md:h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">Bild</span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock size={16} className="mr-1" />
                          <span>
                            {new Date(article.datum).toLocaleDateString('de-DE', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-viktoria-blue">
                          <Tag size={16} className="mr-1" />
                          <span>{article.kategorie}</span>
                        </div>
                      </div>
                      
                      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
                        {article.titel}
                      </h2>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {article.inhalt}
                      </p>
                      
                      <button className="text-viktoria-blue hover:text-viktoria-blue/80 font-semibold">
                        Weiterlesen →
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </PageLayout>
  )
} 