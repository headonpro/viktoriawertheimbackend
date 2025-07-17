'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IconX, IconClock, IconTag, IconShare } from '@tabler/icons-react'
import { NewsArtikel } from '@/types/strapi'
import Image from 'next/image'

interface NewsModalProps {
  article: NewsArtikel | null
  isOpen: boolean
  onClose: () => void
}

export default function NewsModal({ article, isOpen, onClose }: NewsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  // Close modal when clicking outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // Render article content
  const renderContent = (content: any) => {
    if (typeof content === 'string') {
      return (
        <div className="prose prose-lg max-w-none">
          {content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      )
    }
    
    // Handle Strapi blocks format
    if (Array.isArray(content)) {
      return (
        <div className="prose prose-lg max-w-none">
          {content.map((block: any, index: number) => {
            if (block.type === 'paragraph') {
              return (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                  {block.children?.map((child: any) => child.text).join('') || ''}
                </p>
              )
            }
            return null
          })}
        </div>
      )
    }

    return (
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-700 leading-relaxed">
          {content.toString()}
        </p>
      </div>
    )
  }

  if (!article) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
            >
              <IconX className="w-5 h-5 text-gray-600" />
            </button>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[90vh]">
              {/* Header Image */}
              {article.attributes.titelbild?.data && (
                <div className="relative h-48 md:h-64 bg-gradient-to-br from-viktoria-blue-light to-viktoria-blue overflow-hidden">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${article.attributes.titelbild.data.attributes.url}`}
                    alt={article.attributes.titelbild.data.attributes.alternativeText || article.attributes.titel}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Article Content */}
              <div className="p-6 md:p-8 space-y-6">
                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <IconClock className="w-4 h-4 mr-2" />
                    <span>
                      {new Date(article.attributes.datum).toLocaleDateString('de-DE', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  
                  {article.attributes.kategorie?.data && (
                    <div className="flex items-center">
                      <IconTag className="w-4 h-4 mr-2" />
                      <span className="bg-viktoria-yellow/20 text-gray-700 px-3 py-1 rounded-full">
                        {article.attributes.kategorie.data.attributes.name}
                      </span>
                    </div>
                  )}

                  <button className="flex items-center hover:text-gray-700 transition-colors">
                    <IconShare className="w-4 h-4 mr-2" />
                    <span>Teilen</span>
                  </button>
                </div>

                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-permanent-marker text-gray-700 leading-tight">
                  {article.attributes.titel}
                </h1>

                {/* Content */}
                <div className="space-y-4">
                  {renderContent(article.attributes.inhalt)}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 