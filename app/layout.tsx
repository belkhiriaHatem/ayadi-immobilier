import React from "react"
import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SmoothScroll } from '@/components/smooth-scroll'
import './globals.css'
import { site } from '@/lib/site'

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: `${site.name} | Promotion immobilière de luxe`,
  description: `${site.tagline}. ${site.legalName} — promoteur immobilier en Tunisie. Appartements et résidences haut standing.`,
  icons: {
    icon: [
      {
        url: '/icons/favicon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        url: '/icons/favicon.svg',
        type: 'image/svg+xml',
      },
    ],
    shortcut: '/icons/favicon.ico',
    apple: '/icons/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${cormorant.variable} font-sans antialiased`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  )
}
