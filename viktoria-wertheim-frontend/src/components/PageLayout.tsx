'use client'

import Header from './Header'
import MobileNav from './MobileNav'

interface PageLayoutProps {
  children: React.ReactNode
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      <Header />
      <main className="pt-16 pb-20 md:pb-6 min-h-screen">
        {children}
      </main>
      <MobileNav />
    </>
  )
} 