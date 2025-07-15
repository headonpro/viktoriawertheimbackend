import type { Metadata } from 'next'
import { Inter, Permanent_Marker } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const permanentMarker = Permanent_Marker({ 
  subsets: ['latin'], 
  weight: '400',
  variable: '--font-permanent-marker' 
})

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
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body 
        className={`${inter.variable} ${permanentMarker.variable} font-sans`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  )
} 