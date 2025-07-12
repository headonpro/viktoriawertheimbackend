import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Viktoria Wertheim - Fußballverein',
  description: 'Offizielle Website des Fußballvereins Viktoria Wertheim',
  keywords: ['Viktoria Wertheim', 'Fußball', 'Verein', 'Sport', 'Wertheim'],
  authors: [{ name: 'Viktoria Wertheim e.V.' }],
  creator: 'Viktoria Wertheim e.V.',
  publisher: 'Viktoria Wertheim e.V.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Viktoria Wertheim - Fußballverein',
    description: 'Offizielle Website des Fußballvereins Viktoria Wertheim',
    url: 'https://viktoria-wertheim.de',
    siteName: 'Viktoria Wertheim',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Viktoria Wertheim - Fußballverein',
    description: 'Offizielle Website des Fußballvereins Viktoria Wertheim',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
} 